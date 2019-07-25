module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Bezirksregionenprofile',
    meta: [
      { charset: 'utf-8' },
      { robots: 'noindex'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bezirksregionen Monitor' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    // Load a node module directly (here it's a SASS file)
    'normalize-scss',
    // CSS file in the project
    '@/assets/style/base.scss'
  ],
  //generate the site links
  generate: {
    routes: function () {
      const bezirke = Object.keys(JSON.parse(require('fs').readFileSync('data/bz-routes.json', 'utf8'))).map((data) => {
        return '/bezirk/' + data;
      });
      const bezirksregionen = Object.keys(JSON.parse(require('fs').readFileSync('data/bzr-routes.json', 'utf8'))).map((data) => {
        return '/bezirksregion/' + data;
      });
      return [...bezirke,...bezirksregionen]
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#1E3791' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['mapbox-gl'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.noParse = /(mapbox-gl)\.js$/
    }
  },
  router: {
    base: '/'
  }
}


