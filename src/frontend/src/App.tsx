import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainPage from './pages/MainPage/MainPage'
import { ThemeProvider, Toaster } from './components'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<MainPage />
				<Toaster richColors position='bottom-right' duration={2000} />
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
