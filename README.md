# Bezirksregionen Explorer

[![Build Status](https://travis-ci.com/technologiestiftung/bezirksregionenprofile-deploy.svg?branch=master)](https://travis-ci.com/technologiestiftung/bezirksregionenprofile-deploy)
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

#### no folder changes needed anymore: don't change anything
The project currently runs in the base folder 'tsb'. To change this, do the following:

```

# Change the base in the nuxt.config.js -> base: '/tsb/'
# adapt @font-face urls in style/typography.css accordingly

```
#### no adjustment of the url needed anymore: don't change anything
Adjust the url:

```

# in store/index.js adapt the variable productionUrl 

```

#### no roots need to be add: don't change anything
Add the routes:

```
# go to the data folder and add new routes in bz-routes and bzr-routes

```

finally run 

``` bash

$ npm run generate

```


## Map Data

In case something needs to be corrected sometime

```
# download all data from here as json: https://data.technologiestiftung-berlin.de/dataset/
# upload all the files to mapshaper and save the files as one topjson
# save it as map-borders.json in the data folder
```


## Data

There are two source of data:

1. The data folder contains the map data, the main data about Indikatoren and the routes. 

2. The static folder contains 

	2.1 the tile data
	2.2 the data to do with the Bezirken and Bezirksregionen


## Editing the Bezirksregion Datenprofil

Copy the datenblatt.csv example from Friedenau and save it in a 'Bezirksregion' folder of your choice e.g. 'lichtenrade'.
About the csv structure:

```
"ref" defines the datenblatt chapter e.g. "1 Kurzporträt der Bezirksregion" to which the content should be added to. 
"type" defines what should added (see "Types of content")
"datasource" defines the name of the datasource which is saved in the 'data' folder of the 'Bezirksregion'
"content" html content for text, title, small title
```

## Types of content

```
titel -> title
titel-sm -> titel small
text -> text
image -> image
barchart -> barchart
map-pr -> map planungsräume / choropleth map
linechart -> linechart 
map-poi -> POI map
```

**!Hint:** To add images into the profile you need to use the absolute path but omit the `static` folder. E.g.:

See [/static/data/bz-data/tempelhof-schoeneberg/bzr-data/friedenau/datenblatt.csv](/static/data/bz-data/tempelhof-schoeneberg/bzr-data/friedenau/datenblatt.csv)

```csv
1,text,,"<img src='/data/bz-data/tempelhof-schoeneberg/bzr-data/friedenau/data/BerlinRoughTSB.png' />"
```