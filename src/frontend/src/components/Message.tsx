import { FC, useState } from 'react'
import { Bot, User, Copy, Check } from 'lucide-react'
import {
	Alert,
	AlertTitle,
	AlertDescription,
	Button,
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components'

interface MessageProps {
	author: 'user' | 'llm'
	description: string
}

export const Message: FC<MessageProps> = ({ author, description }) => {
	const [copied, setCopied] = useState(false)
	const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>()

	const handleCopyText = () => {
		navigator.clipboard.writeText(description)
		setCopied(true)

		clearTimeout(timerId)

		const id = setTimeout(() => setCopied(false), 1000)

		setTimerId(id)
	}

	return (
		<Alert className='w-2/5'>
			{author === 'user' ? (
				<User className='h-4 w-4' />
			) : (
				<Bot className='h-4 w-4' />
			)}
			<AlertTitle className='capitalize'>{author}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
			<div className='mt-1'>
				<TooltipProvider>
					<Tooltip delayDuration={0} open={copied}>
						<TooltipTrigger asChild>
							<Button
								variant={'ghost'}
								size={'icon'}
								className='h-6 w-6'
								onClick={handleCopyText}
							>
								{copied ? <Check /> : <Copy />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Copied!</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</Alert>
	)
}
