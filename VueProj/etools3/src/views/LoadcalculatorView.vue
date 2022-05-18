<script setup>
import { ref, provide, watch, computed } from "vue";
import {useStore} from 'vuex'
import LoadCalculator from "@/pages/LoadCalculator.vue";

const store = useStore()
const mft = ref("m2");
const baseArea = ref("");
const gradeArea = ref("");
const spaceHeating = ref("");
const acLoading = ref("");
const otherHeating = ref("");
const acAndHeating = ref(false);
const acHT = ref(false);
const hasRange = ref(true);
const hasWTHT = ref(false);
const hasEV = ref(false);
const hasOther = ref(true);
const moreRange = ref("");
const tankless = ref("");
const firstRange = ref("");
const steamer = ref("");
const poolHeater = ref("");
const hotTub = ref("");
const SPAHeater = ref("");
const evSupply = ref("");
const evEMS = ref("");
const otherLoads = ref("");
let mixedInput=[baseArea,gradeArea,spaceHeating,acLoading,otherHeating,moreRange, tankless,firstRange,steamer,poolHeater,hotTub,SPAHeater,evSupply,evEMS,otherLoads]
const wat = computed(()=>(mixedInput.every((item)=>item.value=="")))
// watch(()=>wat.value, v=>{ if(v) store.commit('resetLoads') })
provide("step1", {
  mft,
  baseArea,
  gradeArea,
});
provide("step2", {
  spaceHeating,
  acLoading,
  otherHeating,
  acAndHeating,
});

provide("step3", {
  firstRange,
});
provide("step4", {
  tankless,
  steamer,
  poolHeater,
  hotTub,
  SPAHeater,
});

provide("step5", {
  evSupply,
  evEMS,
});
provide("step6", {
  firstRange,
  moreRange,
  otherLoads,
});


</script>


