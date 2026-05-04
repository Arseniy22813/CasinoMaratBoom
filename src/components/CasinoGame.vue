<!-- src/components/CasinoGame.vue -->
<script setup>
import { useRoute } from 'vue-router'
import MaratBoomMenu from './MaratBoomMenu.vue'
import { useCasinoGames } from '../composables/useCasinoGames'

const route = useRoute()
const gameName = route.params.game
const { playGame, getLastGames } = useCasinoGames()
const lastGames = getLastGames(10)

const spin = () => {
  const result = playGame(gameName, 100)
  alert(`${result.isWin ? '🎉 ПОБЕДА!' : '😔 ПРОИГРЫШ'} 
    Ставка: ${result.bet} ₽
    Выигрыш: ${Math.floor(result.win)} ₽`)
}
</script>

<template>
  <div class="casino-game">
    <MaratBoomMenu />
    <div class="game-container">
      <h1>Игра: {{ gameName?.toUpperCase() }}</h1>
      <button class="spin-btn" @click="spin">СДЕЛАТЬ СТАВКУ</button>
      
      <div class="history">
        <h3>Последние игры:</h3>
        <div v-for="game in lastGames" :key="game.timestamp" class="history-item">
          <span>{{ game.game }}</span>
          <span :class="game.isWin ? 'win' : 'lose'">
            {{ game.isWin ? '+' : '-' }}{{ Math.floor(game.win || game.bet) }} ₽
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.casino-game {
  background: #0a0618;
  min-height: 100vh;
}
.game-container {
  text-align: center;
  padding: 3rem;
}
.game-container h1 {
  color: #ffcc88;
  font-size: 2rem;
}
.spin-btn {
  background: linear-gradient(95deg, #FF8C2E, #FF5E00);
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 60px;
  color: white;
  cursor: pointer;
  margin: 2rem;
  font-weight: bold;
}
.spin-btn:hover {
  transform: scale(1.05);
}
.history {
  max-width: 400px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 1rem;
}
.history h3 {
  color: #ffaa66;
  margin-bottom: 1rem;
}
.history-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #333;
}
.win { color: #2ecc71; font-weight: bold; }
.lose { color: #e74c3c; }
</style>