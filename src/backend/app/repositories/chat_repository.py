import json
from typing import Dict, List
from datetime import datetime

from redis.asyncio import Redis

from app.models import Message


class ChatHistoryRepository:
    def __init__(self, redis_client: Redis):
        self.redis_client = redis_client

    async def create_chat(self, chat_id: str):
        await self.redis_client.set(f"chat:{chat_id}:history", json.dumps([]))

    async def check_chat_exists(self, chat_id: str) -> bool:
        return await self.redis_client.exists(f"chat:{chat_id}:history") > 0

    async def get_history(self, chat_id: str) -> List[Message]:
        history_data = await self.redis_client.get(f"chat:{chat_id}:history")
        if history_data:
            return [Message(**message) for message in json.loads(history_data)]
        return []

    async def add_message(self, chat_id: str, sender: str, message: str) -> Message:
        if not await self.check_chat_exists(chat_id):
            raise ValueError(f"Чат {chat_id} не найден!")

        new_message = Message(
            sender=sender,
            message=message,
            timestamp=datetime.utcnow()
        )

        history_key = f"chat:{chat_id}:history"
        history_data = await self.redis_client.get(history_key)
        chat_history = json.loads(history_data) if history_data else []

        chat_history.append(new_message.dict())
        await self.redis_client.set(history_key, json.dumps(chat_history))

        return new_message