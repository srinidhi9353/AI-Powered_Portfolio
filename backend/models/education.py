from sqlalchemy import Column, Integer, String, Float
from database import Base


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String(200), nullable=False)
    degree = Column(String(150), nullable=False)
    field = Column(String(150), nullable=False)
    start_year = Column(String(10), nullable=False)
    end_year = Column(String(10), nullable=True)   # None = "Ongoing"
    gpa = Column(Float, nullable=True)
    description = Column(String(500), nullable=True)
