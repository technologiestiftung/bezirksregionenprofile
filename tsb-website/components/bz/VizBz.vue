<template>


<div class="viz">

  <svg>

      <rect x="50%" y="0%" :width="wert+ '%'" height="100%"/> 
      <line :x1="wert+ '%'" :x2="wert+ '%'" y1="100%" y2="0%" class="data-line" transform="translate(50%,50%)"></line>

      <text x="0%" y="0%" class="label-top">Min</text>
      <text x="100%" y="0%" class="label-top">Max</text>

      <text x="50%" y="0%" class="label-top static">Berlin</text>
      <text :x="wert+ '%'" y="100%" class="label bzr">BZR</text>

      <line x1="0%" x2="0" y1="100%" y2="0%" class="tick" :stroke-dasharray="stroke"></line>
      <line x1="50%" x2="50%" y1="100%" y2="0%" class="tick" :stroke-dasharray="stroke"></line>
      <line x1="100%" x2="100%" y1="100%" y2="0%" class="tick" :stroke-dasharray="stroke"></line>

  </svg> 

</div>
    	


</template>


<script>

export default {
  data() {
    return {
      stroke:"4,4",
      wert:"10"
    }
  },
  props: []
}

</script>


<style lang="scss" scoped>


  @import "~@/assets/style/variables";

  svg{

    width: 150px;
    height: 150px;
    overflow:visible;
    margin:10px;
    background-color: #ddd;

    .tick{
      stroke:#333;
      stroke-width:2;
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
      animation: grow 2s reverse;
      fill: $color-indGr1;

      &:hover{
        cursor:pointer;
        opacity:.7;
      }
    }

    .data-line{
      stroke-width:3px;
      stroke:red;
      animation: moveline 2s reverse;
      // opacity:0;
    }

  }
	
  @keyframes grow {
    100% {
      width: 0%;
      // transform: translate(-100%,0px);
    }
  }

  @keyframes moveline {
    100% {
      // transform: translate(0%,0%);
      // transform: translate(-100%,0px);
    }
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