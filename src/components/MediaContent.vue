<template>
	<div>
		<div
			class="mediaContent"
			v-if="content.length"
			v-html="mediaContent"
		/>
	</div>
</template>

<style>
.mediaContent {
	& img {
		margin: 20px 0px;
		border: 1px solid #ddd;
	}
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent( {
	name : "MediaContent",

	props : {
		content : {
			type     : String,
			required : true
		},
	},

	data(){
		return {};
	},

	computed : {
		mediaContent(){
			return this.correctMediaURL( this.content );
		}
	},

	methods : {
		correctMediaURL( content ) {
			return content.replaceAll( "src=\"/__media/", `src="${process.env.imagesUrl}/__media/` );
		}
	}

} );
</script>
