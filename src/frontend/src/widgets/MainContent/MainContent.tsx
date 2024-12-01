import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/shared/ui'
import {
	sortHistory,
	useChatIdStore,
	useHistoryStore,
	useSocketStatusStore,
	Message,
	chatService,
} from '@/entities/chat'

const MainContent = () => {
	const { history, setHistory } = useHistoryStore()
	const chatId = useChatIdStore(state => state.chatId)
	const isGenerating = useSocketStatusStore(state => state.isGenerating)

	const {
		data,
		isSuccess: isSuccessGetHistory,
		isLoading: isLoadingGetHistory,
		isError: isErrorGetHistory,
	} = useQuery({
		queryKey: ['getHistory'],
		queryFn: () => chatService.getHistory(chatId),
		enabled: !!chatId,
	})

	useEffect(() => {
		if (isSuccessGetHistory && data) {
			const sortedHistory = sortHistory(data.history)

			setHistory(sortedHistory)
		}
	}, [data, isSuccessGetHistory, setHistory])

	const isLoading = isGenerating || isLoadingGetHistory

	return (
		<main className='max-h-chat flex-grow flex flex-col gap-5 items-center overflow-y-auto pt-4 pb-9'>
			{history.map((message, id) => (
				<Message
					key={id}
					author={message.sender}
					description={message.message}
				/>
			))}
			{isLoading && (
				<div className='flex flex-col gap-5 w-2/5'>
					<Skeleton className='h-28' />
				</div>
			)}
			{isErrorGetHistory && (
				<p className='text-3xl'>Oops Something Went Wrong</p>
			)}
		</main>
	)
}

export default MainContent
