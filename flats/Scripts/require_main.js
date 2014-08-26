requirejs.config({
	baseUrl: 'Scripts/',
	paths: {
		// ----- Libs
		'jquery'			: 	'libs/jquery/jquery-2.1.1.min',
		'underscore'		: 	'libs/underscore/underscore.min',
		'backbone'			: 	'libs/backbone/backbone.min',
		'marionette'		: 	'libs/marionette/backbone.marionette.min',
		'text'				: 	'libs/require/text',
		'json2'				: 	'libs/json/json2.min',
		'jquery-ui' 		: 	'libs/jquery/jquery-ui.min',
		'localstorage'		: 	'libs/backbone/backbone.localStorage.min',
		'tpl'				: 	'libs/underscore/underscore-tpl', 
		'backbone.syphon'	: 	'libs/backbone/backbone.syphon',

		// ----- Application
		'FlatsManager': 'app_main',

	    // ----- Common
        // config
		'config/marionette.region.dialog'	: 	'common/config/marionette/regions/dialog',
		'config/localstorage'				: 	'common/config/storage/localstorage',
	    // utils
        'utils' :   'common/utils/utils',

		// ----- Entities
		'entities/contact': 'entities/contact',

		// ----- Sub applications
		// contacts
		'app/flats'					    : 	'apps/flats/flats_app',
		'app/flats/list_controller'	    : 	'apps/flats/list/list_controller',
		'app/flats/list_view'		    : 	'apps/flats/list/list_view',
		'app/contacts/edit_view'		: 	'apps/contacts/edit/edit_view',
		// contacts common
		'app/contacts/common/views'		: 	'apps/contacts/common/views'

	},
	shim: {
		'underscore': {
			exports	: 	'_'
		},
		'backbone': {
			exports	: 	'Backbone',
			deps	: 	['jquery', 'underscore', 'json2']
		},
		'marionette': {
			exports	: 	'Marionette',
			deps	: 	['backbone']
		},
		'localstorage'	: ['backbone'],
		'jquery-ui'		: ['jquery'],
		'tpl'			: ['text']
	}
},
	templates = {
		// APP flats, list View
	    'apps/flats/list/list_layout'   :   'tpl!apps/flats/list/templates/flats-list-layout.tpl.html',
	    'apps/flats/list/list_header'   :   'tpl!apps/flats/list/templates/flats-list-header.tpl.html',
	    'apps/flats/list/list'          :   'tpl!apps/flats/list/templates/flats-list.tpl.html',
	    'apps/flats/list/list_item'     :   'tpl!apps/flats/list/templates/flats-list-item.tpl.html',
	    'apps/flats/list/list_none'     :   'tpl!apps/flats/list/templates/flats-list-none.tpl.html'
	});

// run a main application
require(['FlatsManager'], function (FlatsManager) {
	FlatsManager.start();
});