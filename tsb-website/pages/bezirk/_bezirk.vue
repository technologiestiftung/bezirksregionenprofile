<template>
  <section v-if='bzData && indData'>
    <intro-bz :bezirk="bezirk" :bzData="bzData"></intro-bz>
    <div class="content-main">
      <map-bz :bezirk="bezirk" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz :bzrSelected="bzrSelected" :indData="indData"></info-bz>
    </div>

  </section>
</template>



<script>

  import { mapState } from 'vuex';
  import axios from 'axios';
  import toUrl from '~/assets/js/tourl.js';

  import IntroBz from '~/components/bz/IntroBz.vue';
  import MapBz from '~/components/bz/MapBz.vue';
  import InfoBz from '~/components/bz/InfoBz.vue';



  export default {
    head () {
      return {
        title: this.bezirk + " Bezirksprofil",
        // titleTemplate: '2030 Watch - %s'
      }
    },
    data(){
      return {
        bzrSelected : undefined,
        bzData:undefined,
        indData:undefined
      }
    },
    created() {
      this.getBzData();
      this.getIndData();
      this.bzrSelected = this.bezirk;
    },
    computed: {
      ...mapState([
        'bzNamen'
      ]),
      bezirk () {

        const selectedBzUrl = this.$route.params.bezirk;

        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key].url === value);
        }

        const selectedBz = getKeyByValue(this.bzNamen,selectedBzUrl);

        return selectedBz

      }
    },
    components: {
      IntroBz,MapBz,InfoBz
    },
    methods:{
      changeBzR(name){
        this.bzrSelected = name;
        console.log("hiiiiiii",name,toUrl(name))

      },
      getBzData(){ //
        const url = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:3000';
        axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/bz-data.json').then((response)=>
          this.bzData = response.data
        )
      },
      getIndData(){ //get the info about Kernidikatoren such as the description etc
        const url = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:3000';
        axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/indikatoren.json').then((response)=>
          this.indData = response.data
        )
      }
      // getObjects() {
      //    // this.$http.get('/data/bz-data/tempelhof-schoeneberg/overview.json')
      //    //    .then((response) => {
      //    //      console.log(response);
      //    //      this.object = response.body.objects.find(item => item.id == this.id)
      //    //    })

      //   // let data = JSON.parse(require('fs').readFileSync('/data/bz-data/tempelhof-schoeneberg/overview.json', 'utf8'))
      //    console.log(this)

      // }
    }
    // mounted() {
    //   this.getObjects();
    // }
  }
</script>

<style lang="scss" scoped>
  .progress > * {
    max-height: 150px;
    max-width: 150px;
  }
</style>
