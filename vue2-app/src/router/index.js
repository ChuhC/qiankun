import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/card1',
    name: 'card1',
    component: () => import('../views/subCard1.vue')
  },
  {
    path: '/subCard2',
    name: 'subCard2',
    component: () => import('../views/subCard2.vue')
  },
  {
    path: '/vueSubapp',
    name: 'vueSubapp',
    component: () => import('../views/vueSubapp.vue')
  }
]

export default routes
