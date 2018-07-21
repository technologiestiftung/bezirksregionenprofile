<template>
  <div class="page">
    <tsb-header></tsb-header>
    <div class="page-content">
      <nuxt/>
    </div>
    <tsb-footer></tsb-footer>
  </div>
</template>

<script>
import TsbHeader from '~/components/TsbHeader.vue'
import TsbFooter from '~/components/TsbFooter.vue'

export default {
  components: {
    TsbHeader,TsbFooter
  }
}
</script>


<style>

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}


</style>
