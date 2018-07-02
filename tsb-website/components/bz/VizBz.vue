<template>


<div>  

  <svg>

      <rect x="50%" y="0%" :width="getWidth() + '%'" height="100%" :class="activeIndClass"/> 


  <!--     <path :class="activeIndClass" fill="orange" opacity="0.5" :d="'M60,0 V120 h'+getWidth()+' V0 Z'">
        <animate attributeType="SVG" attributeName="d" from="M60,0 V120 h0 V0 Z" :to="'M60,0 V120 h'+getWidth()+' V0 Z'" dur="2s" repeatCount="once" />    
      </path>
 -->
<!-- 
      <path fill="orange" opacity="0.3" d="M60,0 V60 h50 V0 Z">
        <animate attributeType="SVG" attributeName="d" from="M150,0 V150 h0 V0 Z" to="M150,0 V150 h100 V0 Z" dur="1s" repeatCount="once" />
      </path> -->


      <text x="0%" y="0%" class="label-top">Min</text>
      <text x="100%" y="0%" class="label-top">Max</text>

      <text x="50%" y="0%" class="label-top static">Berlin</text>
      <text :x="wert+ '%'" y="100%" class="label bzr">BZR</text>

      <line x1="0%" x2="0" y1="100%" y2="0%" class="tick"></line>
      <line x1="50%" x2="50%" y1="100%" y2="0%" class="tick"></line>
      <line x1="100%" x2="100%" y1="100%" y2="0%" class="tick"></line>

  </svg> 

</div>
    	


</template>


<script>


// import * as d3 from "d3";

export default {
  data() {
    return {
      // stroke:"4,4",
      wert:"0"
    }
  },
  props: ["activeIndClass","indData","indikator"],
  created(){
    this.animate();
  },
  methods: {
    getWidth: function () {
      return this.indData[this.indikator].val / 2;
    },
    animate:function(){

      // d3.selectAll('svg')
      //   .style("fill","red")
      // console.log("animate",this.$el)

      // document.body.getElementById(‘id’
      // this.$el.querySelector(".animatedPath").beginElement()
    }
  },
  watch: {
    indikator: function (val) {
      this.animate();
    }
  }
}

</script>


<style lang="scss" scoped>


  @import "~@/assets/style/variables";

  div{
        text-align: center;
  }

  svg{

    width: 100px;
    height: 100px;
    overflow:visible;
    margin:10px;
        display: inline-block;
    // background-color: #ddd;

    .tick{
      stroke:#333;
      stroke-width:2;
      stroke-dasharray:4;
    }

    text{
      text-anchor:middle;
      font-size: 10px;
      // font-family:
    }

    text.label-top{
      color:#333;
      transform: translate(0px,-5px);
    }

    text.label{
      transform: translate(0px,15px);

    }

    text.static{
      color:#000;
      font-weight:700;
    }

    text.bzr{
      color:red;
    }


    rect{
      
      // fill: $color-indGr1;
      // transform: translate(25%,0%) scale(1,1) !important;
      // transform: translate(250%,0%) scale(-1,1) !important;
      // display: inline-block;
      // animation: grow 2s forwards;
      // animation-delay:2s;


      // &:hover{
      //   cursor:pointer;
      //   opacity:.7;
      // }

    }

    // .data-line{
    //   stroke-width:3px;
    //   stroke:red;
    //   animation: moveline 2s reverse;
    //   // opacity:0;
    // }

  }
	
  @keyframes grow {
    100% {
      width: 35%;
      

      // transform: translate(250%,0%) scale(-1,1);
      // transform: translate(10%,0px)
      // transform: translate(-100%,0px);
    }
  }

  // @keyframes moveline {
  //   100% {
  //     // transform: translate(0%,0%);
  //     // transform: translate(-100%,0px);
  //   }
  // }




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