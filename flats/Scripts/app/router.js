var App = App || {
    Models:         {},
    Collections:    {},
    Views:          {},
    Routers:        {}
};

(function() {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'flats/new': 'editFlat',
            'flats/edit/:id': 'editFlat'
        }
    });

    App.Routers.router = new Router();
    App.Routers.router.on('route:home', function () {
        App.Views.flatList.render();
    });
    App.Routers.router.on('route:editFlat', function (id) {
        App.Views.editFlat.render({ id: id });
    });
    Backbone.history.start();
})();