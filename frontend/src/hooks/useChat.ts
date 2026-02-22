import { useState, useCallback } from 'react'
import api from '../lib/api'
import type { ChatMessage } from '../types'

const makeId = () => Math.random().toString(36).slice(2)

const WELCOME: ChatMessage = {
    id: makeId(),
    role: 'assistant',
    content: "Hi! 👋 I'm Srinidhi N. Ask me anything about my skills, projects, education, or experience.",
    timestamp: new Date(),
}

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendMessage = useCallback(async (text: string) => {
        console.log("SEND MESSAGE CALLED", { text, isLoading })
        if (!text.trim() || isLoading) {
            console.log("sendMessage early return")
            return
        }

        const userMessage: ChatMessage = {
            id: makeId(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setIsLoading(true)
        setError(null)

        try {
            console.log("Initiating API request to /api/chat", {
                baseURL: api.defaults.baseURL,
                VITE_API_URL: import.meta.env.VITE_API_URL,
                payload: { message: text.trim() }
            })
            const response = await api.post<{ reply: string }>('/api/chat', {
                message: text.trim(),
            })
            console.log("API response received:", response.data)
            const assistantMessage: ChatMessage = {
                id: makeId(),
                role: 'assistant',
                content: response.data.reply,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, assistantMessage])
        } catch (err: any) {
            console.error("API Error caught in useChat:", err)
            console.log("Error details - message:", err.message, "config:", err.config)
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }, [isLoading])


    const clearMessages = useCallback(() => {
        setMessages([{ ...WELCOME, id: makeId(), timestamp: new Date() }])
        setError(null)
    }, [])

    return { messages, isLoading, error, sendMessage, clearMessages }
}
