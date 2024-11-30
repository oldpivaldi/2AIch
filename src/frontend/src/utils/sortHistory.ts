import { Message } from '@/services/chat/chat.interfaces'

export const sortHistory = (history: Message[]) => {
	const historyCopy = [...history]

	return historyCopy.sort(
		(a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
	)
}
