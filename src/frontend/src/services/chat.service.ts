import { apiClient } from '@/api/api'

class ChatService {
	private readonly BASE_URL = '/chat'

	async create() {
		const response = await apiClient.post(this.BASE_URL)

		return response.data
	}

	async getHistory() {}

	async sendMessage() {}
}

export const chatService = new ChatService()
