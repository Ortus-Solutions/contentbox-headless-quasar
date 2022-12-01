import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { mixins } from "../boot/mixins";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ( { store, ssrContext } ) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  /**
	 * Global Interceptor before each route to secure it and load necessary request data
	 * by checking the meta fields:
	 * - secure : Need to be authenticated
	 * - permissions : Need the following permissions to navigate to that route
	 */
	Router.beforeEach( async( to, from, next ) => {
		// Verify that we have what we need to serve requests in case a hard refresh was done on
		// the browser
		await store.dispatch( "appstate/loadRequestData" )
			.then( () => {
				// Verify `secure` route. Then permissions
				if ( isSecure( to ) ) {
					// vue router permissions by route
					let permissions = getPermissions( to );
					// Are we logged in? yes
					if ( store.getters[ "appstate/isLoggedIn" ] ) {
						// mixins.methods.hasPermission( store, permissions ) ? next() : onUnauthorizedRequest( next );
            next();
					}
					// Not Logged in
					else {
						// onUnauthenticatedRequest( next );
					}
				}
				// Proceed as normal
				else {
					// Validate login access with an active session
					// validateLoginAccess( to.name, from.name, next,store.getters[ "appstate/isLoggedIn" ] );
					// Pass
					next();
				}
			} );
	} );

  return Router;
});


/**
 * On unauthorized request action
 * @param { Router next } next
 */
function onUnauthorizedRequest( next ){
	Notify.create( {
		color    : "negative",
		icon     : "eva-info-outline",
		position : "bottom-right",
		message  : "Unauthorized access, please contact us!",
		timeout  : 2000
	} );
	next( "/dashboard" );
}
/**
 * On unauthenticatedRequest validation
 * @param { Router next } next
 * @return redirect to login page
 */
function onUnauthenticatedRequest( next ){
	console.log( "Router redirect" );
	return next( "login" );
}
/**
 * Validate login access
 * @param { String } to
 * @param { String } from
 * @param { Router next } next
 * @param { Boolean } isLogged
 */
function validateLoginAccess( to, from, next, isLoggedIn ){
	// Validate login access
	if ( ( to === "login"  ) && isLoggedIn ){
		// Has history ?
		if ( from != undefined ){
			Router.back();
		} else {
			return next( "/" );
		}
	}
}

/**
 * Verify if the incoming route is secure by looking at the top level route
 * and then it's nested match
 *
 * @param {object} The matched route
 *
 * @return {boolean} - If true, the route is secured, else it is public
 */
function isSecure( to ){
	// Check incoming route first
	if ( to.hasOwnProperty( "meta" ) && to.meta.hasOwnProperty( "secure" ) ){
		return true;
	}
	// Checked nested match
	const nestedTo = to.matched[ 0 ];
	if ( nestedTo.hasOwnProperty( "meta" ) && nestedTo.meta.hasOwnProperty( "secure" ) ){
		return true;
	}

	return false;
}
