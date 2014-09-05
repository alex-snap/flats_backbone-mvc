define(['marionette',
        'config/marionette.region.dialog'],
function(Marionette) {
    var FlatsManager = new Marionette.Application();

    FlatsManager.addRegions({
        headerRegion    :   '#header-region',
        mainRegion      :   '#main-region',
        footerRegion    :   '#footer-region'
        //dialogRegion: Marionette.Region.Dialog.extend({
        //    el: '#dialog-region'
        //})
    });

    FlatsManager.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    FlatsManager.getCurrenRoute = function() {
        return Backbone.history.fragment;
    };

    FlatsManager.on('start', function () {
        if (Backbone.history) {
            // создание роутов дочернего приложения FlatsApp до инициализации системы роутов Backbone
            require(['app/flats'], function () {
                Backbone.history.start();
                if (FlatsManager.getCurrenRoute() === '') {
                    // запуск подприложения flats
                    FlatsManager.trigger('flats:list');
                }
            });
        }
        console.log('Flats manager has started');
    });

    return FlatsManager;
});