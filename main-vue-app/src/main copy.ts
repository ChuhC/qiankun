import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps,initGlobalState  } from 'qiankun'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入样式文件
import { useGlobalStore } from './stores/global-store';
// import { createPinia } from 'pinia';


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
// const weather:string = '大雨倾盆'

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
    props: {
      // sharedPinia: useGlobalStore // 将主应用的 Pinia 实例传递给子应用
      // weather:actions
    }
  }
])

app.mount('#app')
