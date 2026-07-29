# CodeQuest — Full-Stack RPG Coding Game

A gamified coding adventure where players learn Frontend, Backend, and Database concepts by completing quests, earning XP, and battling bosses.

## Migrated Technology Stack
- **Frontend**: React + Next.js + TypeScript (Vanilla CSS styling)
- **Backend**: Node.js + Fastify + TypeScript
- **Database**: PostgreSQL + Redis (with automated schema creation and graceful fallback)
- **AI Microservice**: Python + FastAPI Heuristics Engine

## Quick Start

### 1. Install Dependencies
Install all Node.js dependencies across root, frontend, and backend environments:
```bash
npm run install:all
```

And install Python AI microservice requirements:
```bash
pip install -r ai-service/requirements.txt
```

### 2. Start Services Concurrently
Launch the Next.js Frontend (port 3000), Fastify API Backend (port 5000), and Python AI Service (port 8000) together:
```bash
npm run start
```

## Project Structure
```
CODE.Q/
├─ frontend/        # React + Next.js (App Router) + TypeScript
├─ backend/         # Node.js (Fastify) + TypeScript API
├─ ai-service/      # Python (FastAPI) Microservice
├─ public/          # Static assets (images, sounds)
├─ package.json     # Orchestration scripts
└─ README.md
```

