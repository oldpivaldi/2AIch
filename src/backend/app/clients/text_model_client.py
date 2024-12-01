from aiohttp import ClientSession


class TextModelClient:
    def __init__(self, base_url: str):
        self.base_url = base_url

    async def get_answer(self, message: str, context: str) -> str:
        """
                url = f"{self.base_url}/api/v1/answer"
                payload = {"message": message, "context": context}
                async with ClientSession() as session:
                    async with session.post(url, json=payload) as response:
                        if response.status != 200:
                            raise Exception(f"Ошибка {response.status}: {await response.text()}")
                        return (await response.json()).get("message", "")
                """
        return f"ответ на сообщение {message} при контексте длинной {len(context)}"
