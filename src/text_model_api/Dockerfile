FROM python:3.11-slim

WORKDIR /app

# RUN apt-get update -q && \
#     apt-get install -y build-essential cmake python3-dev libopenblas-dev git && \
#     rm -rf /var/lib/apt/lists/*

# RUN pip install llama-cpp-python
# RUN curl -fsSL https://ollama.com/install.sh
# RUN ollama pull llama2-uncensored

COPY . .

RUN pip3 install -U -r requirements.txt

ENTRYPOINT [ "python3", "main.py"]
