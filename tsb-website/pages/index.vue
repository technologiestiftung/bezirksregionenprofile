<template>
  <section class="container">
    <text-intro></text-intro>
    <map-intro :mainColor="mainColor"></map-intro>
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
      mainColor:"red"
    }
  },
}
</script>

<style>

.container {
/*  min-height: 100vh;
  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
  /*text-align: center;*/
}

</style>
