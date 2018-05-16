<template>

  <div class="content-main column">

    <div class="navigation">
      <h3>Bezirk auswählen:</h3>
      <select @change="onSelect()" v-model="selected">
        <option v-for="bz in bezirksNamen" :key="bz" :value="bz">{{bz}}</option>
      </select> 

    </div>

    <div id="map"></div>

  </div>

</template>


<script>

import { mapState, mapGetters } from 'vuex';

function toUrl(str){
  return str.toLowerCase().replace(/\u00fc/g, "ue").replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
}

export default {

    computed: {
      ...mapState([
        'stylefile','bezirksgrenzen','bezirksNamen'
      ]),
      ...mapGetters([
        // 'toUrl'
      ]),    
    },
    components: {
    },
    mounted(){
      this.createMap()
    },
    data(){
        return{
          selected:"Charlottenburg-Wilmersdorf"
        }
    },
    props: ["mainColor"],
    methods:{
    onSelect(){

      let selectedBz = this.selected;
      selectedBz = toUrl(selectedBz);
      this.$router.push({ path: 'bezirk/' + selectedBz});

    },
    createMap(){

        //https://gist.github.com/martinrisseeuw/96a52024f1f6d9300d1ce3c807badca5
        //https://gist.github.com/martinrisseeuw/4943a180632e8ec95a45c5aec4061db8

        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        require('mapbox-gl/dist/mapbox-gl.css');

        mapboxgl.accessToken = "";

        const map = new mapboxgl.Map({
            container: 'map',
            style: this.stylefile,
            center: [13.391, 52.519],
            zoom: 8,
            pitch: 0,
            minZoom: 2,
            maxZoom: 20,
            interactive: false
        })

        map.on("load",()=>{

            map.fitBounds([[13.08846524952736,52.326853772549924],[13.769489925280624,52.679007673490645]], {
                padding: 20
            });

            map.addSource('bezirksgrenzen', {
                type: 'geojson',
                data: this.bezirksgrenzen
            });

            map.addLayer({
                "id":"bezirksgrenzen",
                "type":"fill",
                "source":"bezirksgrenzen",
                "paint":{
                  "fill-outline-color":"rgba(46, 145, 210, 1)",
                  "fill-color":"rgba(46, 145, 210, 0)"
                },
                "visibiltiy":"none"
            });

            map.addLayer({
                "id": "bezirksgrenzen-hover",
                "type": "fill",
                "source": "bezirksgrenzen",
                "paint": {
                    "fill-color": "rgba(46, 145, 210, 1)",
                    "fill-opacity": .7
                },
                "filter": ["==", "Gemeinde_name", ""]
            });
          })

            // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                anchor:"bottom-left"
            });

            map.on('mousemove', 'bezirksgrenzen', (e)=> {

                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                var coordinates = e.lngLat;
                var description = e.features[0].properties.Gemeinde_name;

                popup.setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            map.on('mouseleave', 'bezirksgrenzen', ()=> {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });


            map.on("mousemove", "bezirksgrenzen", (e)=> {
                map.setFilter("bezirksgrenzen-hover", ["==", "Gemeinde_name", e.features[0].properties.Gemeinde_name]);
            });

            // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
            map.on("mouseleave", "bezirksgrenzen", ()=> {
                map.setFilter("bezirksgrenzen-hover", ["==", "Gemeinde_name", ""]);
            });


            map.on('click', "bezirksgrenzen", (e)=> {

                const bezirk = e.features[0].properties.Gemeinde_name;
                this.$router.push({ path: 'bezirk/' + toUrl(bezirk) });

            })


    }
  }
}


</script>



<style lang="scss" scoped>


#map {

  width:100%;
  height: 60vh;
  position: absolute;

}

.navigation{

  position: relative;
  z-index: 1;
  top: 20px;
  left: 20px;

  select{
    width: 100px;
    height: 30px;

  }
  // .select {
  //     padding: 5px 8px;
  //     width: 130%;
  //     border: none;
  //     box-shadow: none;
  //     background: transparent;
  //     background-image: none;
  //     -webkit-appearance: none;
  // }

  // .select-style select:focus {
  //     outline: none;
  // }



}

</style>