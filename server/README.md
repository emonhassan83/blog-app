# Blog App GraphQL

## Requirements

- Users can post and publish blog content.
- Users can see posts.
- Authentication system.
- Users can see their own profile.

## Database Tables

### Post
| Column      | Type      |
| ----------- | --------- |
| id          | String    |
| title       | String    |
| content     | Text      |
| authorId    | String    |
| createdAt   | DateTime  |
| updatedAt   | DateTime  |
| published   | Boolean   |

### User
| Column      | Type      |
| ----------- | --------- |
| id          | String    |
| name        | String    |
| email       | String    |
| password    | String    |
| createdAt   | DateTime  |
| updatedAt   | DateTime  |

### Profile
| Column      | Type      |
| ----------- | --------- |
| id          | String    |
| bio         | Text      |
| createdAt   | DateTime  |
| updatedAt   | DateTime  |
| userId      | String    |

## Technology Stack

- GraphQL
- TypeScript
- PostgreSQL
- Prisma

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/emonhassan83/blog-app-graphql
   cd blog-app
