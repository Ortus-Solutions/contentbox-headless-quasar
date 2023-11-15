import _ from "lodash";
import { mixins } from "src/boot/mixins";

/**
 * Check if the user is logged or not on the app for informational and access purposes
 *
 * @return {boolean}
 */
export const isLoggedIn = ( state ) => {
	let checkToken = mixins.methods.checkToken( state.jwt );
	if ( !_.isEmpty( state.currentUser ) && checkToken.isValid ){
		return true;
	}
	return false;
};

/**
 * Returns the current logged userID on the state or a 0 if not logged in
 *
 * @return {numeric} The logged in user id or 0
 */
export const getUserId = ( state ) => state.currentUser.id || 0;

/**
 * Returns the current logged userID on the state or a 0 if not logged in
 *
 * @return {numeric} The logged in user id or 0
 */
export const getUserEmail = ( state ) => state.currentUser.email || "";
