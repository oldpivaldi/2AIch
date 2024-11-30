import { apiClient } from '@/api/api'
import { CreateRes, GetHistoryRes, SendMessageReq } from './chat.interfaces'

class ChatService {
	private readonly BASE_URL = '/chat'

	async create() {
		const response = await apiClient.post<CreateRes>(this.BASE_URL)

		return response.data
	}

	async getHistory(chatId: string) {
		const response = await apiClient.get<GetHistoryRes>(
			`${this.BASE_URL}/${chatId}/history`
		)

		return response.data
	}

	async sendMessage(chatId: string, message: SendMessageReq) {
		await apiClient.post(`${this.BASE_URL}/${chatId}/send_message`, message)
	}
}

export const chatService = new ChatService()
