import { motion } from 'framer-motion'

const experiences = [
    {
        company: 'SuprMentr Technologies Pvt Ltd',
        role: 'Full Stack Development Intern (MERN)',
        period: 'January 2026 – Present',
        location: 'Remote',
        isCurrent: true,
        bullets: [
            'Building full-stack features using the MERN stack (MongoDB, Express, React, Node.js).',
            'Collaborating on production codebase with a remote engineering team.',
            'Building RESTful APIs and integrating them with React frontends.',
            'Participating in code reviews and following best practices for maintainable code.',
        ],
    },
    {
        company: 'CodSoft',
        role: 'Web Developer Intern',
        period: 'October 2024 – November 2024',
        location: 'Remote',
        isCurrent: false,
        bullets: [
            'Built and deployed web projects using HTML, CSS, JavaScript, and React.',
            'Developed UI components following modern design principles.',
            'Delivered assigned tasks on schedule within a structured remote internship program.',
        ],
    },
]

export default function Experience() {
    return (
        <section id="experience" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Work History</span>
                    <h2 className="mt-3 text-4xl font-black text-white">
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />

                    <div className="flex flex-col gap-12">
                        {experiences.map((exp, i) => {
                            const isLeft = i % 2 === 0
                            return (
                                <motion.div
                                    key={exp.company}
                                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`relative flex items-start gap-6 md:gap-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-row pl-16 md:pl-0`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 z-10">
                                        <div className={`w-4 h-4 rounded-full border-2 ${exp.isCurrent
                                                ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50'
                                                : 'bg-slate-700 border-slate-500'
                                            }`}>
                                            {exp.isCurrent && (
                                                <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Spacer for md layout */}
                                    <div className="hidden md:block flex-1" />

                                    {/* Card */}
                                    <div className="flex-1 max-w-lg">
                                        <div className="glass-card p-6">
                                            <div className="flex items-start justify-between gap-3 flex-wrap">
                                                <div>
                                                    <h3 className="text-white font-bold text-base">{exp.role}</h3>
                                                    <p className="text-cyan-400 font-semibold text-sm mt-0.5">{exp.company}</p>
                                                </div>
                                                {exp.isCurrent && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 flex-shrink-0">
                                                        Current
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex gap-3 mt-2 text-xs text-slate-500 flex-wrap">
                                                <span>📅 {exp.period}</span>
                                                <span>📍 {exp.location}</span>
                                            </div>

                                            <ul className="mt-4 space-y-2">
                                                {exp.bullets.map((b, bi) => (
                                                    <li key={bi} className="flex gap-2 text-slate-400 text-sm">
                                                        <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
