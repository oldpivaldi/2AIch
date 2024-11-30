import logging

from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect

from app.dependencies import get_chat_service, get_websocket_repository
from app.models import ChatHistoryResponse, StartChatResponse, SendMessageRequest
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat")

@router.post("/", response_model=StartChatResponse)
async def start_chat(chat_service: ChatService = Depends(get_chat_service)):
    chat_id = chat_service.create_chat()
    return StartChatResponse(chat_id=chat_id)


@router.get("/{chat_id}/history", response_model=ChatHistoryResponse)
async def get_chat_history(chat_id: str, chat_service: ChatService = Depends(get_chat_service)):
    history = chat_service.get_chat_history(chat_id)
    return ChatHistoryResponse(history=history)


@router.post("/{chat_id}/send_message")
async def chat(chat_id: str, request: SendMessageRequest, chat_service: ChatService = Depends(get_chat_service)):
    await chat_service.add_task_for_generate(chat_id, request.message)


@router.websocket("/{chat_id}/ws")
async def websocket_chat(
        websocket: WebSocket,
        chat_id: str,
        websocket_repository = Depends(get_websocket_repository),
        chat_service: ChatService = Depends(get_chat_service)
):
    await websocket.accept()

    if not chat_service.check_chat_exists(chat_id):
        return

    websocket_repository.add_connection(chat_id, websocket)
    logging.info(f"Подключение WebSocket для чата {chat_id} установлено.")

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        websocket_repository.remove_connection(chat_id)
        logging.info(f"Клиент {chat_id} отключился.")
