<template>
  <section v-if='bzrIntroData && datenblatt'> 
    <intro :name="getBzrName" :nameClass="getBzName" :introData="bzrIntroData"></intro>
    <div class="content-main">
      <div class="content-main-bzr-left">

        <map-bzr :bzrName="getBzrName"></map-bzr>
        <navigation-bzr :bzrName="getBzrName" :themen="themen"  v-on:changeThemaSelected="changeThemaSelected" :themaSelected="themaSelected"></navigation-bzr>

      </div>
      <info-bzr 
        :themen="themen"  
        v-on:changeThemaSelected="changeThemaSelected" 
        :themaSelected="themaSelected" 
        :datenblatt="datenblatt"
        :sourceUrl="getSourceUrl"
        :bzrName="getBzrName">
      </info-bzr>

    </div>

  </section>
</template>

<!-- v-if='bzrData' -->
<script>

  import { mapState } from 'vuex';
  import axios from 'axios';
  import toUrl from '~/assets/js/tourl.js';
  import Papa from 'papaparse';


  // import IntroBz from '~/components/bzr/IntroBz.vue';
  import Intro from '~/components/IntroBzBzr.vue';
  import MapBzr from '~/components/bzr/MapBzr.vue';
  import InfoBzr from '~/components/bzr/InfoBzr.vue';
  import NavigationBzr from '~/components/bzr/NavigationBzr.vue';

  

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].url === value);
  }


  export default {
    head () {
      return {
        title: this.getBzrName + " Datenblatt",
      }
    },
    methods: {
      // format: format
    },
    data(){
      return {
        bzrUrl: this.$route.params.bezirksregion,
        bzrIntroData:null,
        themaSelected:1,
        datenblatt: null
      }
    },
    created() {
      this.getBzrData();
      this.getDatenblattData();
      // this.getIndData();
      // this.bzName = this.bzrNamen[this.getBzrName].bzName;
      // console.log(this.$route.params.bezirksregion)
    },
    computed: {
      ...mapState([
        'bzrNamen','themen','url','urldev'
      ]),
      getBzrName () {
        return getKeyByValue(this.bzrNamen,this.bzrUrl);
      },
      getBzName(){
        return this.bzrNamen[this.getBzrName].bzName
      },
      getSourceUrl(){
        //get the url where the vis data is
        const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
        return url + '/data/bz-data/' + toUrl(this.getBzName) + '/bzr-data/' +this.$route.params.bezirksregion+'/data/';
      }

    },
    components: {
      Intro,MapBzr,InfoBzr,NavigationBzr
    },
    methods:{
      getBzrData(){ //
        const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
        axios.get(url + '/data/bz-data/' + toUrl(this.getBzName) + '/bzr-data/' +this.$route.params.bezirksregion+'/bzr-overview.json').then((response)=>
          this.bzrIntroData = response.data
        )
      },
      changeThemaSelected(themaId){
        this.themaSelected=themaId;
      },
      getDatenblattData(){ //
        const url = process.env.NODE_ENV === 'production' ? this.url : this.urldev;
        axios.get(url + '/data/bz-data/' + toUrl(this.getBzName) + '/bzr-data/' +this.$route.params.bezirksregion+'/datenblatt.csv').then((response)=>
          this.datenblatt = Papa.parse(response.data,{header: true}).data
        )
      },
    }
  }
</script>

<style lang="scss" scoped>
  .progress > * {
    max-height: 150px;
    max-width: 150px;
  }
</style>
