# Blog App - Full-Stack GraphQL & TypeScript Monorepo

[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Apollo Server](https://img.shields.io/badge/Apollo%20Server-311C87?style=for-the-badge&logo=apollographql&logoColor=white)](https://www.apollographql.com/)
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Blog App** is a modern, production-ready full-stack blogging platform built with **GraphQL**, **Apollo Server**, **Prisma ORM**, **PostgreSQL**, and **React 18** (powered by Vite and Apollo Client). It demonstrates real-world GraphQL architecture patterns including batched database querying with **DataLoader** to eliminate N+1 query problems, JWT authentication with contextual user authorization, and end-to-end type safety.

---

## 🌟 Key Features

- **GraphQL API Engine**: Powered by Apollo Server 5 with modular TypeDefs, Query resolvers, Mutation resolvers, and field-level relation resolvers.
- **DataLoader N+1 Optimization**: Batch loads authors and related entities with DataLoader, reducing database roundtrips from $O(N)$ to $O(1)$.
- **Authentication & Authorization**: Secure user registration (`signup`), login (`signIn`) with JWT issuance, bcrypt password hashing, and token verification via Apollo context.
- **Post Lifecycle & Ownership Control**: Authors can create (`addPost`), edit (`updatePost`), delete (`deletePost`), and toggle publication state (`publishPost`), with server-side ownership checks (`checkUserAccess`).
- **User Profiles**: One-to-one user profiles (`Profile`) with bio, linked directly to users and their post histories.
- **Modern React Client**: Responsive UI constructed with Vite, React 18, React Router v7, Apollo Client caching, Tailwind CSS, and DaisyUI.
- **Enterprise-Grade Database Layer**: PostgreSQL managed through Prisma ORM with type-safe schema definitions and declarative migrations.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend API** | Node.js, TypeScript, Apollo Server 5 (`@apollo/server`, `standalone`) |
| **Data Layer** | PostgreSQL, Prisma ORM 5 (`@prisma/client`) |
| **Performance** | DataLoader (`dataloader`) for batch entity resolution |
| **Security & Auth** | JSON Web Tokens (`jsonwebtoken`), Bcrypt password hashing (`bcrypt`) |
| **Frontend UI** | React 18, Vite 6, Apollo Client 3 (`@apollo/client`), React Router 7 |
| **Styling & Components** | Tailwind CSS, DaisyUI, React Hot Toast, React Spinners |
| **Dev Tools** | Nodemon, TypeScript Compiler (`tsc`), ESLint, PostCSS |

---

## 📚 Technical Documentation

In-depth technical guides and architectural blueprints are available in the [`docs/`](./docs/) directory:

- 📐 [**System Architecture**](./docs/ARCHITECTURE.md) - Layered system design, GraphQL lifecycle, DataLoader sequence diagrams & ERD.
- 📡 [**GraphQL API Guidelines**](./docs/API_GUIDELINES.md) - GraphQL schema conventions, queries, mutations, payloads & error handling.
- 🔐 [**Authentication & Security**](./docs/AUTHENTICATION.md) - JWT lifecycle, Apollo context injection, password hashing & authorization.
- 🗄️ [**Database & Seeding**](./docs/DATABASE_SEEDING.md) - Prisma schema, PostgreSQL setup, migrations & sample seed script.
- 💻 [**Local Development**](./docs/development.md) - Prerequisites, step-by-step setup, and environment variables.
- 📁 [**Folder Structure**](./docs/FOLDER_STRUCTURE.md) - Comprehensive monorepo directory layout and file breakdown.
- 📏 [**Coding Rules & Standards**](./docs/CODING_RULES.md) - TypeScript conventions, GraphQL resolver design, and React standards.
- 🧪 [**Testing & Verification**](./docs/TESTING_WORKFLOW.md) - Query testing with Apollo Sandbox, schema validation, and health checks.
- 🚀 [**Deployment Guide**](./docs/DEPLOYMENT.md) - Production deployment topologies for Apollo Server, PostgreSQL, and static client.
- 🤖 [**AI System Prompt**](./docs/AI_SYSTEM_PROMPT.md) - Context and system instructions for AI coding assistants.

---

## 📁 Repository Layout

```
blog-app/
├── client/                     # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/         # Shared UI components (Navbar, Loader, etc.)
│   │   ├── layout/             # Main layout wrapper
│   │   ├── pages/              # Route views (Home, Post, Login, Signup, Error)
│   │   ├── routes/             # React Router configuration
│   │   ├── main.jsx            # Apollo Client provider & React root mount
│   │   └── App.jsx             # Root component
│   ├── package.json            # Client dependencies & build scripts
│   └── vite.config.js          # Vite build & plugin configuration
│
├── server/                     # Node.js + TypeScript Apollo Server Backend
│   ├── prisma/
│   │   └── schema.prisma       # Prisma data models (User, Profile, Post)
│   ├── src/
│   │   ├── config/             # Configuration & environment variables
│   │   ├── dataLoaders/        # DataLoader batching (userLoader)
│   │   ├── resolvers/          # GraphQL Query, Mutation, and Field Resolvers
│   │   ├── utils/              # JWT verification & user access ownership helpers
│   │   ├── schema.ts           # GraphQL Type Definitions (SDL)
│   │   └── index.ts            # Apollo standalone server bootstrap & context
│   ├── package.json            # Server dependencies & scripts
│   └── tsconfig.json           # TypeScript compiler configuration
│
├── docs/                       # Engineering specifications & guides
├── .gitignore                  # Git ignore rules for Vite, Node, Prisma & secrets
└── README.md                   # Monorepo overview & landing page
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x running locally or on a cloud provider (e.g., Supabase, Neon, Railway)
- **npm** or **yarn**

---

### 2. Configure & Run Backend (`server/`)

```bash
cd server

# Install dependencies
npm install

# Configure environment variables
# Create a .env file inside server/ with the following:
# DATABASE_URL="postgresql://<user>:<password>@localhost:5432/blog_app_graphql?schema=public"
# JWT_SIGN="your-super-secure-jwt-secret"

# Apply Prisma database migrations & generate Prisma Client
npx prisma migrate dev --name init
npx prisma generate

# Start the development server (runs with nodemon & ts-node on port 4000)
npm run dev
```

The GraphQL API and Apollo Sandbox will be available at:
`http://localhost:4000/`

---

### 3. Configure & Run Frontend (`client/`)

```bash
cd ../client

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The React application will be accessible at:
`http://localhost:5173/`

---

## ⚡ GraphQL Schema Overview

### Core Types

```graphql
type Post {
  id: ID!
  title: String!
  content: String!
  author: User
  createdAt: String!
  updatedAt: String!
  published: Boolean!
}

type User {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  posts: [Post]
}

type Profile {
  id: ID!
  bio: String!
  createdAt: String!
  user: User!
}
```

### Queries & Mutations

```graphql
type Query {
  me: User
  users: [User]
  posts: [Post]
  profile(userId: ID!): Profile
}

type Mutation {
  signup(name: String!, email: String!, password: String!, bio: String): AuthPayload
  signIn(email: String!, password: String!): AuthPayload
  addPost(post: PostInput!): PostPayload
  updatePost(postId: ID!, post: PostInput!): PostPayload
  deletePost(postId: ID!): PostPayload
  publishPost(postId: ID!): PostPayload
}
```

---

## 🛡️ Security & Vulnerability Status

Both `client/` and `server/` have been audited and updated to ensure complete security:
- **Client**: 0 vulnerabilities (0 low, 0 moderate, 0 high, 0 critical)
- **Server**: 0 vulnerabilities (0 low, 0 moderate, 0 high, 0 critical)

---

## 📜 Scripts Reference

### Backend (`server/`)
- `npm run dev` - Starts server in watch mode via `nodemon` and `ts-node`.
- `npm run build` - Compiles TypeScript to JavaScript via `tsc`.

### Frontend (`client/`)
- `npm run dev` - Starts the Vite local development server.
- `npm run build` - Bundles the React application for production into `dist/`.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs ESLint across the codebase.
