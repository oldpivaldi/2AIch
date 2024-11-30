import Message from '@/components/Message'
import { Skeleton } from '@/components/ui/skeleton'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/services/chatId/useChatIdStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

const MainContent = () => {
	const chatId = useChatIdStore(state => state.chatId)

	const { data, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: ['getHistory'],
		queryFn: () => {
			if (chatId) {
				return chatService.getHistory(chatId)
			}
		},
		enabled: !!chatId,
	})

	useEffect(() => {
		if (isError) {
			toast.error(error.message)
		}
	}, [error?.message, isError])

	return (
		<main className='max-h-chat flex-grow flex flex-col gap-5 items-center overflow-y-auto pt-4 pb-9'>
			{isLoading && (
				<div className=' flex flex-col gap-5 w-2/5'>
					<Skeleton className='h-28' />
					<Skeleton className='h-28' />
					<Skeleton className='h-28' />
				</div>
			)}
			{isError && <p className='text-3xl'>Упс, что-то пошло не так</p>}
			{isSuccess &&
				data?.history.map((message, id) => (
					<Message
						key={id}
						author={message.sender}
						description={message.message}
					/>
				))}
		</main>
	)
}

export default MainContent
