# 🚀 AI-Powered Portfolio Website

A full-stack, production-ready personal portfolio with an **AI chat assistant** that answers questions strictly from resume data stored in PostgreSQL.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│         React + TypeScript + Vite (Vercel)                       │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────────┐   │
│  │   Portfolio│  │  Sections  │  │  AI Chat Widget (lazy)   │   │
│  │   Sections │  │ Animations │  │  Floating FAB + Drawer   │   │
│  └────────────┘  └────────────┘  └──────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / Axios (VITE_API_URL)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Render Free Tier)                     │
│                    Python + FastAPI                               │
│                                                                   │
│  POST /api/chat ──► fetch_resume_context() ──► build_prompt()    │
│  GET  /api/*    ──► resume data endpoints                         │
│                             │                                     │
│                  ┌──────────┴──────────┐                         │
│                  │                     │                          │
│                  ▼                     ▼                          │
│         PostgreSQL (Supabase)   OpenRouter API                    │
│         5 resume tables         mistral-7b-instruct               │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
AI-Powered Portfolio/
├── backend/
│   ├── main.py               # FastAPI app + CORS
│   ├── database.py           # SQLAlchemy async engine
│   ├── seed.py               # Database seeder
│   ├── models/               # ORM models (5 tables)
│   │   ├── profile.py
│   │   ├── skills.py
│   │   ├── experience.py
│   │   ├── projects.py
│   │   └── education.py
│   ├── schemas/              # Pydantic v2 models
│   │   └── __init__.py
│   ├── routes/
│   │   ├── chat.py           # POST /api/chat
│   │   └── resume.py         # GET /api/profile, skills, etc.
│   ├── services/
│   │   └── openrouter.py     # AI service
│   ├── .env.example
│   ├── .gitignore
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── index.css
    │   ├── types/index.ts
    │   ├── lib/api.ts         # Axios instance
    │   ├── hooks/useChat.ts   # Chat state hook
    │   └── components/
    │       ├── Navbar.tsx
    │       ├── Hero.tsx
    │       ├── About.tsx
    │       ├── Skills.tsx
    │       ├── Projects.tsx
    │       ├── Experience.tsx
    │       ├── Contact.tsx
    │       ├── Footer.tsx
    │       └── chat/
    │           ├── ChatWidget.tsx     # Floating FAB (lazy)
    │           ├── ChatDrawer.tsx     # Slide-in drawer
    │           ├── MessageBubble.tsx  # Message UI
    │           └── TypingIndicator.tsx
    ├── .env.example
    ├── vercel.json
    └── vite.config.ts
```

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string from Supabase |
| `OPENROUTER_API_KEY` | API key from openrouter.ai |
| `OPENROUTER_MODEL` | Model to use (default: `mistralai/mistral-7b-instruct`) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |
| `SITE_URL` | Your frontend URL (used in OpenRouter HTTP-Referer) |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL (e.g. `https://your-api.onrender.com`) |

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL (or a Supabase project)

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
# or: source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Copy and fill in environment variables
copy .env.example .env

# Seed the database (creates tables + sample data)
python seed.py

# Start the API server
uvicorn main:app --reload --port 8000
```

The API will be running at `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend

# Copy env file
copy .env.example .env
# Set VITE_API_URL=http://localhost:8000

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will be at `http://localhost:5173`

## 🌐 Deployment

### 1. Database — Supabase (Free Tier)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy the **Connection string** from Settings → Database → URI
3. Use **Session Mode** pooler URL for Render compatibility
4. Run `python seed.py` once to create tables and seed data

### 2. Backend — Render (Free Web Service)

1. Push `backend/` to a GitHub repository
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Configure:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all environment variables from `.env.example`
6. Deploy — note your service URL (e.g. `https://your-api.onrender.com`)

### 3. Frontend — Vercel

1. Push `frontend/` to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variable:
   - `VITE_API_URL` = `https://your-api.onrender.com`
4. Deploy — Vercel auto-detects Vite

### 4. Update CORS

After deploying the frontend, update the backend `ALLOWED_ORIGINS` env var on Render:
```
ALLOWED_ORIGINS=https://your-portfolio.vercel.app
```

## 📡 API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/profile` | Get profile data |
| `GET` | `/api/skills` | Get all skills |
| `GET` | `/api/experience` | Get work experience |
| `GET` | `/api/projects` | Get projects |
| `GET` | `/api/education` | Get education |
| `POST` | `/api/chat` | AI chat endpoint |

### POST /api/chat

**Request:**
```json
{ "message": "What are your top skills?" }
```

**Response:**
```json
{ "reply": "Based on the resume, the top skills are..." }
```

## 🔒 Security

- **API keys** stored only in backend `.env` — never exposed to frontend
- **CORS** restricted to specific origins in production
- **AI calls** made server-side only — frontend never touches OpenRouter directly
- **`.env` files** excluded from version control via `.gitignore`
- **Input validation** via Pydantic v2 on all endpoints

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Backend | Python + FastAPI |
| ORM | SQLAlchemy (async) |
| Validation | Pydantic v2 |
| Database | PostgreSQL (Supabase) |
| AI | OpenRouter → Mistral 7B Instruct |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |
| DB Hosting | Supabase |
