import { ref, watch } from "vue";
import useWallet from './useWallet'
const { updateBalance } = useWallet()

const result = ref(null)
const isAnimating = ref(false)
const currentPosition = ref(0)
const errorMessage = ref('')
let transitionTimeout = null

const originalCells = [
  { id: 0, value: 50, label: '50 ₽', type: 'win', color: 'rgba(39, 174, 96)' },
  { id: 1, value: -100, label: '-100 ₽', type: 'lose', color: 'rgba(231, 76, 60)' },
  { id: 2, value: 100, label: '100 ₽', type: 'win', color: 'rgba(39, 174, 96)' },
  { id: 3, value: -1000, label: '-1000 ₽', type: 'lose', color: 'rgba(231, 76, 60)' },
  { id: 4, value: 1000, label: '1000 ₽', type: 'jackpot', color: 'rgba(241, 196, 15)' },
  { id: 5, value: -50, label: '-50 ₽', type: 'lose', color: 'rgba(231, 76, 60)' },
  { id: 6, value: 200, label: '200 ₽', type: 'win', color: 'rgba(39, 174, 96)' },
  { id: 7, value: -500, label: '-500 ₽', type: 'lose', color: 'rgba(231, 76, 60)' },
  { id: 8, value: 150, label: '150 ₽', type: 'win', color: 'rgba(39, 174, 96)' },
  { id: 9, value: -800, label: '-800 ₽', type: 'lose', color: 'rgba(231, 76, 60)' },
  { id: 10, value: 800, label: '800 ₽', type: 'win', color: 'rgba(39, 174, 96)' }
]

const cells = []
for (let i = 0; i < 10; i++) {
    cells.push(...originalCells)
}

const cellWidth = 160
const originalLength = originalCells.length
const targetDuplicateIndex = 5

function getOriginalCell(cell) {
    return originalCells.find(c => c.value === cell.value && c.type === cell.type) || cell
}

function getCenterCell() {
    const viewCenter = 400
    const absolutePos = -currentPosition.value + viewCenter
    const cellIndex = Math.floor(absolutePos / cellWidth)
    
    if (cellIndex >= 0 && cellIndex < cells.length) {
        return getOriginalCell(cells[cellIndex])
    }
    return null
}

function jumpToMiddleDuplicate(cellValue) {
    let targetIndex = -1
    const startIndex = targetDuplicateIndex * originalLength
    const endIndex = startIndex + originalLength
    
    for (let i = startIndex; i < endIndex; i++) {
        if (cells[i] && cells[i].value === cellValue) {
            targetIndex = i
            break
        }
    }
    
    if (targetIndex !== -1) {
        const targetPosition = -(targetIndex * cellWidth) + 400 - (cellWidth / 2)
        const slider = document.querySelector('.slider')
        if (slider) {
            slider.style.transition = 'none'
            currentPosition.value = targetPosition
            setTimeout(() => {
                if (slider) {
                    slider.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.3, 1)'
                }
            }, 50)
        } else {
            currentPosition.value = targetPosition
        }
    }
}

function spinWheel() {
    if (isAnimating.value) return
    
    isAnimating.value = true
    result.value = null
    
    const startPos = currentPosition.value
    const randomSteps = 15 + Math.floor(Math.random() * 25)
    const distance = randomSteps * cellWidth
    const finalPosition = startPos - distance
    

    currentPosition.value = finalPosition
    

    setTimeout(() => {
        const centerCell = getCenterCell()
        
        if (centerCell) {
            result.value = centerCell
            updateBalance(centerCell.value)
            jumpToMiddleDuplicate(centerCell.value)
        }
        isAnimating.value = false
    }, 1500)
}

function getResultClass(type) {
    if (type === 'win') return 'result-win'
    if (type === 'jackpot') return 'result-jackpot'
    return 'result-lose'
}

function initWheel() {
    const startIndex = targetDuplicateIndex * originalLength
    for (let i = startIndex; i < startIndex + originalLength; i++) {
        if (cells[i] && cells[i].value === 50) {
            const targetPosition = -(i * cellWidth) + 400 - (cellWidth / 2)
            currentPosition.value = targetPosition
            break
        }
    }
}

const currentCenterCell = ref(null)

watch(currentPosition, () => {
    if (!isAnimating.value) {
        currentCenterCell.value = getCenterCell()
    }
})

export default function useRouletteGame() {
    return {
        cells,
        currentPosition,
        isAnimating,
        result,
        currentCenterCell,
        errorMessage,
        spinWheel,
        getResultClass,
        initWheel
    }
}