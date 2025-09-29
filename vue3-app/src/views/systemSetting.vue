<template>
    <div>
        这是系统设置页面
        <!-- {{ subWeather }}
        <button @click="changWeather">修改天气</button> -->
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
// let subWeather = ref("阳光明媚！");
// let subWeather:any;
// onMounted(() => {
//   subWeather.value = (window as any).__SUB_APP_WEATHER__;
// });

// // 子应用发起修改主应用值的请求
// function changWeather() {
//    // 修改全局状态（主应用和其他子应用会收到通知）
//   subWeather.setGlobalState({ data: subWeather.value });

// }
</script>