from apscheduler.jobstores.memory import MemoryJobStore
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from pytz import utc
from fastapi import Depends
from redis.asyncio import Redis

from app.clients.text_model_client import TextModelClient
from app.configs.redis_config import RedisConnection
from app.repositories.chat_repository import ChatHistoryRepository
from app.repositories.websocket_repository import WebSocketRepository
from app.services.chat_service import ChatService
from apscheduler.executors.pool import ProcessPoolExecutor

redis_connection = RedisConnection()

def get_text_model_client() -> TextModelClient:
    return TextModelClient("http://localhost:8001")

async def get_redis() -> Redis:
    return await redis_connection.get_redis()

def get_chat_history_repository(
        redis: Redis = Depends(get_redis),
) -> ChatHistoryRepository:
    return ChatHistoryRepository(redis)

def get_websocket_repository() -> WebSocketRepository:
    return WebSocketRepository()

def get_scheduler() -> AsyncIOScheduler:
    jobstores = {
        'default': MemoryJobStore(),  # Хранилище задач в памяти
    }
    executors = {
        'default': {'type': 'threadpool', 'max_workers': 20},
        'processpool': ProcessPoolExecutor(max_workers=5),
    }
    job_defaults = {
        'coalesce': False,  # Не объединять пропущенные вызовы
        'max_instances': 1,  # Максимум одна параллельная задача
    }

    new_scheduler = AsyncIOScheduler()
    new_scheduler.configure(
        jobstores=jobstores,
        executors=executors,
        job_defaults=job_defaults,
        timezone=utc,  # Используем UTC
    )
    return new_scheduler

task_scheduler = get_scheduler()

def get_chat_service(
        chat_history_repository: ChatHistoryRepository = Depends(get_chat_history_repository),
        websocket_repository: WebSocketRepository = Depends(get_websocket_repository),
        text_model_client: TextModelClient = Depends(get_text_model_client),
) -> ChatService:
    return ChatService(chat_history_repository, websocket_repository, task_scheduler, text_model_client)
