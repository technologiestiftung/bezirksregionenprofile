import Vue from 'vue';
import Vuex from 'vuex';

import bright from '~/static/bright-v9.json';
import nostyle from '~/static/nostyle.json';
import bzr_lor from '~/data/bzr_lor.json';
import indikatorenGr from '~/data/indikatorenGr.json';

import toUrl from '~/assets/js/tourl.js'


//define the source of the tiles etc
bright.sources= {
  "openmaptiles": {
    "attribution": "<a href='http://openmaptiles.org'>© OpenMapTiles</a> <a href='http://www.openstreetmap.org/copyright'>© OpenStreetMap</a>",
    "type": "vector",
    "tiles": ["http://localhost:3000/tiles/{z}/{x}/{y}.pbf"]
  }
};
bright.sprite= "http://localhost:3000/sprites/positron";
bright.glyphs= "http://localhost:3000/glyphs/{fontstack}/{range}.pbf";

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
  bezirksregionenNamen[name] = {};
  bezirksregionenNamen[name].name = name;
  bezirksregionenNamen[name].url = toUrl(name);
}
const bezirksregionenNamenOrdered = {};
Object.keys(bezirksregionenNamen).sort().forEach(function(key) {
  bezirksregionenNamenOrdered[key] = bezirksregionenNamen[key];
});

console.log(bezirksNamenOrdered)

// let bezirksRegionenNamen = {};
// for (var i = 0; i < bezirksregionen.features.length; i++) {
//   let nameBz = bezirksregionen.features[i].properties.BEZNAME;
//   if(typeof bezirksRegionenNamen[nameBz] == undefined){
//     bezirksRegionenNamen[nameBz] = {};
//   }
//   bezirksRegionenNamen[name].name = bezirksregionen.features[i].properties.BZR_NAME;
//   bezirksRegionenNamen[name].url = toUrl(bezirksregionen.features[i].properties.BZR_NAME;);
// }


Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    bezirksgrenzen: bezirksgrenzen,
    bezirksregionen: bezirksregionen,
    bzNamen:bezirksNamenOrdered,
    bzrNamen: bezirksregionenNamenOrdered,
    brightstyle: bright,
    nostyle: nostyle,
    mapColors: ["#1E3791","#E60032"],
    indikatorenGr:indikatorenGr
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
