define(['FlatsManager',
		'app/flats/list_view',
        'module/paginator',
        'commonViews'
],
function (FlatsManager, View, Paginator, CommonViews) {
    FlatsManager.module('FlatsApp.List', function (List, FlatsManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listFlats: function (params) {
                console.log('FlatsApp:ListController: method listFlats');
                require(['entities/flat'], function () {

                    // параметры страницы по умолчанию
                    // ---------------------
                    var prop = {
                        perPage : 2,    // количество элементов на странице
                        page    : 1,    // начальная страница
                        range   : 2     // диапазон отображаемых страниц в пагинаторе
                    };

                    // заполняем параметры по умолчанию
                    // ---------------------
                    if (params != undefined) {
                        _.extend(prop, params);
                    }

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
                    renderFlats();

                    // обрабатываем события элементов интерфейса на странице
                    // ---------------------
                    flatsListHeader.on('flats:search', renderFlats);
                    

                    // функция загрузки и отображения списка квартир
                    // ---------------------
                    function renderFlats(filter) {
                        _.extend(prop, filter);
                        var fetchingFlats = FlatsManager.request('flat:entities', prop),
                            loadingView = new CommonViews.Loader();
                        flatsListLayout.flatsRegion.show(loadingView);
                        $.when(fetchingFlats).done(function (flats, count) {
                            var flatsListView = new View.Flats({
                                collection: flats,
                                pagination: {
                                    count: count,
                                    opts: prop
                                }
                            });
                            flatsListView.on('page:change', function (page) {
                                if (prop.page != page) {
                                    prop.page = page;
                                    renderFlats();
                                }
                            });
                            flatsListLayout.flatsRegion.show(flatsListView);
                        }).fail(function() {
                            var emptyView = new View.NoFlatsView();
                            flatsListLayout.flatsRegion.show(emptyView);
                        });

                        // меняем роут
                        // --------------
                        var route = FlatsManager.getBaseRoute().length ? FlatsManager.getBaseRoute() : FlatsManager.getCurrentRoute();
                        FlatsManager.navigate(FlatsManager.FlatsApp.router.toFragment(route, prop));
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