import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/about' // 重定向到首页
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'), // 懒加载
    // meta: { isMainApp: true } // 标记为主应用路由
  },
  // { path: '/:pathMatch(.*)*', component: () => import('../views/HomeView.vue') }, // 不拦截/vue3-sub-app
  // {
  //   path: '/vue3-sub-app/*', // 明确子应用路径范围
  //   name: 'Vue3SubApp',
  //   meta: { isMicroApp: true }
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// 主应用路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/home') {
    console.log('主应用首页路由跳转:', from.path, '→', to.path);
    next(); // 放行主应用首页
  } else if (to.path.startsWith('/sub-app')) {
    console.log('子应用路由跳转:', from.path, '→', to.path);
    next(); // 放行子应用路由
  } else {
    console.log('主应用路由跳转:', from.path, '→', to.path);
    next(); // 其他主应用路由
  }
});
export default router