FROM python:3.11-slim

WORKDIR /app

RUN apt-get update -q && \
    apt-get install -y build-essential cmake python3-dev libopenblas-dev git curl && \
    rm -rf /var/lib/apt/lists/*
# RUN apt-get update -q && \
#     apt-get install -y curl

# RUN if [ ! -f /app/models/luna-ai-llama2-uncensored.Q2_K.gguf ]; then \
#     curl -L -o /app/models/luna-ai-llama2-uncensored.Q2_K.gguf https://huggingface.co/TheBloke/Luna-AI-Llama2-Uncensored-GGUF/blob/main/luna-ai-llama2-uncensored.Q2_K.gguf ; \
#     fi

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "python3", "main.py" ]
