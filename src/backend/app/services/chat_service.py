import asyncio
import logging
import uuid
from datetime import datetime
from typing import List

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.repositories.chat_repository import ChatHistoryRepository
from app.models import Message, ChatEvent
from app.repositories.websocket_repository import WebSocketRepository


class ChatService:
    def __init__(
            self,
            chat_history_repository: ChatHistoryRepository,
            websocket_repository: WebSocketRepository,
            scheduler: AsyncIOScheduler
    ):
        self.chat_history_repository = chat_history_repository
        self.websocket_repository = websocket_repository
        self.scheduler = scheduler

    def create_chat(self) -> str:
        chat_id = str(uuid.uuid4())
        self.chat_history_repository.create_chat(chat_id)
        logging.info(f"Создан чат {chat_id}")
        return chat_id

    def check_chat_exists(self, chat_id: str) -> bool:
        return self.chat_history_repository.check_chat_exists(chat_id)

    def get_chat_history(self, chat_id: str) -> List[Message]:
        return self.chat_history_repository.get_history(chat_id)

    async def add_task_for_generate(self, chat_id: str, message: str):
        self.chat_history_repository.add_message(chat_id, "user", message)
        await self.websocket_repository.send_message(chat_id, ChatEvent(status="generating", message=None, timestamp=datetime.utcnow()))

        self.scheduler.add_job(
            func=self.process_generate,
            trigger='interval',
            seconds=2,
            args=[chat_id],
            max_instances=1
        )

    async def process_generate(self, chat_id: str):
        history = self.chat_history_repository.get_history(chat_id)
        answer = f"Ответ на сообщение '{history.__str__()}' от LLM"
        await asyncio.sleep(2)

        self.chat_history_repository.add_message(chat_id, "llm", answer)

        await self.websocket_repository.send_message(chat_id, ChatEvent(status="generated", message=answer, timestamp=datetime.utcnow()))
