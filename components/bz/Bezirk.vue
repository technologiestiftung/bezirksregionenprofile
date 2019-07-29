<template>
  <section v-if="bzData && indData">
    <intro-bz :name="bezirkName" :nameClass="nameClass" :introData="bzData"></intro-bz>
    <div class="content-main">
      <map-bz :bezirk="bezirkName" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz
        :bzrSelected="bzrSelected"
        :bzName="bzData.name"
        :indData="indData"
        :indDataBz="indDataBz"
      ></info-bz>
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
    data(){
      return {
        bzrSelected : undefined,
        bzData:undefined,
        indData:undefined,
        indDataBz:undefined,
        nameClass:"Bezirk"
      }
    },
    props: ["bezirkName"],
    created() {
      this.getBzData();
      this.getIndData();
      this.bzrSelected = this.bezirkName;
    },
    computed: {
      ...mapState([
        'bzNamen','url','urldev'
      ])
    },
    components: {
      IntroBz,MapBz,InfoBz
    },
    methods:{
      changeBzR(name){

        if(this.bzrSelected==name){return};//if the same

        this.bzrSelected = name;

        if(name==this.bezirkName){//if bz

          this.indData = this.indDataBz;

        }else{//if bzr then load new data from bzr source

          const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
          axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/bzr-data/'+toUrl(name)+'/indikatoren.csv').then((response)=>
            this.indData = toIndikatorenJSON(Papa,response.data)
          )
          const me = this;
          axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/indikatoren.csv').then(function(response){
            me.indDataBz = toIndikatorenJSON(Papa,response.data);
            })
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
