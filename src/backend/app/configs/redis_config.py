from redis import Redis
from redis.exceptions import ConnectionError


class RedisConnection:
    def __init__(self, host: str = "localhost", port: int = 6379, db: int = 0):
        self.host = host
        self.port = port
        self.db = db
        self.redis = None

    def connect(self):
        try:
            self.redis = Redis(host=self.host, port=self.port, db=self.db, decode_responses=True)
            self.redis.ping()  # Проверяем соединение
        except ConnectionError:
            raise ConnectionError(f"Не удалось подключиться к Redis на {self.host}:{self.port}")

    def get_redis(self) -> Redis:
        if not self.redis:
            self.connect()
        return self.redis
