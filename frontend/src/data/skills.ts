export interface SkillCategory {
    label: string
    icon: string
    color: string
    skills: string[]
}

export const skillCategories: SkillCategory[] = [
    {
        label: 'Languages',
        icon: '🔤',
        color: 'from-cyan-500 to-blue-500',
        skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    },
    {
        label: 'Frontend',
        icon: '🎨',
        color: 'from-purple-500 to-pink-500',
        skills: ['React 18', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
        label: 'Backend',
        icon: '⚙️',
        color: 'from-green-500 to-emerald-500',
        skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
    },
    {
        label: 'Databases',
        icon: '🗄️',
        color: 'from-orange-500 to-yellow-500',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
        label: 'Cloud & Tools',
        icon: '☁️',
        color: 'from-sky-500 to-cyan-500',
        skills: ['AWS (Cloud Practitioner)', 'Git', 'GitHub', 'VS Code'],
    },
    {
        label: 'Concepts',
        icon: '💡',
        color: 'from-violet-500 to-purple-500',
        skills: [
            'Data Structures & Algorithms',
            'OOP',
            'SDLC',
            'API Integration',
            'Prompt Engineering',
            'Context Optimization',
        ],
    },
]

// Flat skill list with levels for the animated progress bars (Skills section)
export const skillLevels: { name: string; level: number; category: string }[] = [
    // Languages
    { name: 'JavaScript', level: 90, category: 'Languages' },
    { name: 'TypeScript', level: 78, category: 'Languages' },
    { name: 'Python', level: 74, category: 'Languages' },
    { name: 'Java', level: 70, category: 'Languages' },
    // Frontend
    { name: 'React 18', level: 88, category: 'Frontend' },
    { name: 'HTML5 & CSS3', level: 92, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 84, category: 'Frontend' },
    // Backend
    { name: 'Node.js', level: 82, category: 'Backend' },
    { name: 'Express.js', level: 78, category: 'Backend' },
    { name: 'FastAPI', level: 70, category: 'Backend' },
    // Database
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'PostgreSQL', level: 70, category: 'Database' },
    { name: 'MySQL', level: 68, category: 'Database' },
]
