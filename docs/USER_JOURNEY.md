# User Journey

## 0. User Journey Diagram (MVP)

```mermaid
flowchart TD
  A[Landing /] --> B[Login /login]
  B --> C[Dashboard /dashboard]
  C --> D[Notebooks /notebooks]
  D --> E[Notebook Detail /notebooks/:id]
  E --> F[Upload Document]
  F --> G[Document appears in list]
```

## 1. Primary Personas
- **Founder/Builder**: validating a product wedge and creating execution plans
- **Operator/PM**: organizing research and translating into systems
- **Consultant/Agency**: packaging insights into repeatable client delivery

## 2. MVP Journey (Current)
### 2.1 Landing → Login
- User lands on `/`
- Clicks **Sign in** or **Get started**
- Navigates to `/login`

### 2.2 Authentication
- User logs in
- On success, user is redirected to `/dashboard`

### 2.3 Dashboard
- User sees module cards:
  - Notebooks
  - UVZ discovery (coming soon)
  - Product charters (coming soon)
  - Operations (coming soon)
- User clicks **Notebooks**

### 2.4 Notebooks List
- User views existing notebooks
- User creates a notebook by entering a title and clicking create
- User opens a notebook

### 2.5 Notebook Detail
- User views notebook details and existing documents
- User uploads a document (any file type) to the notebook
- Upload succeeds and the document appears in the list

## 3. Intended Journey (Near-term)
### 3.1 Grounded Q&A
- User opens a notebook
- User asks a question
- System responds with an answer + citations (document chunks)

### 3.2 UVZ Discovery Wizard
- User completes guided skill + pain mapping
- System outputs:
  - UVZ statement
  - wedge recommendation
  - problem/solution hypotheses

### 3.3 Product Charter Generation
- User selects a UVZ output
- System generates a product charter:
  - audience, pains, promise
  - scope boundaries
  - MVP outline
  - risks & mitigations

## 4. Success Metrics (Product)
- Time to first notebook created
- Upload success rate
- Retention (weekly active users)
- Time to first “charter generated”
- User satisfaction with grounded answers
