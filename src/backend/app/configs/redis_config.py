from redis.asyncio import Redis
from redis.exceptions import ConnectionError


class RedisConnection:
    def __init__(self, host: str = "localhost", port: int = 6380, db: int = 0, password="redis"):
        self.host = host
        self.port = port
        self.db = db
        self.password = password
        self.redis = None

    async def connect(self):
        try:
            self.redis = Redis(host=self.host, port=self.port, db=self.db, password=self.password, decode_responses=True)
            await self.redis.ping()  # Проверяем соединение
        except ConnectionError:
            raise ConnectionError(f"Не удалось подключиться к Redis на {self.host}:{self.port}")

    async def get_redis(self) -> Redis:
        if not self.redis:
            await self.connect()
        return self.redis
