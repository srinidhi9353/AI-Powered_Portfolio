import { useState, useCallback } from 'react'
import api from '../lib/api'
import type { ChatMessage } from '../types'

const makeId = () => Math.random().toString(36).slice(2)

const WELCOME: ChatMessage = {
    id: makeId(),
    role: 'assistant',
    content: "Hi! 👋 I'm Srinidhi's AI portfolio assistant. Ask me anything about his skills, experience, projects, or certificates!",
    timestamp: new Date(),
}

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading) return

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
            const response = await api.post<{ reply: string }>('/api/chat', {
                message: text.trim(),
            })
            const assistantMessage: ChatMessage = {
                id: makeId(),
                role: 'assistant',
                content: response.data.reply,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, assistantMessage])
        } catch {
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
