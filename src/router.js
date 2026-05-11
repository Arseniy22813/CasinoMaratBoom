import { createRouter, createWebHistory } from 'vue-router'

import CasinoHome from './components/CasinoHome.vue'
import ErrorPage from './components/ErrorPage.vue'


const routes = [
  { path: '/', name: 'Home', component: CasinoHome },
  { path: '/:pathMatch(.*)*', name: 'Error', component: ErrorPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})