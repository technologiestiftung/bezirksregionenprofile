# Bezirksregionen Explorer

> ...

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000 (currently localhost:3000/tsb)
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate (read the notes)
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## Before you generate the site

# The project currently runs in the base folder 'tsb'. To change this do the follwing:

```

# Change the base folder in the nuxt.config.js -> base: '/tsb/'

# adapt @font-face urls in style/typography.css accordingly

```

# Adjust the url:

```

# in store/index.js adapt variable productionUrl 

```


## Map Data Infos

```
# download all data from here as json: https://data.technologiestiftung-berlin.de/dataset/
# upload all the files to mapshaper and save the files as one topjson
# save it as map-borders.json in the data folder
```

