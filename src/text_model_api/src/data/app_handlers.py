from typing import Callable

from fastapi import FastAPI

from src.core.ollama_answering_model import OllamaAnsweringModel
from src.core.text_model import TextModel
from src.data.logger import logger


def _startup_model(app: FastAPI) -> None:
    model_instance: TextModel = OllamaAnsweringModel(model_name="qwen2.5-coder:14b")
    app.state.model = model_instance


def app_start_handler(app: FastAPI) -> Callable:
    def startup() -> None:
        logger.info("Running app start handler.")
        _startup_model(app)

    return startup
