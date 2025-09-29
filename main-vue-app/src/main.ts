import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps,initGlobalState,start  } from 'qiankun'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入样式文件
import { useGlobalStore } from './stores/global-store';
// import { createPinia } from 'pinia';


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
// const weather:string = '大雨倾盆'
localStorage.setItem('loacalData', 'hello');

// // 初始化天气状态
// const actions = initGlobalState({weather: '大雨倾盆'});

// // 监听状态变化
// actions.onGlobalStateChange((state, prevState) => {
//   console.log('主应用收到状态变更:', prevState, '→', state);
// });

// app.use(createPinia())
// 创建 Pinia 实例并挂载到全局
// 自动加载应用--主应用传递的值每个子应用都能接收到
registerMicroApps([
  {
    name: 'vue3-sub-app',
    entry: '//localhost:3000/',
    container: '#subApp',
    activeRule: '/vue3-sub-app',
    props:{
      type:'automatic'
    }
  },
  {
    name: 'vue2-app',
    entry: '//localhost:8080/',
    container: '#subApp',
    activeRule: '/vue2-app'
  },
  // {
  //   name: 'angular-subapp',
  //   entry: '//localhost:4201', // 必须与子应用实际地址一致
  //   container: '#subApp',
  //   activeRule: '/angular15-app',
  // }
])
start()
window.addEventListener('qiankun:router-change', (event) => {
  console.log('Qiankun 路由跳转:', event);
});

window.addEventListener('popstate', (event) => {
  console.log('原生 popstate 事件:', event);
});
app.mount('#app')
