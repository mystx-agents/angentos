# AgentOS - Production-Ready AI Operating System

AgentOS is an advanced, production-quality AI Operating System built with a micro-agent architecture. It handles millions of concurrent requests using asynchronous operations, a decoupled service layer, and Redis caching.

## 🏗 Architecture

AgentOS uses **Clean Architecture** and **SOLID Principles**:
1. **API Layer**: Fast and asynchronous FastAPI endpoints. Organized into routers for Users, Messages, Conversations, Analytics, etc.
2. **Service Layer**: The `AgentWorkflow` orchestrates the different micro-agents, ensuring single-responsibility and separation of concerns.
3. **Agent Layer**: Modular intelligence nodes that handle specific logic (Memory, Safety, Analytics, Reply, Report).
4. **Data Access Layer (Repositories)**: Abstracts database operations behind a generic `BaseRepository` pattern, making queries reusable and independent.
5. **Database / Caching**: PostgreSQL (with asyncpg) stores persistent data, while Redis handles ultra-fast retrieval of memories and session analytics.

## 🤖 The AI Agents

- **Reply Agent**: Reconstructs the context (history, memory, sentiment) and communicates with the Groq API. Implements exponential backoff and retry mechanisms for fault tolerance.
- **Memory Agent**: Retrieves and saves user memory across sessions. Caches data in Redis to eliminate DB roundtrips and automatically invalidates on updates.
- **Analytics Agent**: Analyzes message sentiment (casual, professional, funny, emotional) and updates user metrics (avg reply time, relationship score, message count).
- **Safety Agent**: Defends the system against prompt injections, jailbreak attempts, and illegal requests using robust keyword filtering and context analysis.
- **Report Agent**: Aggregates platform-wide data to generate comprehensive daily, weekly, and monthly AI performance reports.

## 🚀 Startup & Deployment

The application is fully containerized with Docker, meaning zero-configuration deployment.

### 1. Configure Environment
```bash
cp .env.example .env
# Fill in your GROQ_API_KEY and random SECRET_KEY inside .env
```

### 2. Start the Cluster
```bash
docker-compose up --build
```
This single command will:
1. Start a PostgreSQL 15 database instance.
2. Start an Alpine Redis server.
3. Build the FastAPI image and install dependencies.
4. Launch the `uvicorn` server asynchronously with connection pooling.

### 3. Startup Events
When FastAPI starts:
- The `startup_event` in `app/main.py` is triggered.
- It verifies the connection to PostgreSQL and initializes the table schemas automatically using SQLAlchemy's async engine.
- Connection pools for PostgreSQL (size=20, max_overflow=10) and Redis are established.

### 4. Database Migrations
Alembic is configured for async schema migrations. If you make model changes:
```bash
alembic revision -m "Description of changes"
alembic upgrade head
```

## 🔒 Security
- **JWT Authentication**: Users must register and login to receive a Bearer token.
- **Protected Routes**: Dependencies (`get_current_user`) ensure endpoints are secure.
- **Role Permissions**: Administrative routes (like `/api/agent/control`) verify the user's role.
- **CORS Middleware**: Preconfigured to handle cross-origin requests securely.

## 📝 Logging
AgentOS uses **Structured JSON Logging** (`app/utils/logger.py`) to easily integrate with tools like ELK stack, Datadog, or AWS CloudWatch. It logs execution times, errors, API requests, and memory updates automatically via FastAPI middleware.
