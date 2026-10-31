# Blog App - AI Assistant Engineering Context

This document provides system context, architectural guidelines, and codebase conventions for AI coding assistants working in the **Blog App** repository.

---

## 1. Project Context

- **Monorepo Name**: `blog-app`
- **Application Type**: Full-Stack GraphQL Blogging Platform
- **Backend Architecture**: Node.js, TypeScript, Apollo Server 5 (`@apollo/server`, `standalone`), Prisma ORM 5, PostgreSQL
- **Frontend Architecture**: React 18, Vite 6, Apollo Client 3 (`@apollo/client`), React Router 7, Tailwind CSS, DaisyUI
- **Batching Layer**: DataLoader (`dataloader`) for batching relational lookups (`userLoader`)

---

## 2. Key Architectural Rules

1. **GraphQL Schema & Resolvers**:
   - Schema definitions are in `server/src/schema.ts` using the `#graphql` template literal.
   - Separate resolvers into `Query/`, `Mutation/`, and field relation resolvers (`post.ts`, `user.ts`, `profile.ts`).
   - Field relations that could produce N+1 query patterns (e.g., `Post.author`) **must** use DataLoader (`src/dataLoaders/`).

2. **Authentication & Authorization**:
   - Tokens are passed via the standard HTTP `authorization` header.
   - Apollo Server context parses the JWT in `server/src/index.ts` and populates `userInfo: { userId } | null`.
   - Protect mutations by checking `userInfo` and verify post ownership via `checkUserAccess(prisma, userId, postId)`.

3. **Error Handling**:
   - Never throw raw uncaught exceptions inside resolvers for user-level errors.
   - Return payload objects matching `AuthPayload` (`{ userError, token }`) or `PostPayload` (`{ userError, post }`).

4. **Database Operations**:
   - Always access PostgreSQL through `prisma: PrismaClient`.
   - Keep migrations consistent via `npx prisma migrate dev`.
   - Never store plain text passwords; always hash with `bcrypt`.

5. **Client Practices**:
   - Use Apollo Client (`useQuery`, `useMutation`) for GraphQL interactions.
   - Ensure components in `client/src/pages/` and `client/src/components/` remain modular.
   - Avoid installing unused legacy libraries. Keep packages audit-clean with zero vulnerabilities.
