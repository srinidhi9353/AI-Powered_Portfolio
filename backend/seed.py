"""
Seed script — Srinidhi's real resume data.
Run with: python seed.py (inside backend venv)
Re-running drops and re-creates all tables cleanly.
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)

from database import Base
from models import Profile, Skill, Experience, Project, Education, Certificate

engine = create_async_engine(DATABASE_URL, echo=False)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def seed():
    # Drop + recreate all tables so re-runs are clean
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as db:

        # ── Profile ──────────────────────────────────────────
        profile = Profile(
            name="Srinidhi N",
            title="Full Stack Developer | React & Node.js Engineer",
            summary=(
                "I am a Full Stack Developer with hands-on experience building scalable and interactive "
                "web applications using React, Node.js, and modern database systems. I specialize in "
                "designing clean frontend architectures, integrating secure backend APIs, and developing "
                "end-to-end full-stack solutions. With strong fundamentals in Data Structures and "
                "Algorithms and certifications in AWS, Java, and Python, I focus on writing maintainable, "
                "optimized, and production-ready code."
            ),
            email="ssrinidhi622@gmail.com",
            phone="+91 9353170957",
            location="Bangalore, India",
            github="https://github.com/srinidhi9353",
            linkedin="https://linkedin.com/in/srinidhi-n-a185652a3",
            website=None,
        )
        db.add(profile)

        # ── Skills ───────────────────────────────────────────
        skills = [
            # Languages
            Skill(name="JavaScript", level=90, category="Languages"),
            Skill(name="TypeScript", level=78, category="Languages"),
            Skill(name="Python", level=74, category="Languages"),
            Skill(name="Java", level=70, category="Languages"),
            Skill(name="C++", level=65, category="Languages"),
            # Frontend
            Skill(name="React 18", level=88, category="Frontend"),
            Skill(name="HTML5 & CSS3", level=92, category="Frontend"),
            Skill(name="Tailwind CSS", level=84, category="Frontend"),
            # Backend
            Skill(name="Node.js", level=82, category="Backend"),
            Skill(name="Express.js", level=78, category="Backend"),
            Skill(name="FastAPI", level=70, category="Backend"),
            Skill(name="REST APIs", level=85, category="Backend"),
            # Database
            Skill(name="PostgreSQL", level=70, category="Database"),
            Skill(name="MySQL", level=68, category="Database"),
            Skill(name="MongoDB", level=75, category="Database"),
            # Tools
            Skill(name="Git & GitHub", level=88, category="Tools"),
            Skill(name="AWS (Cloud Practitioner)", level=65, category="Tools"),
            # Concepts
            Skill(name="Data Structures & Algorithms", level=72, category="Concepts"),
            Skill(name="OOP", level=78, category="Concepts"),
            Skill(name="API Integration", level=85, category="Concepts"),
        ]
        db.add_all(skills)

        # ── Experience ────────────────────────────────────────
        experiences = [
            Experience(
                company="CodSoft",
                role="Web Developer Intern",
                start_date="October 2024",
                end_date="November 2024",
                location="Remote",
                is_current=False,
                description="Completed a 1-month remote web development internship at CodSoft.",
                bullets=[
                    "Developed full-stack web features using HTML, CSS, JavaScript, and React.",
                    "Integrated frontend components with backend APIs for reliable data flow.",
                    "Improved application performance and reliability during the internship period.",
                ],
            ),
        ]
        db.add_all(experiences)

        # ── Projects ──────────────────────────────────────────
        projects = [
            Project(
                name="AI-Enhanced Algorithm Visualizer",
                description=(
                    "Full-stack platform to visualize sorting and pathfinding algorithms "
                    "with real-time animations. Designed interactive UI components synchronized "
                    "with backend logic and optimized state management for smooth algorithm transitions."
                ),
                tech_stack=["React 18", "TypeScript", "Node.js"],
                github_url="https://github.com/srinidhi9353/algorithm-visualizer",
                live_url=None,
                featured=True,
                order=1,
            ),
            Project(
                name="Wispr Flow Clone (Voice-to-Text)",
                description=(
                    "Real-time voice-to-text web application using Deepgram's Speech API. "
                    "Managed streaming data with low-latency UI updates and implemented "
                    "API integration with state synchronization."
                ),
                tech_stack=["React", "JavaScript", "Deepgram API"],
                github_url="https://github.com/srinidhi9353/wispr-flow-clone",
                live_url=None,
                featured=True,
                order=2,
            ),
            Project(
                name="Movie Ticketing Web Application",
                description=(
                    "End-to-end ticket booking interface with dynamic seat selection. "
                    "Built interactive UI logic for reliable booking experience and handled "
                    "real-time data flow between components."
                ),
                tech_stack=["React", "JavaScript"],
                github_url="https://github.com/srinidhi9353/movie-ticketing",
                live_url=None,
                featured=True,
                order=3,
            ),
            Project(
                name="Purchase Path Analyzer",
                description=(
                    "Analytics dashboard to track user navigation and conversion funnel. "
                    "Processed user interaction data to identify drop-offs and built "
                    "a responsive UI for real-time insights."
                ),
                tech_stack=["React", "JavaScript"],
                github_url="https://github.com/srinidhi9353/purchase-path-analyzer",
                live_url=None,
                featured=False,
                order=4,
            ),
            Project(
                name="Complete the Word (Web Game)",
                description=(
                    "Browser-based interactive word game with smooth UX and responsive layout. "
                    "Implemented UI state handling and performance optimization."
                ),
                tech_stack=["JavaScript", "HTML", "CSS"],
                github_url="https://github.com/srinidhi9353/complete-the-word",
                live_url=None,
                featured=False,
                order=5,
            ),
        ]
        db.add_all(projects)

        # ── Education ─────────────────────────────────────────
        education = [
            Education(
                institution="East Point College of Engineering and Technology, Bangalore",
                degree="Bachelor of Engineering (B.E.)",
                field="Computer Science & Engineering",
                start_year="2022",
                end_year="2026",
                gpa=None,
                description="Current degree program focusing on software development, data structures, and full-stack web technologies.",
            ),
            Education(
                institution="Advitya Pre University College, Hoskote",
                degree="Pre-University Course (PUC)",
                field="Science (PCMCs)",
                start_year="2020",
                end_year="2022",
                gpa=None,
                description="Completed pre-university education with a focus on Physics, Chemistry, Maths, and Computer Science.",
            ),
        ]
        db.add_all(education)

        # ── Certificates ──────────────────────────────────────
        certificates = [
            Certificate(
                title="AWS Cloud Practitioner Essentials",
                issuer="AWS Training",
                year="2025",
                image_url="/certificates/aws-cloud-practitioner.png",
                description="Cloud concepts, AWS services, architecture, security, and pricing.",
                credential_url=None,
            ),
            Certificate(
                title="Java Foundations",
                issuer="Oracle Academy",
                year="2024",
                image_url="/certificates/oracle-java-foundations.png",
                description="Core Java programming concepts, OOP, and application development.",
                credential_url=None,
            ),
            Certificate(
                title="Data Structures & Algorithms",
                issuer="Infosys Springboard",
                year="2024",
                image_url="/certificates/infosys-dsa.png",
                description="Fundamental DSA concepts: arrays, linked lists, trees, sorting, and searching.",
                credential_url=None,
            ),
            Certificate(
                title="Basics of Python",
                issuer="Infosys Springboard",
                year="2023",
                image_url="/certificates/infosys-basics-python.png",
                description="Python fundamentals, data types, control flow, and problem-solving.",
                credential_url=None,
            ),
            Certificate(
                title="Exploring Computers",
                issuer="Infosys Springboard",
                year="2024",
                image_url="/certificates/infosys-exploring-computers.png",
                description="Computer science fundamentals, hardware, software, and networking.",
                credential_url=None,
            ),
            Certificate(
                title="Automation Starter",
                issuer="UiPath",
                year="2024",
                image_url="/certificates/uipath-automation-starter.png",
                description="RPA fundamentals and automation workflows using UiPath.",
                credential_url=None,
            ),
            Certificate(
                title="Data Analytics Job Simulation",
                issuer="Deloitte",
                year="2026",
                image_url="/certificates/deloitte-data-analytics.png",
                description="Real-world data analytics simulation covering analysis, dashboards, and insights.",
                credential_url=None,
            ),
        ]
        db.add_all(certificates)

        await db.commit()
        import sys
        sys.stdout.buffer.write("Database seeded with Srinidhi's real resume data!\n".encode("utf-8"))
        sys.stdout.buffer.write(b"  - 1 profile\n")
        sys.stdout.buffer.write(b"  - 20+ skills\n")
        sys.stdout.buffer.write(b"  - 1 experience (CodSoft)\n")
        sys.stdout.buffer.write(b"  - 5 projects\n")
        sys.stdout.buffer.write(b"  - 2 education (B.E. + PUC)\n")
        sys.stdout.buffer.write(b"  - 7 certificates\n")
        sys.stdout.buffer.flush()


if __name__ == "__main__":
    asyncio.run(seed())
