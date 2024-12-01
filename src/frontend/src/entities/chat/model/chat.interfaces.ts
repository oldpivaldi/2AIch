export interface CreateRes {
	chat_id: string
}

export type Sender = 'user' | 'bot'

export interface Message {
	sender: Sender
	message: string
	timestamp: string
}

export interface GetHistoryRes {
	history: Message[]
}

export interface SendMessageReq {
	message: string
}

export enum StatusMessage {
	GENERATING = 'generating',
	GENERATED = 'generated',
	ERROR = 'error',
}

export interface SocketMessage {
	status: StatusMessage
	message: string
	timestamp: string
}
