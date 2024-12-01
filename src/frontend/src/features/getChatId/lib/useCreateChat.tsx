import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { chatService, useChatIdStore } from '@/entities/chat'

export const useCreateChat = () => {
	const { chatId, setChatId } = useChatIdStore()

	const { data: chatInfo, isSuccess: isSuccessCreateChat } = useQuery({
		queryKey: ['createChat'],
		queryFn: () => chatService.create(),
		enabled: !chatId,
	})

	useEffect(() => {
		if (isSuccessCreateChat) {
			setChatId(chatInfo.chat_id)
		}
	}, [chatInfo?.chat_id, isSuccessCreateChat, setChatId])
}
