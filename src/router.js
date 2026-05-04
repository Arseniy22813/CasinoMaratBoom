// src/router.js
import { createRouter, createWebHistory } from 'vue-router'

// Импорт компонентов казино
import CasinoHome from './components/CasinoHome.vue'
import MaratBoomMenu from './components/MaratBoomMenu.vue'

// Временно импортируем заглушки для остальных страниц
// Позже вы сможете добавить свои компоненты
const GoodsPage = { template: '<div>Страница товаров (в разработке)</div>' }
const AboutPage = { template: '<div>О нас (в разработке)</div>' }
const ContactsPage = { template: '<div>Контакты (в разработке)</div>' }
const CartPage = { template: '<div>Корзина (в разработке)</div>' }
const LoginPage = { template: '<div>Вход (в разработке)</div>' }
const RegisterPage = { template: '<div>Регистрация (в разработке)</div>' }
const ProfilePage = { template: '<div>Профиль (в разработке)</div>' }
const NotFound = { template: '<div>404 - Страница не найдена</div>' }

const routes = [
  // Редирект с корня на казино
  { path: '/', redirect: '/casino' },
  
  // Главная страница казино
  { path: '/casino', name: 'CasinoHome', component: CasinoHome },
  { path: '/casino/menu', name: 'CasinoMenu', component: MaratBoomMenu },
  { path: '/casino/game/:game', name: 'CasinoGame', component: () => import('./components/CasinoGame.vue') },
  
  // Редиректы для разделов казино
  { path: '/casino/games', redirect: '/casino' },
  { path: '/casino/promos', redirect: '/casino' },
  { path: '/casino/tournaments', redirect: '/casino' },
  { path: '/casino/vip', redirect: '/casino' },
  { path: '/casino/support', redirect: '/casino' },
  
  // Заглушки для остальных маршрутов (можно будет заменить на реальные компоненты)
  { path: '/goods', name: 'Goods', component: GoodsPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/contacts', name: 'Contacts', component: ContactsPage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  
  // 404 страница (должна быть последней)
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router