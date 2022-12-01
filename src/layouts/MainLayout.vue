<template>
  <div class="min-h-full">
    <nav class="bg-gray-800 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            </div>
            <div class="hidden md:block flex-shrink-0">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a>

                <a href="/services" class="hidden lg:block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>

                <a href="/about" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                
                <a href="/store" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Store</a>

                <a href="/blog" class="hidden lg:block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              </div>
            </div>
          </div>

          <div v-if="isLoggedIn" class="hidden md:block">
            <div class="flex items-center">
              <!-- Profile dropdown -->
              <div 
                v-click-outside="() => (showUserDropdown = false)"
                class="ml-3 relative"
              >
                <div>
                  <button 
                    id="user-menu-button" 
                    type="button" 
                    class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" 
                    :class="{ showUserDropdown : 'outline-none ring-2 ring-offset-2 ring-offset-gray-800 ring-white' }"
                    aria-expanded="false" 
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img 
                      alt="Avatar"
                      class="h-8 w-8 rounded-full" 
                      src="//www.gravatar.com/avatar/023dd1be1c4c0be7e956d8449a90f255?s=40&r=pg" 
                      @click="showUserDropdown = !showUserDropdown" 
                    >
                  </button>
                </div>

                <transition
                  enter-class="opacity-0 transform scale-95"
                  enter-to-class="opacity-100 transform scale-100"
                  enter-active-class="transition ease-out duration-200"
                  leave-class="opacity-100 transform scale-100"
                  leave-to-class="opacity-0 transform scale-95"
                  leave-active-class="transition ease-in duration-75"
                >
                  <div 
                    v-if="showUserDropdown" 
                    class="origin-top-right absolute right-0 mt-4 w-64 divide-y divide-gray-100 shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" 
                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1"
                  >
                    <!-- Active: "bg-gray-100", Not Active: "" -->
                    <span
                      class="block px-4 py-3 text-sm text-gray-300 font-medium" 
                    >
                      <span class="block text-base font-bold">
                        {{ currentUser.fullName }}
                      </span>
                      <span class="block">
                        {{ currentUser.email }}
                      </span>
                    </span>

                    <span 
                      class="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                      @click="logout"
                      >
                      Sign out
                    </span>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div v-if="!isLoggedIn" class="flex items-baseline space-x-0">
            <a href="/login" class="text-gray-300 hover:bg-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
          </div>

          <div v-if="false" class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button type="button" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!--
                Heroicon name: outline/menu

                Menu open: "hidden", Menu closed: "block"
              -->
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!--
                Heroicon name: outline/x

                Menu open: "block", Menu closed: "hidden"
              -->
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="false" class="md:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a href="/" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Watchlists</a>

          <a href="/portafolios/7" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Portafolios</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Markets</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">News</a>

          <a href="/plans" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Plans</a>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">Javier Quintero</div>
              <div class="text-sm font-medium leading-none text-gray-400">javierquintero@example.com</div>
            </div>
            <button type="button" class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Settings</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="bg-gray-100 min-h-full pb-6">
      <notifications
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
      />
      <router-view />
    </div>

    <footer class="bg-gray-800">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div class="py-8 text-sm text-white text-center sm:text-left">
          <span class="block sm:inline">
            &copy; 2022 ITB Demo App.
          </span> 
          <span class="block sm:inline">
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>
import Notifications from "components/Notifications.vue";
import Autocomplete from 'vue3-autocomplete';
import vClickOutside from 'click-outside-vue3';


import { defineComponent, ref } from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  name: "MainLayout",

  components: {
    Notifications,
    Autocomplete
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  data() {
		return {
      query: "",
      results: [],
			loading: false,
      notification   : {
				type    : "success",
				title   : "Success",
				message : "",
				show    : false
			},
      showUserDropdown: false
		}
	},	

  setup() {

  },

  computed : {
		...mapState( {
			currentUser     : state => state.appstate.currentUser,
			languageOptions : state => state.appstate.languageOptions
		} ),
		...mapGetters( "appstate", [
			"getUserId",
			"getUserEmail",
      "isLoggedIn"
		] ),
	},
  methods : {
    async logout(){
      await this.$store.dispatch( "appstate/logout" )
        .then( () => {
          this.$q.notify( {
            color    : "ongoing",
            position : "top-right",
            message  : "Bye Bye!"
          } );
          // Hard reload
          // window.location.href = "/";
          this.$router.push( { "name": "home" } );
        } );
		},
  }
});
</script>
