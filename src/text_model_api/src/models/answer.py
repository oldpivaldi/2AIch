from pydantic import BaseModel


class Answer(BaseModel):
    message: str
