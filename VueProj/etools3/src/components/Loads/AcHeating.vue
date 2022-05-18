<script setup>
import { watch, inject, computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(['info'])
const { spaceHeating, acLoading, otherHeating, acAndHeating } = inject("step2");
// const props = defineProps({info:{
//   type:Boolean,
//   default: true
// }})
const acLoads = computed(() =>
  isNaN(parseFloat(acLoading.value)) ? 0 : Number(acLoading.value)
);

// Space heating value according to section 62
const totalSpHeating = computed(() => {
  if (isNaN(parseFloat(spaceHeating.value))) return 0;
  return Number(spaceHeating.value) <= 10
    ? Number(spaceHeating.value)
    : 10 + (Number(spaceHeating.value) - 10) * (0.75).toFixed(2);
});

// if Air conditioner and space heating work at the same time
const acSphTotal = computed(() =>
  acAndHeating.value
    ? parseFloat(acLoads.value) + parseFloat(totalSpHeating.value)
    : Math.max(parseFloat(acLoads.value), parseFloat(totalSpHeating.value))
);

//if has other heating facilities
const heatingAcTotal = computed(
  () =>{
      let load = 0
      if(parseFloat(acSphTotal.value)>0) load += acSphTotal.value
      if(!(isNaN(parseFloat(otherHeating.value)) ||
      parseFloat(otherHeating.value) <= 0)) load += parseFloat(otherHeating.value)
      return 1000*load
  })

// update total load value in store if any changes made on house area calculations
watch(
  () => heatingAcTotal.value,
  (v, oldV) => {
    //console.log(`new is ${v}, old is ${oldV}`)
    store.commit("updateLoads", v - (isNaN(oldV) ? 0 : oldV));
  }
);
</script>
<template>
  <div v-if="props.info">A/C and Heating loads: {{ heatingAcTotal.toFixed(0) }}W.</div>
</template>
<style scoped>

 div {
  background-color: rgba(222, 222, 225, 0.5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  color: black;
}
</style>