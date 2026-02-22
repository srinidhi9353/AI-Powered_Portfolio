import { motion } from 'framer-motion'

const floatAnim = {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
}

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={floatAnim}
                    className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"
                />
                <motion.div
                    animate={floatAnim}
                    style={{ animationDelay: '3s' }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"
                />
                <motion.div
                    animate={floatAnim}
                    style={{ animationDelay: '1.5s' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/8 blur-3xl"
                />
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Open to Opportunities · Bangalore, India
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tight"
                >
                    <span className="text-white">Hi, I'm </span>
                    <span className="gradient-text">Srinidhi N</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="mb-6"
                >
                    <span className="text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Full Stack Developer
                    </span>
                    <span className="text-slate-500 text-lg sm:text-xl font-medium ml-3 hidden sm:inline">
                        | React &amp; Node.js Engineer
                    </span>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed"
                >
                    Building scalable web applications with modern frontend systems
                    and robust backend architecture.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.65 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
                >
                    <a
                        href="#projects"
                        className="px-7 py-3.5 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 duration-200"
                    >
                        View Projects
                    </a>
                    <a
                        href="https://drive.google.com/uc?export=download&id=1vhjmUQdpcJ0KQX7opf9bnDth_mkU2EXM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3.5 rounded-2xl font-semibold glass-card text-slate-200 hover:text-white hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        📄 Download Resume
                    </a>
                    <a
                        href="https://github.com/srinidhi9353"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3.5 rounded-2xl font-semibold glass-card text-slate-200 hover:text-white hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {[
                        { value: '4', label: 'Certificates' },
                        { value: '3+', label: 'Projects Built' },
                        { value: '1', label: 'Internships' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl font-black gradient-text">{stat.value}</div>
                            <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex flex-col items-center gap-2 text-slate-600"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent"
                    />
                </motion.div>

            </div>
        </section>
    )
}
