import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="text-xl font-bold gradient-text select-none">
                    Srinidhi.dev
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
                    >
                        Hire Me
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`h-0.5 w-6 bg-slate-300 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`h-0.5 w-6 bg-slate-300 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-0.5 w-6 bg-slate-300 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden px-6 pb-4 bg-slate-900/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="flex flex-col gap-4 pt-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMenuOpen(false)}
                                className="mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-center"
                            >
                                Hire Me
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
