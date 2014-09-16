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

    // Метод получения текущего роута
    // ---------------------
    ModulBank.getCurrentRoute = function () {
        return Backbone.history.fragment;
    };

    ModulBank.syncCurrentStep = function() {
        var temp = 'contact';
        if (!temp.length) {
            temp = 'contact';
        }
        API[temp]();
    };

    var API = {
        contact: function() {
            require(['app/register/contact_controller'], function (ContactController) {
                ContactController.showContact();
            });
        }
    }

    // После старта приложения, осуществляем подгрузу подприложений
    // для инициализации их роутов до Backbone.history.start() и 
    // запускаем подприложение flats с методом list
    // ---------------------
    ModulBank.on('start', function () {
        if (Backbone.history) {
            require(['app/register'], function () {
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