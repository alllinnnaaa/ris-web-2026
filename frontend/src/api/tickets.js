import { mockGetTickets, mockCreateTicket, mockFlags } from './mockTickets'

// true: работает mock. false: настоящий fetch к серверу на порту 5000
const USE_MOCK = true

const baseUrl = import.meta.env.VITE_API_BASE_URL

if (USE_MOCK) {
  window.mockFlags = mockFlags // чтобы переключать отказы из консоли
}

export class ApiError extends Error {
  constructor(status, data) {
    super(`HTTP ${status}`)
    this.status = status
    this.data = data
  }
}

function unwrap(result) {
  if (!result.ok) throw new ApiError(result.status, result.data)
  return result.data
}

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options)
  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }
  if (!response.ok) throw new ApiError(response.status, data)
  return data
}

export async function getTickets() {
  if (USE_MOCK) return unwrap(await mockGetTickets())
  return request('/api/tickets')
}

export async function createTicket(body) {
  if (USE_MOCK) return unwrap(await mockCreateTicket(body))
  return request('/api/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

// Три разных текста: 400, 500 и отсутствие связи
export function describeError(error) {
  if (error instanceof ApiError) {
    if (error.status === 400) return 'Проверьте поля'
    if (error.status >= 500) return 'Сервер не смог обработать запрос'
    return `Запрос отклонён (код ${error.status})`
  }
  return 'Нет связи с сервером'
}