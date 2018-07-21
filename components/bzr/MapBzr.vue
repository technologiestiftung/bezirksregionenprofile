<template>

  <!-- <div class="content-main-map-bzr column"> -->

    <div id="map"></div>

  <!-- </div> -->

</template>


<script>

import { mapState } from 'vuex';
import bbox from '@turf/bbox';


let map;

export default {

    computed: {
      ...mapState([
        'nostyle','brightstyle','bezirksgrenzen','bezirksregionen','planungsraeume','mapColors'
      ])
    },
    components: {
      
    },
    mounted(){
      this.createMap();
    },
    data(){
        return{
        }
    },
    props: ["bzrName"],

    methods:{
    createMap(){

        //get mapbox library
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        require('mapbox-gl/dist/mapbox-gl.css');

        const bzrName = this.bzrName;

        let selectedBzR = this.bezirksregionen.features.filter(function( obj ) {
          return obj.properties.BZR_NAME == bzrName;
        });

        selectedBzR ={
          "type": "FeatureCollection",
          "features": selectedBzR
        }

        let selectedPlr = this.planungsraeume.features.filter(function( obj ) {
          return obj.properties.BZRNAME == bzrName;
        });

        selectedPlr ={
          "type": "FeatureCollection",
          "features": selectedPlr
        }

        console.log(selectedPlr)

        let selectedBbox = bbox(selectedBzR);
        selectedBbox = [[selectedBbox[0],selectedBbox[1]],[selectedBbox[2],selectedBbox[3]]]


        mapboxgl.accessToken = "";
        map = new mapboxgl.Map({
            container: 'map',
            style: this.brightstyle,
            // center: [13.391, 52.519],
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
                padding: {'bottom':50, 'left':20, 'right':20, 'top':50},
                duration: 0
            });

            // map.addSource('bezirksregion', {
            //     type: 'geojson',
            //     data: selectedBzR
            // });

            // map.addLayer({
            //     "id":"bezirksregion-selected",
            //     "type":"fill",
            //     "source":"bezirksregion",
            //     "paint":{
            //       "fill-outline-color":this.mapColors[0],
            //       "fill-color":this.mapColors[0],
            //       "fill-opacity":.6
            //     }
            // });

            map.addSource('planungsraeume', {
                type: 'geojson',
                data: selectedPlr
            });


            map.addLayer({
                "id": "planungsraeume-hover",
                "type": "line",
                "source": "planungsraeume",
                "paint": {
                    "line-color": this.mapColors[0],
                    "line-opacity": .8,
                    "line-width": 2
                },
                "filter": ["==", "PLRNAME", ""]
            });

            map.addLayer({
                "id":"planungsraeume",
                "type":"fill",
                "source":"planungsraeume",
                "paint":{
                  "fill-outline-color":this.mapColors[0],
                  "fill-color":this.mapColors[0],
                  "fill-opacity":.6
                }
            });



        // // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor:"bottom-left"
        });


        map.on('mousemove', 'planungsraeume', (e)=> {

            // Change the cursor style as a UI indicator.
            // map.getCanvas().style.cursor = 'pointer';

            const coordinates = e.lngLat;

            popup.setLngLat(coordinates)
                .setHTML(e.features[0].properties.PLRNAME)
                .addTo(map);

            // document.getElementsByClassName("mapboxgl-popup-content")[0].style.borderLeft = "2px solid " + mapColor;

        });

        map.on('mouseleave', 'planungsraeume', ()=> {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        map.on("mousemove", "planungsraeume", (e)=> {
            map.setFilter("planungsraeume-hover", ["==", "PLRNAME", e.features[0].properties.PLRNAME]);
        });

        // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
        map.on("mouseleave", "planungsraeume", ()=> {
            map.setFilter("planungsraeume-hover", ["==", "PLRNAME", ""]);
        });




            
          })


    }
  }
}


</script>



<style lang="scss" scoped>


#map {

  // width:100%;
  height: 30vh;
  // position: absolute;

}

.navigation{

  position: absolute;
  z-index: 1;
  // top: 20px;
  // left: 20px;
  padding: 1em;
  color: #000 !important;
  // pointer-events:none;


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