<template>

  <div class="navigation">

  	<h4>THEMEN</h4>

  	<ul>

	    <li v-for="thema in themen" 
	      class="opt" 
	      :key="thema.name" 
	      @click="onClick(thema)"
	      :class="themaSelected==thema.id ? 'active' : ''"

	      >
	      <div><p><i class="icon-right-small" /></p></div><div class="thema-text"><p>{{thema.name}}</p></div>
	    </li>

    </ul>

  </div>

</template>


<script>

// import { mapState } from 'vuex';


import VueScrollTo from 'vue-scrollto';

export default {

    // computed: {
    //   ...mapState([
    //     'themen'
    //   ]),
       
    // },
    props: ["themen","themaSelected"],
    components: {

    },
    mounted(){

    	// console.log(this.themen)

    },
    data(){
        return{
        	// themaSelected:1,
        }
    },
    // props: ["mainColor"],
    methods:{
    	onClick(thema){
    		this.$emit('changeThemaSelected',thema.id);

			var options = {
			    container: '.content-main-bzr-info',
			    easing: 'ease-in',
			    offset: -60,
			    cancelable: true,
			    onStart: function(element) {
			      // scrolling started
			    },
			    onDone: function(element) {
			      // scrolling is done
			    },
			    onCancel: function() {
			      // scrolling has been interrupted
			    },
			    x: false,
			    y: true
			}

    		VueScrollTo.scrollTo('#thema-id'+thema.id, 300, options)
    	}
    }
}


</script>



<style lang="scss" scoped>

@import "~@/assets/style/variables";

.navigation{
	// height: 50vh;
	color: white;
	// background-color: pink;

	li{
		cursor:pointer;
		padding-top: 8px;
		display: flex;

		.thema-text{
			flex: 1;
		}
	}
	li:hover{
		opacity: .8;
	}

	.active{
		font-family: $font-family-bold;
	}
}



</style>