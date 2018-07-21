<template>
  <div class="content-intro">

    <div class="intro-text">


    	<h4>Wie Geht es den Berliner Bezirken?</h4>

    	<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      <p class="more-link"><nuxt-link to="/about">Mehr erfahren...</nuxt-link></p>
    	
    </div>

    <div class="content-intro-logo">

      <img src="img/tsb-logo-content.svg" alt="Technologiestiftung Berlin Logo">
    	
    </div>

  </div>

</template>


<script>

export default {
  name: 'TextIntro'
}

</script>


<style lang="scss" scoped>
	
	
@import "~@/assets/style/variables";


.content-intro{

  .intro-text{

    // flex: 2;
    // height: 100%;
    background-color: $tsb-darkblue;
    color: white;
    flex-basis: 66%;

    h4{
      padding-bottom: .5em;
    }

    .more-link{
      
      float: right;
      font-family: $font-family-bold;

      a{
        color: white !important;
      }
    }

  }

  .content-intro-logo{

    flex:1;
    // height: 100%;
    background-color: #fff;
    text-align: center;

    img{
      width: 150px;
      padding: 85px 0;
    }

  }

}

</style>