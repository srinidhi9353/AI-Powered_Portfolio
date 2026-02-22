import httpx
import os
from dotenv import load_dotenv
from typing import List, Dict, Any

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3-8b-instruct")


def build_system_prompt(resume_data: Dict[str, Any]) -> str:
    profile = resume_data.get("profile", {})
    skills = resume_data.get("skills", [])
    experience = resume_data.get("experience", [])
    projects = resume_data.get("projects", [])
    education = resume_data.get("education", [])
    certificates = resume_data.get("certificates", [])

    # ── Skills ────────────────────────────────────────────────
    from collections import defaultdict
    skill_by_cat: Dict[str, list] = defaultdict(list)
    for s in skills:
        skill_by_cat[s["category"]].append(s["name"])

    skills_text = "\n".join(
        [f"  {cat}: {', '.join(names)}" for cat, names in skill_by_cat.items()]
    ) or "  Not specified."

    # ── Experience ────────────────────────────────────────────
    experience_text = ""
    for exp in experience:
        bullets = "\n".join([f"    - {b}" for b in (exp.get("bullets") or [])])
        end = exp.get("end_date") or "Present"
        experience_text += (
            f"  - {exp['role']} at {exp['company']} "
            f"({exp['start_date']} – {end})\n"
            f"{bullets}\n"
        )
    experience_text = experience_text.strip() or "  Not specified."

    # ── Projects ──────────────────────────────────────────────
    projects_text = ""
    for proj in projects:
        tech = ", ".join(proj.get("tech_stack") or [])
        projects_text += (
            f"  - {proj['name']}: {proj['description']}\n"
            f"    Tech: {tech}\n"
        )
    projects_text = projects_text.strip() or "  Not specified."

    # ── Education ─────────────────────────────────────────────
    # Sort by start year descending so most recent is first
    sorted_edu = sorted(education, key=lambda x: str(x.get("start_year", "0")), reverse=True)
    edu_text = ""
    for e in sorted_edu:
        edu_text += (
            f"  - {e['degree']} in {e['field']} at {e['institution']} "
            f"({e['start_year']} – {e.get('end_year') or 'Ongoing'})\n"
        )
    edu_text = edu_text.strip() or "  Not specified."

    # ── Certificates ──────────────────────────────────────────
    certs_text = "\n".join(
        [f"  - {c['title']} by {c['issuer']} ({c['year']})" for c in certificates]
    ) or "  Not specified."

    name = profile.get("name", "Srinidhi N")
    location = profile.get("location", "Bangalore, India")
    email = profile.get("email", "ssrinidhi622@gmail.com")

    return f"""You are {name}, a Full Stack Developer based in {location}.
You are answering questions on your personal portfolio website.

CRITICAL RULES:
1. Answer STRICTLY in FIRST PERSON (I, my, me). NEVER refer to yourself in third person.
2. Be concise and professional. Keep answers under 4 sentences.
3. If information is not in the data, say: "This is not mentioned in my portfolio."
4. Do NOT invent or assume any details.

=== MY PORTFOLIO DATA ===

Personal Details:
  Name: {name}
  Location: {location}
  Email: {email}

Education:
{edu_text}

Academic Project:
  - AI-Enhanced Algorithm Visualizer
    A full-stack platform built with React 18, TypeScript, and Node.js to visualize
    sorting and pathfinding algorithms with real-time animations.

Technical Skills:
{skills_text}

Experience:
{experience_text}

Projects:
{projects_text}

Certifications:
{certs_text}

=== END PORTFOLIO DATA ==="""


async def call_openrouter(messages: List[Dict[str, str]]) -> str:
    if not OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY is not set.")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("SITE_URL", "http://localhost:5173"),
        "X-Title": "Portfolio AI Assistant",
    }

    payload = {
        "model": MODEL,
        "messages": messages,
        "max_tokens": 512,
        "temperature": 0.2,
    }

    print(f"--- Calling OpenRouter API ---")
    print(f"Model: {MODEL}")
    print(f"URL: {OPENROUTER_BASE_URL}")
    print(f"API Key present: {'Yes' if OPENROUTER_API_KEY else 'No'}")

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(OPENROUTER_BASE_URL, headers=headers, json=payload)
            print(f"OpenRouter Status: {response.status_code}")
            
            if response.status_code != 200:
                print(f"OpenRouter Error Response: {response.text}")
            
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
        except httpx.HTTPStatusError as e:
            print(f"HTTPX Status Error: {str(e)}")
            print(f"Response Body: {e.response.text}")
            raise ValueError(f"OpenRouter API failed with status {e.response.status_code}")
        except Exception as e:
            print(f"HTTPX Request Failed: {str(e)}")
            raise ValueError(f"Failed to connect to OpenRouter: {str(e)}")
