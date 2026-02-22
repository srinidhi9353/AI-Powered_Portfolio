from fastapi import APIRouter, HTTPException
from pathlib import Path
import json
import traceback

from schemas import ChatRequest, ChatResponse
from services.openrouter import build_system_prompt, call_openrouter

router = APIRouter()

def load_resume_data():
    """Loads resume data from local JSON file."""
    try:
        file_path = Path(__file__).parent.parent / "data" / "resume.json"
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading resume.json: {e}")
        return {}

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=422, detail="Message cannot be empty.")

    try:
        # Load context from JSON instead of Database
        resume_data = load_resume_data()
        if not resume_data:
            raise ValueError("Resume data is empty or could not be loaded.")

        system_prompt = build_system_prompt(resume_data)

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message.strip()},
        ]

        reply = await call_openrouter(messages)
        return ChatResponse(reply=reply)

    except ValueError as e:
        print(f"CHAT ERROR (ValueError): {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        print("CHAT ERROR (Unhandled):")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Internal error: {str(e)}",
        )
