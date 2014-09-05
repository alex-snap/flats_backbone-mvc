requirejs.config({
        baseUrl: 'Scripts/',
        paths: {
            // ----- Libs
            'jquery': 'libs/jquery/jquery-2.0.3.min',
            'underscore': 'libs/underscore/underscore.min',
            'backbone': 'libs/backbone/backbone.min',
            'marionette': 'libs/marionette/backbone.marionette.min',
            'text': 'libs/require/text',
            'json2': 'libs/json/json2.min',
            'jquery-ui': 'libs/jquery/jquery-ui.min',
            'localstorage': 'libs/backbone/backbone.localStorage.min',
            'tpl': 'libs/underscore/underscore-tpl',
            'backbone.syphon': 'libs/backbone/backbone.syphon',
            'backbone.paginator': 'libs/backbone/backbone.paginator.min',
            'fileapi': 'libs/fileapi/FileAPI.min',
            'fileapiExif': 'libs/fileapi/FileAPI.exif',
            'jquery.fileapi': 'libs/fileapi/jquery.fileapi',
            'google-map': 'https://maps.googleapis.com/maps/api/js',


            // ----- Application
            'FlatsManager': 'app_main',

            // ----- Common
            // config
            'config/marionette.region.dialog': 'common/config/marionette/regions/dialog',
            'config/localstorage': 'common/config/storage/localstorage',
            // utils
            'utils': 'common/utils/utils',

            // ----- Entities
            'entities/contact': 'entities/contact',

            // ----- Sub applications
            // flats sub app
            'app/flats': 'apps/flats/flats_app',
            'app/flats/list_controller': 'apps/flats/list/list_controller',
            'app/flats/list_view': 'apps/flats/list/list_view',
            'app/flats/show_controller': 'apps/flats/show/show_controller',
            'app/flats/show_view': 'apps/flats/show/show_view',
            'app/flats/new_controller': 'apps/flats/new/new_controller',
            'app/flats/new_view': 'apps/flats/new/new_view',
            // contacts common
            'app/flats/common/views': 'apps/flats/common/views',

            // ----- Modules
            'module/paginatorView': 'common/modules/collection-paginator/collection-paginator'

        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                exports: 'Backbone',
                deps: ['jquery', 'underscore', 'json2']
            },
            'marionette': {
                exports: 'Marionette',
                deps: ['backbone']
            },
            'jquery.fileapi': ['jquery', 'fileapi'],
            'localstorage': ['backbone'],
            'backbone.paginator': ['backbone'],
            'jquery-ui': ['jquery'],
            'tpl': ['text']
        }
    }
    //templates = {
    //    // ------- APP flats
    //    // list View
    //    'apps/flats/list/list_layout'   :   'tpl!apps/flats/list/templates/flats-list-layout.tpl.html',
    //    'apps/flats/list/list_header'   :   'tpl!apps/flats/list/templates/flats-list-header.tpl.html',
    //    'apps/flats/list/list'          :   'tpl!apps/flats/list/templates/flats-list.tpl.html',
    //    'apps/flats/list/list_item'     :   'tpl!apps/flats/list/templates/flats-list-item.tpl.html',
    //    'apps/flats/list/list_none'     :   'tpl!apps/flats/list/templates/flats-list-none.tpl.html',
    //    // show view
    //    'apps/flats/show/show_flat'     :   'tpl!apps/flats/show/templates/flats-show-item.tpl.html',
    //    // new view
    //    'apps/flats/new/new_layout'     :   'tpl!apps/flats/new/templates/flats-new-layout.tpl.html',
    //    // new/edit flat view
    //    'apps/flats/common/edit'        :   'tpl!apps/flats/common/templates/flat-edit.tpl.html',


    //    // ------- Common
    //    'module/paignator'              :   'tpl!common/modules/collection-paginator/collection-paginator.tpl.html'
    //});
);
// run a main application
require(['FlatsManager'], function (FlatsManager) {
	FlatsManager.start();
});