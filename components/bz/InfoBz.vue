<template>

  <div class="content-main-info column">

      <div id="title">

        <h4><i class="icon-right-small" /> Themen & Daten</h4> 
        <div id="compare-dropdown" :class="this.bzName==this.bzrSelected ? 'compare-inactive' : ''">

          <div class="compare-dropdown-text">VERGLEICHEN MIT:</div>
          <div id="dropdown-mini" @click="selectDropdown()">{{compareSelected}} <i class="icon-down-dir" />
            <div :class="showDropdown? '':'hidden'" @click="dropdownSelected()">{{compareOpt}}</div>
          </div>

        </div>

      </div>

      <div 
        :class="bzrSelected!=bzName?'btn-show button':'button'"
        @click="onBzrProfile(bzrSelected)">
        <i class="icon-right-small" /> zum Datenprofil {{bzrSelected}}
      </div>
      

      <div id="index-opt">

        <div v-for="indikator in indikatorenOverview" 
          class="opt" 
          :key="indikator.name" 
          @click="onIndClick(indikator)"
          :class="activeInd==indikator.id ? 'active' : ''"
          >
          <h5 :class="indikator.class" >{{indikator.name}}</h5>
        </div>

      </div>

      <div id="viz-container">

        <div v-for="(indikator,index) in indikatorenOverview[activeInd].indikatoren"
          class="viz"
          :key="indikator[activeInd]" 
          >


          <div class="viz-text">
            
            <b>{{indikator['name']}}</b><div :class="['ampel','phase' + indDataParsed[indikator.name].phase]"></div><br>
            <div class="info-text">{{indikator['text-sm']}}</div>
            <i class="icon-info-circled ind-info" @mouseover="showTooltip(index)" @mouseout="hideTooltip"/>
            <div :class="['tooltip', infoVisible==index?'visible':'']">
              {{indikator['text-lg'] + ': '}} <b>{{indDataParsed[indikator.name].val}}</b> {{indikator['unit']}} 

            </div>
            
          </div>

          <viz-bz 
            :activeIndClass="activeIndClass" 
            :indikatorValue="indDataParsed[indikator.name].val"
            :indikatorValuePercent="indDataParsed[indikator.name].valPercent"
            :averageValue="indDataParsed[indikator.name].average"
            :activeInd="activeInd"
            :compareSelected="compareSelected"
            :bzrSelected="bzrSelected"
            :bzName="bzName"
            >

          </viz-bz>


        </div>

      </div>


      <div class="info" @click="showModal" ><i class="icon-info-circled" /> Hilfe</div>

      <modal v-show="isModalVisible" @close="closeModal" />


  </div>

</template>


<script>

import toUrl from '~/assets/js/tourl.js';
import { mapState } from 'vuex';

import VizBz from '~/components/bz/VizBz.vue';
import Dropdown from '~/components/Dropdown.vue';
import Modal from '~/components/bz/Modal.vue'

