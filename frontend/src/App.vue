<script setup>
import { ref } from 'vue'

const screen = ref('list')

const statusLabels = {
  New: 'Новая',
  InProgress: 'В проверке',
  Closed: 'Проверена',
  Cancelled: 'Отменена'
}

const items = [
  { id: 1, number: 'АН-2026-0001', title: 'Скачок показаний в корпусе А', meterId: 3, status: 'New' },
  { id: 2, number: 'АН-2026-0002', title: 'Нулевые показания на вводе 2', meterId: 1, status: 'InProgress' }
]
</script>

<template>
  <header class="top">
    <div class="top-inner">
      <h1>Аномалии энергопотребления</h1>
      <nav>
        <button type="button" :class="{ active: screen === 'list' }" @click="screen = 'list'">Список</button>
        <button type="button" :class="{ active: screen === 'new' }" @click="screen = 'new'">Создать</button>
        <button type="button" :class="{ active: screen === 'login' }" @click="screen = 'login'">Вход</button>
      </nav>
    </div>
  </header>

  <main>
    <section v-if="screen === 'list'" class="card">
      <h2>Список заявок</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Тема</th>
              <th>meterId</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.number }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.meterId }}</td>
              <td>
                <span class="badge" :class="'st-' + item.status">
                  {{ statusLabels[item.status] }} ({{ item.status }})
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-else-if="screen === 'new'" class="card">
      <h2>Создание заявки</h2>
      <form @submit.prevent>
        <label for="title">Тема, 5–80 символов</label>
        <input id="title" name="title" autofocus />

        <label for="meterId">Номер счётчика (meterId)</label>
        <input id="meterId" name="meterId" type="number" min="1" />

        <label for="description">Описание, 10–500 символов</label>
        <textarea id="description" name="description" rows="4"></textarea>

        <button type="submit" class="primary">Создать</button>
      </form>
    </section>

    <section v-else-if="screen === 'login'" class="card">
      <h2>Вход</h2>
      <form @submit.prevent>
        <label for="login">Логин</label>
        <input id="login" name="login" autocomplete="username" />

        <label for="password">Пароль</label>
        <input id="password" name="password" type="password" autocomplete="current-password" />

        <button type="submit" class="primary">Войти</button>
      </form>
    </section>
  </main>
</template>

<style>
:root { color-scheme: light; }

body {
  margin: 0;
  background: #f4f6fa;
  color: #1f2937;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
}

.top { background: #ffffff; border-bottom: 1px solid #e5e7eb; }
.top-inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0.9rem 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.top h1 { margin: 0; font-size: 1.2rem; color: #111827; }

nav { display: flex; gap: 0.4rem; }
nav button {
  padding: 0.45rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font: inherit;
  cursor: pointer;
}
nav button:hover { background: #f3f4f6; }
nav button.active { background: #2563eb; border-color: #2563eb; color: #ffffff; }

main { max-width: 860px; margin: 1.5rem auto; padding: 0 1rem; }

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.card h2 { margin: 0 0 1rem; font-size: 1.1rem; }

.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; }
th, td { padding: 0.65rem 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
th { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; color: #6b7280; background: #f9fafb; }
tbody tr:hover { background: #f9fafb; }

.badge { display: inline-block; padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.85rem; }
.st-New { background: #dbeafe; color: #1e40af; }
.st-InProgress { background: #fef3c7; color: #92400e; }
.st-Closed { background: #dcfce7; color: #166534; }
.st-Cancelled { background: #f3f4f6; color: #4b5563; }

form { display: flex; flex-direction: column; gap: 0.4rem; max-width: 440px; }
label { margin-top: 0.5rem; font-size: 0.9rem; font-weight: 600; color: #374151; }
input, textarea {
  padding: 0.55rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #111827;
  font: inherit;
}
input:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

button.primary {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
button.primary:hover { background: #1d4ed8; }
</style>