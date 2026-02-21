import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
    {
        name: 'AI-Enhanced Algorithm Visualizer',
        description: 'Full-stack platform to visualize sorting and pathfinding algorithms with real-time animations. Designed interactive UI synchronized with backend logic.',
        tech: ['React 18', 'TypeScript', 'Node.js'],
        github: 'https://github.com/srinidhi9353/algorithm-visualizer',
        live: null,
        featured: true,
    },
    {
        name: 'Wispr Flow Clone',
        description: 'Real-time voice-to-text web app using Deepgram Speech API. Managed streaming data with low-latency UI updates and full API integration.',
        tech: ['React', 'JavaScript', 'Deepgram API'],
        github: 'https://github.com/srinidhi9353/wispr-flow-clone',
        live: null,
        featured: true,
    },
    {
        name: 'Movie Ticketing App',
        description: 'End-to-end ticket booking interface with dynamic seat selection. Built interactive component logic for a seamless booking experience.',
        tech: ['React', 'JavaScript'],
        github: 'https://github.com/srinidhi9353/movie-ticketing',
        live: null,
        featured: true,
    },
    {
        name: 'Purchase Path Analyzer',
        description: 'Analytics dashboard tracking user navigation and conversion funnels. Processes interaction data to identify drop-offs in real time.',
        tech: ['React', 'JavaScript'],
        github: 'https://github.com/srinidhi9353/purchase-path-analyzer',
        live: null,
        featured: false,
    },
    {
        name: 'Complete the Word',
        description: 'Browser-based interactive word game with smooth UX, responsive layout, and optimized state handling for a snappy experience.',
        tech: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/srinidhi9353/complete-the-word',
        live: null,
        featured: false,
    },
]

const INITIAL_SHOW = 3

export default function Projects() {
    const [showAll, setShowAll] = useState(false)
    const visible = showAll ? projects : projects.slice(0, INITIAL_SHOW)

    return (
        <section id="projects" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">My Work</span>
                    <h2 className="mt-3 text-4xl font-black text-white">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                        A selection of projects from my GitHub — each focused on real-world usability and clean architecture.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {visible.map((project, i) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="glass-card p-6 flex flex-col gap-4 relative group"
                            >
                                {project.featured && (
                                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                                        Featured
                                    </span>
                                )}
                                <div>
                                    <h3 className="text-white font-bold text-base leading-snug pr-16">{project.name}</h3>
                                    <p className="mt-2 text-slate-400 text-sm leading-relaxed">{project.description}</p>
                                </div>

                                {/* Tech chips */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-2">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors font-medium"
                                        >
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                                        >
                                            ↗ Live Demo
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show more / View GitHub */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {projects.length > INITIAL_SHOW && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 rounded-2xl glass-card text-sm font-semibold text-slate-300 hover:text-white transition-all"
                        >
                            {showAll ? 'Show Less' : `Show ${projects.length - INITIAL_SHOW} More`}
                        </button>
                    )}
                    <a
                        href="https://github.com/srinidhi9353"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-opacity shadow-lg"
                    >
                        View Full GitHub →
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
