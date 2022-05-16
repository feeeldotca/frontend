<script setup>
import {watch,inject, computed, defineProps} from 'vue'
import { useStore } from 'vuex';
const props = defineProps(['info'])
const store = useStore()

const {mft, baseArea, gradeArea} = inject('step1')
// calculate total area according to CEC code rules. Basement area is always * 75%. 
// if sqft unit is selected, 0.0929 ratio should apply 
const calcArea = computed(()=> {
  let areaBase = baseArea.value == '' ? 0 : 0.75* parseFloat(baseArea.value) 
  let areaGrade = gradeArea.value == ''? 0: parseFloat(gradeArea.value)
  let area = areaBase + areaGrade
  return mft.value =='m2' ? area : (0.0929 * area)
})

//house loads: if total area is 0, then output should be 0, otherwise calculation accordingly
const houseAreaLoads = computed( () => (calcArea.value <=0) ? 0 :((calcArea.value / 90) < 1) ? 5000 : 5000 + 1000 * (calcArea.value / 90));

//update total load value in store if any changes made on house area calculations
watch(()=>houseAreaLoads.value, 
(v, oldV)=>{
  //console.log(`new is ${v}, old is ${oldV}`)
  store.commit('resetLoads')
})

</script>
<template>
<div v-if="props.info">
      Housearea loads: {{ houseAreaLoads.toFixed(0) }}W.
</div>
  
</template>
<style scoped>
 div {
  background-color: rgba(20, 61, 16, 0.5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  color: white;
  border-top: solid currentColor 1px;
  
  margin-top: 3px;
}

</style>