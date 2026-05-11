<script setup>
import { useRouter } from 'vue-router'
import useBlackjack from '../composables/useBlackjack'
import useWallet from '../composables/useWallet'

const router = useRouter()
const { balance } = useWallet()
const {
    gameState,
    startGame,
    hit,
    stand,
    setBetAmount
} = useBlackjack()

const goBack = () => {
    router.push('/')
}

const updateBet = (e) => {
    let value = parseInt(e.target.value)
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
    if (gameState.value.isPlaying) return
    startGame()
}
</script>

<template>
    <div class="blackjack-game">
        <button class="back-btn" @click="goBack">← НАЗАД</button>

        <div class="game-layout">
            <div class="game-field">
                <div class="dealer-section">
                    <h2>ДИЛЕР</h2>
                    <div class="cards">
                        <template v-if="gameState.playerCards.length > 0">
                            <div v-for="(card, idx) in gameState.dealerCards" :key="idx" class="card"
                                :class="card.color">
                                <div class="card-suit">{{ card.suit }}</div>
                                <div class="card-value">{{ card.value }}</div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="card-placeholder"></div>
                            <div class="card-placeholder"></div>
                        </template>
                    </div>
                    <div class="score" v-if="gameState.playerCards.length > 0">
                        Очки дилера: {{ gameState.dealerScore }}
                    </div>
                </div>

                <div class="player-section">
                    <h2>ИГРОК</h2>
                    <div class="cards">
                        <template v-if="gameState.playerCards.length > 0">
                            <div v-for="(card, idx) in gameState.playerCards" :key="idx" class="card"
                                :class="card.color">
                                <div class="card-suit">{{ card.suit }}</div>
                                <div class="card-value">{{ card.value }}</div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="card-placeholder"></div>
                            <div class="card-placeholder"></div>
                        </template>
                    </div>
                    <div class="score" v-if="gameState.playerCards.length > 0">
                        Очки игрока: {{ gameState.playerScore }}
                    </div>
                </div>
            </div>

            <div class="interface-panel">
                <h1 class="game-title">БЛЭК ДЖЭК</h1>

                <div class="game-info">
                    <div class="balance-info">
                        <span class="balance-label">Баланс:</span>
                        <span class="balance-amount-game">{{ balance.toLocaleString() }} ₽</span>
                    </div>
                </div>
                <div v-if="balance < 10 && !gameState.isPlaying && !gameState.gameOver" class="warning-message">
                    ⚠️ Минимальный баланс для игры - 10 ₽
                </div>

                <div class="settings-panel">
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
                        {{ gameState.isPlaying ? 'ИГРА ИДЁТ' : 'НАЧАТЬ РАУНД' }}
                    </button>
                </div>

                <div v-if="gameState.isPlaying && !gameState.gameOver" class="game-controls">
                    <button class="action-btn hit-btn" @click="hit">ВЗЯТЬ КАРТУ</button>
                    <button class="action-btn stand-btn" @click="stand">ОСТАНОВИТЬСЯ</button>
                </div>

                <div v-if="gameState.gameOver" class="result-message" :class="gameState.isWin ? 'win' : 'lose'">
                    <h2 v-if="gameState.gameResult === 'win' || gameState.gameResult === 'dealer_bust'">🎉 ПОБЕДА! 🎉
                    </h2>
                    <h2 v-else-if="gameState.gameResult === 'push'">🤝 НИЧЬЯ 🤝</h2>
                    <h2 v-else>💥 ПРОИГРЫШ 💥</h2>
                    <div class="result-amount">
                        <span v-if="gameState.gameResult === 'win' || gameState.gameResult === 'dealer_bust'">
                            ВЫ ВЫИГРАЛИ {{ gameState.cashOutAmount.toLocaleString() }} ₽
                        </span>
                        <span v-else-if="gameState.gameResult === 'push'">
                            ВАША СТАВКА ВОЗВРАЩЕНА
                        </span>
                        <span v-else>
                            ВЫ ПРОИГРАЛИ {{ gameState.betAmount.toLocaleString() }} ₽
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.blackjack-game {
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

.warning-message {
    background: rgba(255, 204, 0, 0.3);
    border: 1px solid #ffcc00;
    padding: 0.3rem 0.8rem;
    border-radius: 40px;
    color: #ffcc00;
    font-size: 0.8rem;
    font-weight: bold;
}

.game-field {
    flex: 1.5;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    padding: 1.5rem;
}

.dealer-section,
.player-section {
    text-align: center;
    margin-bottom: 2rem;
}

.dealer-section h2,
.player-section h2 {
    color: #ffcc88;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.cards {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    min-height: 130px;
}

.card {
    width: 80px;
    height: 110px;
    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
}

.card-placeholder {
    width: 80px;
    height: 110px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    border: 1px dashed rgba(255, 164, 69, 0.3);
}

.card.red {
    color: #ff3333;
}

.card.black {
    color: #000000;
}

.card-suit {
    font-size: 2rem;
    line-height: 1;
}

.card-value {
    font-size: 1.5rem;
    font-weight: bold;
}

.score {
    margin-top: 0.5rem;
    color: #ffcc88;
    font-weight: bold;
    font-size: 1rem;
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

.game-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.action-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
}

.hit-btn {
    background: linear-gradient(95deg, #2ecc71, #27ae60);
}

.hit-btn:hover {
    transform: scale(1.02);
}

.stand-btn {
    background: linear-gradient(95deg, #e74c3c, #c0392b);
}

.stand-btn:hover {
    transform: scale(1.02);
}

.result-message {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
    margin-bottom: 1rem;
}

.result-message.win {
    color: #00ff88;
}

.result-message.lose {
    color: #ff3333;
}

.result-message h2 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}

.result-amount {
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

    .card,
    .card-placeholder {
        width: 60px;
        height: 85px;
    }

    .card-suit {
        font-size: 1.5rem;
    }

    .card-value {
        font-size: 1.2rem;
    }
}

@media (max-width: 550px) {

    .card,
    .card-placeholder {
        width: 50px;
        height: 70px;
    }

    .card-suit {
        font-size: 1.2rem;
    }

    .card-value {
        font-size: 1rem;
    }

    .game-controls {
        flex-direction: column;
    }
}
</style>