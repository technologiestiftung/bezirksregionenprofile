<template>


<div class="content-intro">

  <div class="intro-text">

      <h5>{{nameClass}}</h5>
      <h4>{{name}}</h4>

    	<p>{{introData.introText}}</p>


      <div class="intro-stats">
        
        <div>
          <i class="demo-icon icon-map-o" />Fläche
          <h4>{{introData.facts.flaeche}} km²</h4>
        </div>
        <div>
          <i class="demo-icon icon-users" />Einwohner
          <h4>{{introData.facts.einw}}</h4>
        </div>
        <div>
          <i class="demo-icon icon-grid" />Bevölkerungsdichte
          <h4>{{introData.facts.dichte}} EW/km²</h4>
        </div>
      </div>


  </div>

</div>
    	


</template>


<script>


// import d3 from 'd3-dsv';
  // import * as d3 from "d3";



export default {
  data() {
    return {

    }
  },
  props: ["name","nameClass","introData"]
}

</script>


<style lang="scss" scoped>
	
	
@import "~@/assets/style/variables";


h5{
  text-transform: uppercase;
}

.intro-text p{
  max-width: 100%;
  padding-bottom: 0.8em;
}

.intro-text{

  display:block;
      width: 100%;
  // padding:2em;

  .intro-stats{
    margin-top: 1em;
    font-size: 0.8rem;
  }

}

.intro-stats{
  div i{
    margin-right: 5px;
  }
}

</style>