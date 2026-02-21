import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certificates, categoryColors, categoryIcons, type CertificateItem } from '../data/certificates'

type Category = CertificateItem['category'] | 'All'

const allCategories: Category[] = [
    'All', 'Cloud', 'Programming', 'Analytics', 'Automation', 'Computer Science',
]

export default function Certificates() {
    const [selected, setSelected] = useState<CertificateItem | null>(null)
    const [activeCategory, setActiveCategory] = useState<Category>('All')

    const filtered = activeCategory === 'All'
        ? certificates
        : certificates.filter((c) => c.category === activeCategory)

    return (
        <section id="certificates" className="py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Credentials</span>
                    <h2 className="mt-3 text-4xl font-black text-white">
                        Certificates &amp; <span className="gradient-text">Achievements</span>
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-lg mx-auto">
                        Professional certifications validating my skills across cloud, programming, analytics, and automation.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent shadow-lg shadow-cyan-500/20'
                                    : 'glass-card text-slate-400 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((cert, i) => (
                            <motion.div
                                key={cert.title}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: i * 0.06 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="glass-card p-5 flex flex-col gap-3"
                            >
                                {/* Icon + category badge */}
                                <div className="flex items-start justify-between">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                                        {categoryIcons[cert.category]}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColors[cert.category]}`}>
                                        {cert.category}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-sm leading-snug">{cert.title}</h3>
                                    <p className="text-slate-400 text-xs mt-1">{cert.issuer}</p>
                                    <p className="text-slate-600 text-xs mt-0.5">{cert.year}</p>
                                </div>

                                <button
                                    onClick={() => setSelected(cert)}
                                    className="mt-auto w-full py-2 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
                                >
                                    View Certificate →
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-slate-600 text-sm mt-8"
                >
                    {certificates.length} certifications earned across {allCategories.length - 1} domains
                </motion.p>
            </div>

            {/* Modal Viewer */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', duration: 0.45 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden"
                        >
                            {/* Modal header */}
                            <div className="flex items-start justify-between p-6 pb-4">
                                <div>
                                    <div className={`text-xs font-bold uppercase tracking-wider w-fit px-2.5 py-1 rounded-full border mb-2 ${categoryColors[selected.category]}`}>
                                        {selected.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-white leading-tight">{selected.title}</h3>
                                    <p className="text-slate-400 text-sm mt-1">{selected.issuer} · {selected.year}</p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="ml-4 flex-shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors text-sm"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Certificate image */}
                            <div className="mx-6 mb-6 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center min-h-56">
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    className="w-full object-contain max-h-[60vh]"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement
                                        img.style.display = 'none'
                                        const fb = img.nextElementSibling as HTMLElement
                                        if (fb) fb.style.display = 'flex'
                                    }}
                                />
                                {/* Fallback when image not yet placed */}
                                <div className="hidden flex-col items-center justify-center py-16 px-8 text-center">
                                    <div className="text-5xl mb-4">{categoryIcons[selected.category]}</div>
                                    <p className="text-slate-300 font-semibold mb-1">{selected.title}</p>
                                    <p className="text-slate-500 text-sm mb-3">{selected.issuer}</p>
                                    <p className="text-slate-600 text-xs">
                                        Place your image at:<br />
                                        <code className="text-cyan-400">frontend/public{selected.image}</code>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
