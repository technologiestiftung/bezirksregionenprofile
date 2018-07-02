<template>
  <section v-if='bzrData'>
    <intro-bz :name="bzr" :introData="bzData"></intro-bz>
    <div class="content-main">
<!--       <map-bz :bezirk="bezirk" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz :bzrSelected="bzrSelected" :bzData="bzData" :indData="indData"></info-bz> -->
    </div>

  </section>
</template>


<script>

  import { mapState } from 'vuex';

  // import IntroBz from '~/components/bz/IntroBz.vue';
  // import MapBz from '~/components/bz/MapBz.vue';
  import IntroBzr from '~/components/IntroBzBzr.vue';

  export default {
    head () {
      return {
        title: this.bzr + " Datenblatt",
      }
    },
    methods: {
      // format: format
    },
    data(){
      return {
        bzr: this.$route.params.bezirksregion
      }
    },
    created() {
      this.getBzrData();
      // this.getIndData();
      // this.bzrSelected = this.bezirk;
      // console.log(this.$route.params.bezirksregion)
    },
    computed: {
      ...mapState([
        'bzrNamen'
      ]),
      // bezirk () {

      //   // const selectedBzUrl = this.$route.params.bezirksregion;

      //   // console.log(selectedBzUrl)

      //   // function getKeyByValue(object, value) {
      //   //   return Object.keys(object).find(key => object[key].url === value);
      //   // }

      //   // const selectedBz = getKeyByValue(this.bzrNamen,selectedBzUrl);

      //   // return selectedBz

      // }
    },
    components: {
      IntroBzr
    },
    methods:{
      getBzrData(){ //
        const url = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:3000';
        axios.get(url + '/data/bz-data/'+this.$route.params.bezirksregion+'/bzr-overview.json').then((response)=>
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
