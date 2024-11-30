from abc import abstractmethod, ABC


class TextModel(ABC):
    @abstractmethod
    def invoke(self, context: str, question: str) -> str:
        pass
