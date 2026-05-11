<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const router = useRouter()

const home = () => {
  router.push('/')
}

</script>

<template>
  <header class="marat-menu">
    <div class="menu-container">
      <div class="logo-area" @click="home">
        <span class="logo-marat">МАРАТ</span>
        <span class="logo-bum">БУМ</span>
      </div>

      <nav class="nav-links">
        <RouterLink :to="{ name: 'Error' }">РУЛЕТКА</RouterLink>
        <RouterLink :to="{ name: 'Error' }">ОРЕЛ РЕШКА</RouterLink>
        <RouterLink :to="{ name: 'Error' }">МИНЫ</RouterLink>
        <RouterLink :to="{ name: 'Error' }">БЛЭК ДЖЭК</RouterLink>
      </nav>

      <div class="wallet">
        <button class="wallet-btn">
          <span class="wallet-label">Баланс:</span>
          <span class="wallet-balance">0 ₽</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.marat-menu {
  background: linear-gradient(90deg, #0a0618 0%, #1a0f2e 100%);
  border-bottom: 2px solid #ff7e2e;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
}

.menu-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo-area {
  display: flex;
  gap: 0.2rem;
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;
}

.logo-marat {
  background: linear-gradient(135deg, #FFB347, #FF6A00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.logo-bum {
  background: linear-gradient(135deg, #FFD966, #FF8C00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #e2ddf5;
  font-weight: 600;
  padding: 0.5rem 0;
  font-size: 1rem;
  letter-spacing: 0.5px;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #FFA451;
  border-bottom-color: #ff8c2e;
}

.wallet-btn {
  background: rgba(255, 140, 46, 0.2);
  border: 1px solid #ffa45e;
  padding: 0.5rem 1.2rem;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.wallet-btn:hover {
  background: rgba(255, 140, 46, 0.4);
}

.wallet-label {
  color: #ffb46e;
  font-size: 0.9rem;
}

.wallet-balance {
  color: #ffb46e;
  font-weight: bold;
  font-size: 1rem;
}

@media (max-width: 850px) {
  .menu-container {
    flex-direction: column;
    padding: 0.8rem 1rem;
  }

  .nav-links {
    justify-content: center;
  }
}
</style>