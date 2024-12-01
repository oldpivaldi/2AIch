import { Message } from '../model'

export const sortHistory = (history: Message[]) => {
	const historyCopy = [...history]

	return historyCopy.sort(
		(a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
	)
}
