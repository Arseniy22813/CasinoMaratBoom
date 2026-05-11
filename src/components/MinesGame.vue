<script setup>
import { useRouter } from 'vue-router'
import useMinesGame from '../composables/useMinesGame'
import useWallet from '../composables/useWallet'

const router = useRouter()
const { balance } = useWallet()
const {
    gameState,
    startGame,
    revealCell,
    cashOut,
    setMinesCount,
    setBetAmount,
    gridSize,
    totalCells
} = useMinesGame()

const goBack = () => {
    router.push('/')
}

const updateBet = (e) => {
    let value = Number(e.target.value)
    if (isNaN(value)) value = 10
    if (value < 10) value = 10
    if (value > balance.value) value = balance.value
    setBetAmount(value)
}

const setHalfBet = () => {
    const half = Math.floor(gameState.value.betAmount / 2)
    if (half >= 10) {
        setBetAmount(half)
    }
}

const setDoubleBet = () => {
    const double = gameState.value.betAmount * 2
    if (double <= balance.value) {
        setBetAmount(double)
    }
}

const setMaxBet = () => {
    setBetAmount(balance.value)
}

const handleStartGame = () => {
    startGame()
}

const handleCellClick = (cellId) => {
    if (!gameState.value.isPlaying) return
    if (gameState.value.gameOver) return
    if (!gameState.value.grid) return

    const cell = gameState.value.grid[cellId]
    if (!cell || cell.revealed) return

    revealCell(cellId)
}

const getCellClass = (cell) => {
    if (!cell) return 'cell hidden'
    if (cell.revealed) {
        if (cell.isMine) return 'cell mine exploded'
        return 'cell safe revealed'
    }
    if (gameState.value.gameOver && cell.isMine && !cell.revealed) {
        return 'cell mine shown'
    }
    if (gameState.value.gameOver && !cell.isMine && !cell.revealed) {
        return 'cell safe hidden'
    }
    return 'cell hidden'
}

const getCellContent = (cell) => {
    if (!cell) return '?'
    if (cell.revealed) {
        if (cell.isMine) return '💣'
        return '💰'
    }
    if (gameState.value.gameOver && cell.isMine && !cell.revealed) {
        return '💣'
    }
    if (gameState.value.gameOver && !cell.isMine && !cell.revealed) {
        return '✨'
    }
    return '?'
}
</script>

