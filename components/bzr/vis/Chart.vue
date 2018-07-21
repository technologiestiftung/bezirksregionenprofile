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
      if(x != "label" && x != "ylabel"  && x != "xlabel" ){
        cols.push(x);
      }
    }

    // label
    let label = [];
    for (let i = 0; i < this.visData.length; i++) {
      label.push(this.visData[i]['label'])
    }

    let newData = [];
    for (let i = 0; i < cols.length; i++) {

      let newArray = [cols[i]];
      
      for (let ii = 0; ii < this.visData.length; ii++) {
        newArray.push(Number(this.visData[ii][cols[i]]));
      }
      newData.push(newArray);
    };

    console.log("newData",newData,label)

    // document.getElementById(this.chartId).style.height = "250px";
    c3.generate({
      bindto: '#' + this.chartId,
      data: {
        columns: newData,
        type: this.chartType
      },
      axis: {
        x: {
          type: 'category',
          categories: label,
          label: {
            text: this.visData[0]['xlabel'],
            position: 'outer-center'
          }
        },
        y:{
          label: {
            text: this.visData[0]['ylabel'],
            position: 'inner-middle'
          }
        }
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
  props: ["chartId","visData","visType"],
  data(){
      return{
      }
  },
  computed:{
    chartType(){
      let chartType = "";
      if(this.visType == "linechart"){
        chartType = "line"
      }else if(this.visType =="barchart"){
        chartType = "bar"
      }else{
        console.warn("chart type does not exist. Check spelling")
      }
      return chartType;
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