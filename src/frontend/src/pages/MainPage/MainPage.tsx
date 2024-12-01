import { MainFooter } from '@/widgets/MainFooter'
import { MainHeader } from '@/widgets/MainHeader'
import { MainContent } from '@/widgets/MainContent'
import { useCreateChat } from '@/features/getChatId'

const MainPage = () => {
	useCreateChat()

	return (
		<div className='h-screen flex flex-col'>
			<MainHeader />
			<MainContent />
			<MainFooter />
		</div>
	)
}

export default MainPage
