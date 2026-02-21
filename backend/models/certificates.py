from sqlalchemy import Column, Integer, String, Text
from database import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(150), nullable=False)
    year = Column(String(10), nullable=False)
    image_url = Column(String(500), nullable=True)   # path like /certificates/aws.png
    description = Column(Text, nullable=True)
    credential_url = Column(String(500), nullable=True)
