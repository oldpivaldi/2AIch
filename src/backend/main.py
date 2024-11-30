import asyncio

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.dependencies import get_scheduler, task_scheduler
from app.routes import router

app = FastAPI()

app.include_router(router)

app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.on_event("startup")
async def startup():
    task_scheduler.remove_all_jobs()
    task_scheduler.start()

@app.on_event("shutdown")
async def shutdown():
    task_scheduler.shutdown(wait=False)

async def main():
    while True:
        pass

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
    asyncio.run(main())
