import { onMounted, onUnmounted, ref, watch } from "vue";
import { loadMicroApp, initGlobalState } from "qiankun";
const vueApp1: any = ref(null);
const vueApp2: any = ref(null);
const angulrApp: any = ref(null);
const angulrApp2: any = ref(null);
const vue2App1: any = ref(null);
const vue2App2: any = ref(null);
let mainMessage = ref("主应用原本的值");

vueApp1.value = loadMicroApp({
    name: "sub-vue1",
    entry: "//localhost:3000", // Vue 子应用的开发服务器地址
    container: "#vueContainer",
    props: {
      id: "vueContainer1",
      defaultPage: "vueCardApp1", // 指定默认加载页面
    },
  });
  setTimeout(() => {
    // 加载第二个 Vue 子应用（显示 AnotherPage）
    vueApp2.value = loadMicroApp({
      name: "sub-vue2",
      entry: "//localhost:3000", // 同一个入口，但 name 不同
      container: "#vueContainerViewport",
      props: {
        id: "vueContainerViewport1",
        defaultPage: "vueCardApp2", // 指定默认加载页面
        actions,
      },
    });
  }, 100);
  // setTimeout(() => {
  //   angulrApp.value = loadMicroApp({
  //     name: "sub-angular",
  //     entry: "//localhost:4200", // 同一个入口，但 name 不同
  //     container: "#angularContainer",
  //     props: {
  //       id: "angularContainer1",
  //       defaultPage: "About", // 指定默认加载页面
  //     },
  //   });
  // }, 1000);
  // // setTimeout(() => {
  // //   // 加载第二个 Vue 子应用（显示 AnotherPage）
  // //   angulrApp2.value = loadMicroApp({
  // //     name: "sub-angular2",
  // //     entry: "//localhost:4200", // 同一个入口，但 name 不同
  // //     container: "#angularCon",
  // //     props: {
  // //       id: "angularCon1",
  // //       defaultPage: "Card", // 指定默认加载页面
  // //     },
  // //   });
  // // }, 3000);
  // setTimeout(() => {
  //   vue2App1.value = loadMicroApp({
  //     name: "sub-vue2-1",
  //     entry: "//localhost:8080", // Vue 子应用的开发服务器地址
  //     container: "#vue2Container",
  //     props: {
  //       id: "vue2Container1",
  //       defaultPage: "SubCard1", // 指定默认加载页面
  //     },
  //   });
  // }, 2000);
  // setTimeout(() => {
  //   vue2App2.value = loadMicroApp({
  //     name: "sub-vue2-2",
  //     entry: "//localhost:8080", // Vue 子应用的开发服务器地址
  //     container: "#vue2ContainerViewport",
  //     props: {
  //       id: "vue2ContainerViewport1",
  //       defaultPage: "SubCard2", // 指定默认加载页面
  //     },
  //   });
  // }, 2000);

  // 获取全局状态通信方法--子应用二
const actions = initGlobalState({ data: "这是主应用传输的数据" });
// 监听子应用通信
actions.onGlobalStateChange((state, prevState) => {
//   mainMessage.value = state.data;
});