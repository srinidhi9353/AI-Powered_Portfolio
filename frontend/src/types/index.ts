export interface Profile {
    id: number
    name: string
    title: string
    summary: string
    email: string
    phone?: string
    location?: string
    github?: string
    linkedin?: string
    website?: string
    avatar_url?: string
}

export interface Skill {
    id: number
    name: string
    level: number
    category: string
    icon?: string
}

export interface Experience {
    id: number
    company: string
    role: string
    start_date: string
    end_date?: string
    location?: string
    description?: string
    bullets?: string[]
    is_current: boolean
}

export interface Project {
    id: number
    name: string
    description: string
    tech_stack?: string[]
    github_url?: string
    live_url?: string
    image_url?: string
    featured: boolean
    order: number
}

export interface Education {
    id: number
    institution: string
    degree: string
    field: string
    start_year: string
    end_year?: string
    gpa?: number
    description?: string
}

export interface Certificate {
    id: number
    title: string
    issuer: string
    year: string
    image_url?: string
    description?: string
    credential_url?: string
}

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}
