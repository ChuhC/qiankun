<template>
  <div>
    <p>{{ massage }}</p>
    <el-button type="primary" plain @click="changMessage"
      >改变主应用的值</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
let massage = ref("这是第一个vue子应用的信息！");

onMounted(() => {
  window.addEventListener("main-to-sub", (event: any) => {
    massage.value = event.detail.mainMessage;
  });
});
onUnmounted(() => {
  //   window.removeEventListener('main-to-sub', handler);
});
// 子应用发起修改主应用值的请求
function changMessage() {
  const event = new CustomEvent("updateMainAppData", {
    detail: { massage: "这是子应用修改后的值！" }
  });
  window.dispatchEvent(event);
}
</script>
<style lang="scss" scoped>
div {
  color: red;
}
</style>