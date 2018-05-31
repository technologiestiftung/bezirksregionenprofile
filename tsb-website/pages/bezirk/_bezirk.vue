<template>
  <section v-if='bzData'>
    <intro-bz :bezirk="bezirk" :bzData="bzData"></intro-bz>
    <div class="content-main">
      <map-bz :bezirk="bezirk" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz :bzrSelected="bzrSelected"></info-bz>
    </div>

  </section>
</template>



<script>

  import { mapState } from 'vuex';
  import axios from 'axios'

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
        bzrSelected : this.bezirk,
        bzData:undefined
      }
    },
    created() {
      this.getData();
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
        console.log("hiiiiiii",name)

      },
      getData(){
        const url = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:3000';
        axios.get(url + '/data/bz-data/'+this.$route.params.bezirk+'/bz-data.json').then((response)=>
          this.bzData = response.data
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
