<script setup>
import { watch, inject, computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(['info'])
const { moreRange, otherLoads, firstRange } = inject("step6");

const allOtherLoads = computed(() => {
  let load = 0;
  let tmp = 0;
  //total other loads
  tmp += isNaN(parseFloat(otherLoads.value))?0:parseFloat(otherLoads.value)
  tmp += isNaN(parseFloat(moreRange.value))?0:parseFloat(moreRange.value)
  tmp *=1000

  //if there isn't a electric range already in Step 3
  if (
    isNaN(parseFloat(firstRange.value)) ||
    parseFloat(firstRange.value) <= 0
  ) {
    // if total other loads > 6000W & no electric range provided in step 3
    if (tmp > 6000) {
      load += 6000 + (tmp - 6000) * 0.25;
    } else {
      // 100% of total loads less than 6000W & no electric range provided in step 3
      load += tmp;
    }
    return load;
  } else {
    //if already got an Electric range in step 3 then every other loads times 25%
    return tmp * 0.25;
  }
})

//update total load value in store if any changes made on house area calculations
watch(
  () => allOtherLoads.value,
  (v, oldV) => {
    //console.log(`new is ${v}, old is ${oldV}`)
    store.commit("updateLoads", v - (isNaN(oldV) ? 0 : oldV));
  }
);
</script>
<template>
  <div v-if="props.info">All other loads: {{ allOtherLoads.toFixed(0) }}W.</div>
</template>
<style scoped>
 div {
  background-color: rgba(222, 222, 225, 0.5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  color: black;
  border-bottom: solid currentColor 1px;
  border-radius: 5px;
}
</style>