from fastapi import APIRouter

from src.api.routes import answer

api_router = APIRouter()
api_router.include_router(answer)
