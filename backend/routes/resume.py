from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models import Profile, Skill, Experience, Project, Education, Certificate
from schemas import (
    ProfileResponse, SkillResponse, ExperienceResponse,
    ProjectResponse, EducationResponse, CertificateResponse,
)

router = APIRouter()


@router.get("/profile", response_model=ProfileResponse)
async def get_profile(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Profile).limit(1))
    return result.scalar_one()


@router.get("/skills", response_model=list[SkillResponse])
async def get_skills(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Skill).order_by(Skill.category, Skill.name))
    return result.scalars().all()


@router.get("/experience", response_model=list[ExperienceResponse])
async def get_experience(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Experience).order_by(Experience.is_current.desc(), Experience.id.desc())
    )
    return result.scalars().all()


@router.get("/projects", response_model=list[ProjectResponse])
async def get_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project).order_by(Project.featured.desc(), Project.order)
    )
    return result.scalars().all()


@router.get("/education", response_model=list[EducationResponse])
async def get_education(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Education).order_by(Education.start_year.desc()))
    return result.scalars().all()


@router.get("/certificates", response_model=list[CertificateResponse])
async def get_certificates(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Certificate).order_by(Certificate.year.desc()))
    return result.scalars().all()
