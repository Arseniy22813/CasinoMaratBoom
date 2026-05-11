import { ref } from 'vue'
import useWallet from './useWallet'
const { balance, updateBalance } = useWallet()

const result = ref(null)
const isFlipping = ref(false)
const errorMessage = ref('')
const currentChoice = ref('heads')
const betAmount = ref(100)

const outcomes = {
    heads: { name: 'Орёл', value: 'heads' },
    tails: { name: 'Решка', value: 'tails' }
}

function getRandomOutcome() {
    return Math.random() < 0.5 ? 'heads' : 'tails'
}

function flipCoin() {
    
    if (isFlipping.value) return
    
    errorMessage.value = ''
    isFlipping.value = true
    result.value = null
    
    const winOutcome = getRandomOutcome()
    const isWin = currentChoice.value === winOutcome
    
    setTimeout(() => {
        const winAmount = isWin ? betAmount.value * 2 : 0
        
        if (isWin) {
            updateBalance(winAmount)
            result.value = {
                outcome: winOutcome,
                isWin: true,
                amount: winAmount
            }
        } else {
            updateBalance(-betAmount.value)
            result.value = {
                outcome: winOutcome,
                isWin: false,
                amount: -betAmount.value
            }
        }
        
        isFlipping.value = false
    }, 1500)
}

function setChoice(choice) {
    currentChoice.value = choice
}

function setBet(amount) {
    if (amount >= 10) {
        betAmount.value = amount
    }
}

export default function useCoinFlip() {
    return {
        outcomes,
        currentChoice,
        betAmount,
        isFlipping,
        result,
        errorMessage,
        flipCoin,
        setChoice,
        setBet
    }
}