<template>
  <bezirk :bezirkName="bezirkName"></bezirk>
</template>



<script>

  import Bezirk from '~/components/bz/Bezirk.vue';
  import { mapState } from 'vuex';

  export default {
    head () {
      return {
        title: this.bezirkName + " Bezirksprofil"
        // titleTemplate: '2030 Watch - %s'
      }
    },
    computed: {
      ...mapState([
        'bzNamen'
      ]),
      bezirkName () {

        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key].url === value);
        }

        const selectedBzUrl = this.$route.params.bezirk;
        const selectedBz = getKeyByValue(this.bzNamen,selectedBzUrl);
        return selectedBz

      }
    },
    components: {
      Bezirk
    }
  }
</script>

<style lang="scss" scoped>
  .progress > * {
    max-height: 150px;
    max-width: 150px;
  }
</style>
