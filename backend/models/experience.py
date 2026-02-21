from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from database import Base


class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(150), nullable=False)
    role = Column(String(150), nullable=False)
    start_date = Column(String(20), nullable=False)  # e.g. "Jan 2022"
    end_date = Column(String(20), nullable=True)      # None = "Present"
    location = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    bullets = Column(JSON, nullable=True)             # list of achievement strings
    is_current = Column(Boolean, default=False)
