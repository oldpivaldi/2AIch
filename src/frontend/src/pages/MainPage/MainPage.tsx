import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MainFooter from './MainFooter'

const MainPage = () => {
	return (
		<div className='h-screen flex flex-col'>
			<MainHeader />
			<MainContent />
			<MainFooter />
		</div>
	)
}

export default MainPage
