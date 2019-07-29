<template>

    <div :id="chartId" class="vis-map-plr"></div>

</template>


<script>

import { mapState } from 'vuex';
import bbox from '@turf/bbox';



export default {

    computed: {
      ...mapState([
        'nostyle','brightstyle','bezirksregionen','mapColors'
      ]) 
    },
    components: {
    },
    mounted(){
      this.createMap();
    },
    // data(){
    //     return{
    //       selected: this.bezirk,

    //     }
    // },
    props: ["bzrName","visData","chartId"],
    methods:{
    createMap(){


        // //get mapbox library
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        require('mapbox-gl/dist/mapbox-gl.css');

        const bezirksregion = this.bzrName;
        let selectedBzR = this.bezirksregionen.features.filter(function( obj ) {
          return obj.properties.BZR_NAME == bezirksregion;
        });

        selectedBzR ={
          "type": "FeatureCollection",
          "features": selectedBzR
        }

        let selectedBbox = bbox(selectedBzR);
        selectedBbox = [[selectedBbox[0],selectedBbox[1]],[selectedBbox[2],selectedBbox[3]]];




        let pointFeatures = {
            "type": "FeatureCollection",
            "features": []
        }; 

        for (let i = 0; i < this.visData.length; i++) {
            

            let point = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [this.visData[i].lng, this.visData[i].lat]
                },
                "properties": {
                    "text": this.visData[i].text,
                    "color": this.visData[i].color || "#1E3791"
                }
            }

            pointFeatures.features.push(point)

        }





        mapboxgl.accessToken = "";
        let map = new mapboxgl.Map({
            container: this.chartId,
            style: this.brightstyle,
            center: [13.391, 52.519],
            zoom:5,
            pitch: 0,
            minZoom: 2,
            maxZoom: 20,
            // interactive: false
        })

        map.addControl(new mapboxgl.NavigationControl({showCompass:false}));

        map.on("load",()=>{

            //to load directly
            // https://github.com/mapbox/mapbox-gl-js/issues/1970
            map.fitBounds(selectedBbox, {
                padding: {'bottom':10, 'left':10, 'right':10, 'top':10},
                // linear: true,
                duration: 0
            });

            map.setMaxBounds(map.getBounds());


            map.addSource('selectedBzR', {
                type: 'geojson',
                data: selectedBzR
            });


            map.addLayer({
                "id":"selectedBzR",
                "type":"line",
                "source":"selectedBzR",
                "paint":{
                    "line-color": this.mapColors[0],
                    "line-opacity": 1,
                    "line-width": 2
                }
            });

            map.addLayer({
                "id": "poi-layer",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": pointFeatures
                },
                "paint": {
                    "circle-color": ["get","color"],
                    "circle-radius":8,
                    "circle-opacity":.8

                }
            });

            
        })

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor:"bottom-left"
        });


        map.on('mousemove', 'poi-layer', (e)=> {

            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'default';

            const coordinates = e.lngLat;
            const text = e.features[0].properties.text;
            const color = e.features[0].properties.color;


            popup.setLngLat(coordinates)
                .setHTML(text)
                .addTo(map);

            document.getElementsByClassName("mapboxgl-popup-content")[0].style.borderLeft = "2px solid " + color;


        });

        map.on('mouseleave', 'poi-layer', ()=> {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });


    }
  }
}


</script>



<style lang="scss" scoped>


.vis-map-plr{

  width:100%;
  height: 300px;
  // position: absolute;

}


</style>