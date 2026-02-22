import { motion } from 'framer-motion'

const highlights = [
    { icon: '⚛️', label: 'React Specialist', desc: 'Building interactive, high-performance UIs with modern React 18 patterns' },
    { icon: '🔌', label: 'API Integration', desc: 'Seamless REST APIs, streaming data, and secure backend connections' },
    { icon: '🏗️', label: 'Clean Architecture', desc: 'Organized, maintainable, production-ready full-stack codebases' },
    { icon: '☁️', label: 'Cloud & Certified', desc: 'AWS Cloud Practitioner certified with hands-on cloud exposure' },
]

export default function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">About Me</span>
                        <h2 className="mt-3 text-4xl font-black text-white leading-tight">
                            Building software that <span className="gradient-text">matters</span>
                        </h2>

                        <p className="mt-6 text-slate-300 leading-relaxed text-lg">
                            I am a Full Stack Developer with hands-on experience building scalable and interactive
                            web applications using React, Node.js, and modern database systems. I specialize in
                            designing clean frontend architectures, integrating secure backend APIs, and developing
                            end-to-end full-stack solutions.
                        </p>
                        <p className="mt-4 text-slate-400 leading-relaxed">
                            With strong fundamentals in Data Structures and Algorithms and certifications in AWS,
                            Java, and Python, I focus on writing maintainable, optimized, and production-ready code.
                            Currently interning at <span className="text-cyan-400 font-medium">SuprMentr Technologies</span> as
                            a Full Stack MERN developer.
                        </p>

                        {/* Details */}
                        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            {[
                                { icon: '📍', label: 'Location', value: 'Bangalore, India' },
                                { icon: '📧', label: 'Email', value: 'ssrinidhi622@gmail.com', href: 'mailto:ssrinidhi622@gmail.com' },
                                { icon: '📱', label: 'Phone', value: '+91 93531 70957', href: 'tel:+919353170957' },
                                { icon: '🎓', label: 'Degree', value: 'B.E. Computer Science (2022–2026)' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2.5 text-slate-400">
                                    <span className="text-base">{item.icon}</span>
                                    <span>
                                        <span className="text-slate-500 text-xs uppercase tracking-wider mr-1">{item.label}:</span>
                                        {item.href ? (
                                            <a href={item.href} className="text-slate-300 hover:text-cyan-400 transition-colors">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-slate-300">{item.value}</span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex gap-3 flex-wrap">
                            <a
                                href="https://github.com/srinidhi9353"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-xl glass-card text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/srinidhi-n-a185652a3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-xl glass-card text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                            <a
                                href="https://drive.google.com/uc?export=download&id=1vhjmUQdpcJ0KQX7opf9bnDth_mkU2EXM"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                            >
                                📄 Download Resume
                            </a>
                        </div>
                    </motion.div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {highlights.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="glass-card p-6"
                            >
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-white font-bold text-sm">{item.label}</h3>
                                <p className="mt-1 text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
