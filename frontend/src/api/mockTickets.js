const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Флаги для проверки отказов (меняются из консоли браузера, см. шаг 7)
export const mockFlags = { force400: false, force500: false, empty: false }

let db = [
  { id: 1, number: 'АН-2026-0001', title: 'Скачок показаний в корпусе А', meterId: 3, status: 'New' },
  { id: 2, number: 'АН-2026-0002', title: 'Нулевые показания на вводе 2', meterId: 1, status: 'InProgress' }
]
let nextId = 3

export async function mockGetTickets() {
  await delay(500)
  if (mockFlags.force500) {
    return { ok: false, status: 500, data: { error: 'Внутренняя ошибка сервера' } }
  }
  return { ok: true, status: 200, data: mockFlags.empty ? [] : [...db] }
}

export async function mockCreateTicket(body) {
  await delay(500)
  if (mockFlags.force500) {
    return { ok: false, status: 500, data: { error: 'Внутренняя ошибка сервера' } }
  }

  const title = (body.title ?? '').trim()
  const description = (body.description ?? '').trim()
  const badTitle = title.length < 5 || title.length > 80
  const badMeter = !Number.isInteger(body.meterId) || body.meterId <= 0
  const badDescription = description.length < 10 || description.length > 500

  if (mockFlags.force400 || badTitle || badMeter || badDescription) {
    return { ok: false, status: 400, data: { error: 'Ошибка проверки полей' } }
  }

  const id = nextId++
  const created = {
    id,
    number: `АН-2026-${String(id).padStart(4, '0')}`,
    title,
    description,
    meterId: body.meterId,
    status: 'New'
  }
  db.push(created)
  return { ok: true, status: 201, data: created }
}