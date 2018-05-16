module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tsb-website',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'bezirksregionen explorer' }
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
      const bezirke = Object.keys(JSON.parse(require('fs').readFileSync('data/bz.json', 'utf8'))).map((data) => {
        return '/bezirk/' + data.toLowerCase().replace(/\u00fc/g, "ue").replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
      })
      return [...bezirk]
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
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
  }
}


