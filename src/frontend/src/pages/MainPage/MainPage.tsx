import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/utils/useChatIdStore'
import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MainFooter from './MainFooter'

const MainPage = () => {
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

	return (
		<div className='h-screen flex flex-col'>
			<MainHeader />
			<MainContent />
			<MainFooter />
		</div>
	)
}

export default MainPage
