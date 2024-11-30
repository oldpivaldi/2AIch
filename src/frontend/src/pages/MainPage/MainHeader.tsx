import Loader from '@/components/Loader'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useChatIdStore } from '@/services/chatId/useChatIdStore'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { PenLine } from 'lucide-react'

const MainHeader = () => {
	const queryClient = useQueryClient()
	const setChatId = useChatIdStore(state => state.setChatId)

	const isFetching = useIsFetching({
		queryKey: ['createChat'],
	})

	const handleNewChat = () => {
		setChatId(null)

		queryClient.invalidateQueries({ queryKey: ['createChat'] })
	}

	return (
		<header className='h-16 min-h-16 px-10 flex items-center justify-between'>
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<Button
							variant={'outline'}
							size={'icon'}
							disabled={!!isFetching}
							onClick={handleNewChat}
						>
							{isFetching ? <Loader /> : <PenLine />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>New chat</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<h1 className='text-2xl font-bold'>ChatGPT</h1>
			<ModeToggle />
		</header>
	)
}

export default MainHeader
