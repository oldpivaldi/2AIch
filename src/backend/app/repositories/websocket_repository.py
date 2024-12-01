import logging
from typing import Dict
from fastapi import WebSocket, HTTPException

from app.models import ChatEvent

connections: Dict[str, WebSocket] = {}


class WebSocketRepository:
    def __init__(self):
        pass

    def add_connection(self, chat_id: str, websocket: WebSocket):
        if chat_id in connections:
            raise HTTPException(400, f"Подключение {chat_id} уже занято")
        connections[chat_id] = websocket

    def remove_connection(self, chat_id: str):
        if chat_id in connections:
            del connections[chat_id]

    def get_connection(self, chat_id: str) -> WebSocket:
        return connections.get(chat_id)

    async def send_message(self, chat_id: str, event: ChatEvent):
        websocket = connections.get(chat_id)
        if websocket:
            try:
                event_as_json = event.model_dump_json()
                await websocket.send_json(event_as_json)
                logging.info(f"Ответ для чата {chat_id}: {event_as_json}")
            except Exception as e:
                logging.error(f"Ошибка при отправке через WebSocket для чата {chat_id}: {e}")
