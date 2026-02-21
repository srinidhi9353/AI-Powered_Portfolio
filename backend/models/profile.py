from sqlalchemy import Column, Integer, String, Text
from database import Base


class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(150), nullable=False)
    summary = Column(Text, nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(30), nullable=True)
    location = Column(String(100), nullable=True)
    github = Column(String(200), nullable=True)
    linkedin = Column(String(200), nullable=True)
    website = Column(String(200), nullable=True)
    avatar_url = Column(String(500), nullable=True)
