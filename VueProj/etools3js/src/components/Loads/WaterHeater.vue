<script setup>
import {watch,inject, computed, defineProps} from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps(['info'])
const {tankless,steamer,poolHeater, hotTub, SPAHeater} = inject('step4')

const waterHeaterCalc = computed(() => {
    let waterHtr = parseFloat(tankless.value) + parseFloat(steamer.value) + parseFloat(poolHeater.value) + parseFloat(hotTub.value) + parseFloat(SPAHeater.value)
    return (isNaN(Number(waterHtr)) || Number(waterHtr)<0 ) ? 0 : 1000 * Number(waterHtr)
    })

//update total load value in store if any changes made on house area calculations
watch(()=>waterHeaterCalc.value, 
(v, oldV)=>{
  //console.log(`new is ${v}, old is ${oldV}`)
  store.commit('updateLoads', v-(isNaN(oldV)?0:oldV))
})

</script>
<template>
<div v-if="props.info">
      Water Heater loads: {{ waterHeaterCalc.toFixed(0) }}W.
</div>
  
</template>
<style scoped>
 div {
  background-color: rgba(222, 222, 225, 0.5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  color: black;
}
</style>