import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter',{
  id: "count",
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
