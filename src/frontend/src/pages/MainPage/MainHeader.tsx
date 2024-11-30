import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { PenLine } from 'lucide-react'

const MainHeader = () => {
	return (
		<header className='h-16 min-h-16 px-10 flex items-center justify-between'>
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<Button variant={'outline'} size={'icon'}>
							<PenLine />
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
