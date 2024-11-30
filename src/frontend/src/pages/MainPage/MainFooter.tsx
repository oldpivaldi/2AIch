import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useState } from 'react'

const MainFooter = () => {
	const [text, setText] = useState('')

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
	}

	const sendText = () => {
		setText('')
	}

	return (
		<footer className='h-16 min-h-16 flex justify-center'>
			<div className='w-2/5 flex gap-2 pt-1'>
				<Textarea
					placeholder='Message ChatGPT'
					className='resize-none min-h-10 h-10 overflow-hidden'
					value={text}
					onChange={handleChangeText}
				/>
				<Button variant={'outline'} size={'icon'} onClick={sendText}>
					<Send />
				</Button>
			</div>
		</footer>
	)
}

export default MainFooter
