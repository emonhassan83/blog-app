# Blog App - Repository & Folder Structure

This document outlines the organization, conventions, and module layout of the **Blog App** full-stack monorepo.

---

## 1. Root Repository Layout

```
blog-app/
├── .gitignore               # Comprehensive Git ignore rules (Vite dist, Node, logs, secrets)
├── README.md                # Project landing page, overview, and quick start guide
├── client/                  # React 18 + Vite Frontend Application
├── server/                  # Apollo Server 5 + TypeScript Backend Application
└── docs/                    # Technical engineering specifications & blueprints
    ├── AI_SYSTEM_PROMPT.md  # Instructions & context for AI coding assistants
    ├── API_GUIDELINES.md    # GraphQL schema conventions, queries, mutations & payloads
    ├── ARCHITECTURE.md      # Layered architecture blueprint & DataLoader sequence flow
    ├── AUTHENTICATION.md    # JWT lifecycle, Apollo context & ownership authorization
    ├── CODING_RULES.md      # TypeScript conventions, resolver design & code style
    ├── DATABASE_SEEDING.md  # Prisma schema, migrations & database seed guide
    ├── DEPLOYMENT.md        # Production deployment, Docker & SPA routing
    ├── FOLDER_STRUCTURE.md  # Detailed monorepo file & directory breakdown
    ├── TESTING_WORKFLOW.md  # Apollo Sandbox testing, schema checks & query validation
    └── development.md       # Local developer environment setup & workflow
```

---

## 2. Frontend Structure (`client/`)

The client is built using **React 18**, **Vite**, **Apollo Client 3**, **Tailwind CSS**, and **DaisyUI**:

```
client/
├── package.json             # Frontend dependencies & scripts
├── vite.config.js          # Vite bundler configuration & React plugin
├── tailwind.config.js       # Tailwind CSS & DaisyUI theme settings
├── postcss.config.js        # PostCSS configuration
├── index.html               # Single page HTML entry point
├── public/                  # Static assets
└── src/
    ├── assets/              # Static SVG images & brand icons
    ├── components/          # Reusable UI components
    │   ├── Loader/          # Loading spinners & fallback indicators
    │   └── Shared/          # Shared navigation (Navbar, Footer)
    ├── layout/              # Application shell & outlet wrappers
    │   └── MainLayout.jsx   # Top-level page layout with Navbar & Outlet
    ├── pages/               # Route page components
    │   ├── Home/            # Published blog post feed & post cards
    │   ├── Post/            # Post creation & editing views
    │   ├── Login/           # User sign-in form & token persistence
    │   ├── Signup/          # User registration & bio input form
    │   └── ErrorPage/       # 404 & route error boundary page
    ├── routes/
    │   └── Routes.jsx       # React Router route definitions
    ├── App.jsx              # Main React component
    ├── App.css              # Global application styles
    ├── index.css            # Tailwind directives & base styles
    └── main.jsx             # Apollo Client initialization & DOM mounting
```

---

## 3. Backend Structure (`server/`)

The backend is built with **Node.js**, **TypeScript**, **Apollo Server 5**, **Prisma ORM 5**, and **PostgreSQL**:

```
server/
├── package.json             # Server dependencies & scripts
├── tsconfig.json            # TypeScript compiler configuration
├── prisma/
│   ├── schema.prisma        # Prisma models (User, Profile, Post) & DB connector
│   └── migrations/          # Version-controlled SQL migration history
└── src/
    ├── config/              # Environment & configuration loaders
    ├── dataLoaders/         # DataLoader batching utilities
    │   └── userLoader.ts    # User batch-loader to eliminate N+1 author queries
    ├── resolvers/           # GraphQL Resolvers
    │   ├── Query/
    │   │   └── Query.ts     # Query resolvers (me, users, posts, profile)
    │   ├── Mutation/
    │   │   ├── auth.ts      # Authentication mutations (signup, signIn)
    │   │   ├── post.ts      # Post mutations (addPost, updatePost, deletePost, publishPost)
    │   │   └── Mutation.ts  # Consolidated Mutation resolver object
    │   ├── post.ts          # Post field resolvers (Post.author via userLoader)
    │   ├── user.ts          # User field resolvers (User.posts)
    │   ├── profile.ts       # Profile field resolvers (Profile.user)
    │   └── index.ts         # Consolidated resolver exports
    ├── utils/               # Utility functions
    │   ├── checkUserAccess.ts# Resource ownership verification guard
    │   └── jwtHelper.ts     # JWT signing, verification & token extraction
    ├── schema.ts            # GraphQL SDL schema definition (Query, Mutation, Types)
    └── index.ts             # Apollo Server bootstrap, context setup & port listener
```
