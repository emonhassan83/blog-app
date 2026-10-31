# Blog App - Coding Rules & Engineering Standards

This document establishes the coding conventions, TypeScript standards, GraphQL schema rules, and architectural patterns for the **Blog App** repository.

---

## 1. General Principles

1. **Strict Type Safety**: Enable strict TypeScript checks across the backend. Avoid `any`; use explicitly typed interfaces for context, inputs, and payloads.
2. **Predictable Errors**: Use payload-based return types with `userError` for predictable user-facing errors instead of unhandled exceptions.
3. **No N+1 Queries**: Never perform child queries in loops or nested field resolvers without batching through **DataLoader**.
4. **Environment Isolation**: Never commit hardcoded secrets, connection strings, or JWT signing keys. Always use `.env`.

---

## 2. Backend & GraphQL Standards (`server/`)

### 2.1 File & Directory Organization
- `src/schema.ts`: Define GraphQL Type Definitions using `#graphql` template literal tags.
- `src/resolvers/`: Split resolvers logically into `Query/`, `Mutation/`, and type-specific relation resolvers (`post.ts`, `user.ts`, `profile.ts`).
- `src/dataLoaders/`: Houses all batching logic using `dataloader`.
- `src/utils/`: Self-contained helper utilities (JWT verification, authorization checks).

### 2.2 GraphQL Resolvers
- Always type the Apollo Context argument (`TContext`) in resolvers:
  ```typescript
  interface TContext {
    prisma: PrismaClient;
    userInfo: { userId: number | null } | null;
  }
  ```
- Guard protected mutations by verifying `userInfo`:
  ```typescript
  if (!userInfo) {
    return {
      userError: "You are not authorized!",
      post: null,
    };
  }
  ```
- Field-level relation resolvers should rely on DataLoader:
  ```typescript
  export const Post = {
    author: async (parent: any) => {
      return userLoader.load(parent.authorId);
    },
  };
  ```

---

## 3. Frontend Standards (`client/`)

### 3.1 React & Component Architecture
- Use functional components with React Hooks.
- Place shared layout and navigation elements inside `src/layout/` and `src/components/Shared/`.
- Isolate page routes inside `src/pages/<PageName>/`.

### 3.2 Apollo Client Usage
- Execute GraphQL queries with `useQuery` and mutations with `useMutation`.
- Use `refetchQueries` or cache updates after mutations to keep UI in sync without manual page reloads.
- Attach the `authorization` header using Apollo Client `createHttpLink` or `setContext` when calling protected endpoints.

---

## 4. Git & Commit Guidelines

- **Meaningful Commit Messages**: Follow the Conventional Commits specification:
  - `feat: add post delete mutation and resolver`
  - `fix: resolve N+1 query issue in post author resolution`
  - `docs: update API documentation and quick start guide`
- **Clean Diffs**: Ensure no temporary test scripts, `.env` files, or build artifacts are staged.
