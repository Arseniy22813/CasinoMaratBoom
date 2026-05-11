import { ref } from 'vue'
import useWallet from './useWallet'
const { balance, updateBalance } = useWallet()

const gridSize = 5
const totalCells = 25

const gameState = ref({
    grid: [],
    minesCount: 3,
    betAmount: 100,
    isPlaying: false,
    gameOver: false,
    isWin: false,
    revealedCells: [],
    minePositions: [],
    currentMultiplier: 1,
    cashOutAmount: 0
})

const multipliers = {
    1: [1, 1.5, 2.2, 3.2, 4.5, 6, 8, 10.5, 13.5, 17, 21, 25],
    3: [1, 2, 3.5, 5.5, 8, 11, 15, 20, 26, 33, 41, 50],
    5: [1, 2.5, 5, 9, 15, 23, 34, 48, 65, 85, 110, 140]
}

function initGrid() {
    const grid = []
    for (let i = 0; i < totalCells; i++) {
        grid.push({
            id: i,
            revealed: false,
            isMine: false,
            exploded: false
        })
    }
    return grid
}

function placeMines(count) {
    const positions = []
    while (positions.length < count) {
        const pos = Math.floor(Math.random() * totalCells)
        if (!positions.includes(pos)) {
            positions.push(pos)
        }
    }
    return positions
}

function startGame() {
    
    updateBalance(-gameState.value.betAmount)
    
    const minePositions = placeMines(gameState.value.minesCount)
    const grid = initGrid()
    
    minePositions.forEach(pos => {
        grid[pos].isMine = true
    })
    
    gameState.value = {
        ...gameState.value,
        grid,
        isPlaying: true,
        gameOver: false,
        isWin: false,
        revealedCells: [],
        minePositions,
        currentMultiplier: 1,
        cashOutAmount: 0
    }
    
}

function revealCell(cellId) {
    if (!gameState.value.isPlaying) return false
    if (gameState.value.gameOver) return false
    
    const cell = gameState.value.grid[cellId]
    if (cell.revealed) return false
    
    cell.revealed = true
    
    if (cell.isMine) {
        cell.exploded = true
        gameState.value.isPlaying = false
        gameState.value.gameOver = true
        gameState.value.isWin = false
        return false
        
    }
    
    gameState.value.revealedCells.push(cellId)
    
    const revealedCount = gameState.value.revealedCells.length
    const multiplierArray = multipliers[gameState.value.minesCount]
    const multiplier = multiplierArray[revealedCount] || multiplierArray[multiplierArray.length - 1]
    
    gameState.value.currentMultiplier = multiplier
    gameState.value.cashOutAmount = Math.floor(gameState.value.betAmount * multiplier)
    
    const safeCellsCount = totalCells - gameState.value.minesCount
    if (revealedCount === safeCellsCount) {
        updateBalance(gameState.value.cashOutAmount)
        
        gameState.value.isPlaying = false
        gameState.value.gameOver = true
        gameState.value.isWin = true
        
        return true
    }
    
    return true
}

function cashOut() {
    if (!gameState.value.isPlaying) return false
    if (gameState.value.gameOver) return false
    
    updateBalance(gameState.value.cashOutAmount)
    
    gameState.value.isPlaying = false
    gameState.value.gameOver = true
    gameState.value.isWin = true
    
    return true
}

function setMinesCount(count) {
    if (!gameState.value.isPlaying) {
        gameState.value.minesCount = count
    }
}

function setBetAmount(amount) {
    if (!gameState.value.isPlaying) {
        gameState.value.betAmount = amount
    }
}

export default function useMinesGame() {
    return {
        gameState,
        startGame,
        revealCell,
        cashOut,
        setMinesCount,
        setBetAmount,
        gridSize,
        totalCells
    }
}