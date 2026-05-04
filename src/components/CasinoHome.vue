<!-- src/components/CasinoHome.vue -->
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MaratBoomMenu from './MaratBoomMenu.vue'
import { useCasinoGames } from '../composables/useCasinoGames'

const router = useRouter()
const { getGameStats, startOnlineCounter } = useCasinoGames()
const stats = getGameStats()

const games = [
  { name: 'MINES', icon: '💣⛏️', description: 'Найди золото, избегая мин!', color: '#ff8c42' },
  { name: 'РУЛЕТКА', icon: '🎡', description: 'Крути колесо фортуны!', color: '#e63946' },
  { name: 'DICE', icon: '🎲', description: 'Испытай удачу в броске!', color: '#2ecc71' }
]

const features = [
  { icon: '🎁', title: 'ШЕДРЫЕ БОНУСЫ' },
  { icon: '🛡️', title: 'БЕЗОПАСНОСТЬ И НАДЕЖНОСТЬ' },
  { icon: '⚡', title: 'БЫСТРЫЕ ВЫПЛАТЫ' },
  { icon: '🏆', title: 'ТУРНИРЫ КАЖДЫЙ ДЕНЬ' }
]

const handlePlayGame = (gameName) => {
  router.push(`/casino/game/${gameName.toLowerCase()}`)
}

onMounted(() => {
  startOnlineCounter()
})
</script>

<template>
  <div class="casino-home">
    <MaratBoomMenu />
    
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span>МАРАТ БУМ</span><br>
          ТВОЙ ВЗРЫВНОЙ УСПЕХ В МИРЕ КАЗИНО!
        </h1>
        <p class="hero-subtitle">Ощути драйв, забери крупные выигрыши и наслаждайся игрой без границ.</p>
        <button class="play-now-btn" @click="handlePlayGame('slots')">
          🎮 ИГРАТЬ СЕЙЧАС
        </button>
        
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <span class="feature-icon">{{ feature.icon }}</span>
            <span class="feature-text">{{ feature.title }}</span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="games-section">
      <h2 class="section-title">
        🔥 ПОПУЛЯРНЫЕ ИГРЫ
      </h2>
      <div class="games-grid">
        <div v-for="game in games" :key="game.name" class="game-card">
          <div class="game-icon">{{ game.icon }}</div>
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
          <button class="game-btn" @click="handlePlayGame(game.name)" :style="{ borderColor: game.color }">
            ИГРАТЬ
          </button>
        </div>
      </div>
    </section>
    
    <section class="bonus-section">
      <div class="bonus-banner">
        <div class="bonus-text">
          <h2>ПРИВЕТСТВЕННЫЙ БОНУС <span class="percent">100%</span></h2>
          <p>НА ПЕРВЫЙ ДЕПОЗИТ</p>
        </div>
        <button class="bonus-btn" @click="router.push('/register')">
          ПОЛУЧИТЬ БОНУС →
        </button>
      </div>
    </section>
    
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ stats.activePlayers.toLocaleString() }}</div>
          <div class="stat-label">АКТИВНЫХ ИГРОКОВ</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.onlineNow.toLocaleString() }}</div>
          <div class="stat-label">ОНЛАЙН СЕЙЧАС</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.todayWinnings.toLocaleString() }} ₽</div>
          <div class="stat-label">ВЫИГРАНО СЕГОДНЯ</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.dataProtection }}</div>
          <div class="stat-label">ЗАЩИТА ДАННЫХ</div>
        </div>
      </div>
    </section>
    
    <footer class="casino-footer">
      <p>© 2026 Марат Бум Казино. Все права защищены.</p>
    </footer>
  </div>
</template>

<style scoped>
.casino-home {
  background: radial-gradient(circle at 10% 20%, #0f0b1c, #05030a);
  min-height: 100vh;
}

.hero-section {
  background: radial-gradient(ellipse at 70% 30%, rgba(55, 35, 85, 0.6), rgba(8, 4, 18, 0.95));
  border-radius: 2rem;
  margin: 1.5rem;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 100, 40, 0.4);
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
}

.hero-title span {
  background: linear-gradient(135deg, #FFB347, #FF4A00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #cfc9ec;
  margin: 1rem 0 1.5rem;
  max-width: 550px;
}

.play-now-btn {
  background: linear-gradient(100deg, #FF6F00, #FF3A00);
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 60px;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 10px 20px rgba(255, 60, 0, 0.4);
}

.play-now-btn:hover {
  transform: translateY(-3px);
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2.5rem;
  justify-content: space-between;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  padding: 0.7rem 1.5rem;
  border-radius: 60px;
  border-left: 3px solid #ff7e2e;
}

.feature-icon {
  font-size: 1.8rem;
}

.feature-text {
  font-weight: 600;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.games-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin: 0 1.5rem 2rem;
}

.game-card {
  background: linear-gradient(145deg, #17122c, #0e0a1e);
  border-radius: 2rem;
  padding: 1.8rem;
  flex: 1;
  min-width: 220px;
  text-align: center;
  border: 1px solid rgba(255, 125, 40, 0.4);
  transition: 0.25s;
}

.game-card:hover {
  transform: translateY(-8px);
  border-color: #ff9248;
}

.game-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.game-card h3 {
  font-size: 1.7rem;
  color: #ffcc88;
  margin-bottom: 0.5rem;
}

.game-card p {
  color: #b9afdf;
  margin-bottom: 1.4rem;
}

.game-btn {
  background: rgba(255, 120, 30, 0.2);
  border: 1px solid #ff9140;
  padding: 0.5rem 1.6rem;
  border-radius: 40px;
  font-weight: bold;
  color: #ffc285;
  cursor: pointer;
}

.game-btn:hover {
  background: #ff7a2a;
  color: white;
}

.bonus-section {
  margin: 0 1.5rem 2rem;
}

.bonus-banner {
  background: linear-gradient(125deg, #20163f, #0f0a24);
  border-radius: 2rem;
  padding: 1.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ff8c3e;
}

.bonus-text h2 {
  font-size: 2rem;
  font-weight: 800;
  color: white;
}

.percent {
  font-size: 2.5rem;
  background: linear-gradient(120deg, #FFB347, #FF6A00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.bonus-text p {
  color: #cbc3ec;
}

.bonus-btn {
  background: #FF6A00;
  border: none;
  padding: 0.8rem 2rem;
  font-weight: bold;
  border-radius: 60px;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
}

.stats-section {
  margin: 0 1.5rem 2rem;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 2rem;
  padding: 1.8rem;
  backdrop-filter: blur(4px);
}

.stat-item {
  text-align: center;
  flex: 1;
  min-width: 120px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #ffaa66;
}

.stat-label {
  font-size: 0.85rem;
  color: #b0aad0;
}

.casino-footer {
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 115, 0, 0.3);
  color: #706a92;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  .features-grid {
    flex-direction: column;
  }
  .stats-grid {
    flex-direction: column;
    align-items: center;
  }
}
</style>