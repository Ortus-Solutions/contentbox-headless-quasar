<template>
    <div class="max-w-7xl mx-auto pt-6 pb-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
		<div v-if="pageContent != ''" v-html="pageContent" />
		<div v-else-if="!loading">
			Services
		</div>
	</div>
</template>

<script>

import { defineComponent } from "vue";

export default defineComponent({
	name: "Services",
	props : {
		title : { // Page name
			type    : String,
			default : "ITB Demo App - Services"
		},
		icon : {  // Icon Class
			type    : String,
			default : ""
		}
	},

	data(){
		return {
			pageContent: "",
			loading: false
		};
	},
	computed : {},
	mounted(){
		this.loadPage();
	},
	methods : {
		loadPage(){
			var app = this;
			app.loading = true;
			app.$q.loading.show();
			// Dispatch
			app.$api.get( `sites/default/pages/services` )
				.then( response => {
					if( !response.data.error && "activeContent" in response.data.data ) {
						app.pageContent = response.data.data.activeContent.content;
					} else {
						// Show error
						app.pageContent = "Page not found!"
					}
					app.loading = false;
					app.$q.loading.hide();
				} )
				.catch( ( error ) => {
					console.log(error);
					app.loading = false;
					app.$q.loading.hide();
				} );
		}
	}
});
</script>
