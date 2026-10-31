# Blog App - GraphQL API Guidelines & Documentation

This document describes the schema conventions, query/mutation design patterns, authentication headers, and response formats for the **Blog App** GraphQL API.

---

## 1. GraphQL Endpoint & Playground

- **Development Endpoint**: `http://localhost:4000/`
- **Interactive Sandbox**: Apollo Sandbox is enabled by default in local development at the same URL.
- **HTTP Method**: All GraphQL requests must use `POST` with `Content-Type: application/json`.

---

## 2. Authentication Headers

For authenticated operations (`addPost`, `updatePost`, `deletePost`, `publishPost`, `me`), pass the JWT token in the `authorization` request header:

```http
authorization: <jwt-token-string>
```

---

## 3. Schema Reference

### 3.1 Queries

#### `me: User`
Fetches the currently authenticated user's profile and posts based on the token in the `authorization` header.

```graphql
query GetMyProfile {
  me {
    id
    name
    email
    createdAt
    posts {
      id
      title
      published
    }
  }
}
```

#### `users: [User]`
Retrieves a list of all registered users.

```graphql
query GetAllUsers {
  users {
    id
    name
    email
    createdAt
  }
}
```

#### `posts: [Post]`
Retrieves all published blog posts ordered by `createdAt` descending.

```graphql
query GetPublishedPosts {
  posts {
    id
    title
    content
    published
    createdAt
    author {
      id
      name
      email
    }
  }
}
```

#### `profile(userId: ID!): Profile`
Retrieves the profile information and bio for a given user.

```graphql
query GetUserProfile($userId: ID!) {
  profile(userId: $userId) {
    id
    bio
    createdAt
    user {
      id
      name
    }
  }
}
```

---

### 3.2 Mutations

#### `signup(name: String!, email: String!, password: String!, bio: String): AuthPayload`
Registers a new user, optionally creates their bio profile, hashes the password, and returns a signed JWT.

```graphql
mutation RegisterUser($name: String!, $email: String!, $password: String!, $bio: String) {
  signup(name: $name, email: $email, password: $password, bio: $bio) {
    userError
    token
  }
}
```

#### `signIn(email: String!, password: String!): AuthPayload`
Authenticates an existing user against their email and password.

```graphql
mutation UserSignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    userError
    token
  }
}
```

#### `addPost(post: PostInput!): PostPayload`
Creates a new unpublished draft post for the authenticated user.

```graphql
mutation CreatePost($post: PostInput!) {
  addPost(post: $post) {
    userError
    post {
      id
      title
      content
      published
      author {
        name
      }
    }
  }
}
```

**Variables**:
```json
{
  "post": {
    "title": "Getting Started with GraphQL and TypeScript",
    "content": "Full tutorial on building high-performance APIs..."
  }
}
```

#### `updatePost(postId: ID!, post: PostInput!): PostPayload`
Updates an existing post title and/or content. Verifies that the authenticated user is the post author.

```graphql
mutation UpdatePost($postId: ID!, $post: PostInput!) {
  updatePost(postId: $postId, post: $post) {
    userError
    post {
      id
      title
      content
      updatedAt
    }
  }
}
```

#### `deletePost(postId: ID!): PostPayload`
Deletes an existing post. Verifies author ownership.

```graphql
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    userError
    post {
      id
      title
    }
  }
}
```

#### `publishPost(postId: ID!): PostPayload`
Toggles or marks a post as published (`published: true`). Verifies author ownership.

```graphql
mutation PublishPost($postId: ID!) {
  publishPost(postId: $postId) {
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

## 4. Error Handling Pattern

The API uses **Payload-based error reporting** for domain and operational errors:

```graphql
type AuthPayload {
  userError: String
  token: String
}

type PostPayload {
  userError: String
  post: Post
}
```

- When an operation succeeds: `userError` is `null` and data (`token` or `post`) is populated.
- When an operation fails (e.g., unauthorized, post not found, email already exists): `userError` contains a human-readable error message and the data field is `null`.

### Example Error Response:
```json
{
  "data": {
    "addPost": {
      "userError": "You must be logged in to create a post",
      "post": null
    }
  }
}
```
