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

    FlatsManager.startSubApp = function (appName, args) {
        var startedApp = appName ? FlatsManager.module(appName) : null;
        if (FlatsManager.currentApp === startedApp) { return; }

        if (FlatsManager.currentApp) {
            FlatsManager.currentApp.stop();
        }

        FlatsManager.currentApp = startedApp;
        if (startedApp) {
            startedApp.start(args);
        }
    };

    FlatsManager.on('start', function () {
        if (Backbone.history) {
            // создание роутов дочернего приложения FlatsApp до инициализации системы роутов Backbone
            require(['app/flats', 'app/test'], function () {
                Backbone.history.start();
                if (FlatsManager.getCurrenRoute() === '') {
                    // запуск подприложения flats
                    FlatsManager.trigger('flats:list');
                }
            });
        }
        console.log('FlatsManager: started');
    });

    return FlatsManager;
});