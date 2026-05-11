<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useWallet from '../composables/useWallet'

const router = useRouter()
const { balance, updateBalance } = useWallet()
const showDepositBlock = ref(false)
const depositAmount = ref('')
const selectedPayment = ref('card')
const errorMessage = ref('')
const successMessage = ref('')

function goBack() {
    router.push('/')
}

function toggleDepositBlock() {
    showDepositBlock.value = !showDepositBlock.value
    if (!showDepositBlock.value) {
        depositAmount.value = ''
        errorMessage.value = ''
        successMessage.value = ''
    }
}

function getMinAmount() {
    return 10
}

function getMaxAmount() {
    if (selectedPayment.value === 'card') return 100000
    if (selectedPayment.value === 'qiwi') return 15000
    if (selectedPayment.value === 'sbp') return 50000
    if (selectedPayment.value === 'crypto') return 200000
    return 100000
}

function deposit() {
    const amount = Number(depositAmount.value)
    const minAmount = getMinAmount()
    const maxAmount = getMaxAmount()

    errorMessage.value = ''
    successMessage.value = ''

    if (!depositAmount.value || isNaN(amount) || amount <= 0) {
        errorMessage.value = 'Введите корректную сумму'
        return
    }

    if (amount < minAmount) {
        errorMessage.value = `Минимальная сумма пополнения ${minAmount} ₽`
        return
    }

    if (amount > maxAmount) {
        errorMessage.value = `Максимальная сумма пополнения ${maxAmount} ₽`
        return
    }

    updateBalance(amount)
    successMessage.value = `Баланс успешно пополнен на ${amount.toLocaleString()} ₽!`
    depositAmount.value = ''
}
</script>

<template>
    <div class="balance-page">
        <button class="back-btn" @click="goBack">← НАЗАД</button>

        <div class="balance-container">
            <div class="balance-card">
                <div class="balance-label">ТЕКУЩИЙ БАЛАНС</div>
                <div class="balance-amount">{{ balance.toLocaleString() }} ₽</div>
                <button class="deposit-btn" @click="toggleDepositBlock">
                    {{ showDepositBlock ? 'СКРЫТЬ' : 'ПОПОЛНИТЬ БАЛАНС' }}
                </button>
            </div>
        </div>

        <div v-if="showDepositBlock" class="deposit-block">
            <div class="deposit-block-header">
                <h3>ПОПОЛНЕНИЕ БАЛАНСА</h3>
            </div>

            <div class="deposit-block-body">
                <div class="payment-methods">
                    <div class="payment-method" :class="{ active: selectedPayment === 'card' }"
                        @click="selectedPayment = 'card'">
                        <span class="method-icon">💳</span>
                        <span class="method-name">Банковская карта</span>
                    </div>
                    <div class="payment-method" :class="{ active: selectedPayment === 'qiwi' }"
                        @click="selectedPayment = 'qiwi'">
                        <span class="method-icon">🥝</span>
                        <span class="method-name">QIWI</span>
                    </div>
                    <div class="payment-method" :class="{ active: selectedPayment === 'sbp' }"
                        @click="selectedPayment = 'sbp'">
                        <span class="method-icon">⚡</span>
                        <span class="method-name">СБП</span>
                    </div>
                    <div class="payment-method" :class="{ active: selectedPayment === 'crypto' }"
                        @click="selectedPayment = 'crypto'">
                        <span class="method-icon">₿</span>
                        <span class="method-name">Криптовалюта</span>
                    </div>
                </div>

                <div class="amount-input">
                    <label>СУММА ПОПОЛНЕНИЯ</label>
                    <div class="input-wrapper">
                        <input type="number" v-model="depositAmount" placeholder="Введите сумму" min="1" step="any">
                        <span class="input-currency">₽</span>
                    </div>
                </div>

                <div class="limits-info">
                    <div class="limit-item">
                        От {{ getMinAmount().toLocaleString() }} ₽
                    </div>
                    <div class="limit-item">
                        До {{ getMaxAmount().toLocaleString() }} ₽
                    </div>
                </div>

                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>

                <div v-if="successMessage" class="success-message">
                    {{ successMessage }}
                </div>

                <button class="confirm-btn" @click="deposit">
                    ПОПОЛНИТЬ
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.balance-page {
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

.balance-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
}

.balance-card {
    background: linear-gradient(145deg, #17122c, #0e0a1e);
    border-radius: 2rem;
    padding: 3rem;
    text-align: center;
    border: 1px solid #ffa45e;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    min-width: 400px;
}

.balance-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.balance-label {
    color: #ffcc88;
    font-size: 0.9rem;
    letter-spacing: 2px;
    margin-bottom: 1rem;
}

.balance-amount {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #FFB347, #FF4A00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 1rem 0;
    padding: 0.5rem 0;
    line-height: 1.2;
}

.deposit-btn {
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
    margin-top: 1rem;
}

.deposit-btn:hover {
    transform: scale(1.02);
}

.deposit-block {
    max-width: 500px;
    margin: 2rem auto;
    background: linear-gradient(145deg, #17122c, #0e0a1e);
    border-radius: 1.5rem;
    border: 1px solid #ffa45e;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.deposit-block-header {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid rgba(255, 164, 69, 0.3);
    text-align: center;
}

.deposit-block-header h3 {
    color: #ffcc88;
    font-size: 1.2rem;
    margin: 0;
}

.deposit-block-body {
    padding: 1.5rem;
}

.payment-methods {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.payment-method {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 164, 69, 0.3);
    border-radius: 1rem;
    padding: 0.8rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
}

.payment-method:hover {
    background: rgba(255, 140, 46, 0.2);
}

.payment-method.active {
    border-color: #ff8c42;
    background: rgba(255, 140, 46, 0.3);
}

.method-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.3rem;
}

.method-name {
    font-size: 0.8rem;
    color: #ffcc88;
}

.amount-input {
    margin-bottom: 1rem;
}

.amount-input label {
    color: #b0aad0;
    font-size: 0.8rem;
    display: block;
    margin-bottom: 0.5rem;
}

.input-wrapper {
    position: relative;
}

.input-wrapper input {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 164, 69, 0.3);
    border-radius: 1rem;
    color: white;
    font-size: 1.2rem;
    text-align: center;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #ff8c42;
}

.input-wrapper input::-webkit-outer-spin-button,
.input-wrapper input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input-wrapper input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.input-currency {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #ffaa66;
    font-size: 1rem;
    pointer-events: none;
}

.limits-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.7rem;
    color: #b0aad0;
}

.error-message {
    background: rgba(231, 76, 60, 0.2);
    border: 1px solid #ff3333;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #ff3333;
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 1rem;
}

.success-message {
    background: rgba(0, 255, 136, 0.2);
    border: 1px solid #00ff88;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #00ff88;
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 1rem;
}

.confirm-btn {
    width: 100%;
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
}

.confirm-btn:hover {
    transform: scale(1.02);
}

@media (max-width: 550px) {
    .balance-card {
        min-width: auto;
        padding: 2rem;
    }

    .balance-amount {
        font-size: 2.5rem;
    }

    .payment-methods {
        gap: 0.5rem;
    }

    .method-name {
        font-size: 0.7rem;
    }

    .method-icon {
        font-size: 1.5rem;
    }

    .deposit-block {
        margin: 1rem;
    }
}
</style>