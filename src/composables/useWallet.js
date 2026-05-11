import { ref } from 'vue'

const balance = ref(0)
const callbacks = []

if (localStorage.getItem('userBalance')) {
    balance.value = Number(localStorage.getItem('userBalance'))
}

function updateBalance(amount) {
    balance.value += amount
    localStorage.setItem('userBalance', balance.value.toString())
    callbacks.forEach(cb => cb(balance.value))
}

function onBalanceChange(callback) {
    callbacks.push(callback)
}

export default function useWallet() {
    return { balance, updateBalance, onBalanceChange }
}