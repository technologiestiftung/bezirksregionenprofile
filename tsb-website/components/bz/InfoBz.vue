<template>

  <div class="content-main-info column">

      <h4>Themen & Daten - {{bzrSelected}}</h4>

      <div class="index-opt">

        <div v-for="indikator in indikatorenGr" 
          class="opt" 
          :key="indikator.name" 
          @click="onIndClick(indikator)"
          :class="activeInd==indikator.id ? 'active' : ''"
          >
          <h5 :class="indikator.class" >{{indikator.name}}</h5>
        </div>

      </div>


      {{activeInd}}

      <div class="viz-container">
        <viz-bz></viz-bz>
      </div>

    


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
    props: ["bzrSelected"],
    components: {
      VizBz
    },
    mounted(){

    },
    data(){
        return{
          activeInd :1
        }
    },
    // props: ["mainColor"],
    methods:{
      onIndClick(x){
        console.log(x)
        this.activeInd =x.id;
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


  .index-opt{

    display:flex;
    flex-flow: wrap;
    margin: 0px -0.5em;

    .opt{
      flex:1;
      flex-basis: 33%;
      padding: 0px 0.5em;
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

</style>