import Vue from 'vue';
import Vuex from 'vuex';

import bright from '~/static/map/bright-v9.json';
import nostyle from '~/static/map/nostyle.json';
import bzr_lor from '~/data/map-borders.json'; //all map data
import indikatorenOverview from '~/data/indikatoren/indikatorenOverview.json';

import toUrl from '~/assets/js/tourl.js'

//adapt this before you generate the site
// const productionUrl = "http://hanshack.com/tsb";
const productionUrl = (process.env.NODE_ENV === 'development') ? "http://localhost:3000" : "http://bezirksregionenprofile-env.w42dwkkrhe.eu-central-1.elasticbeanstalk.com";

//define the source of the tiles etc
bright.sources= {
  "openmaptiles": {
    "attribution": "<a href='http://openmaptiles.org'>© OpenMapTiles</a> <a href='http://www.openstreetmap.org/copyright'>© OpenStreetMap</a>",
    "type": "vector",
    "tiles": ["https://tsb.ara.uberspace.de/tsb-tiles/tiles/berlin/{z}/{x}/{y}.pbf"]
    // "tiles": [productionUrl + "/map/tiles/{z}/{x}/{y}.pbf"]
  }
};
bright.sprite= productionUrl + "/map/sprites/positron";
bright.glyphs= productionUrl + "/map/glyphs/{fontstack}/{range}.pbf";

//no source here
nostyle.sources = {};

const topojson = require('topojson');

const bezirksgrenzen = topojson.feature(bzr_lor, bzr_lor.objects["bezirksgrenzen"]);

let bezirksNamen = {};
for (var i = 0; i < bezirksgrenzen.features.length; i++) {
  let name = bezirksgrenzen.features[i].properties.Gemeinde_name;
  bezirksNamen[name] = {};
  bezirksNamen[name].name = name;
  bezirksNamen[name].url = toUrl(name);
}
const bezirksNamenOrdered = {};
Object.keys(bezirksNamen).sort().forEach(function(key) {
  bezirksNamenOrdered[key] = bezirksNamen[key];
});

const bezirksregionen = topojson.feature(bzr_lor, bzr_lor.objects["lor_bezirksregionen"]);
let bezirksregionenNamen = {};
for (var i = 0; i < bezirksregionen.features.length; i++) {
  let name = bezirksregionen.features[i].properties.BZR_NAME;
  let bzName = bezirksregionen.features[i].properties.BEZNAME
  bezirksregionenNamen[name] = {};
  bezirksregionenNamen[name].name = name;
  bezirksregionenNamen[name].url = toUrl(name);
  bezirksregionenNamen[name].bzName = bzName;
}
const bezirksregionenNamenOrdered = {};
Object.keys(bezirksregionenNamen).sort().forEach(function(key) {
  bezirksregionenNamenOrdered[key] = bezirksregionenNamen[key];
});


const planungsraeume = topojson.feature(bzr_lor, bzr_lor.objects["lor_planungsraeume"]);

// let bezirksRegionenNamen = {};
// for (var i = 0; i < bezirksregionen.features.length; i++) {
//   let nameBz = bezirksregionen.features[i].properties.BEZNAME;
//   if(typeof bezirksRegionenNamen[nameBz] == undefined){
//     bezirksRegionenNamen[nameBz] = {};
//   }
//   bezirksRegionenNamen[name].name = bezirksregionen.features[i].properties.BZR_NAME;
//   bezirksRegionenNamen[name].url = toUrl(bezirksregionen.features[i].properties.BZR_NAME;);
// }

const themen = [
  {"name": "Kurzporträt der Bezirksregion","id":1},
  {"name": "Demografische Struktur und Entwicklung","id":2},
  {"name": "Soziale Situation","id":3},
  {"name": "Bildungssituation","id":4},
  {"name": "Gesundheitliche Situation","id":5},
  {"name": "Wirtschafts- und Gewerbestruktur","id":6},
  {"name": "Wohnsituation","id":7},
  {"name": "Soziale Infrastruktur","id":8},
  {"name": "Grüne Infrastruktur und öffentlicher Raum","id":9},
  {"name": "Mobilität","id":10},
  {"name": "Umwelt (Lärmbelastung / Luftbelastung / Bioklima)","id":11},
  {"name": "Förderprogramme und Projekte","id":12},
  {"name": "Partizipation: Strukturen der Akteursvernetzung und Bürgerbeteiligung","id":13},
  {"name": "Zusammenfassung: Potenziale und Herausforderungen","id":14},
]

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    bezirksgrenzen: bezirksgrenzen,
    bezirksregionen: bezirksregionen,
    planungsraeume:planungsraeume,
    bzNamen:bezirksNamenOrdered,
    bzrNamen: bezirksregionenNamenOrdered,
    brightstyle: bright,
    nostyle: nostyle,
    mapColors: ["#1E3791","#E60032"],
    indikatorenOverview:indikatorenOverview,
    themen:themen,
    urldev:'http://localhost:3000',
    url:  productionUrl
  },
  getters: {
    // toUrl(str){
    //   console.log("fdfsdfsdf",str)
    //   let newStr = str.toLowerCase().replace(/\u00fc/g, "ue").replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
    //   return newStr
    // }
  }
})

export default store
