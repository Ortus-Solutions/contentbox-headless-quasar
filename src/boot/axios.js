import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create( { baseURL: process.env.apiUrl } );

export default boot( ( { app, store } ) => {
	// for use inside Vue files (Options API) through this.$axios and this.$api
	app.config.globalProperties.$axios = axios;
	// ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
	//       so you won't necessarily have to import axios in each vue file

	app.config.globalProperties.$api = api;
	// ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
	//       so you can easily perform requests against your app's API

	// Register the JWT token on the authorization header for all requests
	api.interceptors.request.use(
		config => {
			// TODO: Add refresh tokens
			if ( config.baseURL.concat( config.url ) == config.baseURL.concat( "/refreshToken" ) ) {
				config.headers["x-refresh-token"] = LocalStorage.getItem( "x-authorization" );
			} else {
				config.headers["authorization"] = "Bearer " + LocalStorage.getItem( "session-jwt" );
			}
			return config;

			// config.headers[ "Authorization" ] = "Bearer " + store.state.appstate.jwt;
			// return config;
		},
		error => {
			return Promise.reject( error );
		}
	);

	// Check for expired credentials
	// api.interceptors.response.use(
	// 	( response ) => response,
	// 	async( error ) => {

	// 		let originalRequest = await error.config;
	// 		console.log(originalRequest);

	// 		// Expired Token!
	// 		if (
	// 			error.response &&
	// 			error.response.status === 401 &&
	// 			error.response.statusText === "Expired Authentication Credentials" &&
	// 			!originalRequest._retry
	// 		){
	// 			originalRequest._retry = true;
	// 			// EXecute refresh token
	// 			await store.dispatch( "appstate/refreshToken" ).catch( error => console.error( error ) );
	// 			return $axios( originalRequest );
	// 		}
	// 		// Fail refresh token
	// 		else if ( originalRequest._retry ) {
	// 			onTokenExpired();
	// 		}

	// 		return Promise.reject( error );
	// 	}
	// );

	// async function onTokenExpired(){
	// 	await Notify.create( {
	// 		color    : "negative",
	// 		icon     : "eva-info-outline",
	// 		position : "bottom-right",
	// 		message  : "The refresh token expired!",
	// 		timeout  : 4000
	// 	} );
	// 	await console.log( "Detected 401 axios response, logging out and redirecting" );
	// 	await store.dispatch( "appstate/logout" );
	// 	await setTimeout( function() { window.location.href = "/login"; }, 5000 );
	// }

} );

export { api };
