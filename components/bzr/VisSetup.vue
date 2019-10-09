<template>

  <div v-if="visData && chartId">

    <!-- Title -->
    <h4 class="blatt-el-titel" v-if="visInfo.type=='titel'">{{visInfo.content}}</h4>
    <!-- Title -->
    <h5 class="blatt-el-titel-sm" v-if="visInfo.type=='titel-sm'">{{visInfo.content}}</h5>
    <!-- Text -->
    <p class="blatt-el-text" v-if="visInfo.type=='text'" v-html="visInfo.content">{{visInfo.content}}</p>
    <!-- Image -->
    <img class="blatt-el-img" :src="'./data/images/' + visInfo.datasource" :alt="visInfo.content" v-if="visInfo.type=='image'">
    <!-- Chart --> 
    <chart v-if="visInfo.type=='barchart' || visInfo.type=='linechart' || visInfo.type=='piechart'" :visData="visData" :chartId="chartId" :visType="visInfo.type"></chart>
    <!-- Table -->
    <tabelchart v-if="visInfo.type=='table'" :visData="visData"></tabelchart> 
    <!-- Map -->
    <map-pr v-if="visInfo.type=='map-pr'" :bzrName="bzrName" :visData="visData" :chartId="chartId"></map-pr> 
    <!-- Map POI -->
    <map-poi v-if="visInfo.type=='map-poi'" :bzrName="bzrName" :visData="visData" :chartId="chartId"></map-poi> 

  </div>

</template>


<script>

import axios from 'axios';
import Papa from 'papaparse';


import idGenerator from '~/assets/js/idGenerator.js';
// import BarchartLoader from '~/components/bzr/vis/BarchartLoader.vue';

import Chart from '~/components/bzr/vis/Chart.vue';
import Tabelchart from '~/components/bzr/vis/Tabelchart.vue';
import MapPr from '~/components/bzr/vis/MapPr.vue';
import MapPoi from '~/components/bzr/vis/MapPoi.vue';

const setData = function(data,me){

  me.visData = data;

};

export default {

  components: {
    Chart,Tabelchart,MapPr,MapPoi
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
      if((this.visInfo.datasource=="") || (this.visInfo.type == 'image')) {
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

    .blatt-el-img {
      display: block;
      margin: auto;
      width: 65%;
      height: auto;
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