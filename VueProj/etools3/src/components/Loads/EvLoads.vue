<script setup>
import {watch,inject, computed, defineProps} from 'vue'
import { useStore } from 'vuex';

const store = useStore()

const {evSupply, evEMS} = inject('step5')
const props = defineProps(['info'])

const updateEV=computed(() => {
      let totalEV=0
      if (parseFloat(evSupply.value) >= 0) totalEV+= 1000 * parseFloat(evSupply.value)
      if (parseFloat(evEMS.value) >= 0) totalEV += 0;
     return totalEV;
    })

//update total load value in store if any changes made on house area calculations
watch(()=>updateEV.value, 
(v, oldV)=>{
  //console.log(`new is ${v}, old is ${oldV}`)
  store.commit('updateLoads', v-(isNaN(oldV)?0:oldV))
})

</script>
<template>
<div v-if="props.info">
      EV Equipements loads: {{ updateEV.toFixed(0) }}W.
</div>
  
</template>
<style scoped>
 div {
  background-color: rgba(20, 61, 16, 0.5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  color: white;
}
</style>