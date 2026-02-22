from fastapi import APIRouter, HTTPException
from pathlib import Path
import json

from schemas import (
    ProfileResponse, SkillResponse, ExperienceResponse,
    ProjectResponse, EducationResponse, CertificateResponse,
)

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

@router.get("/profile", response_model=ProfileResponse)
async def get_profile():
    data = load_resume_data()
    profile = data.get("profile", {})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.get("/skills", response_model=list[SkillResponse])
async def get_skills():
    data = load_resume_data()
    return data.get("skills", [])


@router.get("/experience", response_model=list[ExperienceResponse])
async def get_experience():
    data = load_resume_data()
    return data.get("experience", [])


@router.get("/projects", response_model=list[ProjectResponse])
async def get_projects():
    data = load_resume_data()
    return data.get("projects", [])


@router.get("/education", response_model=list[EducationResponse])
async def get_education():
    data = load_resume_data()
    return data.get("education", [])


@router.get("/certificates", response_model=list[CertificateResponse])
async def get_certificates():
    data = load_resume_data()
    return data.get("certificates", [])
