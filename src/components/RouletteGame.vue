<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import useRouletteGame from '../composables/useRouletteGame'
import useWallet from '../composables/useWallet'

const router = useRouter()
const { balance } = useWallet()
const {
    cells,
    currentPosition,
    isAnimating,
    result,
    currentCenterCell,
    errorMessage,
    spinWheel,
    getResultClass,
    initWheel
} = useRouletteGame()

const goBack = () => {
    router.push('/')
}

const getScrollPosition = () => {
    return `translateX(${currentPosition.value}px)`
}

onMounted(() => {
    initWheel()
})
</script>

<template>
    <div class="roulette-game">
        <button class="back-btn" @click="goBack">← НАЗАД</button>

        <div class="game-container">
            <h1 class="game-title">РУЛЕТКА ФОРТУНЫ</h1>

            <div class="game-info">
                <div class="balance-info">
                    <span class="balance-label">Ваш баланс:</span>
                    <span class="balance-amount-game">{{ balance.toLocaleString() }} ₽</span>
                </div>
                <div v-if="errorMessage" class="error-message-game">
                    ⚠️ {{ errorMessage }}
                </div>
                <div v-if="balance < 1000 && !isAnimating" class="warning-message">
                    ⚠️ Минимальный баланс для игры - 1000 ₽
                </div>
            </div>

            <div class="slider-wrapper">
                <div class="slider-container">
                    <div class="slider" :style="{ transform: getScrollPosition() }">
                        <div v-for="(cell, idx) in cells" :key="idx" class="cell"
                            :style="{ backgroundColor: cell.color }">
                            <span class="cell-value">{{ cell.label }}</span>
                        </div>
                    </div>
                </div>
                <div class="pointer"></div>
                <div class="pointer-line"></div>
            </div>

            <button class="spin-btn" @click="spinWheel" :disabled="isAnimating || balance < 1000">
                {{ isAnimating ? 'ВРАЩЕНИЕ...' : 'ВРАЩАТЬ' }}
            </button>

            <div v-if="result" class="result-container" :class="getResultClass(result.type)">
                <h2>РЕЗУЛЬТАТ:</h2>
                <div class="result-value">
                    {{ result.value >= 0 ? `+${result.value} ₽` : `${result.value} ₽` }}
                </div>
                <div class="result-message" v-if="result.type === 'win'">
                    ПОЗДРАВЛЯЕМ! ВЫ ВЫИГРАЛИ {{ result.value }} ₽
                </div>
                <div class="result-message" v-else-if="result.type === 'jackpot'">
                    ДЖЕКПОТ! ВЫ ВЫИГРАЛИ 1000 ₽!
                </div>
                <div class="result-message" v-else>
                    ВЫ ПРОИГРАЛИ {{ Math.abs(result.value) }} ₽
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.roulette-game {
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
    max-width: 900px;
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
    line-height: 1.2;
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

.slider-wrapper {
    position: relative;
    width: 800px;
    margin: 0 auto;
}

.slider-container {
    width: 800px;
    height: 220px;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), 0 0 0 3px #ffa45e;
    background: #0a0618;
}

.slider {
    display: flex;
    height: 100%;
    transition: transform 1.5s cubic-bezier(0.2, 0.8, 0.3, 1);
}

.cell {
    width: 160px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.cell-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 0 black;
}

.pointer {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 45px solid #ffa45e;
    z-index: 10;
}

.pointer-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 220px;
    background: linear-gradient(to bottom, #ffa45e, transparent);
    z-index: 5;
    pointer-events: none;
}

.spin-btn {
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 1rem 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
    margin-top: 2rem;
}

.spin-btn:hover {
    transform: scale(1.05);
}

.spin-btn:disabled {
    opacity: 0.6;
}

.result-container {
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
}

.result-win {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1));
    border: 2px solid #00ff88;
}

.result-jackpot {
    background: linear-gradient(135deg, rgba(255, 204, 0, 0.3), rgba(255, 204, 0, 0.1));
    border: 2px solid #ffcc00;
}

.result-lose {
    background: linear-gradient(135deg, rgba(255, 51, 51, 0.2), rgba(255, 51, 51, 0.1));
    border: 2px solid #ff3333;
}

.result-value {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.5rem 0;
}

.result-win .result-value {
    color: #00ff88;
}

.result-jackpot .result-value {
    color: #ffcc00;
}

.result-lose .result-value {
    color: #ff3333;
}

.result-message {
    font-size: 1rem;
    margin-top: 0.5rem;
}

@media (max-width: 850px) {
    .slider-wrapper {
        width: 650px;
    }

    .slider-container {
        width: 650px;
        height: 180px;
    }

    .cell {
        width: 130px;
        height: 180px;
    }

    .cell-value {
        font-size: 1rem;
    }

    .pointer-line {
        height: 180px;
    }

    .game-info {
        flex-direction: column;
    }
}

@media (max-width: 700px) {
    .slider-wrapper {
        width: 520px;
    }

    .slider-container {
        width: 520px;
        height: 150px;
    }

    .cell {
        width: 104px;
        height: 150px;
    }

    .cell-value {
        font-size: 0.8rem;
    }

    .pointer-line {
        height: 150px;
    }

    .game-title {
        font-size: 1.5rem;
    }
}

@media (max-width: 550px) {
    .slider-wrapper {
        width: 390px;
    }

    .slider-container {
        width: 390px;
        height: 120px;
    }

    .cell {
        width: 78px;
        height: 120px;
    }

    .cell-value {
        font-size: 0.6rem;
    }

    .pointer-line {
        height: 120px;
    }

    .game-title {
        font-size: 1.3rem;
    }

    .spin-btn {
        padding: 0.8rem 2rem;
        font-size: 1.2rem;
    }

    .result-value {
        font-size: 1.5rem;
    }
}
</style>