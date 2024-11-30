from langchain.prompts import PromptTemplate
from langchain.llms import LlamaCpp

from src.core.text_model import TextModel

class LlamaCppAnsweringModel(TextModel):
    def __init__(self, model_path: str = "/app/llama2-uncensored.gguf"):
        self._engine = LlamaCpp(model_path=model_path)
        self._prompt = PromptTemplate(
            input_variables=["context", "task"],
            template="""
            Based on the dialog context, respond to the following task.
            The task could be a question, a request for an explanation,
            or a directive to perform an action like writing code.

            Here is the dialog context:
            {context}

            Task: {task}

            Your response:
            """
        )
        self._chain = self._engine

    def invoke(self, context: str, task: str) -> str:
        prompt = self._prompt.format(context=context, task=task)
        return self._engine(prompt)
