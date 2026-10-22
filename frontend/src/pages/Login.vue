<template>
  <main>
    <section class="card">
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