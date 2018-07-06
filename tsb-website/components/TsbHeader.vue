<template>

    <header class="page-header columns">
      <strong class="logo"><nuxt-link to="/">
      	<!-- <img src="../assets/img/bzr.png" alt=""> -->
      	Berliner Bezirksregionen Monitor
      </nuxt-link></strong>
      <nav class="page-nav">
        <ul>
<!--           <li><nuxt-link to="/">Home</nuxt-link></li> -->
          <li><nuxt-link to="/about">Über den Monitor</nuxt-link></li>
          <li><a target="_blank" href="https://www.technologiestiftung-berlin.de/de/stiftung/kontakt-anfahrt/">Kontakt</a></li>
        </ul>
      </nav>
    </header>

</template>


<script>

export default {
  name: 'TsbHeader'
}