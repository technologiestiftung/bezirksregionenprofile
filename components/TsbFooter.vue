<template>
  <footer class="page-footer columns columns-gutter">
    <address>
      <!-- Technologistiftung Berlin<br> -->
      Grunewaldstraße 61-62<br>
      10825 Berlin<br>
<!--       Deutschland<br> -->
      <a href="mailto:info@technologiestiftung-berlin.de">info@technologiestiftung-berlin.de</a><br>

    </address>
    <ul>
      <li><a target="_blank" href="https://www.technologiestiftung-berlin.de/de/stiftung/kontakt-anfahrt/">Kontakt</a></li>
      <li><a target="_blank" href="https://www.technologiestiftung-berlin.de/de/impressum">Impressum</a></li>
      <li><a target="_blank" href="https://www.technologiestiftung-berlin.de/de/datenschutz/">Datenschutz</a></li>
      <!-- <li><a href="mailto:xxx@xxx.de">Feedback</a></li> -->
    </ul>
    <ul>
      <li>
        <ul class="social-icons">
          <!-- <li><a href="mailto:xxx@xxx.de"><i class="icon-mail" /></a></li> -->
          <li><a target="_blank" href="https://twitter.com/tsbberlin"><i class="demo-icon icon-twitter" /></a></li>
          <li><a target="_blank" href="https://www.facebook.com/Technologiestiftung/"><i class="demo-icon icon-facebook-squared" /></a></li>
          <li><a target="_blank" href="https://github.com/technologiestiftung/"><i class="demo-icon icon-github-circled" /></a></li>
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
    // margin-top: 1rem;
    font-size: 1.8em;
    float: right;

    li {
      display: inline-block;
      margin-right: 2rem;
    }

    a:hover {
      border-bottom: 0px solid;
      opacity: .9;
    }
  }

    address{
          color: white;
    }
</style>

