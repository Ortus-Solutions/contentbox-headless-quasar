/**
 * This file registers global mixins in the app
 */
import Vue from "vue";
import { date } from "quasar";
import moment from "moment";
import decodeToken from "jwt-decode";

// Declare Mixins
const mixins = {

	created(){},

	computed : {},

	methods : {
		checkToken( token ){
			// Values
			let response = { isValid: true, action: "pass" };
			let decode = {};
			// Decode token
			try {
				decode = decodeToken( token );

				console.log( "decoded token" );
				console.log( decode );

				// Now( System date ) -  decode.exp * 1000 = exp date with ms TODO: check date format, it was using moment
				if ( new Date() >= new Date( ( decode.exp * 1000 ) ) ){
					response.isValid = false;
					response.action = "reload";

					console.log( "Token Expired" );
					console.log( decode );
				}
			}
			// Only has error if token is invalid
			catch ( err ){

				console.log( "Token Broken" );
				console.log( err );

				response.isValid = false;
				response.action = "signin";
			}
			return response;
		},

		toInputDate( target ){
			if ( !target || !target.length ){
				return target;
			}
			return date.formatDate( target, "MM/DD/YYYY" );
		},

		toMomentJsBaseFormat( target ){
			if ( !target || !target.length ){
				return target;
			}
			return date.formatDate( target, "YYYYMMDD" );
		},

		displayFullDate( target ){
			if ( !target || !target.length ){
				return target;
			}
			return date.formatDate( target, "MMMM-DD-YYYY @ hh:MM:SS a" );
		},

		displayFullDate24( target ){
			if ( !target || !target.length ){
				return target;
			}
			return date.formatDate( target, "MMMM-DD-YYYY @ HH:MM:SS" );
		}
	}

};

// Export location if needed
export default ( { app, Vue } ) => {
	Vue.mixin( mixins );
};

export { mixins };
