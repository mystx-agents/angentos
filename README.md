# AgentOS - Production-Ready AI Operating System

AgentOS is an advanced, production-quality AI Operating System built with a micro-agent architecture and a premium futuristic dashboard. It handles intelligent Instagram conversations, system orchestration, and deep analytics.

## 📁 Repository Structure

The project is structured into two main, independently deployable modules:

- **`frontend/`**: A modern Next.js 15 (App Router) React application.
- **`backend/`**: A high-performance FastAPI Python application.

---

## 🎨 Frontend (Next.js 15)

Built with React 19, TypeScript, Tailwind CSS, and Framer Motion. The UI is designed as a futuristic AI control center featuring glassmorphism, dynamic data visualizations, and smooth page transitions.

### Features
- **Dashboard**: Real-time stats (Total Users, Active Conversations, AI Reply Time).
- **Chat Interface**: Manage and view dynamic conversations with relationship scores and memory tracking.
- **Settings & Auth**: Complete JWT-based auth flow and customizable system settings.
- **Legal Pages**: Professional Privacy Policy, Terms of Service, and Data Deletion pages.

### Deployment (Cloudflare Pages)
The frontend is optimized for deployment on Cloudflare Pages using `@cloudflare/next-on-pages`.
1. Connect this repository to Cloudflare Pages.
2. Select **Next.js** framework preset.
3. Set **Root directory** to `frontend`.
4. Ensure **Compatibility Flags** includes `nodejs_compat` in the Cloudflare settings.

---

## ⚙️ Backend (FastAPI)

Built using Clean Architecture and SOLID principles. It uses PostgreSQL for persistent data, Redis for caching, and communicates directly with the Meta Official Instagram Graph API.

### Core Systems
- **Agent Brain Orchestrator**: An asynchronous central nervous system (EventBus) that coordinates all micro-agents and webhook events.
- **Meta Graph API Integration**: Official, compliant integration for receiving and sending Instagram messages.
- **Micro-Agents**:
  - **Reply Agent**: Reconstructs context and communicates with Groq APIs.
  - **Memory Agent**: Retrieves and saves user memory across sessions via Redis.
  - **Analytics Agent**: Analyzes message sentiment and updates metrics.
  - **Safety Agent**: Defends the system against prompt injections and jailbreaks.

### Deployment (Railway)
The backend is completely containerized and ready for 1-click deployment on Railway.
1. Connect this repository to Railway.
2. Set **Root Directory** to `/backend`.
3. Railway will automatically detect the `railway.toml` / `Procfile` and use `uvicorn` to run the app.
4. Add a PostgreSQL database in Railway and map your `.env` variables.
*Note: The backend automatically converts standard Postgres URLs to `postgresql+asyncpg://` for async SQLAlchemy compatibility.*

---

## 🔒 Security
- **JWT Authentication**: Secured endpoints for the dashboard.
- **Webhook Verification**: Verifies HMAC signatures from Meta to ensure data integrity.
- **Encrypted Tokens**: Access tokens are stored using Fernet encryption.

## 🚀 Local Development

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

© 2026 AgentOS. All Rights Reserved.
