from typing import Dict, List
from datetime import datetime
from app.models import Message

class ChatHistoryRepository:
    def __init__(self):
        self.chat_history: Dict[str, List[Message]] = {}

    def create_chat(self, chat_id: str):
        self.chat_history[chat_id] = []

    def check_chat_exists(self, chat_id: str) -> bool:
        return chat_id in self.chat_history

    def get_history(self, chat_id: str) -> List[Message]:
        return self.chat_history.get(chat_id, [])

    def add_message(self, chat_id: str, sender: str, message: str) -> Message:
        if chat_id not in self.chat_history:
            self.chat_history[chat_id] = []

        message = Message(
            sender=sender,
            message=message,
            timestamp=datetime.utcnow()
        )
        self.chat_history[chat_id].append(message)

        return message