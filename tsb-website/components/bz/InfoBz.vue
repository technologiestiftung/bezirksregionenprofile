<template>

  <div class="content-main-info column">

      <div id="title">
        <h4><i class="icon-right-small" /> Themen & Daten</h4> 
        <div id="compare-dropdown" :class="this.bzData.name==this.bzrSelected ? 'compare-inactive' : ''">
          <div class="compare-dropdown-text">VERGLEICHEN MIT:</div>
          <!-- <dropdown :options="compareOpt" :selected="compareSelected" class="dropdown" v-on:updateOption="onCompareChange"></dropdown> -->

          <div id="dropdown-mini" @click="selectDropdown()">{{compareSelected}} <i class="icon-down-dir" />
            <div :class="showDropdown? '':'hidden'" @click="dropdownSelected()">{{compareOpt}}</div>
          </div>

        </div>
      </div>

      <div 
        :class="bzrSelected==bzData.name?'btn-hidden button':'button'"
        @click="onBzrProfile(bzrSelected)">
        <i class="icon-right-small" /> zum Datenprofil {{bzrSelected}}
      </div>
      

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
            :indikatorValue="indDataParsed[indikator.name].val"
            :indikatorValuePercent="indDataParsed[indikator.name].valPercent"
            :averageValue="indDataParsed[indikator.name].average"
            :activeInd="activeInd"
            :compareSelected="compareSelected"
            :bzrSelected="bzrSelected"
            :bzName="bzData.name"
            >

          </viz-bz>

          <div class="viz-ampel-container">
<!--             <div class="viz-ampel">

                <div :class="indDataParsed[indikator.name].phase==1?'phase'+indDataParsed[indikator.name].phase:''"></div>
                <div :class="indDataParsed[indikator.name].phase==2?'phase'+indDataParsed[indikator.name].phase:''"></div>
                <div :class="indDataParsed[indikator.name].phase==3?'phase'+indDataParsed[indikator.name].phase:''"></div>
                <div :class="indDataParsed[indikator.name].phase==4?'phase'+indDataParsed[indikator.name].phase:''"></div>

            </div> -->
<!--             <div class="viz-ampel">

                <div :class="['phase1', indDataParsed[indikator.name].phase==1?'highlight':'']"></div>
                <div :class="['phase2', indDataParsed[indikator.name].phase==2?'highlight':'']"></div>
                <div :class="['phase3', indDataParsed[indikator.name].phase==3?'highlight':'']"></div>
                <div :class="['phase4', indDataParsed[indikator.name].phase==4?'highlight':'']"></div>

            </div> -->
          </div>

          <div class="viz-text">
            <div :class="'phase' + indDataParsed[indikator.name].phase"></div> 
            <b>{{indikator['name']}}</b> 
            
            - {{indikator['text-sm']}}
            
          </div>



        </div>

      </div>


<!--       {{"active id: " + activeInd}} -->


<!--       <div class="viz-container">
        <viz-bz></viz-bz>
      </div> -->


      <div class="info" @click="showModal" ><i class="icon-info-circled" />info/Legende</div>


      <modal
            v-show="isModalVisible"
            @close="closeModal"
          />



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
        'indikatorenGr'
      ]),
      indDataParsed(){

        const newIndData = {};
        const indCopy = JSON.parse(JSON.stringify(this.indData));

        for(const x in indCopy) {

          newIndData[x] = indCopy[x];

          if(this.compareSelected == "Berlin"){

             // const averageVal = (minVal + maxVal) /2 ;
            const averageVal = newIndData[x].average;
            const currentVal = newIndData[x].val;
            const deviationVal = ((currentVal-averageVal)/averageVal) * 100; //Abweichung vom Durchschnittswert

            newIndData[x].val = currentVal;
            newIndData[x].valPercent = deviationVal;
            newIndData[x].average = averageVal;
            newIndData[x].phase = newIndData[x].phaseB;



          }else{ //if compared with BZ


            const averageVal = newIndData[x].average;
            const currentVal = newIndData[x].val;
            const deviationVal = ((currentVal-averageVal)/averageVal) * 100; //Abweichung vom Durchschnittswert

            newIndData[x].val = currentVal;
            newIndData[x].valPercent = deviationVal / 1.1;
            newIndData[x].average = averageVal / 1.1;
            newIndData[x].phase = newIndData[x].phaseBz;

          }

        
        }

        return newIndData;
      }
       
    },
    props: ["bzrSelected","indData","bzData"],
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
      }
      // onCompareChange(x){

      //   this.compareSelected = x.name;
      //   if(x.name == "Berlin"){
      //     this.compareOpt = [{"name":"Bezirk"}];
      //   }else{
      //     this.compareOpt = [{"name":"Berlin"}];
      //   }

      // }
    },
    watch:{
      bzrSelected: function (val) {
        if(this.bzData.name==this.bzrSelected){
          this.compareSelected = "Berlin";
          this.compareOpt = "Bezirk";
        }
      }
    }
}


</script>



<style lang="scss" scoped>

@import "~@/assets/style/variables";


  // #map {

  //   width:100%;
  //   height: 60vh;
  //   position: absolute;

  // }



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
      // font-size: 0.7rem;
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
          // color:#ccc;
        }

        .hidden{
          display: none;
        }

      }
    }

  }//title



  .button{
    background-color: $tsb-darkblue; //#1E3791;
    color: white;
    padding: 0.3em;
    margin-top: 0.2em;
    margin-bottom: 0.3em;  
    cursor: pointer;
  }

  .button:hover{
    opacity: .8;
  }

  .btn-hidden{
    visibility: hidden;

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

    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 2.2em;

    .viz{
      flex-basis: calc(33% - 20px);;
      margin: 10px;
      // background-color: lightgreen;
      // height:50px;
          padding-top: 20px;

    }


    @media screen and (max-width: 900px) {
      .viz { flex-basis: calc(50% - 10px); }
    }

    @media screen and (max-width: 300px) {
      .viz { flex-basis: calc(100% - 10px); }
    }



    .viz-text{

      font-size: .7em;
      margin-top: 0.7em;
      // min-height: 60px;

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

    // .viz-ampel-container{

    //  text-align: center;

    //   .viz-ampel{

    //     display: inline-block;

    //     div{
    //       margin: 4px;
    //       width: 7px;
    //       height: 7px;
    //       border-radius: 20px;      
    //       float: left; 
    //       background-color:#ddd;
    //       opacity: .4;
    //       margin-top: 4px;
    //     }

    //     .highlight{
    //       opacity: 1;
    //       width: 15px;
    //       height: 15px;
    //       margin-top: 0px;
    //     }

    //     .phase1{
    //       background-color:$color-phase1;
    //       border: 2px solid #ddd; 
    //     }
    //     .phase2{
    //       background-color:$color-phase2;
    //     }
    //     .phase3{
    //       background-color:$color-phase3;
    //     }
    //     .phase4{
    //       background-color:$color-phase4;
    //     }

    //   }

    // }

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