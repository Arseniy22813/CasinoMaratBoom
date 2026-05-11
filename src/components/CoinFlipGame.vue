<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import useCoinFlip from '../composables/useCoinFlip'
import useWallet from '../composables/useWallet'

const router = useRouter()
const { balance } = useWallet()
const {
    currentChoice,
    betAmount,
    isFlipping,
    result,
    errorMessage,
    flipCoin,
    setChoice,
    setBet
} = useCoinFlip()

const currentSide = ref('heads')
const pendingOutcome = ref(null)
const animationType = ref('')

const goBack = () => {
    router.push('/')
}

const updateBet = (e) => {
    let value = Number(e.target.value)
    if (isNaN(value)) value = 10
    if (value < 10) value = 10
    if (value > balance.value) value = balance.value
    setBet(value)
}

const setHalfBet = () => {
    const half = Math.floor(betAmount.value / 2)
    if (half >= 10) {
        setBet(half)
    }
}

const setDoubleBet = () => {
    const double = betAmount.value * 2
    if (double <= balance.value) {
        setBet(double)
    }
}

const setMaxBet = () => {
    setBet(balance.value)
}

const handleFlip = () => {

    if (betAmount.value < 10) {
        errorMessage.value = 'Минимальная ставка - 10 ₽'
        setTimeout(() => {
            errorMessage.value = ''
        }, 3000)
        return
    }

    const randomOutcome = Math.random() < 0.5 ? 'heads' : 'tails'
    pendingOutcome.value = randomOutcome

    const isWin = currentChoice.value === randomOutcome
    const winAmount = isWin ? betAmount.value * 2 : 0

    if (currentSide.value === 'heads' && randomOutcome === 'heads') {
        animationType.value = 'heads-to-heads'
    } else if (currentSide.value === 'heads' && randomOutcome === 'tails') {
        animationType.value = 'heads-to-tails'
    } else if (currentSide.value === 'tails' && randomOutcome === 'heads') {
        animationType.value = 'tails-to-heads'
    } else if (currentSide.value === 'tails' && randomOutcome === 'tails') {
        animationType.value = 'tails-to-tails'
    }

    errorMessage.value = ''
    isFlipping.value = true
    result.value = null

    setTimeout(() => {
        currentSide.value = randomOutcome

        const { updateBalance } = useWallet()

        if (isWin) {
            updateBalance(winAmount)
            result.value = {
                outcome: randomOutcome,
                isWin: true,
                amount: winAmount
            }
        } else {
            updateBalance(-betAmount.value)
            result.value = {
                outcome: randomOutcome,
                isWin: false,
                amount: -betAmount.value
            }
        }

        isFlipping.value = false
        animationType.value = ''
        pendingOutcome.value = null
    }, 2000)
}
</script>

