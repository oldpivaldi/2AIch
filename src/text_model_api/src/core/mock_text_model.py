from src.core.text_model import TextModel


class MockTextModel(TextModel):
    def invoke(self, context: str, question: str) -> str:
        return f"context: {context}, question: {question}"
