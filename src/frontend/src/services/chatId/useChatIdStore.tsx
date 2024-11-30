import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const CHAT_ID = 'chatId'

interface ChatIdStore {
	chatId: string | null
	setChatId: (chatId: string | null) => void
}

export const useChatIdStore = create<ChatIdStore>()(
	persist(
		set => ({
			chatId: null,
			setChatId: chatId => set({ chatId }),
		}),
		{
			name: CHAT_ID,
		}
	)
)
