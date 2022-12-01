export default function () {
	return {
		// Current User Info
		"currentUser": {}, // The currently logged in user
		"jwt": "", // The token of a logged in user
		"defaultPreferences": {
			language: "en-us"
		},
		"languageOptions": [
			{ value: "en-us", label: "English" },
			{ value: "es", label: "Spanish" }
		],

		// Global env and app info
		"environment": "development", //process.env.environment,
		"appVersion": "1.0.0", //process.env.appVersion,
		"appName": "ITB Demo App", //process.env.appName,

		// Menu info
		"menuDrawer": true // The menu drawer state
		/**
		 * Main Menu Structure
		 * - 1 menu item( link or drop ) can to have many permissions ( only needs to match one to display this menu item ),
		 *  usually 1 menu item has a collection of permissions that its children have, menu item = [ "per1", "per2" ];
		 *  child1 = [ "per1" ];    child2 = [ "per2" ];
		 *
		 * 1 submenu item( child ) can to have many permissions ( only needs to match one to display this menu item )
		 */
	};
}
