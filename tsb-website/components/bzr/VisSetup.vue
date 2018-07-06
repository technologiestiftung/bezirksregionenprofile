<template>

  <div v-if="visData && chartId">

    <!-- Title -->
    <h4 class="blatt-el-titel" v-if="visInfo.type=='titel'">{{visInfo.content}}</h4>
    <!-- Title -->
    <h5 class="blatt-el-titel-sm" v-if="visInfo.type=='titel-sm'">{{visInfo.content}}</h5>
    <!-- Text -->
    <p class="blatt-el-text" v-if="visInfo.type=='text'" v-html="visInfo.content">{{visInfo.content}}</p>
    <!-- Barchart -->
    <barchart v-if="visInfo.type=='barchart'" :visData="visData" :chartId="chartId"></barchart>
    <!-- Table -->
    <tabelchart v-if="visInfo.type=='table'" :visData="visData"></tabelchart> 
    <!-- Map -->
    <map-pr v-if="visInfo.type=='map-pr'" :bzrName="bzrName" :visData="visData" :chartId="chartId"></map-pr> 

  </div>

</template>


<script>

import axios from 'axios';
import Papa from 'papaparse';


import idGenerator from '~/assets/js/idGenerator.js';
// import BarchartLoader from '~/components/bzr/vis/BarchartLoader.vue';

import Barchart from '~/components/bzr/vis/Barchart.vue';
import Tabelchart from '~/components/bzr/vis/Tabelchart.vue';
import MapPr from '~/components/bzr/vis/MapPr.vue';

const setData = function(data,me){

  me.visData = data;

};

export default {

  components: {
    Barchart,Tabelchart,MapPr
  },
  props: ["visInfo","sourceUrl","bzrName"],
  data(){
      return{
        visData:false,
        chartId: idGenerator()
      }
  },
  methods: {
    getData(){
      if(this.visInfo.datasource==""){
        this.visData = true;
      }else{
        axios.get(this.sourceUrl + "/" + this.visInfo.datasource + '.csv').then((response)=>
          setData(Papa.parse(response.data,{header: true,skipEmptyLines: true}).data,this)
        )
      }
    },
  },
  created() {
    // console.log("visInfo",this.visInfo, this.sourceUrl)
    this.getData();
  }
}

</script>


<style lang="scss" scoped>


  @import "~@/assets/style/variables";

  .datenblatt-element{
    // background-color:#ccc;
    .blatt-el-titel{
      color: $tsb-darkblue;
      // font-family: $font-family-bold;
    }

    .blatt-el-titel-sm{
      // color: $tsb-darkblue
    }

    .blatt-el-text{
      // color: #ccc;
      padding-top: 1em;
      padding-bottom: 1em;
    }

  }


</style>