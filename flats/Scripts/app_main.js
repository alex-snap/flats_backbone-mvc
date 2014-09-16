define(['marionette',
        'config/marionette.region.dialog',
        'backbone.queryparams'],
function (Marionette) {

    // Создаем экземпляр главного приложения
    // ---------------------
    var ModulBank = new Marionette.Application();

    // Описываем regions главного приложения
    // ---------------------
    ModulBank.addRegions({
        headerRegion    :   '#header-region',
        mainRegion      :   '#main-region',
        footerRegion    :   '#footer-region'
    });

    // Метод изменения текущего роута
    // ---------------------
    ModulBank.navigate = function (route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    // Метод получения текущего роута
    // ---------------------
    ModulBank.getCurrentRoute = function () {
        return Backbone.history.fragment;
    };

    // Метод получения роута без аргументов
    // ---------------------
    ModulBank.getBaseRoute = function () {
        var r = Backbone.history.fragment.substring(0, Backbone.history.fragment.indexOf('?'));
        return r.length ? r : ModulBank.getCurrentRoute();
    };

    // Метод для управления остановкой/запуском модулей
    // ---------------------
    ModulBank.startSubApp = function (appName, args) {
        var startedApp = appName ? ModulBank.module(appName) : null;
        if (ModulBank.currentApp === startedApp) { return; }

        if (ModulBank.currentApp) {
            ModulBank.currentApp.stop();
        }

        ModulBank.currentApp = startedApp;
        if (startedApp) {
            startedApp.start(args);
        }
    };

    // После старта приложения, осуществляем подгрузу подприложений
    // для инициализации их роутов до Backbone.history.start() и 
    // запускаем подприложение flats с методом list
    // ---------------------
    ModulBank.on('start', function () {
        if (Backbone.history) {
            require(['app/flats', 'app/test'], function () {
                Backbone.history.start();
                if (ModulBank.getCurrentRoute() === '') {
                    ModulBank.trigger('flats:list');
                }
            });
        }
        console.log('ModulBank: started');
    });

    // ---------------------
    return ModulBank;
});