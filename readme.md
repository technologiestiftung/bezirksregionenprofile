Setup:

follw these instructions: https://nuxtjs.org/guide/installation

for sass:
npm install --save-dev node-sass sass-loader
npm install --save normalize-scss
add this to nuxt.config:

  css: [
    // Load a node module directly (here it's a SASS file)
    'normalize-scss',
    // CSS file in the project
    '@/assets/style/base.scss'
  ],



if using mapbox -> adapt nuxt.config like so:

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


geodata https://data.technologiestiftung-berlin.de/:
load geojsons into http://mapshaper.org/
download all as topojson






WHEN DONE

adapt url from style json
npm run generate



RUN PROJECT 

npm run dev