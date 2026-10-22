<script setup>
import TicketTable from '../components/TicketTable.vue'
import { items } from '../ticketsStore'
</script>

<template>
  <main>
    <section class="card">
      <h2>Список заявок</h2>
      <TicketTable :items="items" />
    </section>
  </main>
</template>