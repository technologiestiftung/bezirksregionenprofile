<template>

  <div :id="chartId" class="c3-chart-barchart">

    
  </div>

</template>


<script>


export default {

  mounted: function () {

    const c3 = require('c3/c3.min.js');
    require('c3/c3.min.css');

    const cols = [];
    for(const x in this.visData[0]){
      cols.push(x);
    }

    var newData = [];
    for (var i = 0; i < cols.length; i++) {
      var newArray = [cols[i]];
      
      for (var ii = 0; ii < this.visData.length; ii++) {
        newArray.push(Number(this.visData[ii][cols[i]]));
      }
      newData.push(newArray);
    };

    // document.getElementById(this.chartId).style.height = "250px";
    c3.generate({
      bindto: '#' + this.chartId,
      data: {
        columns: newData,
        type: 'bar'
      },
      bar: {
          width: {
              ratio: 0.6 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
      },
      color: {
        pattern: ['#1E3791','#E60032']
      },
      legend: {
          show: false
      }
    });

  },
  props: ["chartId","visData"],
  data(){
      return{
      }
  }
}

</script>


<style lang="scss" scoped>

  @import "~@/assets/style/variables";

  .c3-chart-barchart{
    height: 250px;
    // padding: 1em;
    margin: $vis-margin;
  }

</style>