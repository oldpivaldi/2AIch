import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MainFooter from './MainFooter'
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { toast } from 'sonner'
import { useChatIdStore } from '@/services/chatId/useChatIdStore'
import { useEffect } from 'react'

const MainPage = () => {
	const { chatId, setChatId } = useChatIdStore()

	const { data, isSuccess, isError, error } = useQuery({
		queryKey: ['createChat'],
		queryFn: () => chatService.create(),
		enabled: !chatId,
	})

	useEffect(() => {
		if (isSuccess) {
			setChatId(data.chat_id)
		}

		if (isError) {
			toast.error(error.message)
		}
	}, [data?.chat_id, error?.message, isError, isSuccess, setChatId])

	return (
		<div className='h-screen flex flex-col'>
			<MainHeader />
			<MainContent />
			<MainFooter />
		</div>
	)
}

export default MainPage
