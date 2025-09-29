<script setup lang="ts">
import { ref, onMounted } from "vue";
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const isQiankun = ref(false);

onMounted(() => {
  isQiankun.value = !qiankunWindow.__POWERED_BY_QIANKUN__; 
  console.log('是qiankun吗'+isQiankun.value);
});
</script>

<template>
  <div v-if="isQiankun" >
    <div class="dashboard-page">
      <h2>这是app.vue</h2>
    </div>
  </div>
  <router-view v-else />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
