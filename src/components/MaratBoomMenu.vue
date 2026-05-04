<!-- src/components/MaratBoomMenu.vue -->
<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

// Простая заглушка для авторизации (можно заменить на вашу useAuth позже)
const isLoggedIn = false

const handleLogout = () => {
  // Логика выхода
  router.push('/casino')
}
</script>

<template>
  <header class="marat-menu">
    <div class="menu-container">
      <div class="logo-area">
        <span class="logo-marat">МАРАТ</span>
        <span class="logo-bum">БУМ</span>
      </div>

      <nav class="nav-links">
        <RouterLink to="/casino">ГЛАВНАЯ</RouterLink>
        <RouterLink to="/casino/games">ИГРЫ</RouterLink>
        <RouterLink to="/casino/promos">АКЦИИ</RouterLink>
        <RouterLink to="/casino/tournaments">ТУРНИРЫ</RouterLink>
        <RouterLink to="/casino/vip">VIP</RouterLink>
        <RouterLink to="/casino/support">ПОДДЕРЖКА</RouterLink>
      </nav>

      <div class="auth-buttons">
        <template v-if="!isLoggedIn">
          <button class="btn-outline" @click="$router.push('/login')">ВХОД</button>
          <button class="btn-register" @click="$router.push('/register')">РЕГИСТРАЦИЯ</button>
        </template>
        <template v-else>
          <RouterLink to="/profile" class="profile-link">Профиль</RouterLink>
          <button class="btn-logout" @click="handleLogout">ВЫЙТИ</button>
        </template>
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
  gap: 1.2rem;
}

.nav-links a {
  text-decoration: none;
  color: #e2ddf5;
  font-weight: 600;
  transition: 0.2s;
  padding: 0.5rem 0;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #FFA451;
  text-shadow: 0 0 4px #ff8c2e;
  border-bottom: 2px solid #ff8c2e;
}

.auth-buttons {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.btn-outline,
.btn-register,
.btn-logout,
.profile-link {
  padding: 0.4rem 1.2rem;
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
  border: none;
}

.btn-outline {
  background: transparent;
  border: 1.5px solid #ffa45e;
  color: #ffb46e;
}

.btn-outline:hover {
  background: rgba(255, 164, 81, 0.15);
}

.btn-register {
  background: linear-gradient(95deg, #FF8C2E, #FF5E00);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 80, 0, 0.4);
}

.btn-register:hover {
  transform: scale(1.02);
}

.profile-link {
  background: rgba(255, 140, 46, 0.2);
  color: #ffb46e;
  border: 1px solid #ffa45e;
}

.btn-logout {
  background: rgba(220, 53, 69, 0.2);
  color: #ff8888;
  border: 1px solid #ff6666;
}

.btn-logout:hover {
  background: rgba(220, 53, 69, 0.4);
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