<template>


<div>  

  <svg :id="id">

      <rect x="0%" y="0%" width="100%" height="100%" class="background-rect"/> 
      <rect x="50%" y="0%" width="0%" height="100%" :class="[activeIndClass, 'ani-rect']"/> 

      <text x="0%" y="0%" class="label-top">Min</text>
      <text x="100%" y="0%" class="label-top">Max</text>

      <text x="50%" y="0%" class="label-top static" :id="getCompareName">{{getCompareName}}</text>
      <text x="50%" y="100%" :class="[activeIndClass, 'label', 'bzr']">{{compareWidth}}</text>

      <line x1="50%" x2="50%" y1="100%" y2="0%" :class="[activeIndClass, 'compare-line']"></line>

      <line x1="0%" x2="0" y1="100%" y2="0%" class="tick"></line>
      <line x1="50%" x2="50%" y1="100%" y2="0%" class="tick"></line>
      <line x1="100%" x2="100%" y1="100%" y2="0%" class="tick"></line>

  </svg> 

</div>
    	


</template>


<script>

import * as d3 from "d3";
import idGenerator from '~/assets/js/idGenerator.js';

export default {
  data() {
    return {
      id:idGenerator()
    }
  },
  props: ["activeIndClass","indikatorValue","indikatorValuePercent","activeInd","compareSelected","bzrSelected","bzName"],
  created(){
  },
  computed:{
    getCompareName(){
      // let bzrBZ = "BZR";
      // if(this.bzName == this.bzrSelected){
      //   bzrBZ = "BZ";
      // }
      return this.compareSelected == "Berlin" ? "Berlin" : "BZ";
    },
    compareWidth(){
      let bzrBZ = "BZR";
      if(this.bzName == this.bzrSelected){
        bzrBZ = "BZ";
      }
      const percentValue = " (" + Math.round(this.indikatorValuePercent*10)/10 + "%)";
      return this.compareSelected == "Berlin" ? bzrBZ + percentValue : "BZR" + percentValue;
    }
  },
  methods: {
    getWidth: function () {
      return this.indikatorValuePercent / 2;
    },
    animate:function(){

      const animationDuration = 1000;

      d3.select('#'+this.id + " .ani-rect").interrupt().transition();
      d3.select('#'+this.id + " .bzr").interrupt().transition()
      d3.select('#'+this.id + " .compare-line").interrupt().transition();

      d3.select('#'+this.id + " .ani-rect")
          .attr("width","0%")
          .attr("x","50%")

      d3.select('#'+this.id + " .compare-line")
          .attr("x1","50%")
          .attr("x2","50%")

      d3.select('#'+this.id + " .bzr")
          .attr("x","50%")


      //if the indikator val is negative
      if(this.indikatorValuePercent < 0 ){

        const invertedData = (this.indikatorValuePercent / 2) * -1;

        d3.select('#'+this.id + " .ani-rect").transition()
            .duration(animationDuration)
            .attr("x", (50 - invertedData) + "%")
            .attr("width", invertedData + "%");

        d3.select('#'+this.id + " .bzr").transition()
            .duration(animationDuration)
            .attr("x", (50 - invertedData) + "%")


        d3.select('#'+this.id + " .compare-line").transition()
            .duration(animationDuration)
            .attr("x1", (50 - invertedData) + "%")
            .attr("x2", (50 - invertedData) + "%")



      }else{//if positive value


        d3.select('#'+this.id + " .ani-rect").transition()
            .duration(animationDuration)
            .attr("width", this.indikatorValuePercent / 2 + "%")
            .attr("x","50%");

        d3.select('#'+this.id + " .bzr").transition()
            .duration(animationDuration)
            .attr("x", (this.indikatorValuePercent / 2) + 50 + "%");


        d3.select('#'+this.id + " .compare-line").transition()
            .duration(animationDuration)
            .attr("x1", (this.indikatorValuePercent / 2) + 50 + "%")
            .attr("x2", (this.indikatorValuePercent / 2) + 50 + "%")

      }

    }
  },
  watch: {
    activeInd: function (val) { //if the inidkator changes
      this.animate();
    },
    // bzrSelected: function (val) { //if the inidkator changes
    //   this.animate();
    // },
    indikatorValuePercent: function (val) { //if the inidkator changes
      this.animate();
    }
  },
  mounted () {
    this.animate();
  }
}

</script>


<style lang="scss" scoped>


  @import "~@/assets/style/variables";

  div{
        text-align: center;
  }

  svg{

    width: 120px;
    height: 120px;
    overflow:visible;
    margin:10px;
    display: inline-block;
    // background-color: #ddd;

    .background-rect{
      fill: white;
    }

    .tick{
      stroke:#333;
      stroke-width:1;
      stroke-dasharray:2;
    }

    .compare-line{
      stroke-width:2;
      stroke:#333;
    }

    text{
      text-anchor:middle;
      font-size: .6em;
      // font-family:
    }

    text.label-top{
      color:#333;
      transform: translate(0px,-7px);
    }

    text.label{
      transform: translate(0px,15px);

    }

    text.static{
      color:#000;
      font-weight:700;
    }

    .bzr{
      text-anchor:middle;
    }


    rect{
      // opacity:.85;
    }

    .ani-rect{
      fill-opacity: .8;
    }

  }
	

  .indGr1{
    fill:$color-indGr1;
  }
  .indGr2{
    fill:$color-indGr2;
  }
  .indGr3{
    fill:$color-indGr3;
  }
  .indGr4{
    fill:$color-indGr4;
  }
  .indGr5{
    fill:$color-indGr5;
  }
  .indGr6{
    fill:$color-indGr6;
  }


  .compare-line{
    stroke-width:2px;
  }

  .indGr1.compare-line{
    stroke:$color-indGr1;
  }
  .indGr2.compare-line{
    stroke:$color-indGr2;
  }
  .indGr3.compare-line{
    stroke:$color-indGr3;
  }
  .indGr4.compare-line{
    stroke:$color-indGr4;
  }
  .indGr5.compare-line{
    stroke:$color-indGr5;
  }
  .indGr6.compare-line{
    stroke:$color-indGr6;
  }



</style>


<!-- 
    <svg>
      <line x1="0%" x2="100%" y1="1%" y2="1%" class="tick" />
      <line x1="0%" x2="100%" y1="50%" y2="50%" class="tick" />
      <line x1="0%" x2="100%" y1="100%" y2="100%" class="quiet" />
      <rect
        v-for="(value, n) in values"
        class="bar"
        :x="n * (100 / values.length) + '%'"
        :width="(100 / values.length - 1) + '%'"
        :y="(100 - calcHeight(value[1])) + '%'"
        :height="calcHeight(value[1]) + '%'"
        />
    </svg> -->