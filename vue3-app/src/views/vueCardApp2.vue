<template>
  <div>
    <p>{{ massage }}</p>
    <el-button type="primary" plain @click="onChange">改变主应用的值</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onMounted } from "vue";
let massage = ref("这是第二个vue子应用的信息！");

let qiankunActions:any;
onMounted(() => {
  // 从全局获取通信方法（需确保 mount 时已赋值）
  qiankunActions = (window as any).__SUB_APP_ACTIONS__
});
function onChange() {
  // 修改全局状态（主应用和其他子应用会收到通知）
  qiankunActions.setGlobalState({ data: "这是第二个子应用提交的值" });
}
</script>
<style lang="scss" scoped>
// .el-button {
//   margin-top: 20px;
// }
</style>