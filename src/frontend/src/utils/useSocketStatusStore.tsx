import { create } from 'zustand'

interface SocketStatus {
	isGenerating: boolean
	setIsGenerating: (isGenerating: boolean) => void
}

export const useSocketStatusStore = create<SocketStatus>(set => ({
	isGenerating: false,
	setIsGenerating: isGenerating => set({ isGenerating }),
}))
