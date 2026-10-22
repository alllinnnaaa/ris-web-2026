<script setup>
import { statusLabels } from '../ticketsStore'

defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
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
</template>