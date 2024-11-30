import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const CHAT_ID = 'chatId'

interface ChatIdStore {
	chatId: string
	setChatId: (chatId: string) => void
}

export const useChatIdStore = create<ChatIdStore>()(
	persist(
		set => ({
			chatId: '',
			setChatId: (chatId: string) => set({ chatId }),
		}),
		{
			name: CHAT_ID,
		}
	)
)
