import { PenLine } from 'lucide-react'
import {
	useIsFetching,
	useIsMutating,
	useQueryClient,
} from '@tanstack/react-query'
import {
	ModeToggle,
	Button,
	Loader,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/ui'
import {
	useChatIdStore,
	useHistoryStore,
	useSocketStatusStore,
} from '@/entities/chat'

const MainHeader = () => {
	const queryClient = useQueryClient()

	const setChatId = useChatIdStore(state => state.setChatId)
	const isGenerating = useSocketStatusStore(store => store.isGenerating)
	const setHistory = useHistoryStore(store => store.setHistory)

	const isFetchingCreateChat = useIsFetching({
		queryKey: ['createChat'],
	})

	const isFetchingGetHistory = useIsFetching({
		queryKey: ['getHistory'],
	})

	const handleCreateChat = () => {
		setChatId('')
		setHistory([])

		queryClient.invalidateQueries({ queryKey: ['createChat'] })
	}

	const isMutatingSendMessage = useIsMutating({ mutationKey: ['sendMessage'] })

	const isDisabled =
		!!isFetchingCreateChat ||
		!!isFetchingGetHistory ||
		!!isMutatingSendMessage ||
		isGenerating

	return (
		<header className='h-16 min-h-16 px-10 flex items-center justify-between'>
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<Button
							variant={'outline'}
							size={'icon'}
							disabled={isDisabled}
							onClick={handleCreateChat}
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
