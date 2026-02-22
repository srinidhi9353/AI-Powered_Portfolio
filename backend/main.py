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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins
    allow_credentials=False,  # Must be False when using "*"
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
