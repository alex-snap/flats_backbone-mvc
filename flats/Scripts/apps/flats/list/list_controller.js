define(['FlatsManager',
		'app/flats/list_view',
        'module/paginator',
        'commonViews',
        'backbone.queryparams'
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
                        perPage: 2,
                        page: 1
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
                    renderFlats(prop);

                    // обрабатываем события элементов интерфейса на странице
                    // ---------------------
                    flatsListHeader.on('flats:search', renderFlats);
                    

                    // функция загрузки и отображения списка квартир
                    // ---------------------
                    function renderFlats(p) {
                        var fetchingFlats = FlatsManager.request('flat:entities', p),
                            loadingView = new CommonViews.Loader();
                        flatsListLayout.flatsRegion.show(loadingView);
                        $.when(fetchingFlats).done(function (response) {
                            debugger;
                            var flatsListView = new View.Flats({
                                collection: response.flats,
                                pagination: {
                                    count: response.count,
                                    opts: p
                                }
                                //collection: response,
                                //pagination: {
                                //    onePage: 1,
                                //    count: 200
                                //}
                            });
                            flatsListLayout.flatsRegion.show(flatsListView);
                        }).fail(function() {
                            var emptyView = new View.NoFlatsView();
                            flatsListLayout.flatsRegion.show(emptyView);
                        });
                        //var route = FlatsManager.FlatsApp.router.toFragment(FlatsManager.getCurrenRoute(), p);
                        //FlatsManager.navigate(route);
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