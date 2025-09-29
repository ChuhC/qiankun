import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  base: '/vue3-sub-app/', // 必须与主应用activeRule一致
  plugins: [
    vue(),
    qiankun('vue3-sub-app', { 
      useDevMode: true  // 启用开发模式，允许子应用独立运行（不依赖主应用），便于调试。
    }) //集成 qiankun 微前端插件，标识子应用名为 vue3-sub-app
  ],
  server: {
    port: 3000,
    // cors: true,
    // origin: 'http://localhost:3000', // 解决跨域问题
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // }
  },
})