import Vue from 'vue'
import Vuex from 'vuex'
import bright from '~/static/bright-v9.json';
import bzr_lor from '~/data/bzr_lor.json';


const topojson = require('topojson');
const bezirksregionen = topojson.feature(bzr_lor, bzr_lor.objects["lor_bezirksregionen"]);
const bezirksgrenzen = topojson.feature(bzr_lor, bzr_lor.objects["bezirksgrenzen"]);

let bezirksNamen = [];
for (var i = 0; i < bezirksgrenzen.features.length; i++) {
  bezirksNamen.push(bezirksgrenzen.features[i].properties.Gemeinde_name);
}
bezirksNamen.sort();


Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    bezirksgrenzen: bezirksgrenzen,
    bezirksregionen: bezirksregionen,
    bezirksNamen:bezirksNamen,
    stylefile: bright
  },
  getters: {
    // toUrl(str){
    //   // console.log("fdfsdfsdf",str)
    //   // .toLowerCase().replace(/\u00fc/g, "ue").replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
    //   return str
    // }
  }
})

export default store
