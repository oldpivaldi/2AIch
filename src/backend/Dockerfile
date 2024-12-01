FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install -U -r requirements.txt

ENTRYPOINT [ "python3", "main.py"]
