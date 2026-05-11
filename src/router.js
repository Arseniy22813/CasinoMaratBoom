import { createRouter, createWebHistory } from 'vue-router'

import CasinoHome from './components/CasinoHome.vue'
import RouletteGame from './components/RouletteGame.vue'
import CoinFlipGame from './components/CoinFlipGame.vue'
import MinesGame from './components/MinesGame.vue'
import BlackjackGame from './components/BlackjackGame.vue'
import ErrorPage from './components/ErrorPage.vue'
import BalancePage from './components/BalancePage.vue'

const routes = [
  { path: '/', name: 'Home', component: CasinoHome },
  { path: '/roulette', name: 'RouletteGame', component: RouletteGame },
  { path: '/coinflip', name: 'CoinFlipGame', component: CoinFlipGame },
  { path: '/mines', name: 'MinesGame', component: MinesGame },
  { path: '/blackjack', name: 'BlackjackGame', component: BlackjackGame },
  { path: '/balance', name: 'Balance', component: BalancePage },
  { path: '/:pathMatch(.*)*', name: 'Error', component: ErrorPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})