from pydantic import BaseModel


class Question(BaseModel):
    message: str
    context: str
