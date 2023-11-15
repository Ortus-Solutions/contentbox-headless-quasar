import { LocalStorage } from "quasar";
import _ from "lodash";

export const loginUser = ( state, currentUser ) => {
	state.currentUser = currentUser;
};

export const saveJwt = ( state, jwt ) => {
	state.jwt = "";
	// Store jwt in local storage so we can use it all the time.
	if ( jwt.access_token ){
		state.jwt = jwt.access_token;
		LocalStorage.set( "session-jwt", jwt.access_token );
		LocalStorage.set( "x-authorization", jwt.refresh_token );
	} else {
		LocalStorage.remove( "session-jwt" );
		LocalStorage.remove( "x-authorization" );
	}
};

export const logoutUser = ( state ) => {
	state.currentUser = "";
	state.jwt = "";
	// clear out the local storage
	LocalStorage.clear();
};

export const toggleMenuDrawer = ( state ) => {
	state.menuDrawer = !state.menuDrawer;
};

export const setMenuDrawer = ( state, value ) => {
	state.menuDrawer = value;
};

export const setAppLanguage = ( state, language ) => {
	// set preferences
	state.currentUser.allPreferences.language =  language;
};
