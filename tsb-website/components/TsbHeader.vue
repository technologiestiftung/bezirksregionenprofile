<template>

    <header class="page-header columns">
      <strong class="logo"><nuxt-link to="/">
      	<!-- <img src="../assets/img/bzr.png" alt=""> -->
      	HOME
      </nuxt-link></strong>
      <nav class="page-nav">
        <ul>
<!--           <li><nuxt-link to="/">Home</nuxt-link></li> -->
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/kontakt">Kontakt</nuxt-link></li>
        </ul>
      </nav>
    </header>

</template>


<script>

export default {
  name: 'TsbHeader'
}