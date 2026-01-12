# System Design (CharterFlow)

## 1. Purpose
CharterFlow is a Product & Ops Studio that helps users:
- Capture knowledge into Notebooks (documents, notes)
- Ask AI questions over uploaded sources (grounded responses)
- Discover a Unique Value Zone (UVZ)
- Generate Product Charters and operational systems

This document describes the system design for the current implementation (MVP) and the intended evolution.

## 2. High-level Architecture
### 2.1 Components
- **Web App (Next.js)**
  - UI, authenticated sessions (JWT stored client-side)
  - Calls backend through **`/api/*` proxy** (Next.js rewrites)

- **API (NestJS)**
  - Auth (JWT)
  - Domain modules (Notebooks, Users, Workspaces)
  - File upload endpoint (multer disk storage)
  - Persistence via TypeORM

- **Database**
  - Development: SQLite
  - Production: PostgreSQL (planned)

- **File Storage**
  - MVP: local disk `uploads/` on the API server
  - Future: S3-compatible object storage

## 3. Key Flows
### 3.1 Authentication
- User registers / logs in
- API returns JWT
- Web stores token and sends `Authorization: Bearer <token>`

### 3.2 Notebook Creation
- Web calls `POST /api/notebooks`
- API creates a `Notebook` row linked to the authenticated user

### 3.3 Document Upload (Option A: Local Disk)
- Web uses `multipart/form-data` upload to `POST /api/notebooks/:id/documents`
- API uses multer disk storage to write file to `apps/api/uploads` (or configured uploads path)
- API persists a `Document` row with:
  - file metadata (name, mimeType, size)
  - linkage to notebook
  - linkage to user

### 3.4 Document Listing
- Web calls `GET /api/notebooks/:id/documents`
- API returns document metadata ordered by creation time

## 4. Data Model (MVP)
### 4.1 Notebook
- **Ownership**: belongs to a User
- Fields: title, description, avatar, settings, timestamps

### 4.2 Document
- **Ownership**: belongs to a User
- **Association**: has a `notebookId` foreign key (kept simple to avoid circular entity relations)
- Fields: title, fileName, mimeType, size, storagePath, timestamps

## 5. API Surface (MVP)
### 5.1 Auth
- `POST /auth/register`
- `POST /auth/login`

### 5.2 Notebooks
- `GET /notebooks`
- `POST /notebooks`
- `GET /notebooks/:id`
- `PATCH /notebooks/:id`
- `DELETE /notebooks/:id`
- `GET /notebooks/:id/documents`
- `POST /notebooks/:id/documents` (multipart upload)

## 6. Security Model
- JWT authentication via NestJS guard
- Authorization rule (MVP): user can only access their own notebooks/documents
- Upload constraints (MVP): accept any file type; server-side limits should still exist (size limits)

## 7. Non-functional Requirements
### 7.1 Reliability
- File + DB writes must be consistent:
  - If file write succeeds but DB write fails, should delete the file (future improvement)
  - If DB write succeeds but file write fails, request should fail (current behavior)

### 7.2 Observability
- MVP: basic Nest logging
- Future: request correlation IDs + structured logs

### 7.3 Performance
- MVP: simple list queries
- Future: document chunking + background indexing jobs

## 8. Future System Evolution (Planned)
- Document ingestion pipeline: parse, chunk, embed
- Vector store: pgvector
- Retrieval + citation: store chunk references and return citations
- Queue: BullMQ / Redis for ingestion jobs
- Storage: S3
- Multi-tenant workspaces with RBAC
