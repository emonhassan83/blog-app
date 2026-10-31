# Blog App - Testing & Verification Workflow

This document describes the quality assurance protocols, Apollo Sandbox test queries, authorization validation, and build verification for the **Blog App**.

---

## 1. Apollo Sandbox Testing Workflow

Start the backend server (`npm run dev` in `server/`) and open `http://localhost:4000/` in your browser.

### 1.1 Test User Registration (`signup`)
Run the following mutation to register a user and obtain a JWT token:

```graphql
mutation TestSignup {
  signup(
    name: "Alex Johnson"
    email: "alex@example.com"
    password: "Password123!"
    bio: "Full stack developer interested in GraphQL."
  ) {
    userError
    token
  }
}
```
**Expected Result**: `userError` is `null` and `token` is a valid JWT string.

---

### 1.2 Test User Sign-In (`signIn`)
```graphql
mutation TestSignIn {
  signIn(
    email: "alex@example.com"
    password: "Password123!"
  ) {
    userError
    token
  }
}
```

---

### 1.3 Test Protected Post Creation (`addPost`)
Add the token returned from the login mutation to the **Headers** tab in Apollo Sandbox:
```json
{
  "authorization": "<your-jwt-token>"
}
```

Execute the mutation:
```graphql
mutation TestAddPost {
  addPost(post: {
    title: "Understanding GraphQL Resolvers"
    content: "Detailed walkthrough of GraphQL field resolvers and execution context."
  }) {
    userError
    post {
      id
      title
      content
      published
      author {
        name
        email
      }
    }
  }
}
```
**Expected Result**: Post is created with `published: false` and the author details are resolved via `userLoader`.

---

### 1.4 Test Post Publishing (`publishPost`)
```graphql
mutation TestPublishPost {
  publishPost(postId: "1") {
    userError
    post {
      id
      title
      published
    }
  }
}
```

---

### 1.5 Test Querying Published Posts (`posts`)
```graphql
query TestGetPosts {
  posts {
    id
    title
    content
    published
    createdAt
    author {
      id
      name
      posts {
        id
        title
      }
    }
  }
}
```

---

### 1.6 Test Authorization Guard (`checkUserAccess`)
Attempt to update or delete a post belonging to another user:
```graphql
mutation TestUnauthorizedUpdate {
  updatePost(postId: "999", post: { title: "Hacked Title" }) {
    userError
    post {
      id
      title
    }
  }
}
```
**Expected Result**: `userError: "Post not found!"` or `userError: "Post not owned by user!"`.

---

## 2. Automated Build Verification

Run build verification checks across both packages prior to submitting code:

### Backend TypeScript Compilation
```bash
cd server
npm run build
```
Verify that `tsc` compiles cleanly with exit code 0.

### Frontend Production Build
```bash
cd client
npm run build
```
Verify that Vite creates the `client/dist/` bundle without errors.
