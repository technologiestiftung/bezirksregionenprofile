<template>
  <section>
    <text-intro></text-intro>
    <map-intro></map-intro>
  </section>
</template>

<script>

import MapIntro from '~/components/MapIntro.vue'
import TextIntro from '~/components/TextIntro.vue'

export default {
  components: {
    TextIntro,MapIntro
  },
  data(){
    return{
    }
  },
}
</script>

<style>

</style>
