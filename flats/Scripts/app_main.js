define(['marionette',
        'config/marionette.region.dialog',
        'backbone.queryparams'],
function (Marionette) {

    // Создаем экземпляр главного приложения
    // ---------------------
    var FlatsManager = new Marionette.Application();

    // Описываем regions главного приложения
    // ---------------------
    FlatsManager.addRegions({
        headerRegion    :   '#header-region',
        mainRegion      :   '#main-region',
        footerRegion    :   '#footer-region'
        //dialogRegion: Marionette.Region.Dialog.extend({
        //    el: '#dialog-region'
        //})
    });

    // Метод изменения текущего роута
    // ---------------------
    FlatsManager.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    // Метод получения текущего роута
    // ---------------------
    FlatsManager.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    FlatsManager.getBaseRoute = function () {
        return Backbone.history.fragment.substring(0, Backbone.history.fragment.indexOf('?'));
    };

    // Метод для управления остановкой/запуском модулей
    // ---------------------
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

    // После старта приложения, осуществляем подгрузу подприложений
    // для инициализации их роутов до Backbone.history.start() и 
    // запускаем подприложение flats с методом list
    // ---------------------
    FlatsManager.on('start', function () {
        if (Backbone.history) {
            require(['app/flats', 'app/test'], function () {
                Backbone.history.start();
                if (FlatsManager.getCurrentRoute() === '') {
                    FlatsManager.trigger('flats:list');
                }
            });
        }

        // инициализация модуля Common.Views
        // и отрисовка общего футера футера
        // ---------------
        require(['commonViews'], function () {
            var footerView = new FlatsManager.Common.Views.Footer();
            FlatsManager.footerRegion.show(footerView);
        });
        console.log('FlatsManager: started');
    });

    // backbone.history - это глобальный роутер для всего приложения
    // поэтому мы можем отлавливая событие 'route' узнавать о смене url
    // ---------------------
    Backbone.history.on('route', function (controller, method) {
        scrollUp();
    });

    // функция прокрутки страницы вверх
    // ---------------------
    function scrollUp() {
        $('html, body').animate({
            scrollTop: 0
        }, 150);
    }

    // ---------------------
    return FlatsManager;
});