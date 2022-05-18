<script setup lang="ts">
import { useStore } from 'vuex'
import { ref} from 'vue'
import AreaLoads from '@/components/Loads/AreaLoads.vue'
import AcHeating from '../components/Loads/AcHeating.vue'
import RangeLoads from '../components/Loads/RangeLoads.vue'
import WaterHeater from '../components/Loads/WaterHeater.vue'
import EvLoads from '../components/Loads/EvLoads.vue'
import OtherLoads from '../components/Loads/OtherLoads.vue'
import TotalDemandAmps from '../components/Loads/TotalDemandAmps.vue'
const store = useStore()
const detail = ref(false)


</script>
<template>
    <div class="total" style="margin-top: 5px;  border: solid lightseagreen 1px; border-radius: 5px; line-height: 1.5em;">       
     <label for="detail"> Details </label>
     <input type="checkbox" v-model="detail" id="detail" />
        <label for="detail" style="font-weight: bold;">
     Total load is {{ store.getters.getTotalLoads }}W.</label>
     <AreaLoads :info='detail' />
     <AcHeating :info='detail' />
     <RangeLoads :info='detail'  />
     <WaterHeater :info='detail'  />
     <EvLoads :info='detail'  />
     <OtherLoads :info='detail' />
     <!-- <TotalDemandAmps/> -->
    </div>
</template>

<style scoped>
@media screen and (min-width: 500px) {
.total {
 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2em;
  color: brown;
  border: solid green 1px;
  border-radius: 5px;
  background-color: darkseagreen;
  margin: 5px 0;
  width: 70%;
    margin: 0 auto;
    padding-top: 10px;
}
  } 



</style>