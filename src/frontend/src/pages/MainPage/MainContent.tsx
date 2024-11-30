import Message from '@/components/Message'

const MainContent = () => {
	return (
		<main className='max-h-chat flex-grow flex flex-col gap-5 items-center overflow-y-auto pt-4 pb-9'>
			<Message
				author='bot'
				description='You can add components to your app using the cli.'
			/>
			<Message
				author='user'
				description='You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli.'
			/>
			<Message
				author='bot'
				description='You can add components to your app using the cli.'
			/>
			<Message
				author='user'
				description='You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli.'
			/>
			<Message
				author='bot'
				description='You can add components to your app using the cli.'
			/>
			<Message
				author='user'
				description='You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli.'
			/>
			<Message
				author='bot'
				description='You can add components to your app using the cli.'
			/>
			<Message
				author='user'
				description='You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli. You can add components to your app using the cli.'
			/>
		</main>
	)
}

export default MainContent
