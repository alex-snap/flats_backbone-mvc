define(function (require) {
    var Backbone = require('backbone');

    var Router = Backbone.Router.extend({
        routes: {
            '':                 'home',
            'flats/new':        'editFlat',
            'flats/edit/:id':   'editFlat'
        }
    });

    var init = function () {
        var router = new Router();
        router.on('route:home', function () {
            require('FlatViewList').render();
        });
        router.on('route:editFlat', function (id) {
            require('FlatViewEdit').render({ id: id });
        });
        Backbone.history.start();
    }

    return {
        init: init
    }
    
});