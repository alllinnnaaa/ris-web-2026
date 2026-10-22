# Матрица требований

| Требование ЛР1 | Поле или сущность | Запрос | Критерий |
| -------------- | ----------------- | ------ | -------- |
| Создать объект | Ticket: `title`, `meterId`, `description` (+ сервер: `id`, `number`, `status`) | `POST /api/tickets` | 1 |
| Назначить исполнителя | Ticket: `assigneeUserId` | `PATCH /api/tickets/{id}/assignee` | 2 |
| Перевести в работу | Ticket: `status` (`New` → `InProgress`) | `PATCH /api/tickets/{id}/status` | 3 |

Связь с ТЗ: критерии 1–3 из `docs/lab-01-requirements.md`. Запреты ФТ-10, ФТ-11, ФТ-12 реализуются ответом 403 в таблице прав в `api-contract.md`.