<template>

  <div :id="chartId" class="c3-chart c3-chart-barchart">

    
  </div>

</template>


<script>


const guidGenerator = function() {
    const S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return ("id"+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


export default {


 mounted: function () {
    const c3 = require('c3/c3.min.js');
    require('c3/c3.min.css');

    // document.getElementById(this.chartId).style.height = "250px";

    c3.generate({
          bindto: '#' + this.chartId,
          data: {
          columns: [
              ['data1', 30, 200, 100, 400, 150, 250]
          ],
          type: 'bar'
      },
      bar: {
          width: {
              ratio: 0.6 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
      }
      });
  },
  data(){
      return{
        chartId: guidGenerator(),
      }
  }

}

</script>



<style lang="scss" scoped>

  @import "~@/assets/style/variables";

  // #chart{
  //   height: 00px;
  //   width:100%;
  // }

  .c3-chart-barchart{
    height: 250px;
    // padding: 1em;
  }

</style>