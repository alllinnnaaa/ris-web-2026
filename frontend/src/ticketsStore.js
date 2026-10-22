import { ref } from 'vue'

export const statusLabels = {
  New: 'Новая',
  InProgress: 'В проверке',
  Closed: 'Проверена',
  Cancelled: 'Отменена'
}

export const items = ref([
  { id: 1, number: 'АН-2026-0001', title: 'Скачок показаний в корпусе А', meterId: 3, status: 'New' },
  { id: 2, number: 'АН-2026-0002', title: 'Нулевые показания на вводе 2', meterId: 1, status: 'InProgress' }
])

let nextId = 3

export function addItem({ title, meterId, description }) {
  const id = nextId++
  const item = {
    id,
    number: `АН-2026-${String(id).padStart(4, '0')}`,
    title,
    meterId,
    description,
    status: 'New'
  }
  items.value.push(item)
  return item
}