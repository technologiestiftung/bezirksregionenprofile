<template>

  <div class="content-main-map column">

    <div class="navigation">
      <h3>Bezirksregion auswählen:</h3>
      <select @change="onSelect()" v-model="selected">
        <option v-for="bz in bzrNamen" :key="bz" :value="bz">{{bz}}</option>
      </select> 

    </div>

    <div id="map"></div>

  </div>

</template>


<script>

import { mapState } from 'vuex';
import toUrl from '~/assets/js/tourl.js';
import bbox from '@turf/bbox';

export default {

    computed: {
      ...mapState([
        'nostyle','brightstyle','bezirksgrenzen','bezirksregionen','mainColor','secondColor'
      ]),
      bzrNamen(){
        let namen = [];
        for (var i = 0; i < this.bezirksregionen.features.length; i++) {
          var bzrName = this.bezirksregionen.features[i].properties.BEZNAME;
          if(bzrName==this.bezirk){
            namen.push(this.bezirksregionen.features[i].properties.BZR_NAME)
          }
        }
        namen.sort()
        return namen
      },
      selected(){
        return this.bzrNamen[0];
      }    
    },
    components: {
    },
    mounted(){
      this.createMap()
    },
    data(){
        return{
          // selected:bzrNamen()[0],

        }
    },
    props: ["bezirk"],
    methods:{
    onSelect(){

      // let selectedBz = this.selected;
      // if(selectedBz!="Tempelhof-Schöneberg"){return};

      // selectedBz = toUrl(selectedBz);
      // this.$router.push({ path: 'bezirk/' + selectedBz});

    },
    createMap(){

        console.log("xxx bezirk",this.bezirk)

        const bezirk = this.bezirk;

        //get mapbox library
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        require('mapbox-gl/dist/mapbox-gl.css');

        //prepair the data
        let selectedBz = this.bezirksgrenzen.features.filter(function( obj ) {
          return obj.properties.Gemeinde_name == bezirk;
        });
        selectedBz = selectedBz[0];

        let selectedBzR = this.bezirksregionen.features.filter(function( obj ) {
          return obj.properties.BEZNAME == bezirk;
        });

        selectedBzR ={
          "type": "FeatureCollection",
          "features": selectedBzR
        }

        let selectedBbox = bbox(selectedBz);
        selectedBbox = [[selectedBbox[0],selectedBbox[1]],[selectedBbox[2],selectedBbox[3]]]


        mapboxgl.accessToken = "";
        const map = new mapboxgl.Map({
            container: 'map',
            style: this.nostyle,
            center: [13.391, 52.519],
            zoom:5,
            pitch: 0,
            minZoom: 2,
            maxZoom: 20,
            interactive: false
        })

        map.on("load",()=>{

            //to load directly
            // https://github.com/mapbox/mapbox-gl-js/issues/1970
            map.fitBounds(selectedBbox, {
                padding: 10,
                // linear: true,
                duration: 1500
            });

            //bezirksgrenzen-selected
            map.addSource('bezirksgrenzen-selected', {
                type: 'geojson',
                data: selectedBz
            });

            map.addLayer({
                "id":"bezirksgrenzen-selected",
                "type":"fill",
                "source":"bezirksgrenzen-selected",
                "paint":{
                  "fill-outline-color":this.mainColor,
                  "fill-color":"rgba(46, 145, 210, 0.5)"
                }
            });


            map.addSource('bezirksregionen', {
                type: 'geojson',
                data: selectedBzR
            });

            map.addLayer({
                "id":"bezirksregionen",
                "type":"fill",
                "source":"bezirksregionen",
                "paint":{
                  "fill-outline-color":this.secondColor,
                  "fill-color":"rgba(46, 145, 210, 0)"
                }
            });

            map.addLayer({
                "id": "bezirksregionen-hover",
                "type": "fill",
                "source": "bezirksregionen",
                "paint": {
                    "fill-color": this.secondColor,
                    "fill-opacity": .7
                },
                "filter": ["==", "BZR_NAME", ""]
            });


            // map.addSource('bezirksgrenzen', {
            //     type: 'geojson',
            //     data: this.bezirksgrenzen
            // });

            // map.addLayer({
            //     "id":"bezirksgrenzen",
            //     "type":"line",
            //     "source":"bezirksgrenzen",
            //     "paint":{
            //       "line-color":this.mainColor
            //     }
            // });
            
          })



            // Create a popup, but don't add it to the map yet.
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                anchor:"bottom-left"
            });

            map.on('mousemove', 'bezirksregionen', (e)=> {

                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                const coordinates = e.lngLat;
                const description = e.features[0].properties.BZR_NAME;

                popup.setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);

            });

            map.on('mouseleave', 'bezirksregionen', ()=> {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });


            map.on("mousemove", "bezirksregionen", (e)=> {
                map.setFilter("bezirksregionen-hover", ["==", "BZR_NAME", e.features[0].properties.BZR_NAME]);
            });

            // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
            map.on("mouseleave", "bezirksregionen", ()=> {
                map.setFilter("bezirksregionen-hover", ["==", "BZR_NAME", ""]);
            });


            map.on('click', "bezirksregionen", (e)=> {

              const bzr = e.features[0].properties.BZR_NAME;
              this.$emit('bzRChanged',bzr)

                // const bezirk = e.features[0].properties.BZR_NAME;

                // if(bezirk!="Tempelhof-Schöneberg"){return};
                console.log()

                // this.$router.push({ path: '../bezirksregion/' + toUrl(bzr) });

            })

    }
  }
}


</script>



<style lang="scss" scoped>


#map {

  // width:100%;
  height: 60vh;
  // position: absolute;

}

.navigation{

  position: absolute;
  z-index: 1;
  top: 20px;
  left: 20px;
  color: #000 !important;
  pointer-events:none;


  select{
    width: 100px;
    height: 30px;
    pointer-events:auto;

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