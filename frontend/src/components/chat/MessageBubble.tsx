import { motion } from 'framer-motion'
import type { ChatMessage } from '../../types'

interface Props {
    message: ChatMessage
}

export default function MessageBubble({ message }: Props) {
    const isUser = message.role === 'user'

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            {/* Avatar — assistant only */}
            {!isUser && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold mr-2 mt-1 shadow-lg">
                    AI
                </div>
            )}

            <div
                className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser
                        ? 'bg-gradient-to-br from-cyan-600 to-purple-700 text-white rounded-tr-sm shadow-lg shadow-cyan-500/20'
                        : 'bg-white/8 text-slate-200 border border-white/10 rounded-tl-sm'
                    }`}
            >
                {message.content}
            </div>
        </motion.div>
    )
}
