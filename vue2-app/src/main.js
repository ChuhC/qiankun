import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import VueRouter from 'vue-router'
// import store from './store'
import SubCard1 from './views/subCard1.vue'
import SubCard2 from './views/subCard2.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
// new Vue({
//   router,
//   store,
//   render: (h) => h(App)
// }).$mount('#app')
let instance = null
function render (props = {}) {
  const { container, id = 'app', defaultPage = 'App' } = props
  console.log(props)
  console.log('ZHESHISSSSSSSSSSSSSSSS')
  // 页面映射--手动挂载需要渲染的页面
  const pageMap = {
    App,
    SubCard1,
    SubCard2
  }
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue2-app/' : '/',
    mode: 'history',
    routes
  })
  // 如果是子应用，则使用默认页面
  const component = pageMap[defaultPage] || App
  // 确定挂载点
  let mountElement = container
    ? container.querySelector(`#${id}`)
    : document.getElementById(id)

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
  // 创建应用实例
  instance = new Vue({
    router,
    // store,
    render: (h) => h(component)
  }).$mount(mountElement)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
