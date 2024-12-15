# Проект по дисциплине "Нейроинформатика"

## ChMOCoder - онлайн чат с LLM моделью

## Авторы

| ФИО                          | Группа      |
| ---------------------------- | ----------- |
| Павлов Иван Дмитриевич       | М80-407Б-21 |
| Крючков Артемий Владимирович | М80-407Б-21 |
| Лютоев Илья Александрович    | М80-407Б-21 |

### Описание

**ChMOCoder** — это интерактивный онлайн-чат, в основе которого лежит мощная языковая модель LLaMA. Проект создан для тех, кто стремится эффективно решать задачи программирования, получать экспертные советы по коду или просто экспериментировать с идеями. С помощью ChMOCoder вы можете в реальном времени общаться с искусственным интеллектом, способным понимать контекст, генерировать релевантные ответы и помогать улучшать качество вашего кода. Простой и удобный интерфейс облегчает взаимодействие с моделью и позволяет адаптировать её работу под ваши конкретные задачи — будь то обучение, отладка или поиск вдохновения.

### Бизнес цель проекта

**Бизнес-цель ChMOCoder** заключается в создании универсального инструмента для разработчиков и компаний, который сочетает в себе интерактивное обучение, помощь в разработке программного обеспечения и повышение производительности. Основные направления:

1. **Оптимизация процессов разработки**: Предоставление разработчикам быстрого доступа к решениям задач, улучшение качества и скорости написания кода, устранение ошибок на ранних стадиях.

2. **Поддержка обучения и развития навыков**: Включение в процесс обучения как новичков, так и опытных разработчиков через интерактивные объяснения, примеры и рекомендации.

3. **Снижение затрат на разработку и обучение**: Замена дорогостоящих консультаций и обучения специалистами на автоматизированные решения с поддержкой искусственного интеллекта.

4. **Расширение творческих возможностей**: Помощь разработчикам в генерации идей и экспериментировании с новыми подходами и технологиями.

5. **Увеличение доступности**: Создание доступного инструмента, который позволяет получать квалифицированную поддержку независимо от времени, места или уровня подготовки пользователя.

ChMOCoder нацелен на широкую аудиторию — от индивидуальных разработчиков и образовательных учреждений до крупных корпораций, стремящихся автоматизировать рутинные задачи, повысить квалификацию своих специалистов и внедрить новые технологии в процесс разработки.

### ML-цель проекта

**ML-цель ChMOCoder** — разработка и внедрение высокоточной и адаптивной языковой модели, способной решать задачи программирования, предоставлять экспертные рекомендации и взаимодействовать с пользователями в режиме реального времени. Основные направления ML-целей:

1. **Генерация качественного кода**: Обеспечение способности модели генерировать оптимальный, понятный и эффективный код для решения задач на различных языках программирования.

2. **Отладка и исправление ошибок**: Разработка функционала для анализа кода, выявления ошибок и предложений по их исправлению с объяснением причин.

3. **Адаптация к разным уровням знаний**: Внедрение механизмов, позволяющих модели адаптировать ответы в зависимости от уровня подготовки пользователя — от начинающего до профессионала.

Главная цель — сделать взаимодействие пользователя с искусственным интеллектом максимально эффективным, улучшая процесс обучения, разработки и внедрения новых решений.

### Архитектура (схема C4)

### Обоснование архитектуры

### Объяснение выбора используемого стека

### Описать сети (DMZ, Secure zone и т.д.)

## Инструкция по сборке в k8s

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

8. Прокинуть порт 443 до minikube

```
sudo kubectl --kubeconfig /home/<ваш_пользователь>/.kube/config port-forward -n chmocoder service/proxy 443:443
```
