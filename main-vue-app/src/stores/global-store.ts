import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    weather: '多云'
  }),
  actions: {
    add(newWeather: string) {
      this.weather = newWeather;
    }
  }
});

//  不能在这赋值导出使用，会导致pinia未初始化就使用
// export const globalStore = useGlobalStore();