# Контракт API

Базовый адрес: `http://localhost:5000`. Все ответы в JSON.
Статусы заявки только: `New`, `InProgress`, `Closed`, `Cancelled`. Заявки не удаляются: отмена = `Cancelled`.

## Таблица запросов

| Метод и путь | Тело | Успех | Возможная ошибка |
| ------------ | ---- | ----- | ---------------- |
| `POST /api/auth/login` | `login`, `password` | 200, токен и роль | 400, 401 |
| `GET /api/meters` | — | 200, массив или `[]` | 401 |
| `GET /api/tickets` | — | 200, массив или `[]` | 401 |
| `GET /api/tickets/{id}` | — | 200, объект | 401, 404 |
| `POST /api/tickets` | `title`, `meterId`, `description` | 201, `id`, `number`, `status: New` | 400, 401, 403 |
| `PATCH /api/tickets/{id}/assignee` | `assigneeUserId` | 200 | 400, 401, 403, 404 |
| `PATCH /api/tickets/{id}/status` | `status` | 200 | 400, 401, 403, 404, 409 |

Клиент не присылает при создании `id`, `number`, `status` и исполнителя: их определяет сервер.

## Права по ролям

| Запрос | Диспетчер | Главный энергетик | Инженер |
| ------ | --------- | ----------------- | ------- |
| `POST /api/tickets` | да | нет (403) | нет (403) |
| `PATCH …/assignee` | нет (403) | да | нет (403) |
| `PATCH …/status` | нет (403) | нет (403) | да, только своя заявка (иначе 403) |

## Примеры

**POST /api/tickets** — запрос:

```json
{
  "title": "Скачок показаний в корпусе А",
  "meterId": 3,
  "description": "За сутки показания выросли в три раза, прибор работает."
}
```

Ответ 201:

```json
{
  "id": 17,
  "number": "АН-2026-0017",
  "status": "New"
}
```

Ответ 400 (ошибка проверки):

```json
{
  "error": "Заголовок должен быть от 5 до 80 символов",
  "field": "title"
}
```

**PATCH /api/tickets/17/assignee** — запрос:

```json
{ "assigneeUserId": 5 }
```

Ответ 200:

```json
{ "id": 17, "assigneeUserId": 5, "status": "New" }
```

**PATCH /api/tickets/17/status** — запрос:

```json
{ "status": "InProgress" }
```

Ответ 200:

```json
{ "id": 17, "status": "InProgress" }
```

Ответ 409 (недопустимый переход, например `Closed` → `New`):

```json
{ "error": "Переход из Closed в New запрещён" }
```

## Допустимые переходы статуса

- `New` → `InProgress`, `New` → `Cancelled`
- `InProgress` → `Closed`, `InProgress` → `Cancelled`
- из `Closed` и `Cancelled` переходов нет (409)

## Пустой список

`GET /api/tickets` без заявок возвращает 200 и `[]`, а не 404.