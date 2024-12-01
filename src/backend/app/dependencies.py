from apscheduler.jobstores.memory import MemoryJobStore
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.executors.asyncio import AsyncIOExecutor
from pytz import utc
from fastapi import Depends
from redis.asyncio import Redis

from app.clients.text_model_client import TextModelClient
from app.configs import settings
from app.configs.redis_config import RedisConnection
from app.repositories.chat_repository import ChatHistoryRepository
from app.repositories.websocket_repository import WebSocketRepository
from app.services.chat_service import ChatService
from apscheduler.executors.pool import ProcessPoolExecutor

redis_connection = RedisConnection(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_MAIN_DB,
    password=settings.REDIS_PASSWORD
)


def get_text_model_client() -> TextModelClient:
    return TextModelClient(settings.TEXT_MODEL_API_URL)


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
        'default': MemoryJobStore(),
    }
    executors = {
        'default': AsyncIOExecutor(),
    }
    job_defaults = {
        'coalesce': False,
        'max_instances': 1,
    }

    new_scheduler = AsyncIOScheduler()
    new_scheduler.configure(
        jobstores=jobstores,
        executors=executors,
        job_defaults=job_defaults,
        timezone=utc,
    )
    return new_scheduler


task_scheduler = get_scheduler()


def get_chat_service(
        chat_history_repository: ChatHistoryRepository = Depends(get_chat_history_repository),
        websocket_repository: WebSocketRepository = Depends(get_websocket_repository),
        text_model_client: TextModelClient = Depends(get_text_model_client),
) -> ChatService:
    return ChatService(chat_history_repository, websocket_repository, task_scheduler, text_model_client)
