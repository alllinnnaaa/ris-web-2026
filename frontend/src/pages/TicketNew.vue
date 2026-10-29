<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket, describeError } from '../api/tickets'

const router = useRouter()

const form = ref({ title: '', meterId: null, description: '' })
const errors = ref({ title: '', meterId: '', description: '' })
const isSubmitting = ref(false)
const serverError = ref('')

async function onCreate() {
  if (isSubmitting.value) return

  const title = form.value.title.trim()
  const description = form.value.description.trim()
  const meterId = form.value.meterId

  serverError.value = ''
  errors.value = { title: '', meterId: '', description: '' }

  if (title.length < 5 || title.length > 80) {
    errors.value.title = 'Тема: от 5 до 80 символов'
  }
  if (!Number.isInteger(meterId) || meterId <= 0) {
    errors.value.meterId = 'Номер счётчика: целое число больше нуля'
  }
  if (description.length < 10 || description.length > 500) {
    errors.value.description = 'Описание: от 10 до 500 символов'
  }
  if (errors.value.title || errors.value.meterId || errors.value.description) {
    return
  }

  isSubmitting.value = true
  try {
    await createTicket({ title, meterId, description })
    form.value = { title: '', meterId: null, description: '' }
    router.push('/')
  } catch (e) {
    serverError.value = describeError(e)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main>
    <section class="card">
      <h2>Создание заявки</h2>
      <form @submit.prevent="onCreate">
        <label for="title">Тема, 5–80 символов</label>
        <input id="title" name="title" v-model="form.title" autofocus />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>

        <label for="meterId">Номер счётчика (meterId)</label>
        <input id="meterId" name="meterId" type="number" min="1" v-model.number="form.meterId" />
        <p v-if="errors.meterId" class="error">{{ errors.meterId }}</p>

        <label for="description">Описание, 10–500 символов</label>
        <textarea id="description" name="description" rows="4" v-model="form.description"></textarea>
        <p v-if="errors.description" class="error">{{ errors.description }}</p>

        <p v-if="serverError" class="notice notice-error">{{ serverError }}</p>

        <button type="submit" class="primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Создаём…' : 'Создать' }}
        </button>
      </form>
    </section>
  </main>
</template>