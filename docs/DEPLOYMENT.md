# Deployment Architecture

## 0. Deployment Diagram

```mermaid
flowchart TB
    subgraph "🌐 Production Environment"
        subgraph "CDN & Edge"
            CDN[🌐 Cloudflare CDN<br/>Static Assets]
            EDGE[⚡ Edge Functions<br/>Redirects & Auth]
        end
        
        subgraph "Frontend"
            WEB[⚛️ Next.js App<br/>Vercel/Netlify]
        end
        
        subgraph "Backend"
            API[🚀 NestJS API<br/>Docker Container]
            WORKERS[🔄 Background Workers<br/>BullMQ Jobs]
        end
        
        subgraph "Data Layer"
            DB[(🐘 PostgreSQL<br/>Managed Database)]
            REDIS[(🔴 Redis Cache<br/>Session & Queue)]
            VECTOR[(🧠 pgvector<br/>Embeddings)]
            S3[(☁️ S3 Storage<br/>File Storage)]
        end
        
        subgraph "Monitoring"
            LOGS[📊 Logging<br/>Structured Logs]
            METRICS[📈 Metrics<br/>APM & Performance]
            HEALTH[💚 Health Checks<br/>Uptime Monitoring]
        end
    end
    
    subgraph "🔧 Development Environment"
        DEV_WEB[⚛️ Local Next.js<br/>localhost:3000]
        DEV_API[🚀 Local NestJS<br/>localhost:3001]
        DEV_DB[(🗄️ SQLite<br/>Local Database)]
        DEV_FS[(📁 Local Files<br/>uploads/)]
    end
    
    %% Production Flow
    CDN --> WEB
    EDGE --> WEB
    WEB --> API
    API --> DB
    API --> REDIS
    API --> S3
    WORKERS --> VECTOR
    WORKERS --> REDIS
    
    %% Monitoring
    WEB --> LOGS
    API --> LOGS
    API --> METRICS
    DB --> HEALTH
    REDIS --> HEALTH
    
    %% Dev Flow
    DEV_WEB --> DEV_API
    DEV_API --> DEV_DB
    DEV_API --> DEV_FS
    
    %% Styling
    classDef prod fill:#e8f5e8,stroke:#4caf50,stroke-width:2px
    classDef dev fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    classDef data fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef monitor fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    
    class CDN,EDGE,WEB,API,WORKERS prod
    class DEV_WEB,DEV_API,DEV_DB,DEV_FS dev
    class DB,REDIS,VECTOR,S3 data
    class LOGS,METRICS,HEALTH monitor
```

## 1. Environment Configuration

### 1.1 Development (Local)
```bash
# Frontend (apps/web)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend (apps/api)
DATABASE_URL=sqlite:./data/app.db
JWT_SECRET=dev-secret-key
UPLOAD_PATH=./uploads
PORT=3001
```

### 1.2 Production
```bash
# Frontend
NEXT_PUBLIC_API_URL=https://api.charterflow.app
NEXT_PUBLIC_APP_URL=https://charterflow.app

# Backend
DATABASE_URL=postgresql://user:pass@host:5432/charterflow
JWT_SECRET=${JWT_SECRET}
UPLOAD_PATH=/tmp/uploads
REDIS_URL=redis://host:6379
S3_BUCKET=charterflow-uploads
S3_REGION=us-east-1
```

## 2. Deployment Pipeline

```mermaid
gitGraph
    commit id: "Feature Dev"
    branch develop
    checkout develop
    commit id: "PR Merge"
    commit id: "Tests Pass"
    checkout main
    merge develop
    commit id: "Tag Release"
    commit id: "Deploy Staging"
    commit id: "E2E Tests"
    commit id: "Deploy Production"
```

## 3. Infrastructure Components

### 3.1 Frontend Deployment
- **Platform**: Vercel or Netlify
- **Build**: Next.js static generation + ISR
- **CDN**: Automatic edge caching
- **Environment**: Preview branches for PRs

### 3.2 Backend Deployment
- **Platform**: Docker containers on ECS/Railway
- **Load Balancer**: Application load balancer
- **Auto-scaling**: CPU/memory based scaling
- **Health checks**: /health endpoint

### 3.3 Database
- **Primary**: PostgreSQL (RDS/Supabase)
- **Cache**: Redis (ElastiCache/Upstash)
- **Backups**: Daily automated backups
- **Replication**: Read replica for queries

### 3.4 Storage
- **Files**: S3 compatible storage
- **CDN**: CloudFront for file delivery
- **Lifecycle**: Automatic cleanup of old files
- **Encryption**: Server-side encryption

## 4. Monitoring & Observability

### 4.1 Logging
```mermaid
flowchart LR
    APP[Application Logs] --> COLLECTOR[Log Collector]
    COLLECTOR --> PROCESSOR[Log Processor]
    PROCESSOR --> INDEX[Log Indexing]
    INDEX --> DASHBOARD[Log Dashboard]
    INDEX --> ALERTS[Alert System]
```

### 4.2 Metrics
- **Application**: Response times, error rates
- **Business**: User actions, feature usage
- **Infrastructure**: CPU, memory, disk usage
- **Database**: Query performance, connections

### 4.3 Health Checks
- **Liveness**: `/health/live` - service is running
- **Readiness**: `/health/ready` - service can accept traffic
- **Dependencies**: Database, Redis, external APIs

## 5. Security Considerations

### 5.1 Network Security
- **HTTPS**: TLS 1.3 everywhere
- **Firewall**: Restrict database access
- **VPC**: Private network for backend services
- **WAF**: Web application firewall

### 5.2 Application Security
- **Environment variables**: Secure secret management
- **Rate limiting**: API rate limiting
- **Input validation**: Comprehensive validation
- **CORS**: Proper CORS configuration

### 5.3 Data Security
- **Encryption**: At rest and in transit
- **Backups**: Encrypted backups
- **Access control**: Principle of least privilege
- **Audit logs**: Access and change logging

## 6. Disaster Recovery

### 6.1 Backup Strategy
- **Database**: Daily snapshots + point-in-time recovery
- **Files**: Cross-region replication
- **Configuration**: Git versioned infrastructure
- **Secrets**: Secure secret rotation

### 6.2 Recovery Procedures
1. **Database recovery**: Restore from backup
2. **File recovery**: Restore from S3 replication
3. **Application**: Redeploy from container registry
4. **DNS**: Update DNS if needed

## 7. Scaling Strategy

### 7.1 Horizontal Scaling
- **Frontend**: Edge CDN scaling
- **Backend**: Container auto-scaling
- **Database**: Read replicas
- **Cache**: Redis clustering

### 7.2 Vertical Scaling
- **Compute**: Increase CPU/memory
- **Database**: Larger instance sizes
- **Storage**: Increase disk space
- **Network**: Higher bandwidth limits
