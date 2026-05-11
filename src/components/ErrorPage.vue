<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="error-page">
        <div class="error-block">
            <div class="image-container">
                <img src="/src/assets/error.jpg" alt="404" class="error-image">
                <button class="back-btn" @click="goHome">ВЕРНУТЬСЯ НА ГЛАВНУЮ</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.error-block {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 2rem;
    padding: 4rem;
    text-align: center;
    max-width: 900px;
    width: 100%;
}

.image-container {
    position: relative;
    display: flex;
    justify-content: center;
}

.error-image {
    width: 100%;
    max-width: 700px;
    height: auto;
    display: block;
    border-radius: 1rem;
}

.back-btn {
    position: absolute;
    bottom: 20px;
    right: calc(50% - 350px + 20px);
    background: linear-gradient(95deg, #FF8C2E, #FF5E00);
    padding: 0.8rem 1.8rem;
    font-size: 0.9rem;
    border: none;
    border-radius: 60px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
    z-index: 10;
}

.back-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 94, 0, 0.4);
}
</style>