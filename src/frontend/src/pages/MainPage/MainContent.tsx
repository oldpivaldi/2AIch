import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/utils/useChatIdStore'
import { Message, Skeleton } from '@/components'
import { useEffect } from 'react'
import { useHistoryStore } from '@/utils/useHistoryStore'
import { sortHistory } from '@/utils/sortHistory'
import { useSocketStatusStore } from '@/utils/useSocketStatusStore'
import { filterText } from '@/utils/filterText'

const MainContent = () => {
	const { history, setHistory } = useHistoryStore()
	const chatId = useChatIdStore(state => state.chatId)
	const isGenerating = useSocketStatusStore(state => state.isGenerating)

	const {
		data,
		isSuccess: isSuccessGetHistory,
		isPending: isPendingGetHistory,
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

	const isLoading = isGenerating || isPendingGetHistory

	return (
		<main className='max-h-chat flex-grow flex flex-col gap-5 items-center overflow-y-auto pt-4 pb-9'>
			{history.map((message, id) => (
				<Message
					key={id}
					author={message.sender}
					description={filterText(message.message)}
				/>
			))}
			{isLoading && (
				<div className=' flex flex-col gap-5 w-2/5'>
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
