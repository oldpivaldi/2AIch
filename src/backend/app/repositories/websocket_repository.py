import logging
from typing import Dict
from fastapi import WebSocket, HTTPException

from app.models import ChatEvent


class WebSocketRepository:
    def __init__(self):
        self.connections: Dict[str, WebSocket] = {}  # chat_id -> WebSocket connection

    def add_connection(self, chat_id: str, websocket: WebSocket):
        if chat_id in self.connections:
            raise HTTPException(400, f"Подключение {chat_id} уже занято")
        self.connections[chat_id] = websocket

    def remove_connection(self, chat_id: str):
        if chat_id in self.connections:
            del self.connections[chat_id]

    def get_connection(self, chat_id: str) -> WebSocket:
        return self.connections.get(chat_id)

    async def send_message(self, chat_id: str, event: ChatEvent):
        websocket = self.connections.get(chat_id)
        if websocket:
            try:
                event_as_json = event.model_dump_json()
                await websocket.send_json(event_as_json)
                logging.info(f"Ответ для чата {chat_id}: {event_as_json}")
            except Exception as e:
                logging.error(f"Ошибка при отправке через WebSocket для чата {chat_id}: {e}")