<template>

  <div class="container">  
    <h1 class="headings1">E-Tools Version 3.0</h1>
    <h4 class="headings">
      <!-- // #region Calculate total house area    -->
      House Area&nbsp; &nbsp;&nbsp;&nbsp;
      <span style="display: inline-block; border: solid yellow 1px; border-radius: 3px; width: 90px;">
        <input type="radio" name="morft1" v-model="mft" value="m2" />
        <label for="morft1">㎡</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="radio" name="morft2" v-model="mft" value="ft2" />
        <label for="morft2">ft<sup>2</sup></label>
      </span>
    </h4>

    <div class="box1">
      <dl>
        <div class="prelabel">
          <label for="input-basement">Actual basement area: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-basement"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="baseArea"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-abovegrade">Above grade house area: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-abovegrade"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="gradeArea"
          />
        </div>
      </dl>
    </div>

    <h4 class="headings">
      <input type="checkbox" v-model="acHT" id="acHT" />
      <label for="acHT">Heating/AirCon Loads <i>(KW)</i></label>
    </h4>

    <div class="box1" v-if="acHT">
      
      <dl>
        <div class="prelabel">
          <label for="input-spaceheating">Space Heating load: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-spaceheating"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="spaceHeating"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-ac">Air Conditioner load: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-ac"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="acLoading"
          />
        </div>
      </dl>
      <dl v-if="spaceHeating && acLoading"><span>
        <input type="checkbox" v-model="acAndHeating" id="acheater" />
        <label for="acheater">Use AC and Space Heater together</label>
      </span></dl>
      <dl>
        <div class="prelabel">
          <label for="inputotherheating">Any other heating loads: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="inputotherheating"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="otherHeating"
          />
        </div>
      </dl>
    </div>

    <h4 class="headings">
      <input type="checkbox" v-model="hasRange" id="hasRange" />
      <label for="hasRange">Electric Range Loads <i>(KW)</i></label>
    </h4>
    <div class="box1" v-if="hasRange">
      <dl>
        <div class="prelabel">
          <label for="input-range">The first electric range load: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-range"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="firstRange"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-otherrange"
            >Other electric range loads(if any):
          </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-otherrange"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="moreRange"
          />
        </div>
      </dl>
    </div>
    <h4 class="headings">
      <input type="checkbox" v-model="hasWTHT" id="hasWTHT" />
      <label for="hasWTHT"
        >Electric Water Heater Loads <i>(KW)</i></label
      >
    </h4>
    <div class="box1" v-if="hasWTHT">
      <dl>
        <div class="prelabel">
          <label for="input-tankless">Tankless water heater loads: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-tankless"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="tankless"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-steamer">Steamer water heater loads: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-steamer"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="steamer"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-pool">Swimming pool heater loads: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-pool"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="poolHeater"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-hottub">Hot tub water heater loads: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-hottub"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="hotTub"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="input-spa">SPA water heater loads: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-spa"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="SPAHeater"
          />
        </div>
      </dl>
    </div>
    <h4 class="headings">
      <input type="checkbox" v-model="hasEV" id="hasEV" />
      <label for="hasEV"> EV Supply Equipments Loads <i>(KW)</i></label>
    </h4>
    <div class="box1" v-if="hasEV">
      <dl>
        <div class="prelabel">
          <label for="inputev">Regular EV supply load: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="inputev"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="evSupply"
          />
        </div>
      </dl>
      <dl>
        <div class="prelabel">
          <label for="inputevems">EV Supply load with EMS: </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="inputevems"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="evEMS"
          />
        </div>
      </dl>
    </div>
    <h4 class="headings" >
      <input type="checkbox" v-model="hasOther" id="hasOther" />
      <label for="hasOther" >
        All Other Loads in excess of 1.5 <i>(KW)</i></label
      >
    </h4>
    <div class="box1" v-if="hasOther">
      <dl>
        <div class="prelabel">
          <label for="input-otherloads"
            >Total of loads in excess of 1.5KW:
          </label>
        </div>
        <div class="input1">
          <input
            type="text"
            id="input-otherloads"
            size="5"
            placeholder="0"
            class="inputnumbers"
            title="Please enter a number"
            v-model="otherLoads"
          />
        </div>
      </dl>
    </div>
    <LoadCalculator />
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
.headings1 {
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bolder;
  font-size: 2em;
  margin: 8px;
  border-radius: 10px;
}
.container {
  background-color: beige;
  padding: 10px;
  margin: auto;
  display: block;
  border: solid green 1px;
  border-radius: 5px;
}
@media screen and (min-width: 500px) {
 div .box1 {
    width: 70%;
    margin: 0 auto;
    border-radius: 5px; 
    
  }
}

dl {
  display: grid;
  grid-template-columns: 5fr 1fr;
  border: solid lightseagreen 1px;
  border-radius: 4px;
}

dl:nth-child(2n-1) {
  background-color: lightgray;
  line-height: 2em;
}
dl:nth-child(2n) {
  background-color: aquamarine;
  line-height: 2rem;
}

.container .box1 .prelabel {
  text-align: right;  
}

h4 i {
  color: violet;;
}
.input1 {
  text-align: center;
}
.inputnumbers {
  text-align: right;
  color: black;
  background-color: beige;
  border: solid balck 1px;
  border-radius: 5px;
  line-height: 1.3em;
}

@media screen and (min-width: 500px) {

.headings:nth-child(2n) {
  /* grid-column: 1 / 6; */
  background-color:cornflowerblue;
  line-height: 1.3em;
  padding:5px;
  width: 70%;
    margin: 0 auto;
     border-radius:7px;

}
.headings:nth-child(2n+1) {
  /* grid-column: 1 / 6; */
  
  padding:5px;
  color: powderblue;
  width: 70%;
    margin: 0 auto;
    border-radius:7px;
}}

h4 {
   border: solid blue 2px;
   margin: 5px 0; 
   border-radius: 24px;
   background-color: darkgreen;
   color: whitesmoke;
   padding: 5px;
}
</style>