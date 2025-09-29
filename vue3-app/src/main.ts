import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import vueCardApp1 from './views/vueCardApp1.vue'
import vueCardApp2 from './views/vueCardApp2.vue'
import routes from './router/index.ts'
import ElementPlus from 'element-plus'
import HomeView from '././views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import { createRouter, createWebHistory } from 'vue-router'

let app: any = null

function render(props: any = {}) {
  const { container, id = 'vue-app', defaultPage = 'App', type = 'manual' } = props

  // 更新全局状态
  if (props.actions) {
    (window as any).__SUB_APP_ACTIONS__ = props.actions; // 将actions挂载到window上，方便子应用使用
  }
  // 页面映射--手动挂载需要渲染的页面
  const pageMap: Record<string, any> = {
    vueCardApp1,
    vueCardApp2,
    HomeView,
    AboutView,
    App
  }

  // 如果是子应用，则使用默认页面
  const component = pageMap[defaultPage] || App
console.log(defaultPage);
console.log(id);


  const router = createRouter({
    history: createWebHistory(
      type === 'automatic' ? '/vue3-sub-app/' : '/' // 这里需要传要不要走base
    ),
    routes
  })

  // 创建应用实例
  app = createApp(component).use(router).use(ElementPlus)

  // 确定挂载点
  let mountElement = container
    ? container.querySelector(`#${id}`)
    : document.getElementById(id)
    console.log(container);
    
//   let mountElement:any;
// console.log(mountElement);

  // 如果找不到元素，则创建新的挂载点,手动挂载需要的逻辑
  if (!mountElement) {
    mountElement = document.createElement('div')
    mountElement.id = id
    // 找到Qiankun的包装器
    const qiankunWrapper = container || document.querySelector('[data-qiankun]')
    if (qiankunWrapper) {
      qiankunWrapper.appendChild(mountElement)
    } else {
      document.body.appendChild(mountElement)
    }
    console.log(`创建新的挂载点: #${id}`)
  }
  // 挂载应用
  app.mount(mountElement)
}

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  createApp(App).use(router).use(ElementPlus).mount('#vue-app');
}

// 作为子应用运行--手动挂载时调用
renderWithQiankun({
  bootstrap() {
    console.log('子应用 bootstrap')
    // return Promise.resolve()
  },
  mount(props) {
    console.log('子应用 mount', props)
    render(props)
  },
  update(props) {
    console.log('子应用 update', props)
  },
  unmount() {
    console.log('子应用 unmount')
    const mountId = `mount-${app?._instance?.appContext?.config.globalProperties?.appId || 'dynamic-app'}`
    app?.unmount()
    const mountElement = document.getElementById(mountId)
    mountElement?.remove()
    app = null
  }
})
