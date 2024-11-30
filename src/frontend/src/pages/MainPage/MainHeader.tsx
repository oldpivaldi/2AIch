import { PenLine } from 'lucide-react'
import {
	useIsFetching,
	useIsMutating,
	useQueryClient,
} from '@tanstack/react-query'
import { useChatIdStore } from '@/utils/useChatIdStore'
import {
	ModeToggle,
	Button,
	Loader,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components'
import { useSocketStatusStore } from '@/utils/useSocketStatusStore'

const MainHeader = () => {
	const queryClient = useQueryClient()

	const setChatId = useChatIdStore(state => state.setChatId)
	const isGenerating = useSocketStatusStore(store => store.isGenerating)

	const isFetchingCreateChat = useIsFetching({
		queryKey: ['createChat'],
	})

	const isFetchingGetHistory = useIsFetching({
		queryKey: ['getHistory'],
	})

	const isMutatingSendMessage = useIsMutating({ mutationKey: ['sendMessage'] })

	const isDisabled =
		!!isFetchingCreateChat ||
		!!isFetchingGetHistory ||
		!!isMutatingSendMessage ||
		isGenerating

	const handleNewChat = () => {
		setChatId('')

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
							disabled={isDisabled}
							onClick={handleNewChat}
						>
							{isFetchingCreateChat ? <Loader /> : <PenLine />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>New chat</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<h1 className='text-2xl font-bold'>ChMOCoder</h1>
			<ModeToggle />
		</header>
	)
}

export default MainHeader
