<template>
	<div class="fixed z-50 inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:mt-12 sm:p-6 sm:items-start sm:justify-end">
		<transition
			enter-class="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
			enter-to-class="opacity-100 translate-y-0 sm:translate-x-0"
			enter-active-class="transform ease-out duration-300 transition"
			leave-class="opacity-100"
			leave-to-class="opacity-0"
			leave-active-class="transition ease-in duration-300"
		>
			<div
				v-if="show"
				class="w-full max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto mt-3"
			>
				<div class="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5">
					<div class="p-4">
						<div class="flex items-start">
							<div class="flex-shrink-0">
								<svg
									v-if="type === 'success'"
									class="w-6 h-6 text-green-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<svg
									v-else-if="type === 'warning'"
									class="w-6 h-6 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									stroke="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									/>
								</svg>
								<svg
									v-else-if="type === 'error'"
									class="w-6 h-6 text-red-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									stroke="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									/>
								</svg>
								<!-- Otherwise show the and informative notification -->
								<svg
									v-else
									class="w-6 h-6 text-blue-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									stroke="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p class="text-sm font-medium text-gray-900 leading-5">
									{{ title }}
								</p>
								<p class="mt-1 text-sm text-gray-500 leading-5">
									{{ message }}
								</p>
							</div>
							<div class="flex flex-shrink-0 ml-4">
								<button
									class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
									@click="show = false"
								>
									<svg
										class="w-5 h-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "Notifications",
	props : {
		type : {
			type    : String,
			default : "info"
		},
		title : {
			type     : String,
			required : false,
			default  : ""
		},
		message : {
			type     : String,
			required : true,
			default  : ""
		},
		timeout : {
			type     : Number,
			required : false,
			default  : 5000
		}
	},
	data() {
		return {
			show           : false,
			currentTimeout : null
		};
	},
	watch : {
		message( newVal ) {
			var app = this;
			if ( newVal != "" ) {
				app.show = true;
				app.currentTimeout = setTimeout( () => {
					app.show = false;
					app.$parent.notification.message = "";
				}, app.timeout );
			}
		}
	},
	mounted() {

	},
	computed: {

	}
});
</script>