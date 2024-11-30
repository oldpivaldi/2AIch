import { create } from 'zustand'
import { Message } from '@/services/chat/chat.interfaces'

interface HistoryStore {
	history: Message[]
	addMessage: (message: Message) => void
	setHistory: (history: Message[]) => void
}

export const useHistoryStore = create<HistoryStore>(set => ({
	history: [],
	addMessage: message =>
		set(state => ({
			history: [...state.history, message],
		})),
	setHistory: history => set({ history }),
}))
