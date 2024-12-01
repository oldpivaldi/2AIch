import asyncio

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from app.dependencies import get_scheduler, task_scheduler
from app.routes import router

from app.configs import settings

app = FastAPI()

app.include_router(router)

# app.mount("/", StaticFiles(directory="static", html=True), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    task_scheduler.remove_all_jobs()
    task_scheduler.start()


@app.on_event("shutdown")
async def shutdown():
    task_scheduler.shutdown(wait=False)


if __name__ == '__main__':
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
