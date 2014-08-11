require.config({
    baseUrl: '/Scripts',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        // ----------Libs
        'jquery':       'libs/jquery/jquery-2.0.3.min',
        'underscore':   'libs/underscore/underscore.min',
        'backbone':     'libs/backbone/backbone.min',
        'text':         'libs/require/text',

        // ----------App
        'app':      'app/app',
        'router':   'app/router',

        // ----------Models
        // flats
        'FlatModel': 'app/models/flats/model_flat',


        // ----------Views
        // flats
        'FlatViewEdit': 'app/views/flats/view_flat-edit',
        'FlatViewList': 'app/views/flats/view_flat-list',
        'FlatViewItem': 'app/views/flats/view_flat-item',

        // ----------Collections

        // ----------Utils
        'storage': 'utils/storage'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        }
    },
    waitSeconds: 10
},
templatesPath = {
    'flat-list.tpl': 'text!/templates/flats/flat-list.tpl.html'
});


require(['app'], function (App) {
    App.init();
});