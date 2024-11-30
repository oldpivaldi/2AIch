from fastapi import APIRouter, Depends
from starlette.requests import Request

from src.core.text_model import TextModel
from src.models.answer import Answer
from src.models.question import Question

router = APIRouter()


@router.post("/answer")
async def answer(
        request: Request,
        question: Question,
) -> Answer:
    model: TextModel = request.app.state.model
    result = model.invoke(question.context, question.message)
    return Answer(message=result)
