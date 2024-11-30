import uvicorn
import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.api import api_router
from src.core.mock_text_model import MockTextModel
from src.core.text_model import TextModel
from src.data.app_handlers import app_start_handler
# from app.api.main import api_router
from src.data.config import settings


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(api_router, prefix=settings.API_V1_STR)
app.add_event_handler("startup", app_start_handler(app))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
