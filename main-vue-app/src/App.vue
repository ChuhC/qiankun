<script setup lang="ts">
// import { start } from "qiankun";
// import { onMounted } from "vue";

// onMounted(() => {
//   if (!(window as any).qiankunStarted) {
//     (window as any).qiankunStarted = true;
//     start({ sandbox: { experimentalStyleIsolation: true } });
//   }
// });
</script>

<template>
  <div class="layout">
    <el-menu
      class="navigation-menu-left"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/vue3-sub-app/userCenter">用户中心</el-menu-item>
      <el-menu-item index="/vue3-sub-app/systemSetting">系统设置</el-menu-item>
      <el-menu-item index="/vue2-app/vueSubapp">vue2子应用</el-menu-item>
      <!-- <el-menu-item index="/angular15-app/vueSubapp">angular15子应用</el-menu-item> -->
    </el-menu>
    <div class="main-container">
      <router-view />
      <!-- <keep-alive> -->
        <div id="subApp" class="sub-app-container"></div>
      <!-- </keep-alive> -->

    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: space-between;
  .navigation-menu-left {
    height: 100vh;
    width: 200px;
  }

  .main-container {
    height: calc(100vh - 240px);
    width: calc(100% - 220px);
    margin: 20px;
    .sub-app-container {
      // height: 100%;
      // width: 100%;
    }
  }
}
</style>
