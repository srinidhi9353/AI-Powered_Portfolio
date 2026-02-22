import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import ChatDrawer from './ChatDrawer'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        console.log("Closing Chat Drawer")
        setIsOpen(false)
    }

    const handleOpen = () => {
        console.log("Opening Chat Drawer")
        setIsOpen(true)
    }


    return (
        <>
            {/* Background blur overlay when chat is open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
                    />
                )}
            </AnimatePresence>

            {/* Chat Drawer component */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <ChatDrawer key="drawer" onClose={handleClose} />
                )}
            </AnimatePresence>

            {/* Floating action button — PhonePe center-aligned style */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        key="fab-container"
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    >
                        <motion.button
                            onClick={handleOpen}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="pointer-events-auto relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-2xl flex items-center justify-center transition-shadow duration-300 group"
                            title="Ask AI about Srinidhi"
                            aria-label="Open AI chat assistant"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-300" />

                            {/* Animated pulsar ring */}
                            <div className="absolute inset-0 rounded-full blur-xl opacity-40 bg-cyan-400 group-hover:opacity-70 group-hover:blur-2xl transition-all duration-300 animate-pulse" />

                            {/* Inner icon */}
                            <Sparkles className="w-7 h-7 text-white z-10" />

                            {/* Outer pulse ring */}
                            <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
