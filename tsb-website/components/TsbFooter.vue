<template>
  <footer class="page-footer columns columns-gutter">
    <address>
      Technologistiftung Berlin<br />
      Grunewaldstraße 61-62<br>
      10825 Berlin<br>
      Deutschland<br /><br />

    </address>
    <ul>
      <li><nuxt-link to="/impressum">Impressum</nuxt-link></li>
      <li><nuxt-link to="/kontakt">Kontakt</nuxt-link></li>
      <li><a href="mailto:xxx@xxx.de">Feedback</a></li>
    </ul>
    <ul>
      <li>
        <ul class="social-icons">
          <li><a href="mailto:xxx@xxx.de"><i class="icon-mail" /></a></li>
          <li><a href="https://twitter.com/"><i class="demo-icon icon-twitter" /></a></li>
          <li><a href="https://www.facebook.com/"><i class="demo-icon icon-facebook-squared" /></a></li>
          <li><a href="https://github.com/"><i class="demo-icon icon-github-circled" /></a></li>
        </ul>
      </li>
    </ul>
  </footer>
</template>

<script>

export default {
  name: 'TsbFooter'
}

</script>

<style lang="scss" scoped>
  .social-icons {
    margin-top: 1rem;
        font-size: 1.2em;

    li {
      display: inline-block;
      margin-right: 2rem;
    }
  }

    address{
          color: white;
    }
</style>
