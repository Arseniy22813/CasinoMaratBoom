<script setup>
import { ref } from 'vue'

</script>

<template>
    <footer class="app-footer">
        <div class="footer-container">
            <div class="footer-links">
                <div class="links-group">
                    <h4>ИГРЫ</h4>
                    <ul>
                        <li>
                            <RouterLink :to="{ name: 'Error' }">МИНЫ</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'Error' }">РУЛЕТКА</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'Error' }">ОРЕЛ РЕШКА</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'Error' }">БЛЭК ДЖЭК</RouterLink>
                        </li>
                    </ul>
                </div>

                <div class="links-group">
                    <h4>ИНФОРМАЦИЯ</h4>
                    <ul>
                        <li><a href="#">Политика конфиденциальности</a></li>
                        <li><a href="#">Правила и условия</a></li>
                        <li><a href="#">Ответственная игра</a></li>
                    </ul>
                </div>

                <div class="links-group">
                    <h4>КОНТАКТЫ</h4>
                    <ul>
                        <li>📧 support@maratboom.com</li>
                        <li>📞 +7 (777) 777-77-77</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>© 2026 Марат Бум Казино. Все права защищены.</p>
                <p class="disclaimer">Играйте ответственно. 18+</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.app-footer {
    background: linear-gradient(180deg, #0a0618 0%, #05030a 100%);
    border-top: 2px solid #ff7e2e;
    margin-top: 3rem;
    padding: 2rem 1rem 1.5rem;
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;
    margin-bottom: 2rem;
}

.links-group {
    min-width: 180px;
}

.links-group h4 {
    color: #ffaa66;
    font-size: 1rem;
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: 1px;
}

.links-group ul {
    list-style: none;
    padding: 0;
}

.links-group li {
    margin-bottom: 0.75rem;
    color: #9ca3af;
    font-size: 0.9rem;
}

.links-group a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.2s;
}

.links-group a:hover {
    color: #ffa451;
}

.footer-bottom {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 126, 46, 0.3);
}

.footer-bottom p {
    color: #706a92;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
}

.disclaimer {
    color: #ffaa66;
    font-weight: 500;
}

@media (max-width: 768px) {
    .footer-links {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }

    .links-group {
        min-width: auto;
    }
}
</style>