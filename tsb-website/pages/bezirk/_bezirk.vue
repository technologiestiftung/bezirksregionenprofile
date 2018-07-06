<template>
  <section v-if='bzData && indData'>
    <intro-bz :name="bezirk" :nameClass="nameClass" :introData="bzData"></intro-bz>
    <div class="content-main">
      <map-bz :bezirk="bezirk" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz :bzrSelected="bzrSelected" :bzData="bzData" :indData="indData"></info-bz>
    </div>

  </section>
</template>



<script>

  import { mapState } from 'vuex';
  import axios from 'axios';
  import Papa from 'papaparse';
  import toUrl from '~/assets/js/tourl.js';
  import toIndikatorenJSON from '~/assets/js/toIndikatorenJSON.js';

  import IntroBz from '~/components/IntroBzBzr.vue';
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
        indData:undefined,
        indDataBz:undefined,
        nameClass:"Bezirk"
      }
    },
    created() {
      this.getBzData();
      this.getIndData();
      this.bzrSelected = this.bezirk;
    },
    computed: {
      ...mapState([
        'bzNamen','url','urldev'
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

        if(this.bzrSelected==name){return};//if the same

        this.bzrSelected = name;

        if(name==this.bezirk){//if bz

          this.indData = this.indDataBz;

        }else{//if bzr then load new data from bzr source

          const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
          axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/bzr-data/'+toUrl(name)+'/indikatoren.csv').then((response)=>
            this.indData = toIndikatorenJSON(Papa,response.data)
          )

        }

      },
      getBzData(){ //
        const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
        axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/bz-overview.json').then((response)=>
          this.bzData = response.data
        )
      },
      getIndData(){ //get the info about Kernidikatoren such as the description etc
        const me = this;
        const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
        axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/indikatoren.csv').then(function(response){
          const responseData = toIndikatorenJSON(Papa,response.data);
          me.indData = responseData;
          me.indDataBz = responseData;
        })
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
