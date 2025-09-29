import { createPinia } from 'pinia';

// 判断是否运行在 Qiankun 环境下
export function getPiniaInstance(props?: any) {
  return (window as any).__POWERED_BY_QIANKUN__ 
    ? props?.sharedPinia // 使用主应用的 Pinia
    : createPinia();     // 独立运行时创建自己的 Pinia
}