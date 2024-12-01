import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { useIsFetching, useMutation } from '@tanstack/react-query'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'
import { Button, Textarea, Loader } from '@/shared/ui'
import {
	chatService,
	SocketMessage,
	StatusMessage,
	useChatIdStore,
	useHistoryStore,
	useSocketStatusStore,
} from '@/entities/chat'

const MainFooter = () => {
	const [text, setText] = useState('')
	const [socketUrl, setSocketUrl] = useState<string | null>(null)

	const addMessage = useHistoryStore(state => state.addMessage)
	const { isGenerating, setIsGenerating } = useSocketStatusStore()
	const chatId = useChatIdStore(state => state.chatId)

	const { mutate: sendMessage, isPending } = useMutation({
		mutationKey: ['sendMessage'],
		mutationFn: (message: string) =>
			chatService.sendMessage(chatId, { message }),
	})

	const { lastJsonMessage, getWebSocket } = useWebSocket<string | null>(
		socketUrl
	)

	useEffect(() => {
		if (chatId) {
			setSocketUrl(`${import.meta.env.VITE_BASE_WS_URL}/${chatId}/ws`)
		}
	}, [chatId])

	useEffect(() => {
		const socket = getWebSocket()

		if (socket) {
			socket.onerror = () => {
				toast.error('socket error')
			}
		}

		if (lastJsonMessage) {
			const socketMessage: SocketMessage = JSON.parse(lastJsonMessage)

			if (socketMessage.status === StatusMessage.GENERATING) {
				setIsGenerating(true)
			}

			if (socketMessage.status === StatusMessage.GENERATED) {
				addMessage({
					sender: 'bot',
					message: socketMessage.message,
					timestamp: socketMessage.timestamp,
				})

				setIsGenerating(false)
			}

			if (socketMessage.status === StatusMessage.ERROR) {
				socket?.close()

				setIsGenerating(false)

				addMessage({
					sender: 'bot',
					message: socketMessage.message,
					timestamp: socketMessage.timestamp,
				})

				toast.error(socketMessage.message)
			}
		}
	}, [lastJsonMessage, addMessage, setIsGenerating, getWebSocket])

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
					autoFocus
					onKeyDown={e => {
						if (e.ctrlKey && e.key === 'Enter' && !isDisableButton) {
							sendText()
						}
					}}
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
