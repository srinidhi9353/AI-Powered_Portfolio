from sqlalchemy import Column, Integer, String
from database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    level = Column(Integer, nullable=False)   # 0–100
    category = Column(String(50), nullable=False)  # e.g. "Frontend", "Backend", "Tools"
    icon = Column(String(50), nullable=True)        # icon key for frontend
