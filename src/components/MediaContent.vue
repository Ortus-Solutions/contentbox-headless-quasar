<template>
	<div>
		Media Content
		<div
			v-if="content.length"
			v-html="mediaContent"
		/>
		<!-- <textarea
			v-text="content"
			rows="15"
			cols="80"
		/> -->
	</div>
</template>

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
			return content.replaceAll( "src=\"/__media/", `src="${process.env.apiUrl}/__media/` );
		}
	}

} );
</script>
