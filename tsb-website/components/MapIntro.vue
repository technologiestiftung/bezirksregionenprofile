<template>



  <div class="content-main column" id="map">
  	
  	<select>
	  <option v-for="name in bezirksNamen" :key="name" value="name">{{name}}</option>
	</select> 

  </div>



</template>


<script>
import TsbHeader from '~/components/TsbHeader.vue';
// import topojson from 'topojson';
import bright from '~/static/bright-v9.json';
import bzr_lor from '~/static/data/geo/bzr_lor.json';


const topojson = require('topojson');
const bezirksregionen = topojson.feature(bzr_lor, bzr_lor.objects["lor_bezirksregionen"]);
const bezirksgrenzen = topojson.feature(bzr_lor, bzr_lor.objects["bezirksgrenzen"]);

let bezirksNamen = [];
for (var i = 0; i < bezirksgrenzen.features.length; i++) {
	bezirksNamen.push(bezirksgrenzen.features[i].properties.Gemeinde_name);
}
bezirksNamen.sort();



export default {
  name: 'MapIntro',
  components: {
  },
  mounted(){
    this.createMap()
  },
 //  created(){

	// const topojson = require('topojson');
	// const bezirksregionen = topojson.feature(bzr_lor, bzr_lor.objects["lor_bezirksregionen"]);
	// const bezirksgrenzen = topojson.feature(bzr_lor, bzr_lor.objects["bezirksgrenzen"]);

	// this.bezirksgrenzen = bezirksgrenzen;

	// let bezirksNamen = [];
	// for (var i = 0; i < bezirksgrenzen.features.length; i++) {
	// 	bezirksNamen.push(bezirksgrenzen.features[i].properties.Gemeinde_name);
	// }
	// bezirksNamen.sort();

	// this.bezirksNamen = bezirksNamen;


 //  },
  data(){
    return{
    	bezirksNamen: bezirksNamen
      // bezirksNamen: undefined,
      // bezirksgrenzen:undefined
    }
  },
  props: ["mainColor"],
  methods:{
    createMap(){

	    console.log(this.mainColor)

	   	//https://gist.github.com/martinrisseeuw/96a52024f1f6d9300d1ce3c807badca5
	   	//https://gist.github.com/martinrisseeuw/4943a180632e8ec95a45c5aec4061db8

	    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
	    
	    require('mapbox-gl/dist/mapbox-gl.css');



	    mapboxgl.accessToken = "";

		const map = new mapboxgl.Map({
			container: 'map',
			style: bright,
			center: [13.391, 52.519],
			zoom: 8,
			pitch: 0,
			minZoom: 2,
			maxZoom: 20
		})

		map.on("load",function(){

	        map.fitBounds([[13.08846524952736,52.326853772549924],[13.769489925280624,52.679007673490645]], {
	            padding: 20
	        });


			// map.addSource('bezirksregionen', {
			//     type: 'geojson',
			//     data: bezirksregionen
			// });

			// map.addLayer({
			// 	"id":"bezirksregionen",
			// 	"type":"fill",
			// 	"source":"bezirksregionen",
			// 	"paint":{
			// 	  "fill-outline-color":'red',
			// 	  "fill-color":"rgba(1,1,1,0)"
			// 	}
			// });

			map.addSource('bezirksgrenzen', {
			    type: 'geojson',
			    data: bezirksgrenzen
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

	    map.on('mousemove', 'bezirksgrenzen', function(e) {

	        // Change the cursor style as a UI indicator.
	        map.getCanvas().style.cursor = 'pointer';

	        var coordinates = e.lngLat;
	        var description = e.features[0].properties.Gemeinde_name;

	        popup.setLngLat(coordinates)
	            .setHTML(description)
	            .addTo(map);
	    });

	    map.on('mouseleave', 'bezirksgrenzen', function() {
	        map.getCanvas().style.cursor = '';
	        popup.remove();
	    });


	    map.on("mousemove", "bezirksgrenzen", function(e) {
	        map.setFilter("bezirksgrenzen-hover", ["==", "Gemeinde_name", e.features[0].properties.Gemeinde_name]);
	    });

	    // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
	    map.on("mouseleave", "bezirksgrenzen", function() {
	        map.setFilter("bezirksgrenzen-hover", ["==", "Gemeinde_name", ""]);
	    });


	    map.on('click', "bezirksgrenzen",  function (e) {
	    	// const { lngLat, point } = event;
	    	console.log(e.features[0].properties.Gemeinde_name)
		})

    }
  }
}


</script>



<style lang="scss" scoped>

#map {

  select{
	width: 100px;
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 20px;
  }

}

</style>