<template>
    <div class="mines-game">
        <button class="back-btn" @click="goBack">← НАЗАД</button>

        <div class="game-layout">
            <div class="game-field">
                <div class="game-grid" :style="{ gridTemplateColumns: 'repeat(' + gridSize + ', 1fr)' }">
                    <div v-for="i in totalCells" :key="i - 1"
                        :class="getCellClass(gameState.grid ? gameState.grid[i - 1] : null)"
                        @click="handleCellClick(i - 1)">
                        <span>{{ getCellContent(gameState.grid ? gameState.grid[i - 1] : null) }}</span>
                    </div>
                </div>
            </div>

            <div class="interface-panel">
                <h1 class="game-title">МИНЫ</h1>

                <div class="game-info">
                    <div class="balance-info">
                        <span class="balance-label">Баланс:</span>
                        <span class="balance-amount-game">{{ balance.toLocaleString() }} ₽</span>
                    </div>
                </div>
                <div v-if="balance < 10 && !gameState.isPlaying" class="warning-message">
                    ⚠️ Минимальный баланс для игры - 10 ₽
                </div>


                <div class="settings-panel">
                    <div class="mines-select">
                        <div class="mines-label">КОЛИЧЕСТВО МИН:</div>
                        <div class="mines-buttons">
                            <button class="mines-btn" :class="{ active: gameState.minesCount === 1 }"
                                @click="setMinesCount(1)" :disabled="gameState.isPlaying">
                                1 ⚡
                            </button>
                            <button class="mines-btn" :class="{ active: gameState.minesCount === 3 }"
                                @click="setMinesCount(3)" :disabled="gameState.isPlaying">
                                3 ⚡
                            </button>
                            <button class="mines-btn" :class="{ active: gameState.minesCount === 5 }"
                                @click="setMinesCount(5)" :disabled="gameState.isPlaying">
                                5 ⚡
                            </button>
                        </div>
                    </div>

                    <div class="bet-container">
                        <div class="bet-label">СТАВКА:</div>
                        <div class="bet-controls">
                            <button class="bet-adjust" @click="setHalfBet" :disabled="gameState.isPlaying">½</button>
                            <input type="number" :value="gameState.betAmount" @input="updateBet" min="10" :max="balance"
                                :disabled="gameState.isPlaying">
                            <button class="bet-adjust" @click="setDoubleBet"
                                :disabled="gameState.isPlaying || gameState.betAmount * 2 > balance">2×</button>
                            <button class="bet-adjust" @click="setMaxBet" :disabled="gameState.isPlaying">MAX</button>
                        </div>
                        <div class="bet-limits">
                            Мин: 10 ₽ | Макс: {{ balance.toLocaleString() }} ₽
                        </div>
                    </div>

                    <button class="start-btn" @click="handleStartGame"
                        :disabled="gameState.isPlaying || balance < gameState.betAmount">
                        {{ gameState.isPlaying ? 'ИГРА ИДЁТ' : 'НАЧАТЬ ИГРУ' }}
                    </button>
                </div>

                <div v-if="gameState.isPlaying" class="game-stats-panel">
                    <div class="stats-content">
                        <div class="stat">
                            <span class="stat-label">МНОЖИТЕЛЬ:</span>
                            <span class="stat-value">×{{ (gameState.currentMultiplier || 1) }}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">ВЫИГРЫШ:</span>
                            <span class="stat-value">{{ (gameState.cashOutAmount || 0).toLocaleString() }} ₽</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">ОТКРЫТО:</span>
                            <span class="stat-value">{{ (gameState.revealedCells || []).length }} / {{ totalCells -
                                gameState.minesCount }}</span>
                        </div>
                        <button class="cashout-btn-inline" @click="cashOut">
                            ЗАБРАТЬ
                        </button>
                    </div>
                </div>

                <div v-if="gameState.gameOver && !gameState.isPlaying" class="game-over-message"
                    :class="gameState.isWin ? 'win' : 'lose'">
                    <h2>{{ gameState.isWin ? '🎉 ПОБЕДА! 🎉' : '💥 ВЗРЫВ! 💥' }}</h2>
                    <div class="game-over-result">
                        <span v-if="gameState.isWin">ВЫ ВЫИГРАЛИ {{ (gameState.cashOutAmount || 0).toLocaleString() }}
                            ₽</span>
                        <span v-else>ВЫ ПРОИГРАЛИ {{ gameState.betAmount.toLocaleString() }} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mines-game {
    min-height: 100vh;
    background: radial-gradient(circle at 10% 20%, #0f0b1c, #05030a);
    padding: 2rem;
}

.back-btn {
    background: rgba(255, 140, 46, 0.2);
    border: 1px solid #ffa45e;
    padding: 0.5rem 1rem;
    border-radius: 40px;
    color: #ffb46e;
    cursor: pointer;
    margin-bottom: 2rem;
}

.warning-message {
    background: rgba(255, 204, 0, 0.3);
    border: 1px solid #ffcc00;
    padding: 0.3rem 0.8rem;
    border-radius: 40px;
    color: #ffcc00;
    font-size: 0.8rem;
    font-weight: bold;
}

.back-btn:hover {
    background: rgba(255, 140, 46, 0.4);
}

.game-layout {
    display: flex;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: flex-start;
}

.game-field {
    flex: 1.5;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    padding: 1rem;
}

.game-grid {
    display: grid;
    gap: 0.5rem;
}

.cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    font-size: 1.3rem;
    transition: all 0.2s;
}

