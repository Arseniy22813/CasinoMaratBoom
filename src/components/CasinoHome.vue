<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="casino-home">
    <section class="welcome-banner">
      <div class="banner-content">
        <div class="banner-text">
          <span class="welcome-badge">ДОБРО ПОЖАЛОВАТЬ</span>
          <h1>МАРАТ БУМ <span>CASINO</span></h1>
          <p>Ощути настоящий азарт и выигрывай вместе с нами!</p>
        </div>
        <div class="banner-stats">
          <div class="stat">
            <div class="stat-number">50 000+</div>
            <div class="stat-label">СЧАСТЛИВЫХ ИГРОКОВ</div>
          </div>
          <div class="stat">
            <div class="stat-number">1 200 000 ₽</div>
            <div class="stat-label">САМЫЙ БОЛЬШОЙ ВЫЙГРЫШ</div>
          </div>
          <div class="stat">
            <div class="stat-number">24/7</div>
            <div class="stat-label">КРУГЛОСУТОЧНО</div>
          </div>
        </div>
      </div>
    </section>

    <section class="games-section">
      <div class="section-header">
        <h2>ПОПУЛЯРНЫЕ ИГРЫ</h2>
        <p>Выбери свою и начни выигрывать прямо сейчас</p>
      </div>

      <div class="games-grid">
        <div class="game-card">
          <div class="game-image">
            <img src="/src/assets/ruletka.jpg" alt="Рулетка">
          </div>
          <div class="game-info">
            <h3>РУЛЕТКА</h3>
            <p>Классическая европейская рулетка. Ставь на цвета, числа и сектора!</p>
            <div class="card-footer">
              <RouterLink :to="{ name: 'RouletteGame' }" class="details-btn">
                Играть →
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="game-card">
          <div class="game-image">
            <img src="/src/assets/orelreshka.jpg" alt="Орел Решка">
          </div>
          <div class="game-info">
            <h3>ОРЕЛ РЕШКА</h3>
            <p>Простая игра на удачу. Угадай сторону монетки и удвой ставку!</p>
            <div class="card-footer">
              <RouterLink :to="{ name: 'CoinFlipGame' }" class="details-btn">
                Играть →
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="game-card">
          <div class="game-image">
            <img src="/src/assets/mines.jpg" alt="Мины">
          </div>
          <div class="game-info">
            <h3>МИНЫ</h3>
            <p>Найди золото и избегай мин. Чем дальше, тем больше выигрыш!</p>
            <div class="card-footer">
              <RouterLink :to="{ name: 'MinesGame' }" class="details-btn">
                Играть →
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="game-card">
          <div class="game-image">
            <img src="/src/assets/blackjack.jpg" alt="Блэк Джэк">
          </div>
          <div class="game-info">
            <h3>БЛЭК ДЖЭК</h3>
            <p>Собери 21 очко и обыграй дилера. Испытай свою стратегию!</p>
            <div class="card-footer">
              <RouterLink :to="{ name: 'BlackjackGame' }" class="details-btn">
                Играть →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="features-container">
        <div class="feature">
          <h4>МГНОВЕННЫЕ ВЫПЛАТЫ</h4>
          <p>Вывод средств за 5 минут на любую карту</p>
        </div>
        <div class="feature">
          <h4>НАДЕЖНОСТЬ</h4>
          <p>Лицензионное казино с защитой данных</p>
        </div>
        <div class="feature">
          <h4>БОНУСЫ КАЖДЫЙ ДЕНЬ</h4>
          <p>Ежедневные акции и турниры с призами</p>
        </div>
        <div class="feature">
          <h4>МОБИЛЬНАЯ ВЕРСИЯ</h4>
          <p>Играй с телефона где угодно</p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h3>ГОТОВ КРУТИТЬ?</h3>
        <p>Присоединяйся к тысячам игроков и выигрывай реальные деньги</p>
        <RouterLink :to="{ name: 'RouletteGame' }" class="cta-btn">НАЧАТЬ ИГРУ</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.casino-home {
  background: radial-gradient(circle at 10% 20%, #0f0b1c, #05030a);
  min-height: 100vh;
}

.welcome-banner {
  background: linear-gradient(135deg, rgba(255, 70, 0, 0.2), rgba(0, 0, 0, 0.8));
  margin: 1.5rem;
  border-radius: 2rem;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 126, 46, 0.3);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-badge {
  background: rgba(255, 126, 46, 0.2);
  padding: 0.3rem 1rem;
  border-radius: 60px;
  font-size: 0.8rem;
  color: #ffa451;
  display: inline-block;
  margin-bottom: 1rem;
}

.banner-text h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #FFB347, #FF4A00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
  padding: 0.2rem 0;
}

.banner-text h1 span {
  background: linear-gradient(135deg, #FFD966, #FF8C00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.banner-text p {
  color: #b0aad0;
  margin-bottom: 1.5rem;
}

.bonus-offer {
  background: rgba(0, 0, 0, 0.5);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 60px;
  backdrop-filter: blur(10px);
}

.bonus-percent {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffaa66;
}

.bonus-text {
  font-size: 0.9rem;
  color: white;
}

.banner-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffaa66;
}

.stat-label {
  font-size: 0.7rem;
  color: #b0aad0;
}

.games-section {
  padding: 2rem 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #b0aad0;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.game-card {
  background: linear-gradient(145deg, #17122c, #0e0a1e);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid rgba(255, 125, 40, 0.2);
}

.game-card:hover {
  transform: translateY(-8px);
  border-color: #ff8c42;
  box-shadow: 0 10px 25px rgba(255, 140, 66, 0.3);
}

.game-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #0a0618;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.game-card:hover .game-image img {
  transform: scale(1.05);
}

.game-info {
  padding: 1.5rem;
}

.game-info h3 {
  font-size: 1.6rem;
  color: #ffcc88;
  margin-bottom: 0.5rem;
}

.game-info p {
  color: #b9afdf;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popularity {
  color: #ffaa66;
  font-size: 0.9rem;
}

.details-btn {
  color: #ff8c42;
  font-weight: bold;
  font-size: 0.9rem;
  text-decoration: none;
  transition: transform 0.2s;
  cursor: pointer;
}

.details-btn:hover {
  transform: translateX(5px);
  color: #ffaa66;
}

.features-section {
  background: rgba(0, 0, 0, 0.4);
  margin: 2rem 1.5rem;
  border-radius: 2rem;
  padding: 2rem;
  backdrop-filter: blur(5px);
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature {
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.feature h4 {
  color: #ffcc88;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.feature p {
  color: #b0aad0;
  font-size: 0.75rem;
}

.cta-section {
  margin: 2rem 1.5rem 3rem;
  background: linear-gradient(95deg, #FF8C2E, #FF5E00);
  border-radius: 2rem;
  padding: 2rem;
  text-align: center;
}

.cta-content h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.cta-content p {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.cta-btn {
  background: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 60px;
  font-weight: bold;
  font-size: 1rem;
  color: #FF5E00;
  cursor: pointer;
  transition: transform 0.2s;
  text-decoration: none;
}

.cta-btn:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .banner-text h1 {
    font-size: 2rem;
    line-height: 1.3;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .games-grid {
    gap: 1rem;
    grid-template-columns: 1fr;
  }

  .game-image {
    height: 180px;
  }

  .banner-stats {
    justify-content: center;
  }
}
</style>