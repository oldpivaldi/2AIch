from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.dependencies import get_scheduler
from app.routes import router

app = FastAPI()

app.include_router(router)

app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.on_event("startup")
async def startup():
    scheduler = get_scheduler()
    scheduler.remove_all_jobs()
    scheduler.start()

@app.on_event("shutdown")
async def shutdown():
    scheduler = get_scheduler()
    scheduler.shutdown(wait=False)
