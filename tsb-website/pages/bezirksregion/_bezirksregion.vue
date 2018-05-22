<template>
  <section>
    <intro-bz :bezirk="bezirk"></intro-bz>
    <div class="content-main">
      <map-bz :bezirk="bezirk" v-on:bzRChanged="changeBzR"></map-bz>
      <info-bz :bzrSelected="bzrSelected"></info-bz>
    </div>

  </section>
</template>



<script>

  import { mapState } from 'vuex';

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
    methods: {
      // format: format
    },
    data(){
      return {
        bzrSelected : this.bezirk
      }
    },
    computed: {
      ...mapState([
        'bezirksNamen'
      ]),
      bezirk () {

        const selectedBzUrl = this.$route.params.bezirk;

        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key].url === value);
        }

        const selectedBz = getKeyByValue(this.bezirksNamen,selectedBzUrl);

        return selectedBz

      }
    },
    components: {
      IntroBz,MapBz,InfoBz
    },
    methods:{
      changeBzR(x){
        this.bzrSelected = x;
        console.log("hi",x)

      }
    }
  }
</script>

<style lang="scss" scoped>
  .progress > * {
    max-height: 150px;
    max-width: 150px;
  }
</style>
