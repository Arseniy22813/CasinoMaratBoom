// composables/useCasinoGames.js
import { ref } from 'vue'

const gameStats = ref({
  activePlayers: 125739,
  onlineNow: 3258,
  todayWinnings: 2457000,
  dataProtection: '100%'
})

const gameHistory = ref([])

export function useCasinoGames() {
  const playGame = (gameName, betAmount = 100) => {
    const isWin = Math.random() > 0.65
    const winAmount = isWin ? betAmount * (Math.random() * 2 + 1) : 0
    
    const result = {
      game: gameName,
      bet: betAmount,
      win: winAmount,
      timestamp: new Date().toISOString(),
      isWin: winAmount > 0
    }
    
    gameHistory.value.unshift(result)
    
    if (winAmount > 0) {
      gameStats.value.todayWinnings += Math.floor(winAmount)
    }
    
    gameStats.value.onlineNow += Math.floor(Math.random() * 30) - 10
    if (gameStats.value.onlineNow < 100) gameStats.value.onlineNow = 100
    
    return result
  }
  
  const getGameStats = () => {
    return gameStats
  }
  
  const getLastGames = (limit = 5) => {
    return gameHistory.value.slice(0, limit)
  }
  
  const startOnlineCounter = () => {
    setInterval(() => {
      const delta = Math.floor(Math.random() * 41) - 15
      let newOnline = gameStats.value.onlineNow + delta
      if (newOnline > 200 && newOnline < 8000) {
        gameStats.value.onlineNow = newOnline
      }
    }, 15000)
  }
  
  return {
    playGame,
    getGameStats,
    getLastGames,
    startOnlineCounter
  }
}