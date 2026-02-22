import { useRef, useEffect, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Send, Sparkles } from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface Props {
    onClose: () => void
}

const SUGGESTIONS = [
    { label: '🎓 Education', text: 'Where did you study?' },
    { label: '🚀 Academic Project', text: 'Tell me about your academic project.' },
    { label: '🛠️ Tech Stack', text: 'What is your tech stack?' },
    { label: '💼 Experience', text: 'Tell me about your internship at CodSoft.' },
]

export default function ChatDrawer({ onClose }: Props) {
    const { messages, isLoading, error, sendMessage, clearMessages } = useChat()
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    // Focus input on open
    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 400)
    }, [])

    // ESC key to close
    useEffect(() => {
        const handleEsc = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    const handleSend = () => {
        console.log("SEND BUTTON CLICKED - inputValue:", inputValue, "isLoading:", isLoading)
        if (!inputValue.trim() || isLoading) {
            console.log("handleSend early return - empty or loading")
            return
        }
        sendMessage(inputValue)
        setInputValue('')
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleSuggestion = (q: string) => {
        console.log("SUGGESTION CLICKED:", q)
        if (isLoading) return
        sendMessage(q)
    }

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col
        sm:left-1/2 sm:-translate-x-1/2 sm:bottom-8
        w-full h-[100dvh] sm:h-[80vh] sm:max-h-[650px] sm:w-[440px]
        bg-slate-900/98 backdrop-blur-2xl border-t sm:border border-white/10 sm:rounded-3xl
        shadow-2xl shadow-black/80 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <div className="text-white font-bold text-base">Srinidhi's Assistant</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online & Ready
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearMessages}
                        className="p-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all group"
                        title="Clear conversation"
                    >
                        <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all group"
                        title="Close chat"
                    >
                        <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    </button>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                                <TypingIndicator />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error UI */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center"
                        >
                            <div className="px-5 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center shadow-lg">
                                {error}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
                <div className="px-5 pb-4 flex flex-wrap gap-2 flex-shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {SUGGESTIONS.map((s) => (
                        <button
                            key={s.label}
                            onClick={() => handleSuggestion(s.text)}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all disabled:opacity-40 whitespace-nowrap shadow-sm hover:shadow-cyan-500/10"
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Input area */}
            <div className="px-5 py-5 border-t border-white/10 bg-slate-900/50 pb-[calc(1.25rem+env(safe-area-inset-bottom))] flex-shrink-0">
                <div className="flex gap-3 items-end">
                    <textarea
                        ref={inputRef}
                        rows={1}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        placeholder="Ask Srinidhi a question..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all disabled:opacity-50 max-h-32"
                        style={{ minHeight: '52px' }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !inputValue.trim()}
                        className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="mt-3 text-center text-[10px] text-slate-700 font-medium uppercase tracking-widest">
                    Answers are strictly based on resume data
                </p>
            </div>
        </motion.div>
    )
}
