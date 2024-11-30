from pytz import utc
from apscheduler.jobstores.memory import MemoryJobStore
from fastapi import Depends
from app.repositories.chat_repository import ChatHistoryRepository
from app.repositories.websocket_repository import WebSocketRepository
from app.services.chat_service import ChatService
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.executors.pool import ProcessPoolExecutor

def get_chat_history_repository() -> ChatHistoryRepository:
    return ChatHistoryRepository()

def get_websocket_repository() -> WebSocketRepository:
    return WebSocketRepository()

def get_scheduler() -> AsyncIOScheduler:
    jobstores = {
        'default': MemoryJobStore(),
    }
    executors = {
        'default': {'type': 'threadpool', 'max_workers': 20},
        'processpool': ProcessPoolExecutor(max_workers=5)
    }
    job_defaults = {
        'coalesce': False,
        'max_instances': 3
    }

    scheduler = AsyncIOScheduler()

    scheduler.configure(jobstores=jobstores, executors=executors,
                        job_defaults=job_defaults, timezone=utc)

    return scheduler

def get_chat_service(
        chat_history_repository: ChatHistoryRepository = Depends(get_chat_history_repository),
        websocket_repository: WebSocketRepository = Depends(get_websocket_repository),
        scheduler: AsyncIOScheduler = Depends(get_scheduler)
) -> ChatService:
    return ChatService(chat_history_repository, websocket_repository, scheduler)
