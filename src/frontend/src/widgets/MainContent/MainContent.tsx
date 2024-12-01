import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader, Skeleton } from '@/shared/ui'
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

	return (
		<main className='max-h-chat flex-grow flex flex-col gap-5 items-center overflow-y-auto pt-4 pb-9'>
			{isLoadingGetHistory && (
				<div className='my-auto'>
					<Loader />
				</div>
			)}
			{!history.length && !isLoadingGetHistory && (
				<p className='text-4xl font-semibold my-auto'>What can I do to help?</p>
			)}
			{history.map((message, id) => (
				<Message
					key={id}
					author={message.sender}
					description={message.message}
				/>
			))}
			{isGenerating && <Skeleton className='h-28 w-2/5' />}
		</main>
	)
}

export default MainContent
