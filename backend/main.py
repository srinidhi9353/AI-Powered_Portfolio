from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from database import engine, Base
from routes import chat, resume

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 App starting...")
    yield


app = FastAPI(
    title="Portfolio AI API",
    description="AI-powered portfolio backend with resume Q&A",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — Permanent Production Fix
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")

if ALLOWED_ORIGINS:
    origins = [origin.strip() for origin in ALLOWED_ORIGINS.split(",")]
else:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,  # Required for '*' support
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(resume.router, prefix="/api")




@app.get("/")
async def root():
    return {"message": "Portfolio AI API is running 🚀"}


@app.get("/health")
async def health():
    return {"status": "ok"}
