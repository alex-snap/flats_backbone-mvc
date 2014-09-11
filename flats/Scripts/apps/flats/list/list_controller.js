define(['FlatsManager',
		'app/flats/list_view',
        'module/paginatorView',
        'views',
        'module/vent'],
function (FlatsManager, View, PaginatorView, CommonViews) {
    FlatsManager.module('FlatsApp.List', function (List, FlatsManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listFlats: function (params) {
                console.log('FlatsApp:ListController: method listFlats');
                require(['entities/flat'], function () {

                    // создание основных view интерфейса
                    // ---------------------
                    var flatsListLayout = new View.Layout(),
                        flatsListHeader = new View.Header();

                    // отображаем основные элементы интерфейса
                    // ---------------------
                    FlatsManager.mainRegion.show(flatsListLayout);
                    flatsListLayout.headerRegion.show(flatsListHeader);

                    // первоначальная загрузка страницы
                    // ---------------------
                    renderFlats(params);

                    // обрабатываем события элементов интерфейса
                    // ---------------------
                    flatsListHeader.on('flats:search', renderFlats);

                    // функция загрузки и отображения списка квартир
                    // ---------------------
                    function renderFlats(p) {
                        var fetchingFlats = FlatsManager.request('flat:entities', p),
                            loadingView = new CommonViews.Loader();
                        flatsListLayout.flatsRegion.show(loadingView);
                        $.when(fetchingFlats).done(function(flats) {
                            var flatsListView = new View.Flats({
                                collection: flats
                            });
                            flatsListLayout.flatsRegion.show(flatsListView);
                        }).fail(function() {
                            var emptyView = new View.NoFlatsView();
                            flatsListLayout.flatsRegion.show(emptyView);
                        });
                    }

                    // url model test
                    //var oneFlat = FlatsManager.request('flat:entity:new');
                    //oneFlat.url = 'opaopaopapa';
                    //oneFlat.set('id', 2);
                    //oneFlat.fetch();
                });
            }
        }
    });

    return FlatsManager.FlatsApp.List.Controller;
});