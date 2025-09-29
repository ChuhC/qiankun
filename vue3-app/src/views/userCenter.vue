<script setup lang="ts">
// import { useGlobalStore } from '../stores/global-store';
import { storeToRefs } from 'pinia';
import { watch } from "vue";

// const store = useGlobalStore();
// const { weather } = storeToRefs(store); // 响应式状态

// // 监听主题变化
// watch(weather, (newVal) => {
//   console.log('主题已更新:', newVal);
// });
</script>

<template>
  <div>
    <div>这是用户中心页面</div>
    <!-- <div :class="`theme-${weather}`">今天的天气状况: {{ weather }}</div>
    <el-button @click="store.add('大雨')">切换暗色主题</el-button> -->
  </div>
</template> 