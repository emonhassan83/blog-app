# Blog App - Local Development Guide

This guide provides end-to-end instructions for configuring your local machine and running both the **client** and **server** in development mode.

---

## 1. Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or `v20.x` ([Download Node.js](https://nodejs.org/))
- **PostgreSQL**: `v14+` running locally or accessible via a hosted instance ([Download PostgreSQL](https://www.postgresql.org/download/))
- **Git**: Latest version

---

## 2. Environment Variables

### 2.1 Server Environment (`server/.env`)
Create a `.env` file inside the `server/` directory:

```env
# PostgreSQL Connection URL
DATABASE_URL="postgresql://postgres:password@localhost:5432/blog_app_graphql?schema=public"

# Secret key used for signing and verifying JWT tokens
JWT_SIGN="your-super-secret-jwt-key"
```

---

## 3. Database Initialization

1. Open PostgreSQL and create the target database:
   ```sql
   CREATE DATABASE blog_app_graphql;
   ```
2. Navigate to the `server/` directory and run Prisma migrations:
   ```bash
   cd server
   npx prisma migrate dev --name init
   npx prisma generate
   ```

---

## 4. Running the Development Servers

### 4.1 Backend Apollo Server
```bash
cd server
npm install
npm run dev
```
- Server URL: `http://localhost:4000/`
- Apollo Sandbox UI will load directly in your browser.

### 4.2 Frontend React Application
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
- Vite Dev Server: `http://localhost:5173/`
- The client automatically communicates with Apollo Server at `http://localhost:4000/`.

---

## 5. Development Utilities

### Inspect Database visually with Prisma Studio
```bash
cd server
npx prisma studio
```
Launches at `http://localhost:5555`.

### Type-checking Backend
```bash
cd server
npx tsc --noEmit
```

### Building Frontend
```bash
cd client
npm run build
```
Outputs bundled static files into `client/dist/`.
