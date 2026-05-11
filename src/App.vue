<script setup>
import { RouterView } from 'vue-router'
import MaratBoomMenu from './components/MaratBoomMenu.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div id="app">
    <header>
      <MaratBoomMenu />
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background: radial-gradient(circle at 10% 20%, #0f0b1c, #05030a);
  min-height: 100vh;
  color: #f0eef7;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

footer {
  margin-top: auto;
}
</style>