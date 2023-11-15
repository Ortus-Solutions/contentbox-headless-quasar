const routes = [
	{
		path      : "/",
		component : () => import( "layouts/MainLayout.vue" ),
		children  : [
			{
				path      : "",
				name      : "home",
				meta      : { secure: true },
				component : () => import( "src/pages/home/Index.vue" )
			},
			{
				path      : "/login",
				name      : "login",
				component : () => import( "pages/Security/Login.vue" )
			},
			{
				path      : "/signup",
				name      : "signup",
				component : () => import( "pages/Security/SignUp.vue" )
			},
		],
	},
	{
		path      : "/services",
		meta      : { secure: true },
		component : () => import( "layouts/MainLayout.vue" ),
		children  : [ { path: "/services", name: "services", component: () => import( "pages/services/Index.vue" ) }, ],
	},
	{
		path      : "/about",
		meta      : { secure: true },
		component : () => import( "layouts/MainLayout.vue" ),
		children  : [ { path: "/about", name: "about", component: () => import( "pages/about/Index.vue" ) } ],
	},
	{
		path      : "/store",
		meta      : { secure: true },
		component : () => import( "layouts/MainLayout.vue" ),
		children  : [ { path: "/store", name: "store", component: () => import( "pages/store/Index.vue" ) } ],
	},
	{
		path      : "/blog",
		meta      : { secure: true },
		component : () => import( "layouts/MainLayout.vue" ),
		children  : [
			{ path: "/blog", name: "blog", component: () => import( "pages/blog/Index.vue" ) },
			{ path: "/blog/:slug", name: "blogPost", component: () => import( "pages/blog/BlogPost.vue" ) }
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path      : "/:catchAll(.*)*",
		component : () => import( "pages/Error404.vue" ),
	},
];

export default routes;
