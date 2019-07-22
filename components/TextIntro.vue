<template>
  <div class="content-intro">

    <div class="intro-text">


    	<h4>Wie Geht es den Berliner Bezirken?</h4>

    	<p>In welchem Kiez gibt es viele Spielplätze? Wo ziehen überdurchschnittlich viele Berliner*innen hin?

Der Ist-Zustand der Berliner Bezirke - und der kleingliedrigeren Bezirksregionen - wird in sogenannten Bezirks(regionen)profilen festegehalten. 
Anhand von Kernindikatoren zu den Themen "Wohnen", "Demographie", "Dynamik", "Arbeitsmarkt" und "Kinder und Jungend" wird eine vergleichbare Datengrundlage zu sozialraumorientierten Themen geschaffen. 
In dieser Anwendung werden diese Kernindikatoren interaktiv aufbereitet und - soweit vorliegend - die ausführlichen Berichte der Bezirke bereitgestellt.</p>
<p><b>Klicke auf einen Bezirk, über den Du mehr erfahren möchtest.</b>
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