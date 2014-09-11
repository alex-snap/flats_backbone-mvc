requirejs.config({
        baseUrl: 'Scripts/',
        paths: {
            // ----- Libs
            'jquery'                :   'libs/jquery/jquery-2.0.3.min',
            'underscore'            :   'libs/underscore/underscore.min',
            'backbone'              :   'libs/backbone/backbone.min',
            'backbone.syphon'       :   'libs/backbone/backbone.syphon',
            'backbone.stickit'      :   'libs/backbone/backbone.stickit.min',
            'backbone.paginator'    :   'libs/backbone/backbone.paginator.min',
            'backbone.queryparams'  :   'libs/backbone/backbone.queryparams.min',
            'marionette'            :   'libs/marionette/backbone.marionette.min',
            'text'                  :   'libs/require/text',
            'json2'                 :   'libs/json/json2.min',
            'jquery-ui'             :   'libs/jquery/jquery-ui.min',
            'localstorage'          :   'libs/backbone/backbone.localStorage.min',
            'tpl'                   :   'libs/underscore/underscore-tpl',
            'fileapi'               :   'libs/fileapi/FileAPI.min',
            'fileapiExif'           :   'libs/fileapi/FileAPI.exif',
            'jquery.fileapi'        :   'libs/fileapi/jquery.fileapi',
            'spin'                  :   'libs/spin/spin.min',
            'jquery.spin'           :   'libs/spin/jquery.spin',
            'google-map'            :   'https://maps.googleapis.com/maps/api/js',


            // ----- Application
            'FlatsManager': 'app_main',


            // ----- Common
            // -- config
            'config/marionette.region.dialog'   :   'common/config/marionette/regions/dialog',
            'config/localstorage'               :   'common/config/storage/localstorage',
            // -- utils
            'utils'                             :   'common/utils/utils',
            // -- views
            'views'                             :   'common/views',
            // -- modules
            'module/paginatorView'              :   'common/modules/collection-paginator/collection-paginator',
            'module/vent': 'common/modules/vent/vent',


            // ----- Entities
            'entities/flat' :   'entities/flat',


            // ----- Sub applications
            // -- flats sub app
            'app/flats'                     :   'apps/flats/flats_app',
            'app/flats/list_controller'     :   'apps/flats/list/list_controller',
            'app/flats/list_view'           :   'apps/flats/list/list_view',
            'app/flats/show_controller'     :   'apps/flats/show/show_controller',
            'app/flats/show_view'           :   'apps/flats/show/show_view',
            'app/flats/new_controller'      :   'apps/flats/new/new_controller',
            'app/flats/new_view'            :   'apps/flats/new/new_view',
            'app/flats/navbar_controller'   :   'apps/flats/navbar/navbar_controller',
            'app/flats/navbar_view'         :   'apps/flats/navbar/navbar_view',
            // flats common
            'app/flats/common/views'        :   'apps/flats/common/views',

            // -- test sub app
            'app/test'                  :   'apps/test/test_app',
            'app/test/one_controller'   :   'apps/test/one/one_controller'

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
            'jquery.fileapi'    :   ['jquery', 'fileapi'],
            'localstorage'      :   ['backbone'],
            'backbone.paginator':   ['backbone'],
            'jquery-ui'         :   ['jquery'],
            'tpl'               :   ['text'],
            'jquery.spin'       :   ['spin'],
        }
    }
);
// run a main application
require(['FlatsManager'], function (FlatsManager) {
	FlatsManager.start();
});