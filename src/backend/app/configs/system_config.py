import secrets
from typing import Any, Literal


from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )

    DOMAIN: str = "localhost"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_MAIN_DB: int
    REDIS_CHEDULER_DB: int
    REDIS_PASSWORD: str
    TEXT_MODEL_API_URL: str
    PROJECT_NAME: str

    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    PROJECT_NAME: str


settings: BaseSettings = Settings()