<template>
    <div class="coin-flip-game">
        <button class="back-btn" @click="goBack">← НАЗАД</button>

        <div class="game-container">
            <h1 class="game-title">ОРЁЛ & РЕШКА</h1>

            <div class="game-info">
                <div class="balance-info">
                    <span class="balance-label">Ваш баланс:</span>
                    <span class="balance-amount-game">{{ balance.toLocaleString() }} ₽</span>
                </div>
                <div v-if="errorMessage" class="error-message-game">
                    ⚠️ {{ errorMessage }}
                </div>
                <div v-if="balance < 10" class="warning-message">
                    ⚠️ Минимальный баланс для игры - 10 ₽
                </div>
            </div>

            <div class="coin-container">
                <div class="coin">
                    <div class="coin-inner" :class="[
                        { 'show-heads': currentSide === 'heads' && !isFlipping },
                        { 'show-tails': currentSide === 'tails' && !isFlipping },
                        { 'animate-heads-to-heads': animationType === 'heads-to-heads' && isFlipping },
                        { 'animate-heads-to-tails': animationType === 'heads-to-tails' && isFlipping },
                        { 'animate-tails-to-heads': animationType === 'tails-to-heads' && isFlipping },
                        { 'animate-tails-to-tails': animationType === 'tails-to-tails' && isFlipping }
                    ]">
                        <div class="coin-front">
                            <span class="coin-text">ОРЁЛ</span>
                        </div>
                        <div class="coin-back">
                            <span class="coin-text">РЕШКА</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="choice-container">
                <div class="choice-label">ВЫБЕРИ СТОРОНУ:</div>
                <div class="choice-buttons">
                    <button class="choice-btn heads" :class="{ active: currentChoice === 'heads' }"
                        @click="setChoice('heads')" :disabled="isFlipping">
                        ОРЁЛ
                    </button>
                    <button class="choice-btn tails" :class="{ active: currentChoice === 'tails' }"
                        @click="setChoice('tails')" :disabled="isFlipping">
                        РЕШКА
                    </button>
                </div>
            </div>

            <div class="bet-container">
                <div class="bet-label">СТАВКА:</div>
                <div class="bet-controls">
                    <button class="bet-adjust" @click="setHalfBet" :disabled="isFlipping">½</button>
                    <input type="number" :value="betAmount" @input="updateBet" :disabled="isFlipping" min="10"
                        :max="balance">
                    <button class="bet-adjust" @click="setDoubleBet"
                        :disabled="isFlipping || betAmount * 2 > balance">2×</button>
                    <button class="bet-adjust" @click="setMaxBet" :disabled="isFlipping">MAX</button>
                </div>
                <div class="bet-limits">
                    Мин: 10 ₽ | Макс: {{ balance.toLocaleString() }} ₽
                </div>
            </div>

            <button class="flip-btn" @click="handleFlip" :disabled="isFlipping || balance < 10">
                {{ isFlipping ? 'ПОДБРАСЫВАЕМ...' : 'ПОДБРОСИТЬ МОНЕТКУ' }}
            </button>

            <div v-if="result" class="result-container" :class="result.isWin ? 'result-win' : 'result-lose'">
                <h2>РЕЗУЛЬТАТ:</h2>
                <div class="result-outcome">
                    Выпал: {{ result.outcome === 'heads' ? 'ОРЁЛ' : 'РЕШКА' }}
                </div>
                <div class="result-value">
                    {{ result.isWin ? `ВЫ ВЫИГРАЛИ +${result.amount} ₽` : `ВЫ ПРОИГРАЛИ ${result.amount} ₽` }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.coin-flip-game {
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

.game-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

.game-title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #FFB347, #FF4A00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 2rem;
    line-height: 1.3;
    padding: 0.2rem 0;
}

.game-info {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 1rem;
    padding: 0.8rem 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.balance-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.balance-label {
    color: #ffcc88;
    font-size: 1rem;
    font-weight: bold;
}

.balance-amount-game {
    font-size: 1.3rem;
    font-weight: bold;
    background: linear-gradient(135deg, #FFB347, #FF4A00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.error-message-game {
    background: rgba(231, 76, 60, 0.3);
    border: 1px solid #ff3333;
    padding: 0.3rem 0.8rem;
    border-radius: 40px;
    color: #ff3333;
    font-size: 0.8rem;
    font-weight: bold;
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

.coin-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.coin {
    width: 150px;
    height: 150px;
    perspective: 400px;
}

.coin-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 0 0 0 3px #ffa45e;
}

.coin-inner.animate-heads-to-heads {
    animation: flipHeadsToHeads 2s ease-in-out forwards;
}

.coin-inner.animate-heads-to-tails {
    animation: flipHeadsToTails 2s ease-in-out forwards;
}

.coin-inner.animate-tails-to-heads {
    animation: flipTailsToHeads 2s ease-in-out forwards;
}

.coin-inner.animate-tails-to-tails {
    animation: flipTailsToTails 2s ease-in-out forwards;
}

@keyframes flipHeadsToHeads {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(1080deg);
    }
}

@keyframes flipHeadsToTails {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(1260deg);
    }
}

@keyframes flipTailsToHeads {
    0% {
        transform: rotateY(180deg);
    }

    100% {
        transform: rotateY(1440deg);
    }
}

@keyframes flipTailsToTails {
    0% {
        transform: rotateY(180deg);
    }

    100% {
        transform: rotateY(1260deg);
    }
}

.coin-inner.show-heads {
    transform: rotateY(0deg);
}

.coin-inner.show-tails {
    transform: rotateY(180deg);
}

.coin-front,
.coin-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.coin-front {
    transform: rotateY(0deg);
    background: linear-gradient(135deg, #00ff88, #00cc66);
}

.coin-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, #ff3333, #cc0000);
}

.coin-text {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 0 black;
}

.choice-container {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
}

.choice-label {
    color: #ffcc88;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
}

.choice-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.choice-btn {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 164, 69, 0.3);
    padding: 0.8rem 2rem;
    border-radius: 60px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
}

.choice-btn.heads.active {
    background: linear-gradient(95deg, #00ff88, #00cc66);
    border-color: #00ff88;
}

.choice-btn.tails.active {
    background: linear-gradient(95deg, #ff3333, #cc0000);
    border-color: #ff3333;
}

.choice-btn:hover {
    transform: scale(1.02);
}

.choice-btn:disabled {
    opacity: 0.6;
}

.bet-container {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
}

.bet-label {
    color: #ffcc88;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
}

.bet-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.bet-controls input {
    width: 150px;
    padding: 0.6rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 164, 69, 0.3);
    border-radius: 1rem;
    color: white;
    font-size: 1rem;
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
    padding: 0.6rem 1rem;
    border-radius: 40px;
    color: #ffb46e;
    cursor: pointer;
    font-weight: bold;
}

.bet-adjust:hover {
    background: rgba(255, 140, 46, 0.4);
}

.bet-adjust:disabled {
    opacity: 0.5;
}

.bet-limits {
    font-size: 0.7rem;
    color: #b0aad0;
    margin-top: 0.5rem;
}

.flip-btn {
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
    width: 100%;
    margin-bottom: 1.5rem;
}

.flip-btn:hover {
    transform: scale(1.02);
}

.flip-btn:disabled {
    opacity: 0.6;
}

.result-container {
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
}

.result-win {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1));
    border: 2px solid #00ff88;
}

.result-lose {
    background: linear-gradient(135deg, rgba(255, 51, 51, 0.2), rgba(255, 51, 51, 0.1));
    border: 2px solid #ff3333;
}

.result-outcome {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.result-value {
    font-size: 1.5rem;
    font-weight: bold;
}

.result-win .result-value {
    color: #00ff88;
}

.result-lose .result-value {
    color: #ff3333;
}

@media (max-width: 550px) {
    .coin {
        width: 120px;
        height: 120px;
    }

    .coin-text {
        font-size: 1rem;
    }

    .game-title {
        font-size: 1.5rem;
    }

    .choice-btn {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }

    .bet-controls input {
        width: 120px;
    }
}
</style>