from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    tech_stack = Column(JSON, nullable=True)   # ["React", "FastAPI", ...]
    github_url = Column(String(300), nullable=True)
    live_url = Column(String(300), nullable=True)
    image_url = Column(String(500), nullable=True)
    featured = Column(Boolean, default=False)
    order = Column(Integer, default=0)
