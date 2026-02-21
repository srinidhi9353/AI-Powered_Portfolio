export interface CertificateItem {
    title: string
    issuer: string
    year: string
    image: string
    category: 'Cloud' | 'Programming' | 'Analytics' | 'Automation' | 'Computer Science'
}

export const certificates: CertificateItem[] = [
    {
        title: 'AWS Cloud Practitioner Essentials',
        issuer: 'AWS Training',
        year: '2025',
        image: '/certificates/aws.png',
        category: 'Cloud',
    },
    {
        title: 'Java Foundations',
        issuer: 'Oracle Academy',
        year: '2024',
        image: '/certificates/javafundamentles.png',
        category: 'Programming',
    },
    {
        title: 'Data Structures & Algorithms',
        issuer: 'Infosys Springboard',
        year: '2024',
        image: '/certificates/datastructures.png',
        category: 'Programming',
    },
    {
        title: 'Basics of Python',
        issuer: 'Infosys Springboard',
        year: '2023',
        image: '/certificates/python.png',
        category: 'Programming',
    },
    {
        title: 'Exploring Computers',
        issuer: 'Infosys Springboard',
        year: '2024',
        image: '/certificates/exploringcomputers.png',
        category: 'Computer Science',
    },
    {
        title: 'Automation Starter',
        issuer: 'UiPath',
        year: '2024',
        image: '/certificates/automationstarter.png',
        category: 'Automation',
    },
    {
        title: 'Data Analytics Job Simulation',
        issuer: 'Deloitte',
        year: '2026',
        image: '/certificates/delloite.png',
        category: 'Analytics',
    },
]

export const categoryColors: Record<CertificateItem['category'], string> = {
    Cloud: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    Programming: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    Analytics: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    Automation: 'text-green-400 bg-green-400/10 border-green-400/20',
    'Computer Science': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
}

export const categoryIcons: Record<CertificateItem['category'], string> = {
    Cloud: '☁️',
    Programming: '💻',
    Analytics: '📊',
    Automation: '🤖',
    'Computer Science': '🖥️',
}
