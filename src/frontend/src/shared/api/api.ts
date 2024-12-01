import axios from 'axios'
import { toast } from 'sonner'

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_HTTP_URL,
})

apiClient.interceptors.response.use(
	config => config,
	async error => {
		toast.error(error?.message ?? 'Oops Something Went Wrong')

		throw error
	}
)
