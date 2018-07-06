<template>

  <div class="content-main-bzr-info column" v-scroll="handleScroll">

    <ul>

      <li v-for="thema in themen" 
        class="opt" 
        :key="thema.name" 
        >
        <!-- Title Thema -->
        <h4 :id="'thema-id' + thema.id">{{thema.id}} {{thema.name}}</h4>
        <div class="line"></div>

        <div class="datenblatt-element" v-for="(blattEl,index) in datenblatt" :key="index" v-if="blattEl.ref==thema.id">

          <vis-setup :visInfo="blattEl" :sourceUrl="sourceUrl" :bzrName="bzrName"></vis-setup>

        </div>

      </li>

    </ul>

  </div>

</template>


<script>

import toUrl from '~/assets/js/tourl.js';
import { mapState } from 'vuex';

// import BarchartLoader from '~/components/bzr/vis/BarchartLoader.vue';
// import Tabelchart from '~/components/bzr/vis/Tabelchart.vue';
// import MapPr from '~/components/bzr/vis/MapPr.vue';

import VisSetup from '~/components/bzr/VisSetup.vue';


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
    props: ["themen","datenblatt","sourceUrl","bzrName"],
    components: {
      VisSetup
    },
    computed: {
      // getData: function (dataSource) {
      //   return new Promise((resolve, reject) => {
      //     axios.get(this.sourceUrl+'/'+dataSource+'.csv').then((response)=>
      //       resolve(Papa.parse(response.data,{header: true}).data)
      //     )
      //   })
      // }
    },
    mounted(){

      // console.log("namen",this.bzrName)

      // console.log("datenblatt",this.datenblatt,this.sourceUrl)

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
      },
      // getData: function (dataSource) {
      //   return new Promise((resolve, reject) => {
      //     axios.get(this.sourceUrl+'/'+dataSource+'.csv').then((response)=>
      //       resolve(Papa.parse(response.data,{header: true}).data)
      //     )
      //   })
      // }
     
    },
    // actions: {
    //   getData: function (dataSource) {
    //     return new Promise((resolve, reject) => {
    //       axios.get(this.sourceUrl+'/'+dataSource+'.csv').then((response)=>
    //         resolve(Papa.parse(response.data,{header: true}).data)
    //       )
    //     })
    //   }
    // }
}


</script>



<style lang="scss" scoped>

  @import "~@/assets/style/variables";

  li{
    margin-top: 3em;
  }

  li:first-child {
    margin-top: 1em;
  }


  h4{
    color: $tsb-darkblue; //#1E3791;
  }

  .line{
    width: 50px;
    height:10px;
    border-bottom: 3px solid $tsb-darkblue;
    margin-bottom: 2em;
  }

</style>