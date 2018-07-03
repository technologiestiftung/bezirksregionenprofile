<template>

  <div class="content-main-bzr-info column" v-scroll="handleScroll">

    <ul>

      <li v-for="thema in themen" 
        class="opt" 
        :key="thema.name" 
        >

        <h4 :id="'thema-id' + thema.id">{{thema.id}} {{thema.name}}</h4>
        <div class="line"></div>

        <div class="datenblatt-element" v-for="(blattEl,index) in datenblatt" :key="index" v-if="blattEl.ref==thema.id">

          <!-- Title -->
          <div class="blatt-el-titel" v-if="blattEl.type=='titel'">{{blattEl.content}}</div>
          <!-- Text -->
          <div class="blatt-el-text" v-if="blattEl.type=='text'">{{blattEl.content}}</div>
          <!-- Barchart -->
          <barchart v-if="blattEl.type=='barchart'"></barchart> 

        </div>

      </li>

    </ul>

  </div>

</template>


<script>

import toUrl from '~/assets/js/tourl.js';
import { mapState } from 'vuex';

import Barchart from '~/components/bzr/vis/Barchart.vue';



export default {

    directives: {
      scroll: {
        // directive definition
        inserted: function (el, binding) {
            let f = function (evt) {
              if (binding.value(evt, el)) {
                el.removeEventListener('scroll', f)
              }
            }
            el.addEventListener('scroll', f)
          }
      }
    },
    props: ["themen","datenblatt"],
    components: {
      Barchart
    },
    mounted(){

      console.log("datenblatt",this.datenblatt)

    },
    data(){
        return{

        }
    },
    // props: ["mainColor"],
    methods:{
      handleScroll(x,y){
        // console.log("scrolling",x,y)

        var isInViewport = function (elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        for (var i = 0; i < this.themen.length; i++) {
          // const tId = this.themen[i].id;
          const tId = "thema-id" +this.themen[i].id;

          const tIdInViewport = isInViewport(document.getElementById(tId));
          if(tIdInViewport){

            this.$emit('changeThemaSelected',this.themen[i].id);
            break
            
          }

        }



      }
     
    }
}


</script>



<style lang="scss" scoped>

  @import "~@/assets/style/variables";

  h4{
    color: $tsb-darkblue; //#1E3791;
  }

  .line{
    width: 50px;
    height:10px;
    border-bottom: 3px solid $tsb-darkblue;
    margin-bottom: 15px;
  }

  // .placeholder{
  //   height: 500px;
  // }

  .datenblatt-element{
    // background-color:#ccc;
    .blatt-el-titel{
      color: $tsb-darkblue;
    }

    .blatt-el-text{
      color: #ccc;
    }

  }


</style>