from aiohttp import ClientSession


class TextModelClient:
    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)

        return cls.__instance

    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = None

    async def init_session(self):
        """ Инициализация сессии в асинхронном контексте """
        if self.session is None:
            self.session = await ClientSession().__aenter__()

    async def close(self):
        """ Закрытие сессии после работы """
        if self.session:
            await self.session.__aexit__(None, None, None)

    async def get_answer(self, message: str, context: str) -> str:
        await self.init_session()
        url = f"{self.base_url}/api/v1/answer"
        payload = {"message": message, "context": context}
        async with self.session.post(url, json=payload) as response:
            if response.status != 200:
                raise Exception(f"Ошибка {response.status}: {await response.text()}")
            answer = (await response.json()).get("message", "")
            return answer
