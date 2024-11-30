import { useState } from 'react'
import { Send } from 'lucide-react'
import { useIsFetching, useMutation } from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/utils/useChatIdStore'
import { Button, Textarea, Loader } from '@/components'
import { useHistoryStore } from '@/utils/useHistoryStore'
import { SocketMessage, StatusMessage } from '@/services/chat/chat.interfaces'
import { toast } from 'sonner'
import { useSocketStatusStore } from '@/utils/useSocketStatusStore'

const MainFooter = () => {
	const [text, setText] = useState('')

	const addMessage = useHistoryStore(state => state.addMessage)
	const { isGenerating, setIsGenerating } = useSocketStatusStore()
	const chatId = useChatIdStore(state => state.chatId)

	const { mutate: sendMessage, isPending } = useMutation({
		mutationKey: ['sendMessage'],
		mutationFn: (message: string) =>
			chatService.sendMessage(chatId, { message }),
		onSuccess: () => {
			const socket = new WebSocket(`wss://domen/chat/${chatId}/ws`)

			setIsGenerating(true)

			socket.onmessage = (event: MessageEvent<SocketMessage>) => {
				if (event.data.message == StatusMessage.GENERATED) {
					addMessage({
						sender: 'llm',
						message: event.data.message,
						timestamp: event.data.timestamp,
					})

					socket.close(1000)
				}
			}

			socket.onerror = error => {
				toast.error(`[Socket error]: ${error.type}`)

				socket.close(1011, 'Ты пидор')
			}

			setIsGenerating(false)
		},
	})

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
	}

	const sendText = () => {
		sendMessage(text)
		addMessage({
			sender: 'user',
			message: text,
			timestamp: new Date().toISOString(),
		})
		setText('')
	}

	const isFetchingGetHistory = useIsFetching({
		queryKey: ['getHistory'],
	})

	const isDisableButton =
		!chatId || !text || isPending || isGenerating || !!isFetchingGetHistory

	return (
		<footer className='h-16 min-h-16 flex justify-center'>
			<div className='w-2/5 flex gap-2 pt-1'>
				<Textarea
					placeholder='Message'
					className='resize-none min-h-10 h-10 overflow-hidden'
					value={text}
					onChange={handleChangeText}
				/>
				<Button
					variant={'outline'}
					size={'icon'}
					disabled={isDisableButton}
					onClick={sendText}
				>
					{isPending || isGenerating ? <Loader /> : <Send />}
				</Button>
			</div>
		</footer>
	)
}

export default MainFooter
