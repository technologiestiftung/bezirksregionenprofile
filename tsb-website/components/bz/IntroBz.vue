<template>


<div class="content-intro">

  <div class="intro-text">

      <h5>BEZIRK</h5>
      <h4>{{bezirk}}</h4>

    	<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>


      <div class="intro-stats">
        
        <div>
          Fläche
          <h4>45464 km²</h4>
        </div>
        <div>
          Einwohner
          <h4>45464</h4>
        </div>
        <div>
          Bevölkerungsdichte
          <h4>45464 EW/km²</h4>
        </div>
      </div>


  </div>

</div>
    	


</template>


<script>

export default {
  props: ["bezirk"]
}

</script>


<style lang="scss" scoped>
	
	
@import "~@/assets/style/variables";

.intro-text{

  display:block;
  // padding:2em;


}

</style>