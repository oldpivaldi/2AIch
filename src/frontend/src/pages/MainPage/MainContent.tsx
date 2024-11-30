import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/utils/useChatIdStore'
import { Message, Skeleton } from '@/components'

const MainContent = () => {
	const chatId = useChatIdStore(state => state.chatId)

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['getHistory'],
		queryFn: () => chatService.getHistory(chatId),
		enabled: !!chatId,
	})

	return (
		<main className='max-h-chat flex-grow flex flex-col gap-5 items-center overflow-y-auto pt-4 pb-9'>
			{isLoading && (
				<div className=' flex flex-col gap-5 w-2/5'>
					<Skeleton className='h-28' />
					<Skeleton className='h-28' />
					<Skeleton className='h-28' />
				</div>
			)}
			{isError && <p className='text-3xl'>Oops Something Went Wrong</p>}
			{isSuccess &&
				data &&
				data.history.map((message, id) => (
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
