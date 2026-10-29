<script setup>
import { ref, onMounted } from 'vue'
import TicketTable from '../components/TicketTable.vue'
import { items } from '../ticketsStore'
import { getTickets, describeError } from '../api/tickets'

const state = ref('loading') // loading | empty | data | error
const errorText = ref('')

async function load() {
  state.value = 'loading'
  try {
    const data = await getTickets()
    items.value = data
    state.value = data.length ? 'data' : 'empty'
  } catch (e) {
    errorText.value = describeError(e)
    state.value = 'error'
  }
}

onMounted(load)
</script>

<template>
  <main>
    <section class="card">
      <h2>Список заявок</h2>

      <p v-if="state === 'loading'" class="notice">Загрузка…</p>

      <div v-else-if="state === 'error'">
        <p class="notice notice-error">{{ errorText }}</p>
        <button type="button" class="primary" @click="load">Повторить</button>
      </div>

      <p v-else-if="state === 'empty'" class="notice">Записей пока нет</p>

      <TicketTable v-else :items="items" />
    </section>
  </main>
</template>