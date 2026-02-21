import { motion } from 'framer-motion'

const contactLinks = [
    {
        icon: '📧',
        label: 'Email',
        value: 'ssrinidhi622@gmail.com',
        href: 'mailto:ssrinidhi622@gmail.com',
        color: 'hover:border-cyan-500/50 hover:text-cyan-400',
    },
    {
        icon: '💼',
        label: 'LinkedIn',
        value: 'srinidhi-n-a185652a3',
        href: 'https://linkedin.com/in/srinidhi-n-a185652a3',
        color: 'hover:border-blue-500/50 hover:text-blue-400',
    },
    {
        icon: '🐙',
        label: 'GitHub',
        value: 'srinidhi9353',
        href: 'https://github.com/srinidhi9353',
        color: 'hover:border-purple-500/50 hover:text-purple-400',
    },
    {
        icon: '📱',
        label: 'Phone',
        value: '+91 93531 70957',
        href: 'tel:+919353170957',
        color: 'hover:border-green-500/50 hover:text-green-400',
    },
]

// WhatsApp SVG icon
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.52 3.48A11.87 11.87 0 0012.06 0C5.4 0 .02 5.38 0 12.04a12.06 12.06 0 001.64 6.04L0 24l6.1-1.6a12.06 12.06 0 005.96 1.52h.01c6.66 0 12.04-5.38 12.04-12.04 0-3.21-1.25-6.22-3.59-8.4zm-8.46 18.52h-.01a9.99 9.99 0 01-5.1-1.4l-.36-.22-3.76.98 1-3.67-.24-.38a9.95 9.95 0 01-1.53-5.27C2.08 6.55 6.62 2 12.06 2a9.93 9.93 0 017.03 2.91 9.93 9.93 0 012.91 7.04c-.02 5.44-4.56 9.97-9.94 9.97zm5.46-7.45c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52-.18-.01-.37-.01-.57-.01s-.52.07-.79.37c-.28.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
)

export default function Contact() {
    return (
        <section id="contact" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Get In Touch</span>
                    <h2 className="mt-3 text-4xl font-black text-white">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-lg mx-auto">
                        Open to full-time roles, internships, and freelance projects. I'd love to hear from you.
                    </p>
                </motion.div>

                {/* 4 Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {contactLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`glass-card p-6 block transition-all duration-200 ${link.color}`}
                        >
                            <div className="text-3xl mb-3">{link.icon}</div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{link.label}</p>
                            <p className="text-slate-200 text-sm font-medium break-words">{link.value}</p>
                        </motion.a>
                    ))}
                </div>

                {/* Primary CTA + WhatsApp row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="mailto:ssrinidhi622@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition-all shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 duration-200"
                    >
                        <span>📧</span> Send Me an Email
                    </a>

                    <a
                        href="https://wa.me/919353170957?text=Hi%20Srinidhi%2C%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20connect."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base bg-green-600 hover:bg-green-500 transition-all shadow-2xl shadow-green-600/20 hover:shadow-green-500/40 hover:-translate-y-1 duration-200"
                    >
                        <WhatsAppIcon />
                        Chat on WhatsApp
                    </a>
                </motion.div>

                <p className="text-center text-slate-600 text-sm mt-5">
                    📍 Bangalore, India · Available for remote roles globally
                </p>
            </div>
        </section>
    )
}