export default {

    computed: {
      ...mapState([
        'indikatorenOverview'
      ]),
      indDataParsed(){

        const newIndData = {};
        const indCopy = JSON.parse(JSON.stringify(this.indData));

        

        for(const x in indCopy) {

          newIndData[x] = indCopy[x];

          if(this.compareSelected == "Berlin"){


            let average;
            for(const indClass in this.indikatorenOverview) {
              if(this.indikatorenOverview[indClass].indikatoren[x]){
                average = this.indikatorenOverview[indClass].indikatoren[x].average;
              }
            }
 
            const averageVal = average;
            const currentVal = newIndData[x].val;
            const deviationVal = ((currentVal-averageVal)/averageVal) * 100; //Abweichung vom Durchschnittswert

            newIndData[x].val = currentVal;
            newIndData[x].valPercent = deviationVal;
            newIndData[x].average = averageVal;
            newIndData[x].phase = newIndData[x].phaseB;



          }else{ //if compared with BZ

            const averageVal = this.indDataBz[x].val; //compare with the data from the BZ not BZR
            const currentVal = newIndData[x].val;
            const deviationVal = ((currentVal-averageVal)/averageVal) * 100; //Abweichung vom Durchschnittswert

            newIndData[x].val = currentVal;
            newIndData[x].valPercent = deviationVal;
            newIndData[x].average = averageVal;
            newIndData[x].phase = newIndData[x].phaseBz;

          }

        
        }

        return newIndData;
      }
       
    },
    props: ["bzrSelected","indData","indDataBz","bzName"],
    components: {
      VizBz,Dropdown,Modal
    },
    mounted(){
      //Show modal only once on firt load
      const modalHasBeenShown = window.sessionStorage.getItem("modalShown");
      if(!modalHasBeenShown){
        this.showModalDelayed();
      }

    },
    data(){
        return{
          activeInd :1,
          activeIndClass:"indGr1",
          compareOpt:"Bezirk",
          compareSelected:"Berlin",
          showDropdown:false,
          isModalVisible: false,
          infoVisible: true
        }
    },
    // props: ["mainColor"],
    methods:{
      onIndClick(x){

        this.activeInd =x.id;
        this.activeIndClass=x.class;

      },
      onBzrProfile(bzr){
        this.$router.push({ path: '../bezirksregion/' + toUrl(bzr) });
      },
      selectDropdown(){
        this.showDropdown = this.showDropdown?false:true
      },
      dropdownSelected(){
        this.compareSelected = this.compareOpt=="Berlin"?"Berlin":"Bezirk";
        this.compareOpt = this.compareOpt=="Berlin"?"Bezirk":"Berlin";
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      showModalDelayed(){
        window.sessionStorage.setItem("modalShown", "true");
        setTimeout(function(){ this.isModalVisible = true; }.bind(this), 1500);
      },
      showTooltip(id){
        this.infoVisible = id;
      },
      hideTooltip(){
        this.infoVisible = "";
      }

    },
    watch:{
      bzrSelected: function (val) {
        if(this.bzName==this.bzrSelected){
          this.compareSelected = "Berlin";
          this.compareOpt = "Bezirk";
        }
      }
    }
}


</script>



<style lang="scss" scoped>

@import "~@/assets/style/variables";


  #title{

    display: flex;
    margin-top: 24px;

    h4{
      flex: 1;
    }

    .compare-inactive{
      opacity: .3;
      pointer-events: none;
    }

    #compare-dropdown *{

      font-size: 0.7rem !important;

    }

    #compare-dropdown{

      flex: 1;
      display: flex;
      line-height: 1.9em;

      .compare-dropdown-text{
        color: $tsb-darkblue;
        font-weight: bold;
        flex: 1;
        text-align: right;
        padding-right: 10px;
      }

      #dropdown-mini{

        cursor: pointer;
        width: 68px;
        text-transform: uppercase;
        font-weight: bold;

        i{
          float: right;
          position: relative;
        }

        div:hover{
          opacity: .8;
        }

        div{
          position: absolute;
          margin-top: -4px;
          background-color: $tsb-lightgray;
          opacity: .8;
        }

        .hidden{
          display: none;
        }

      }
    }

  }//title


  //Datenprofil button
  .button{
    background-color: $tsb-darkblue; //#1E3791;
    color: white;
    padding: 0.3em;
    margin-top: 0.2em;
    margin-bottom: 0.3em;  
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
  }

  .button.btn-show:hover{
    opacity: .8;
  }

  .btn-show{
    opacity: 1;
    transition: 1s;
    pointer-events: auto;
  }




  #viz-container{

    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 2.2em;

    .viz{
      flex-basis: calc(33% - 20px);;
      margin: 10px;
      padding-bottom: 15px;
      background-color: white;

    }


    @media screen and (max-width: 900px) {
      .viz { flex-basis: calc(50% - 10px); }
    }

    @media screen and (max-width: 300px) {
      .viz { flex-basis: calc(100% - 10px); }
    }


    .viz-text{

      min-height: 65px;
      position: relative;
      margin: 0.7em;
      margin-bottom: 0.8em;

      .tooltip{
        background-color: #fff;
        width: 150px;
        position: absolute;
        right: 0px;
        top: 20px;
        padding: 6px;
        overflow: hidden;
        z-index: 1;
        height: auto;
        border-radius: 0;
        border: 1px solid #ccc;
        display:none;

        &.visible{
          display:block;
        }

      }



      .ind-info{
        position: absolute;
        top: -4px;
        font-size: 1.4em;
        right: 0;
        color: #858585;
        // cursor: pointer;

        &:hover{
          opacity: .8;
        }
      }


      .ampel{
        margin-left:.7em;
        margin-top: 1px;
        position: absolute;
        // transition:.3s;
      }

      .info-text{
        padding-top: 3px;
        width: 100%;
      }

      font-size: .7em;

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

      div{
        width: 13px;
        height: 13px;
        border-radius: 20px; 
        display: inline-block;
        margin-right: 5px;
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

      &:hover{
        opacity: 0.6;
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
    background-color: #858585;
    cursor:pointer;
    color: white;

    &:hover{
      opacity:.8;
    }
  }

</style>