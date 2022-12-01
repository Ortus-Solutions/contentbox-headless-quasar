module.exports = {
	important : true,
	theme : {
		fontFamily : {
			system : [
				"Roboto",
				"-apple-system",
				"Helvetica Neue",
				"Helvetica",
				"Arial",
				"sans-serif"
			]
		},
		minHeight: {
			'1/2': '50%',
		}
	},
	variants: {},
	plugins   : [
		require( "@tailwindcss/forms" ),
		require( "@tailwindcss/typography" ),
		require( "@tailwindcss/aspect-ratio" )
	],
	purge     : {
		content : [
			"./src/**/*.vue",
			"./src/**/*.js"
		],
		options: {
			whitelist: [],
			safelist: []
		}
	}
};