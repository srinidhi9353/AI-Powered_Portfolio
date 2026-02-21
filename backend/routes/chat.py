from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models import Profile, Skill, Experience, Project, Education, Certificate
from schemas import ChatRequest, ChatResponse
from services.openrouter import build_system_prompt, call_openrouter

router = APIRouter()


async def fetch_resume_context(db: AsyncSession) -> dict:
    profile_result = await db.execute(select(Profile).limit(1))
    profile = profile_result.scalar_one_or_none()

    skills_result = await db.execute(select(Skill).order_by(Skill.category, Skill.name))
    skills = skills_result.scalars().all()

    exp_result = await db.execute(
        select(Experience).order_by(Experience.is_current.desc(), Experience.id.desc())
    )
    experience = exp_result.scalars().all()

    proj_result = await db.execute(
        select(Project).order_by(Project.featured.desc(), Project.order)
    )
    projects = proj_result.scalars().all()

    edu_result = await db.execute(select(Education).order_by(Education.start_year.desc()))
    education = edu_result.scalars().all()

    cert_result = await db.execute(select(Certificate).order_by(Certificate.year.desc()))
    certificates = cert_result.scalars().all()

    return {
        "profile": {
            "name": profile.name if profile else "",
            "title": profile.title if profile else "",
            "summary": profile.summary if profile else "",
            "email": profile.email if profile else "",
            "phone": profile.phone if profile else "",
            "location": profile.location if profile else "",
            "github": profile.github if profile else "",
            "linkedin": profile.linkedin if profile else "",
            "website": profile.website if profile else "",
        } if profile else {},
        "skills": [
            {"name": s.name, "level": s.level, "category": s.category} for s in skills
        ],
        "experience": [
            {
                "company": e.company,
                "role": e.role,
                "start_date": e.start_date,
                "end_date": e.end_date,
                "location": e.location,
                "description": e.description,
                "bullets": e.bullets or [],
                "is_current": e.is_current,
            }
            for e in experience
        ],
        "projects": [
            {
                "name": p.name,
                "description": p.description,
                "tech_stack": p.tech_stack or [],
                "github_url": p.github_url,
                "live_url": p.live_url,
                "featured": p.featured,
            }
            for p in projects
        ],
        "education": [
            {
                "institution": e.institution,
                "degree": e.degree,
                "field": e.field,
                "start_year": e.start_year,
                "end_year": e.end_year,
                "gpa": e.gpa,
            }
            for e in education
        ],
        "certificates": [
            {
                "title": c.title,
                "issuer": c.issuer,
                "year": c.year,
                "description": c.description,
                "credential_url": c.credential_url,
            }
            for c in certificates
        ],
    }


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    if not request.message.strip():
        raise HTTPException(status_code=422, detail="Message cannot be empty.")

    try:
        resume_data = await fetch_resume_context(db)
        system_prompt = build_system_prompt(resume_data)

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message.strip()},
        ]

        reply = await call_openrouter(messages)
        return ChatResponse(reply=reply)

    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="AI service temporarily unavailable. Please try again.",
        )
