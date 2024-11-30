from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM

from src.core.text_model import TextModel


class OllamaAnsweringModel(TextModel):
    def __init__(self, model_name: str = "llama2-uncensored"):
        self._engine = OllamaLLM(model=model_name)
        self._prompt = ChatPromptTemplate.from_template(
            """
            Based on the dialog context, respond to the following task. 
            The task could be a question, a request for an explanation, 
            or a directive to perform an action like writing code.

            Here is the dialog context:
            {context}
            
            Task: {task}
            
            Your response:
            """
        )
        self._chain = self._prompt | self._engine

    def invoke(self, context: str, task: str) -> str:
        return self._chain.invoke({
            "context": context,
            "task": task
        })
