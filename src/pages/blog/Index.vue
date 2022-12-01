<template>
  <div class="max-w-7xl mx-auto pt-6 pb-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
		<div 
      v-if="blogEntries != ''"
      class="row w-full border rounded-lg p-6"
    >
      <div 
        v-for="entry in blogEntries" 
        :id="'entry_'+entry.contentID"
        :key="entry.contentID"
        class="mb-3"
      >
        <div>
          <p class="font-bold text-lg">
            <a :href="`/blog/${entry.slug}`">
              {{ entry.title }}
            </a>
          </p>
          <p class="mt-3">
            <img 
              alt="Avatar"
              class="h-8 w-8 rounded-full inline-block" 
			  :src="entry.creator.avatarLink"
            >
            <span class="ml-3">
              Posted by <strong>{{ entry.creator.name }}</strong> on {{ formatDate(entry.publishedDate) }}
            </span>
          </p>
          <!-- If coming from media, append the ortussolutions domain -->
          <!-- <img 
            v-if="entry.featuredImage != ''"
            :src="`https://www.ortussolutions.com${entry.featuredImageURL}`"
            class="mt-3"
          > -->
          <img 
            src="https://www.ortussolutions.com/__media/2021/blog/randomImages/coverImage_2.png"
            class="mt-3"
          >
          <a 
            :href="`/blog/${entry.slug}`" 
            class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 mt-3"
          >
            Read Blog Post
          </a>
        </div>
      </div>
    </div>
		<div v-else-if="!loading">
			Blog Entries
		</div>
	</div>
</template>

<script>

import { defineComponent } from "vue";
import { date } from "quasar";

export default defineComponent({
	name: "Blog",
	props : {
		title : { // Page name
			type    : String,
			default : "ITB Demo App - Blog"
		},
		icon : {  // Icon Class
			type    : String,
			default : ""
		}
	},

	data(){
		return {
			blogEntries: [],
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
			app.$api.get( `sites/default/entries` )
				.then( response => {
					if( !response.data.error ) {
						app.blogEntries = response.data.data;
					} else {
						// Show error
						app.blogEntries = "Blog entries not found!"
					}
					app.loading = false;
					app.$q.loading.hide();
				} )
				.catch( ( error ) => {
					console.log(error);
					app.loading = false;
					app.$q.loading.hide();
				} );
		},
    formatDate( target ){
			if ( !target || !target.length ){
				return target;
			}
			return date.formatDate( target, "MM/DD/YYYY" );
		},
	}
});
</script>
