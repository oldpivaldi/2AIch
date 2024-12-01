from typing import Callable

from fastapi import FastAPI

from src.core.llama_cpp_answering_model import LlamaCppAnsweringModel
from src.core.text_model import TextModel
from src.data.logger import logger
from src.data.config import settings


def _startup_model(app: FastAPI) -> None:
    model_instance: TextModel = LlamaCppAnsweringModel(model_path=f"/app/models/{settings.TEXT_MODEL_NAME}")
    app.state.model = model_instance


def app_start_handler(app: FastAPI) -> Callable:
    def startup() -> None:
        logger.info("Running app start handler.")
        _startup_model(app)

    return startup
