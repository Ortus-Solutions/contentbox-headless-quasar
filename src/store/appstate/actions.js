import { api } from "boot/axios";
import { LocalStorage } from "quasar";
import _ from "lodash";

/**
 * Verifies if the store has the user info, else checks the local storage
 * The purpose is for every request to have a valid user data loaded.
 */
export const loadRequestData = async( { dispatch, state, commit, rootState } ) => {
	// verify if user is empty and the jwt token is not present
	if ( _.isEmpty( state.currentUser ) || !state.jwt.length ) {
		// login( { dispatch, state, commit, rootState }, {
		// 	username : "javiapi",
		// 	password : "Itb2022!"
		// } );
	}
};

/**
 * Dispatch a login attempt
 *
 * @param {Object} - Contains username and password
 *
 * @return {Promise}
 */
export const login = ( { getters, state, commit, dispatch }, payload ) => {
	return new Promise( ( resolve, reject ) => {
		api.post(
			"/login",
			payload
		)
			.then( response => {
				// Check errors in case, but very unusual we get a 200 with an error bit
				if ( !response.data.error ) {
					// Call our mutations
					commit( "loginUser", response.data.data.author );
					commit( "saveJwt", response.data.data.tokens );
					// Config UI
					resolve( response.data.data.user );
				} else {
					reject( new Error( response.data.messages ) );
				}
			} )
			.catch( error => {
				reject( error );
			} );
	} );
};

/**
 * Logout a user from the system by calling the API to invalidate the
 * jwt and reset the state
 *
 * @param {boolean} cleanup - If true, we will only do cleanup, by default it cleans up and calls the API for logout
 */
export const logout = ( { getters, state, commit }, cleanup = false ) => {
	// Call logout and forget about it
	if ( !cleanup ) {
		api.post(
			"/logout",
			{ "x-auth-token": state.jwt }
		);
	}

	// Cleanup the store
	commit( "logoutUser" );
};

/**
 * Execute refresh token
 *
 * @returns { access_token, refresh_foken }
 */
export const refreshToken = ( { getters, state, commit, dispatch } ) => {
	return new Promise( ( resolve, reject ) => {
		$axios.post( "/refreshToken" )
			.then( response => {
				// Check errors in case, but very unusual we get a 200 with an error bit
				if ( !response.data.error ) {
					// Call our mutations
					commit( "saveJwt", response.data.data );
					resolve( response.data.data );
				} else {
					reject( new Error( response.data.messages ) );
				}
			} )
			.catch( error => {
				reject( error );
			} );
	} );
};
