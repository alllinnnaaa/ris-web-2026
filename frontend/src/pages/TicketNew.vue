<template>
  <main>
    <section class="card">
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
  </main>
</template>