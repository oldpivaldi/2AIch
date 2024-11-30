import { useState } from 'react'
import { Send } from 'lucide-react'
import {
	useIsFetching,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { chatService } from '@/services/chat/chat.service'
import { useChatIdStore } from '@/utils/useChatIdStore'
import { Button, Textarea, Loader } from '@/components'

const MainFooter = () => {
	const [text, setText] = useState('')

	const chatId = useChatIdStore(state => state.chatId)

	const queryClient = useQueryClient()

	const { mutate: sendMessage, isPending } = useMutation({
		mutationKey: ['sendMessage'],
		mutationFn: (message: string) =>
			chatService.sendMessage(chatId, { message }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getHistory'],
			})
		},
	})

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
	}

	const sendText = () => {
		sendMessage(text)
		setText('')
	}

	const isFetchingGetHistory = useIsFetching({
		queryKey: ['getHistory'],
	})

	const isDisableButton =
		!chatId || !text || isPending || !!isFetchingGetHistory

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
					{isPending ? <Loader /> : <Send />}
				</Button>
			</div>
		</footer>
	)
}

export default MainFooter
