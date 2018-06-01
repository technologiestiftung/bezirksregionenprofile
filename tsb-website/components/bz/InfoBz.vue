<template>

  <div class="content-main-info column">

      <h4>Themen & Daten - {{bzrSelected}}</h4>

      <div id="index-opt">

        <div v-for="indikator in indikatorenGr" 
          class="opt" 
          :key="indikator.name" 
          @click="onIndClick(indikator)"
          :class="activeInd==indikator.id ? 'active' : ''"
          >
          <h5 :class="indikator.class" >{{indikator.name}}</h5>
        </div>

      </div>

      <div id="viz-container">

        <div v-for="indikator in indikatorenGr[activeInd].indikatoren"
          class="viz"
          :key="indikator[activeInd]" 
          >

          <viz-bz 
            :activeIndClass="activeIndClass" 
            :indData="indData"
            :indikator="indikator.name">

          </viz-bz>
          <div class="viz-text">{{indikator['text-sm']}}</div>

          <div class="viz-ampel-container">
            <div class="viz-ampel">

                <div :class="indData[indikator.name].phase==1?'phase'+indData[indikator.name].phase:''"></div>
                <div :class="indData[indikator.name].phase==2?'phase'+indData[indikator.name].phase:''"></div>
                <div :class="indData[indikator.name].phase==3?'phase'+indData[indikator.name].phase:''"></div>
                <div :class="indData[indikator.name].phase==4?'phase'+indData[indikator.name].phase:''"></div>

            </div>
          </div>

        </div>

      </div>


<!--       {{"active id: " + activeInd}} -->


<!--       <div class="viz-container">
        <viz-bz></viz-bz>
      </div> -->


      <div class="info">info/Legende</div>

    


  </div>

</template>


<script>

import { mapState } from 'vuex';

import VizBz from '~/components/bz/VizBz.vue';

export default {

    computed: {
      ...mapState([
        'indikatorenGr'
      ])
      // ...mapGetters([
      // ]),    
    },
    props: ["bzrSelected","indData"],
    components: {
      VizBz
    },
    mounted(){

    },
    data(){
        return{
          activeInd :1,
          activeIndClass:"indGr1"
        }
    },
    // props: ["mainColor"],
    methods:{
      onIndClick(x){
        console.log(x)
        this.activeInd =x.id;
        this.activeIndClass=x.class;
        // this.hi = "new something yeah" + this.newInput;
      }
    }
}


</script>



<style lang="scss" scoped>

@import "~@/assets/style/variables";


  #map {

    width:100%;
    height: 60vh;
    position: absolute;

  }

  .navigation{

    position: relative;
    z-index: 1;
    top: 20px;
    left: 20px;
    color: #000 !important;

    select{
      width: 100px;
      height: 30px;

    }

  }


  #viz-container{

    display:flex;
    flex-flow: wrap;
    margin: 0px -0.5em;
    margin-top: 2em;

    .viz{
      flex:1;
      flex-basis: 33%;
      padding: 0.5em 1.5em 0em 0em;
      padding-bottom: 1.3em;
      cursor: pointer;
    }

    .viz-text{
      font-size: .7em;
      margin-top: 0.5em;
    }

    .viz-ampel-container{


      .viz-ampel{

        div{
          margin: 4px;
          width: 13px;
          height: 13px;
          border-radius: 20px;      
          float: left; 
          background-color:#ddd;
        }
        .phase1{
          background-color:$color-phase1;
          border: 2px solid #ddd; 
        }
        .phase2{
          background-color:$color-phase2;
        }
        .phase3{
          background-color:$color-phase3;
        }
        .phase4{
          background-color:$color-phase4;
        }

      }

    }

  }

  #index-opt{

    display:flex;
    flex-flow: wrap;
    margin: 0px -0.5em;

    .opt{
      flex:1;
      flex-basis: 33%;
      padding: 0.3em 0.5em;
      cursor: pointer;

      h5{
        border-bottom:3px solid #000;
      }
    }


    .active{
      .indGr1{
        color:$color-indGr1;
        border-bottom:3px solid $color-indGr1;
      }
      .indGr2{
        color:$color-indGr2;
        border-bottom:3px solid $color-indGr2;
      }
      .indGr3{
        color:$color-indGr3;
        border-bottom:3px solid $color-indGr3;
      }
      .indGr4{
        color:$color-indGr4;
        border-bottom:3px solid $color-indGr4;
      }
      .indGr5{
        color:$color-indGr5;
        border-bottom:3px solid $color-indGr5;
      }
      .indGr6{
        color:$color-indGr6;
        border-bottom:3px solid $color-indGr6;
      }
    }

  }


  .info{
    padding: 0.5em;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: #ddd;
    cursor:pointer;

    &:hover{
      opacity:.8;
    }
  }

</style>