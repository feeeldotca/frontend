<template>
  <div class="result">
    <div class="mx10">
      <div class="col-md-8 col-8 text-center">
        <strong>Total Demand Watts &#187;</strong>
      </div>
      <div class="mt-3 text-center text-warning">{{ totalDemandWatts }} W</div>
    </div>

    <div class="mx10">
      <div class="col-md-8 col-8 text-center">
        <strong>Total Demand Amps &#187;</strong>
      </div>
      <div class="mt-3 text-center text-warning" id="ampResults">{{ totalDemandWatts == 0 ? '' : totalDemandAmps + ' A' }}
      </div>
    </div>

    <div v-if="totalDemandAmps <= 200">

      <div class="mx10">
        <div class="col-md-8 col-8 text-center">
          <strong>Minimum Service Amps:</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="sampReq" class="text-primary">{{ totalDemandWatts == 0 ? '' : totalDemandAmps + ' A' }} </div>
        </div>
      </div>

      <div class="mx10">
        <div class="col-md-8 col-8 text-center">
          <strong class="text-light">
            Hot Conductor Size</strong>


        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="hotReq" class="text-warning">
            Cu: {{ conductorSize('table2', temp) }}
            <br />
            Al: {{ conductorSize('table4', temp) }}
          </div>
        </div>
        <div id="radio" class="col-md-12 col-12 text-left flex-center">
          <v-radio-group v-model="temp" row dense>
            <v-radio label="60" value="60c"></v-radio>
            <v-radio label="75" value="75c"></v-radio>
            <v-radio label="90°C" value="90c"></v-radio>
          </v-radio-group>
        </div>
      </div>

      <div class="mx10">
        <div class="col-md-8 col-8 text-center">
          <strong>Meter Base Rating:</strong>
        </div>
        <div class="col-md-4 col-4 text-left text-primary">
          <div id="metReq" class="text-primary">{{ totalDemandWatts == 0 ? '' : meterBase }}&nbsp;</div>
        </div>
      </div>

      <div class="mx10">
        <div class="col-md-8 col-8 text-center">
          <strong class="text-light">Main Fuse / Breaker:</strong>
        </div>
        <div class="col-md-4 col-4 text-left text-warning">
          <div id="ocdReq" class="text-warning">{{ totalDemandWatts == 0 ? '' : ocProtection + ' A' }} &nbsp;</div>
        </div>
      </div>

      <v-card class="mx10">
        <v-row class="col-md-6 col-6 text-left">
          <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" dark v-bind="attrs" v-on="on">
                mdi-home
              </v-icon>
            </template>
            <span> {{ groundingSize.hint }} </span>
          </v-tooltip>
          <br>  
          <strong>Service Grounding Conductor:</strong>
        </v-row>
        <v-row class="col-md-4 col-4 text-left">
          <div id="sgcReq" class="text-primary "> {{ totalDemandWatts == 0 ? '' : 'Cu: ' + groundingSize.size.copper }}
          </div>
          <div class="text-primary"> {{ totalDemandWatts == 0 ? '' : 'Al: ' + groundingSize.size.al }} </div>
        </v-row>
      </v-card>

      <v-card class="mx10">
        <div class="col-md-8 col-8 text-center">
          <strong class="text-light">Service Bonding Jumper:</strong>
        </div>
        <div class="col-md-4 col-4 text-right">
          <div id="sgcReq" class="text-primary "> {{ totalDemandWatts == 0 ? '' : 'Cu: AWG #' + bondingSize.copper }}
          </div>
          <div class="text-primary"> {{ totalDemandWatts == 0 ? '' : 'Al: AWG #' + bondingSize.al }} </div>
        </div>
      </v-card>
      <!-- for future use
      <div class="mx10">
        <div class="col-md-8 col-8 text-center">
          <strong>Service Conduit Size (threaded, rigid metal):</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="conReq" class="text-primary">&nbsp;</div>
        </div>
      </div> -->

      <v-row class="mx10">
        <v-row class="col-md-8 col-8 text-left text-light">
          <strong>Service Panel Size (minimum):</strong>
        </v-row>
        <v-row class="col-md-4 col-4 text-right">
          <div id="panReq" class="text-warning"> {{ branchCircuits }} </div>
        </v-row>
      </v-row>
    </div>
    <div v-else>
      <div class="mx10">
        <div class="col-md-2 col-1"></div>
        <div class="col-md-8 col-10">
          <v-alert border="top" color="red lighten-2" dark>Load calculation beyond residential limit of 200A, please
            consult your electrician.</v-alert>
        </div>
        <div class="col-md-2 col-1"></div>
      </div>
    </div>
    <v-spacer></v-spacer>
    
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  emits:{
    'clearData':null
  },
  data() {
    return {
      temp: '75c',
      // Grounding conductor size according to rule 10-114 of CEC2018 page 110
      groundingSize: {
        size: { copper: "AWG #6 ", al: "AWG #4 " },
        hint: "Rule: 10-114, permitedd to be 1) insulated or bare & 2) sized smaller but not smaller than the current-carrying conductor(s) of the system being grounded."
      },

    }
  },

  computed: {
    ...mapGetters(["getLeastAmp", "getLeastAwg", "getFeederAwg"]),
    ...mapState(["totalLoads", "tables", "rules"]),

    // total amp demand in amps
    totalDemandWatts() {
      // console.log("this.houseDemands: ", this.houseDemands);
      return this.totalLoads.toFixed(0);
    },
    totalDemandAmps() {
      var amp = parseFloat((this.totalDemandWatts / 240).toFixed(2));
      if (amp > 200)
        alert(
          "Load is beyond residential design limits of 200A, please check your input"
        );
      return amp;
    },

    // Meterbase selection
    meterBase: function () {
      if (this.totalDemandAmps <= 100) {
        return "100 A";
      } else if (this.totalDemandAmps <= 200) {
        return "200 A";
      } else {
        return " Upgrade to commercial grade recommended.";
      }
    },
    // // From table 39 get feeder size in AWG
    // getFeederSize: function () {
    //   return this.tables[2].ov_rating_amp.find((a) => a >= this.totalDemandAmps);
    // },


    //Over current protection selection for copper wire 75C from table 13
    ocProtection: function () {
      return this.tables[6].ocAmp.find((a) => a >= this.totalDemandAmps);
    },

    // Bonding jumper size as table 16 
    bondingSize: function () {
      var index = this.tables[7].ampereRating.value.findIndex(v => v >= this.totalDemandAmps);
      // console.log('table16 amp rating index: ', index);
      let size = {
        copper: this.tables[7].bondingJunperSize.catagoey.target.wire[0].value[index],
        al: this.tables[7].bondingJunperSize.catagoey.target.wire[1].value[index]
      };
      // console.log("Bonding jumper size: ", size);
      return size;
    },

    // get number of branch circuit positions inside the panel. Rule: 8-108 page 101 CEC2018
    branchCircuits: function () {
      if (this.totalDemandAmps == 0) return ''
      if (this.totalDemandAmps <= 60) {
        return 16;
      } else if (this.totalDemandAmps <= 100) {
        return 24;
      } else if (this.totalDemandAmps <= 125) {
        return 30;
      } else if (this.totalDemandAmps <= 200) {
        return 40;
      }
      return ''
    }
  },
  methods: {
    clearData() {
      this.$emit('clearInput');
      //  console.log('clear input insturction is out');
    },

    // get the hot conductore size from table 2 or table 4 @ 60, 75 or 90 celsius degree. 
    conductorSize(table, temp) {
      var size;
      if (this.totalDemandAmps === 0) {
        size = undefined;
      } else {
        size = this.getLeastAwg(table, temp);
      }
      if (size === "14§" || size === "12§" || size === "10§")
        size = parseInt(size);
      if (parseInt(size) >= 250) {
        size = size + " Kcmil";
      } else {
        size = isNaN(size) ? "" : size;
        size = (size === "" ? "" : "AWG #") + size;
      }
      return size;
    },
  }
};
</script>

<style scopped>
@media screen and (min-width: 500px) {
  .result {
    text-align: center;
    background-color: lightgray;
    border-radius: 5px;
    border-color: green;
    padding: 5px;
    margin-top: 5px;
  display:grid;
  grid-template-columns: 70%, 30%;
  }

  div .result div {
    text-align: center;
  }

}

/* .flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  }

#radio .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0 0px;
}  

.div__subtitle, .div__text, .div__title {
    padding: 12px 2px 12px 12px;
}

.container {
    padding: 2px 2px 2px 2px;
}

.v-messages {
    min-height: 5px;
}

.v-text-field input {
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 5px 8px 5px;
} */
</style>