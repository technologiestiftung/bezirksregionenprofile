<template>


<div class="content-intro">

  <div class="intro-text">

      <h5>BEZIRK</h5>
      <h4>{{bezirk}}</h4>

    	<p>{{bzData.introText}}</p>


      <div class="intro-stats">
        
        <div>
          <i class="demo-icon icon-map-o" />Fläche
          <h4>{{bzData.facts.flaeche}} km²</h4>
        </div>
        <div>
          <i class="demo-icon icon-users" />Einwohner
          <h4>{{bzData.facts.einw}}</h4>
        </div>
        <div>
          <i class="demo-icon icon-grid" />Bevölkerungsdichte
          <h4>{{bzData.facts.dichte}} EW/km²</h4>
        </div>
      </div>


  </div>

</div>
    	


</template>


<script>


// import d3 from 'd3-dsv';
  // import * as d3 from "d3";

// import axios from 'axios'


export default {
  data() {
    return {

    }
  },
  props: ["bezirk","bzData"],
  // created() {

  //   this.getData();

  // },
  // methods:{
  //   getData(){
  //     // console.log(this)
  //     const url = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:3000';
  //     axios.get(url + '/data/bz-data/'+this.bezirk+'/overview.json').then((response)=>
  //       this.bzDataLoaded = response.data
  //     )
  //   }
  // }
}

</script>


<style lang="scss" scoped>
	
	
@import "~@/assets/style/variables";

.intro-text{

  display:block;
      width: 100%;
  // padding:2em;

  .intro-stats{
    margin-top: 1em;
  }

}

.intro-stats{
  div i{
    margin-right: 5px;
  }
}

</style>