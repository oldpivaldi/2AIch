# ChMOCoder

# Инструкция по сборке в k8s

1. Запустить minikube:
```
minikube start --driver=docker
```

2. Копировать volume:

```
tar -czf proxy-ssl.tar.gz -C ./src/proxy .
```
```
minikube cp proxy-ssl.tar.gz /home/docker/
```
```
minikube ssh -- tar -xzf /home/docker/proxy-ssl.tar.gz -C /home/docker/
```

```
tar -czf model-repo.tar.gz -C ./src/text_model_api/repo .
```
```
minikube cp model-repo.tar.gz /home/docker/
```
```
minikube ssh -- tar -xzf /home/docker/model-repo.tar.gz -C /home/docker/
```

3. Зайти в директорию с манифестами:
```
cd k8s-manifests
```

4. Использовать локальный образ Docker внутри minikube:
```
eval $(minikube docker-env)
```

5. Собрать все образы:

Proxy:
```
docker build -t proxy-image ../src/proxy
```

Frontend:
```
docker build -t frontend-image ../src/frontend
```

Backend:
```
docker build -t backend-image ../src/backend
```

Model:
```
docker build -t text-model-api-image ../src/text_model_api
```

6. Применить манифесты:
```
kubectl apply -f namespace.yaml
kubectl apply -f redis-config.yaml
kubectl apply -f redis-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f proxy-deployment.yaml
kubectl apply -f text-model-api.yaml
```

7. Снова использовать docker-desktop
```
eval $(minikube docker-env --unset)
```