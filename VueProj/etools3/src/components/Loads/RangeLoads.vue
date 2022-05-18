<script setup>
import {watch,inject, computed, defineProps} from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps(['info'])
const {firstRange} = inject('step3')
const RangeWatt = computed(() => {
      if(isNaN(parseFloat(firstRange.value)))
          return 0
      else if(Number(firstRange.value) <= 12 && Number(firstRange.value) > 0)
        return 6000 
      else
        return 6000 + ((Number(firstRange.value) - 12) * 1000 * 0.4)
    })
 
//update total load value in store if any changes made on house area calculations
watch(()=>RangeWatt.value, 
(v, oldV)=>{
  //console.log(`new is ${v}, old is ${oldV}`)
  store.commit('updateLoads', v-(isNaN(oldV)?0:oldV))
})

</script>
<template>
<div v-if="props.info">
      Range loads is  {{ RangeWatt.toFixed(0) }}W.
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