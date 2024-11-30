import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/utils/useChatIdStore'
import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MainFooter from './MainFooter'

const MainPage = () => {
	const { chatId, setChatId } = useChatIdStore()

	const { data, isSuccess } = useQuery({
		queryKey: ['createChat'],
		queryFn: () => chatService.create(),
		enabled: !chatId,
	})

	useEffect(() => {
		if (isSuccess) {
			setChatId(data.chat_id)
		}
	}, [data?.chat_id, isSuccess, setChatId])

	return (
		<div className='h-screen flex flex-col'>
			<MainHeader />
			<MainContent />
			<MainFooter />
		</div>
	)
}

export default MainPage
