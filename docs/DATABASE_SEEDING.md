# Blog App - Database Setup & Seeding Guide

This document describes the PostgreSQL database configuration, Prisma ORM schema models, migration workflows, and database seeding for the **Blog App**.

---

## 1. Database Connection

The application uses PostgreSQL as its primary relational database. The connection string is managed via `server/.env`:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>?schema=public"
```

### Example Local Connection:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog_app_graphql?schema=public"
```

---

## 2. Prisma Schema Overview

The schema is defined in `server/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)

  @@map("posts")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
  profile   Profile?

  @@map("users")
}

model Profile {
  id        Int      @id @default(autoincrement())
  bio       String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int      @unique
  user      User     @relation(fields: [userId], references: [id])

  @@map("profiles")
}
```

---

## 3. Migration Commands

To manage database schema changes, run the following commands inside `server/`:

### Run Migrations
```bash
npx prisma migrate dev --name <migration_name>
```

### Generate Prisma Client
```bash
npx prisma generate
```

### Inspect Database with Prisma Studio
```bash
npx prisma studio
```
This opens an interactive GUI in your browser at `http://localhost:5555` to browse and edit records.

---

## 4. Seeding Sample Data

To populate initial users and posts, create a seed script `server/prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const user = await prisma.user.upsert({
    where: { email: "author@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "author@example.com",
      password: hashedPassword,
      profile: {
        create: {
          bio: "Software engineer and tech blogger.",
        },
      },
      posts: {
        create: [
          {
            title: "Exploring GraphQL with Apollo Server",
            content: "Learn how to build scalable APIs with Apollo Server and Prisma.",
            published: true,
          },
          {
            title: "Solving the N+1 Problem with DataLoader",
            content: "A comprehensive guide on batching database requests.",
            published: true,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully with user:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

To execute the seed script:
```bash
npx ts-node prisma/seed.ts
```