.cell.hidden {
    background: linear-gradient(145deg, #17122c, #0e0a1e);
    border: 1px solid rgba(255, 164, 69, 0.3);
    cursor: pointer;
}

.cell.hidden:hover {
    transform: scale(1.02);
    border-color: #ff8c42;
}

.cell.safe.hidden {
    background: linear-gradient(145deg, #17122c, #0e0a1e);
    border: 1px solid rgba(255, 164, 69, 0.3);
}

.cell.safe.revealed {
    background: linear-gradient(135deg, #00ff88, #00cc66);
    border: 1px solid #00ff88;
}

.cell.mine.exploded {
    background: linear-gradient(135deg, #ff3333, #cc0000);
    border: 1px solid #ff3333;
}

.cell.mine.shown {
    background: linear-gradient(135deg, #ff6666, #cc3333);
    border: 1px solid #ff6666;
}

.interface-panel {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    padding: 1.5rem;
}

.game-title {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #FFB347, #FF4A00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    margin-bottom: 1.5rem;
    line-height: 1.3;
    padding: 0.2rem 0;
}

.game-info {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 0.8rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.balance-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.balance-label {
    color: #ffcc88;
    font-size: 0.9rem;
    font-weight: bold;
}

.balance-amount-game {
    font-size: 1.2rem;
    font-weight: bold;
    background: linear-gradient(135deg, #FFB347, #FF4A00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.settings-panel {
    margin-bottom: 1rem;
}

.mines-select {
    margin-bottom: 1rem;
}

.mines-label {
    color: #ffcc88;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
}

.mines-buttons {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
}

.mines-btn {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 164, 69, 0.3);
    padding: 0.4rem 1rem;
    border-radius: 40px;
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
}

.mines-btn.active {
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    border-color: #ff8c42;
}

.mines-btn:hover {
    transform: scale(1.02);
}

.mines-btn:disabled {
    opacity: 0.5;
}

.bet-container {
    margin-bottom: 1rem;
}

.bet-label {
    color: #ffcc88;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
}

.bet-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.bet-controls input {
    width: 120px;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 164, 69, 0.3);
    border-radius: 1rem;
    color: white;
    font-size: 0.9rem;
    text-align: center;
}

.bet-controls input:focus {
    outline: none;
    border-color: #ff8c42;
}

.bet-controls input::-webkit-outer-spin-button,
.bet-controls input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.bet-controls input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.bet-adjust {
    background: rgba(255, 140, 46, 0.2);
    border: 1px solid #ffa45e;
    padding: 0.4rem 0.8rem;
    border-radius: 40px;
    color: #ffb46e;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.8rem;
}

.bet-adjust:hover {
    background: rgba(255, 140, 46, 0.4);
}

.bet-adjust:disabled {
    opacity: 0.5;
}

.bet-limits {
    font-size: 0.65rem;
    color: #b0aad0;
    margin-top: 0.3rem;
}

.start-btn {
    background: linear-gradient(95deg, #00ff88, #00cc66);
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
    width: 100%;
}

.start-btn:hover {
    transform: scale(1.02);
}

.start-btn:disabled {
    opacity: 0.6;
}

.game-stats-panel {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 0.8rem;
    margin-bottom: 1rem;
}

.stats-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.stat {
    background: rgba(0, 0, 0, 0.4);
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    text-align: center;
}

.stat-label {
    color: #b0aad0;
    font-size: 0.65rem;
    display: block;
}

.stat-value {
    color: #ffcc88;
    font-size: 0.9rem;
    font-weight: bold;
}

.cashout-btn-inline {
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
}

.cashout-btn-inline:hover {
    transform: scale(1.02);
}

.game-over-message {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
}

.game-over-message.win {
    color: #00ff88;
}

.game-over-message.lose {
    color: #ff3333;
}

.game-over-message h2 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}

.game-over-result {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.play-again-btn {
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
}

@media (max-width: 900px) {
    .game-layout {
        flex-direction: column;
    }

    .game-title {
        font-size: 1.5rem;
    }

    .cell {
        font-size: 1rem;
    }
}

@media (max-width: 550px) {
    .game-grid {
        gap: 0.3rem;
    }

    .cell {
        font-size: 0.8rem;
    }

    .stats-content {
        flex-direction: column;
    }
}
</style>