<template>
  <div class="home">
    <!-- 子应用挂载点 -->
    <div>
      <el-button type="primary" plain @click="sendToSubApp"
        >CustomEvent传数据</el-button
      >
      <!-- <el-button type="primary" plain @click="sendToSubAppGlobal">setGlobalState传数据</el-button> -->
    </div>
    <div style="margin-left: 15px">
      {{ mainMessage }}
    </div>
    <div class="vue-apps-container">
      <div class="vue-app-card">
        <h3>vue3子应用</h3>
        <!-- <keep-alive> -->
        <div id="vueContainer"></div>
        <!-- </keep-alive> -->
      </div>
      <div class="vue-app-card">
        <h3>vue3子应用</h3>
        <div id="vueContainerViewport"></div>
      </div>
      <div class="vue-app-card">
        <h3>angular20子应用</h3>
        <div id="angularContainer"></div>
      </div>
      <!-- <div class="vue-app-card">
        <h3>angular15子应用</h3>
        <div id="angularCon"></div>
      </div> -->
    </div>
    <div class="vue-apps-container">
      <div class="vue-app-card">
        <h3>vue2子应用</h3>
        <div id="vue2Container"></div>
      </div>
      <div class="vue-app-card">
        <h3>vue2子应用</h3>
        <div id="vue2ContainerViewport"></div>
      </div>
      <div class="vue-app-card">
        <h3>angular15子应用</h3>
        <div id="angular15Container"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadMicroApp, initGlobalState } from "qiankun";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// 使用 ref 保存微应用实例
const vueApp1: any = ref(null);
const vueApp2: any = ref(null);
const angulrApp: any = ref(null);
const angulrApp2: any = ref(null);
const vue2App1: any = ref(null);
const vue2App2: any = ref(null);
const angular15App: any = ref(null);
let mainMessage = ref("主应用原本的值");

onMounted(() => {
  // if (!(window as any).qiankunStarted) {
  //   (window as any).qiankunStarted = true;
  //   start({ sandbox: { experimentalStyleIsolation: true } });
  // }
  // 加载第一个 Vue 子应用（显示 vueCardApp1）
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
  }, 1000);
  setTimeout(() => {
    angulrApp.value = loadMicroApp({
      name: "sub-angular",
      entry: "//localhost:4200", // 同一个入口，但 name 不同
      container: "#angularContainer",
      props: {
        id: "angularContainer1",
        defaultPage: "About", // 指定默认加载页面
      },
    });
  }, 1500);
  // setTimeout(() => {
  //   // 加载第二个 Vue 子应用（显示 AnotherPage）
  //   angulrApp2.value = loadMicroApp({
  //     name: "sub-angular2",
  //     entry: "//localhost:4201", // 同一个入口，但 name 不同
  //     container: "#angularCon",
  //     props: {
  //       id: "angularCon1",
  //       defaultPage: "Card", // 指定默认加载页面
  //     },
  //   });
  // }, 3000);
  setTimeout(() => {
    vue2App1.value = loadMicroApp({
      name: "sub-vue2-1",
      entry: "//localhost:8080", // Vue 子应用的开发服务器地址
      container: "#vue2Container",
      props: {
        id: "vue2Container1",
        defaultPage: "SubCard1", // 指定默认加载页面
      },
    });
  }, 2000);
  setTimeout(() => {
    vue2App2.value = loadMicroApp({
      name: "sub-vue2-2",
      entry: "//localhost:8080", // Vue 子应用的开发服务器地址
      container: "#vue2ContainerViewport",
      props: {
        id: "vue2ContainerViewport1",
        defaultPage: "SubCard2", // 指定默认加载页面
      },
    });
  }, 2500);
  setTimeout(() => {
    angular15App.value = loadMicroApp({
      name: "angular15-app",
      entry: "//localhost:4201", // Angular 子应用的开发服务器地址
      container: "#angular15Container",
      props: {
        id: "angular15Container1",
        defaultPage: "about", // 指定默认加载页面
      },
    });
  }, 3000);
});
onUnmounted(() => {
  // 卸载子应用（防止内存泄漏）
  vueApp1.value?.unmount();
  vueApp2.value?.unmount();
  angulrApp.value?.unmount();
  angulrApp2.value?.unmount();
  vue2App1.value?.unmount();
  vue2App2.value?.unmount();
  angular15App.value?.unmount();
});
// 路由变化时卸载所有手动应用
watch(
  () => route.path,
  (newPath) => {
    if (newPath !== "/") {
      // 卸载子应用（防止内存泄漏）
      vueApp1.value?.unmount();
      vueApp2.value?.unmount();
      angulrApp.value?.unmount();
      angulrApp2.value?.unmount();
      vue2App1.value?.unmount();
      vue2App2.value?.unmount();
      angular15App.value?.unmount();
    }
  }
);

// CustomEvent 自定义事件--子应用一
const sendToSubApp = () => {
  // 发送全局事件
  window.dispatchEvent(
    new CustomEvent("main-to-sub", {
      detail: { mainMessage: "这是主应用传来的数据" },
    })
  );
};
// 主应用监听事件
window.addEventListener("updateMainAppData", (event: any) => {
  // 主应用主动更新自己的数据（如 React/Vue 的状态）
  mainMessage.value = event.detail.massage;
});

// 获取全局状态通信方法--子应用二
const actions = initGlobalState({ data: "这是主应用传输的数据" });
// 监听子应用通信
actions.onGlobalStateChange((state, prevState) => {
  mainMessage.value = state.data;
});
</script>
<style lang="scss" scoped>
.vue-apps-container {
  display: flex;
  justify-content: space-between;
  // width: 100vw;
  height: 300px;
  .vue-app-card {
    margin: 0 10px;
    padding: 10px;
    height: 200px;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    // #vueContainer{
    //   background-color: #ccc;
    // }
  }
}
button {
  margin: 10px;
}
</style>