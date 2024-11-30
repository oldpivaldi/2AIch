from datetime import datetime

from pydantic import BaseModel
from typing import List, Literal, Optional

class Message(BaseModel):
    sender: str
    message: str
    timestamp: datetime

class History(BaseModel):
    history: List[Message]

class StartChatResponse(BaseModel):
    chat_id: str

class SendMessageRequest(BaseModel):
    message: str

class ChatEvent(BaseModel):
    status: Literal['generating', 'generated']
    message: Optional[str]
    timestamp: datetime
