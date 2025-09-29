import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const routes = [
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('./../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/userCenter',
    component: () => import('../views/userCenter.vue')
  },
  {
    path: '/systemSetting',
    component: () => import('./../views/systemSetting.vue')
  }
]
console.log(qiankunWindow.__POWERED_BY_QIANKUN__+'是qiankun吗');
console.log(import.meta.env.BASE_URL+'是baseurl吗');

const router = createRouter({
  // history: createWebHistory(
  //   qiankunWindow.__POWERED_BY_QIANKUN__? '/vue3-sub-app/' :'/'
  // ),
  history: createWebHistory(import.meta.env.BASE_URL),
  // history:createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  console.log('子应用路由跳转:', from.path, '→', to.path);
  next();
});
export default routes