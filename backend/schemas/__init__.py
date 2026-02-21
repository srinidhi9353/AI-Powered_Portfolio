from pydantic import BaseModel
from typing import Optional, List


# ─── Profile ──────────────────────────────────────────────
class ProfileBase(BaseModel):
    name: str
    title: str
    summary: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    website: Optional[str] = None
    avatar_url: Optional[str] = None


class ProfileResponse(ProfileBase):
    id: int
    model_config = {"from_attributes": True}


# ─── Skills ───────────────────────────────────────────────
class SkillBase(BaseModel):
    name: str
    level: int
    category: str
    icon: Optional[str] = None


class SkillResponse(SkillBase):
    id: int
    model_config = {"from_attributes": True}


# ─── Experience ───────────────────────────────────────────
class ExperienceBase(BaseModel):
    company: str
    role: str
    start_date: str
    end_date: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    bullets: Optional[List[str]] = None
    is_current: bool = False


class ExperienceResponse(ExperienceBase):
    id: int
    model_config = {"from_attributes": True}


# ─── Projects ─────────────────────────────────────────────
class ProjectBase(BaseModel):
    name: str
    description: str
    tech_stack: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    order: int = 0


class ProjectResponse(ProjectBase):
    id: int
    model_config = {"from_attributes": True}


# ─── Education ────────────────────────────────────────────
class EducationBase(BaseModel):
    institution: str
    degree: str
    field: str
    start_year: str
    end_year: Optional[str] = None
    gpa: Optional[float] = None
    description: Optional[str] = None


class EducationResponse(EducationBase):
    id: int
    model_config = {"from_attributes": True}


# ─── Certificates ─────────────────────────────────────────
class CertificateBase(BaseModel):
    title: str
    issuer: str
    year: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    credential_url: Optional[str] = None


class CertificateResponse(CertificateBase):
    id: int
    model_config = {"from_attributes": True}


# ─── Chat ─────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str
