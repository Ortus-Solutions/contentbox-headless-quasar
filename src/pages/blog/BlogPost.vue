<template>
	<div class="max-w-7xl mx-auto pt-6 pb-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
		<div v-if="blogEntry != ''">
			<p class="font-bold text-lg">
				{{ blogEntry.title }}
			</p>
			<img
				src="https://www.ortussolutions.com/__media/2021/blog/randomImages/coverImage_2.png"
				class="mt-3"
			>
			<div
				v-html="blogEntry.activeContent.content"
				class="my-3"
			/>
			<p class="mt-3 float-right">
				<img
					alt="Avatar"
					class="h-8 w-8 rounded-full inline-block"
					src="//www.gravatar.com/avatar/023dd1be1c4c0be7e956d8449a90f255?s=40&r=pg"
				>
				<span class="ml-3">
					{{ blogEntry.creator.name }} | {{ formatDate(blogEntry.publishedDate) }}
				</span>
			</p>
		</div>
		<div v-else-if="!loading">
			Blog Post
		</div>
	</div>
</template>

<script>

import { defineComponent } from "vue";
import { date } from "quasar";

export default defineComponent( {
	name  : "Blog",
	props : {
		title : { // Page name
			type    : String,
			default : "ContentBox Headless Quasar - Blog Post"
		},
		icon : {  // Icon Class
			type    : String,
			default : ""
		}
	},

	data(){
		return {
			blogEntry : "",
			slug      : this.$route.params.slug,
			loading   : false
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
			app.$api.get( `sites/default/entries/${app.slug}` )
				.then( response => {
					if ( !response.data.error && "activeContent" in response.data.data ) {
						app.blogEntry = response.data.data;
					} else {
						// Show error
						app.blogEntry = "Blog Entry not found!";
					}
					app.loading = false;
					app.$q.loading.hide();
				} )
				.catch( ( error ) => {
					console.log( error );
					app.loading = false;
					app.$q.loading.hide();
				} );
		},
		formatDate( target ){
			if ( !target || !target.length ){
				return target;
			}
			return date.formatDate( target, "MM/DD/YYYY" );
		}
	}
} );
</script>
