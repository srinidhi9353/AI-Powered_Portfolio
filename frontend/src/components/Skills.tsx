import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories, skillLevels } from '../data/skills'

const categoryGradients: Record<string, string> = {
    Languages: 'from-cyan-500 to-blue-500',
    Frontend: 'from-purple-500 to-pink-500',
    Backend: 'from-green-500 to-emerald-500',
    Database: 'from-orange-500 to-yellow-500',
}

export default function Skills() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="skills" className="py-24">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Technical Proficiency</span>
                    <h2 className="mt-3 text-4xl font-black text-white">
                        Skills &amp; <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                        Proficient across the full stack — from interactive UIs to robust backend systems and cloud infrastructure.
                    </p>
                </motion.div>

                {/* Category Pills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="glass-card p-5"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">{cat.icon}</span>
                                <h3 className={`font-bold text-sm bg-gradient-to-r ${cat.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                                    {cat.label}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Proficiency Bars */}
                <div ref={ref}>
                    <h3 className="text-center text-slate-400 text-sm uppercase tracking-widest mb-8">Proficiency Levels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                        {skillLevels.map((skill, i) => (
                            <div key={skill.name}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-300 font-medium">{skill.name}</span>
                                    <span className="text-slate-500 text-xs">{skill.level}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full bg-gradient-to-r ${categoryGradients[skill.category] ?? 'from-cyan-500 to-purple-500'
                                            }`}
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                        transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
