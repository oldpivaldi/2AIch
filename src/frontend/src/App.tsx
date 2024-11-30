import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider'
import MainPage from './pages/MainPage/MainPage'
import { Toaster } from './components/ui/sonner'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

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
