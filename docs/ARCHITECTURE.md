# Architecture

## 0. Architecture Diagram (Local MVP)

```mermaid
flowchart TB
  subgraph Client
    B[Browser]
  end

  subgraph Web[apps/web]
    NX[Next.js App Router]
  end

  subgraph Api[apps/api]
    NS[NestJS Controllers]
    SVC[Services]
    ORM[TypeORM]
    UP[Upload: multer diskStorage]
  end

  subgraph Data
    DB[(SQLite dev / Postgres prod)]
    DISK[(uploads/)]
  end

  B --> NX
  NX -->|/api/* rewrites| NS
  NS --> SVC
  SVC --> ORM
  ORM --> DB
  NS --> UP
  UP --> DISK
```

## 1. Repository Layout
This is a monorepo with apps and shared packages.

- `apps/web`:
  - Next.js 14 App Router
  - Tailwind + design system components
  - Uses `/api/*` rewrite proxy to backend

- `apps/api`:
  - NestJS app
  - TypeORM entities
  - Feature modules (Auth, Users, Workspaces, Notebooks)

- `packages/shared`:
  - Shared TS types/utilities

## 2. Runtime Topology (Local)
- Web: `http://localhost:3000` (or next available port)
- API: `http://localhost:3001`
- Web → API: via Next rewrites (`/api/*`)

## 3. Frontend Architecture (apps/web)
### 3.1 Routing
- `/` Landing page
- `/login` Auth screen
- `/dashboard` Authenticated dashboard
- `/notebooks` list
- `/notebooks/[id]` detail + upload

### 3.2 Auth
- Client-side auth context stores token and user profile
- API calls attach bearer token

### 3.3 API Integration
- JSON calls via `ApiClient`
- File uploads via `XMLHttpRequest` multipart (supports progress)

## 4. Backend Architecture (apps/api)
### 4.1 Modules
- **Auth module**: JWT auth
- **Users/Workspaces**: multi-tenant base
- **Notebooks module**:
  - CRUD notebook
  - list documents for notebook
  - upload document to notebook

### 4.2 Persistence
- TypeORM with:
  - SQLite in dev
  - PostgreSQL in prod (planned)

### 4.3 Storage
- MVP: multer disk storage

## 5. Key Cross-Cutting Concerns
- **Validation**: DTOs + class-validator
- **Guards**: JWT guard for protected routes
- **Error handling**: HTTP exceptions
- **Config**: env-based database config

## 6. Deployment Architecture (Target)
- Web deployed as a Node service or serverless target
- API deployed as container
- Database: managed PostgreSQL
- Storage: S3
- Redis: managed Redis
