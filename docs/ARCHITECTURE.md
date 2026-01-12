# Architecture

## 0. Architecture Diagram (Local MVP)


![CharterFlow Architecture](../docs/assets/architecture_diagram.png)

```mermaid
flowchart TB
    subgraph "🌐 Client Environment"
        subgraph "Browser"
            UI[🎨 User Interface<br/>Glassmorphism Design]
            AUTH_CTX[🔐 Auth Context<br/>JWT Management]
            ROUTER[🛣️ Next.js Router<br/>App Router]
        end
    end

    subgraph "⚛️ Frontend Application<br/>apps/web:3000"
        subgraph "Core Features"
            PAGES[📄 Pages<br/>Landing, Login, Dashboard, Notebooks]
            COMP[🧩 Components<br/>GlassCard, Button, Input, etc.]
            HOOKS[🪝 Hooks<br/>Auth, API, State]
        end
        subgraph "API Layer"
            PROXY[🔄 API Proxy<br/>Next.js Rewrites<br/>/api/* → localhost:3001]
            CLIENT[📡 API Client<br/>HTTP + File Upload]
        end
    end

    subgraph "🚀 Backend Application<br/>apps/api:3001"
        subgraph "Request Handling"
            GUARD[🛡️ JWT Guard<br/>Authentication]
            VALID[✅ Validation<br/>DTOs & Pipes]
            CONTROLLER[🎮 Controllers<br/>HTTP Endpoints]
        end
        subgraph "Business Logic"
            AUTH_SVC[🔑 Auth Service<br/>JWT Generation]
            NOTEBOOK_SVC[📚 Notebook Service<br/>CRUD Operations]
            USER_SVC[👥 User Service<br/>User Management]
            UPLOAD_SVC[📤 Upload Service<br/>File Handling]
        end
        subgraph "Data Access"
            ORM[🗃️ TypeORM<br/>Database ORM]
            REPO[📦 Repositories<br/>Data Access Layer]
        end
    end

    subgraph "💾 Data Storage"
        subgraph "Database"
            DB_DEV[(🗄️ SQLite<br/>Development)]
            DB_PROD[(🐘 PostgreSQL<br/>Production)]
        end
        subgraph "File Storage"
            FS_LOCAL[(📁 Local Disk<br/>uploads/ folder)]
            FS_CLOUD[(☁️ S3 Storage<br/>Future)]
        end
    end

    subgraph "🔮 Future Infrastructure"
        QUEUE[📋 Message Queue<br/>BullMQ + Redis]
        CACHE[(🔴 Redis Cache<br/>Session & Caching)]
        VECTOR[(🧠 Vector Store<br/>pgvector)]
        WORKERS[🔄 Background Workers<br/>Document Processing]
    end

    %% Data Flow
    UI --> AUTH_CTX
    AUTH_CTX --> ROUTER
    ROUTER --> PAGES
    PAGES --> COMP
    COMP --> HOOKS
    HOOKS --> CLIENT
    CLIENT --> PROXY

    PROXY --> GUARD
    GUARD --> VALID
    VALID --> CONTROLLER
    CONTROLLER --> AUTH_SVC
    CONTROLLER --> NOTEBOOK_SVC
    CONTROLLER --> USER_SVC
    CONTROLLER --> UPLOAD_SVC

    AUTH_SVC --> ORM
    NOTEBOOK_SVC --> ORM
    USER_SVC --> ORM
    UPLOAD_SVC --> FS_LOCAL

    ORM --> REPO
    REPO --> DB_DEV
    REPO --> DB_PROD

    %% Future connections
    UPLOAD_SVC -.-> FS_CLOUD
    NOTEBOOK_SVC -.-> QUEUE
    QUEUE --> WORKERS
    WORKERS --> VECTOR
    AUTH_SVC -.-> CACHE

    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef data fill:#e8f5e8,stroke:#4caf50,stroke-width:2px
    classDef future fill:#fff3e0,stroke:#ff9800,stroke-width:2px,stroke-dasharray: 5 5

    class UI,AUTH_CTX,ROUTER,PAGES,COMP,HOOKS,CLIENT,PROXY frontend
    class GUARD,VALID,CONTROLLER,AUTH_SVC,NOTEBOOK_SVC,USER_SVC,UPLOAD_SVC,ORM,REPO backend
    class DB_DEV,DB_PROD,FS_LOCAL,FS_CLOUD data
    class QUEUE,CACHE,VECTOR,WORKERS future
```

## 0.1 Component Interaction Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant UI as 🎨 UI Components
    participant C as 🔐 Auth Context
    participant P as 🔄 API Proxy
    participant G as 🛡️ JWT Guard
    participant S as 🎮 Controllers
    participant B as 💼 Business Services
    participant D as 🗄️ Database
    participant F as 📁 File System

    Note over U,F: User Authentication Flow
    U->>UI: Login Attempt
    UI->>C: Submit Credentials
    C->>P: POST /api/auth/login
    P->>G: Forward Request
    G->>S: Authenticate User
    S->>B: Validate Credentials
    B->>D: Query User
    D-->>B: User Data
    B-->>S: Validation Result
    S-->>G: JWT Token
    G-->>P: Auth Response
    P-->>C: JWT + User Info
    C-->>UI: Update Auth State
    UI-->>U: Redirect to Dashboard

    Note over U,F: Notebook Operations Flow
    U->>UI: Create Notebook
    UI->>C: Authenticated Request
    C->>P: POST /api/notebooks
    P->>G: Validate JWT
    G->>S: Forward Request
    S->>B: Create Notebook
    B->>D: Insert Notebook
    D-->>B: Notebook ID
    B-->>S: Notebook Entity
    S-->>G: Response
    G-->>P: Auth Response
    P-->>C: Notebook Data
    C-->>UI: Update State
    UI-->>U: Show New Notebook

    Note over U,F: Document Upload Flow
    U->>UI: Upload File
    UI->>C: Authenticated Upload
    C->>P: POST /api/notebooks/:id/documents
    P->>G: Validate JWT
    G->>S: Forward with File
    S->>B: Process Upload
    B->>F: Save File
    B->>D: Create Document Record
    D-->>B: Document ID
    B-->>S: Upload Result
    S-->>G: Response
    G-->>P: Auth Response
    P-->>C: Document Metadata
    C-->>UI: Update Document List
    UI-->>U: Show Upload Success
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
