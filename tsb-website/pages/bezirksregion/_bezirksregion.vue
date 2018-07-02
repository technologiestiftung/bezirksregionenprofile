<template>
  <section v-if='bzrIntroData'> 
    <intro-bz :name="getBzrName" :nameClass="getBzName" :introData="bzrIntroData"></intro-bz>
    <div class="content-main">
<!--       <map-bz :bezirk="bezirk" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz :bzrSelected="bzrSelected" :bzData="bzData" :indData="indData"></info-bz> -->
    </div>

  </section>
</template>

<!-- v-if='bzrData' -->
<script>

  import { mapState } from 'vuex';
  import axios from 'axios';
  import toUrl from '~/assets/js/tourl.js';

  // import IntroBz from '~/components/bz/IntroBz.vue';
  // import MapBz from '~/components/bz/MapBz.vue';
  import IntroBz from '~/components/IntroBzBzr.vue';

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
        bzrIntroData:null
      }
    },
    created() {
      this.getBzrData();
      // this.getIndData();
      // this.bzName = this.bzrNamen[this.getBzrName].bzName;
      // console.log(this.$route.params.bezirksregion)
    },
    computed: {
      ...mapState([
        'bzrNamen'
      ]),
      getBzrName () {
        return getKeyByValue(this.bzrNamen,this.bzrUrl);
      },
      getBzName(){
        return this.bzrNamen[this.getBzrName].bzName

      }

    },
    components: {
      IntroBz
    },
    methods:{
      getBzrData(){ //
        const url = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:3000';
        axios.get(url + '/data/bz-data/' + toUrl(this.getBzName) + '/bzr-data/' +this.$route.params.bezirksregion+'/bzr-overview.json').then((response)=>
          this.bzrIntroData = response.data
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
