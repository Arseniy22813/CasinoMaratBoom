import { ref } from 'vue'
import useWallet from './useWallet'

const gameState = ref({
    isPlaying: false,
    gameOver: false,
    isWin: false,
    betAmount: 100,
    playerCards: [],
    dealerCards: [],
    playerScore: 0,
    dealerScore: 0,
    cashOutAmount: 0,
    gameResult: null,
    deck: []
})

const suits = ['♥', '♦', '♣', '♠']
const suitColors = { '♥': 'red', '♦': 'red', '♣': 'black', '♠': 'black' }
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function createDeck() {
    const deck = []
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value, color: suitColors[suit] })
        }
    }

    return deck.sort(() => Math.random() - 0.5)
}

function getCardValue(card) {
    if (card.value === 'A') return 11
    if (['K', 'Q', 'J'].includes(card.value)) return 10
    return Number(card.value)
}

function calculateScore(cards) {
    let score = 0
    let aces = 0
    
    for (const card of cards) {
        if (card.value === 'A') {
            aces++
            score += 11
        } else {
            score += getCardValue(card)
        }
    }
    
    while (score > 21 && aces > 0) {
        score -= 10
        aces--
    }
    
    return score
}

function startGame() {
    const { balance, updateBalance } = useWallet()
    
    if (balance.value < gameState.value.betAmount) {
        return { success: false, error: 'Недостаточно средств!' }
    }
    
    if (gameState.value.betAmount < 10) {
        return { success: false, error: 'Минимальная ставка - 10 ₽' }
    }
    
    updateBalance(-gameState.value.betAmount)
    
    const deck = createDeck()
    const playerCards = deck.splice(0, 2)
    const dealerCards = deck.splice(0, 2)
    
    const playerScore = calculateScore(playerCards)
    const dealerScore = calculateScore(dealerCards)
    
    gameState.value = {
        isPlaying: true,
        gameOver: false,
        isWin: false,
        betAmount: gameState.value.betAmount,
        playerCards,
        dealerCards,
        playerScore,
        dealerScore,
        cashOutAmount: 0,
        gameResult: null,
        deck
    }
    
    if (playerScore === 21) {
        checkGameResult()
    }
    
    return { success: true }
}

function hit() {
    if (!gameState.value.isPlaying) return
    if (gameState.value.gameOver) return
    
    const newCard = gameState.value.deck.splice(0, 1)[0]
    gameState.value.playerCards.push(newCard)
    gameState.value.playerScore = calculateScore(gameState.value.playerCards)
    
    if (gameState.value.playerScore > 21) {
        gameState.value.isPlaying = false
        gameState.value.gameOver = true
        gameState.value.isWin = false
        gameState.value.gameResult = 'bust'
    }
}

function stand() {
    if (!gameState.value.isPlaying) return
    if (gameState.value.gameOver) return
    
    gameState.value.isPlaying = false
    dealerPlay()
}

function dealerPlay() {
    gameState.value.dealerScore = calculateScore(gameState.value.dealerCards)
    
    while (gameState.value.dealerScore < 17) {
        const newCard = gameState.value.deck.splice(0, 1)[0]
        gameState.value.dealerCards.push(newCard)
        gameState.value.dealerScore = calculateScore(gameState.value.dealerCards)
    }
    
    checkGameResult()
}

function checkGameResult() {
    const playerScore = gameState.value.playerScore
    const dealerScore = gameState.value.dealerScore
    
    if (playerScore > 21) {
        gameState.value.gameResult = 'bust'
        gameState.value.isWin = false
    } else if (dealerScore > 21) {
        gameState.value.gameResult = 'dealer_bust'
        gameState.value.isWin = true
        gameState.value.cashOutAmount = gameState.value.betAmount * 2
        const { updateBalance } = useWallet()
        updateBalance(gameState.value.cashOutAmount)
    } else if (playerScore > dealerScore) {
        gameState.value.gameResult = 'win'
        gameState.value.isWin = true
        gameState.value.cashOutAmount = gameState.value.betAmount * 2
        const { updateBalance } = useWallet()
        updateBalance(gameState.value.cashOutAmount)
    } else if (playerScore < dealerScore) {
        gameState.value.gameResult = 'lose'
        gameState.value.isWin = false
    } else {
        gameState.value.gameResult = 'push'
        gameState.value.isWin = false
        gameState.value.cashOutAmount = gameState.value.betAmount
        const { updateBalance } = useWallet()
        updateBalance(gameState.value.cashOutAmount)
    }
    
    gameState.value.gameOver = true
    gameState.value.isPlaying = false
}

function setBetAmount(amount) {
    if (!gameState.value.isPlaying) {
        gameState.value.betAmount = amount
    }
}

export default function useBlackjack() {
    return {
        gameState,
        startGame,
        hit,
        stand,
        setBetAmount
    }
}