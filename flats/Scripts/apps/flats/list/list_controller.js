define(['FlatsManager',
		'app/flats/list_view',
        'module/paginatorView',
        'views'],
function (FlatsManager, View, PaginatorView, CommonViews, CollectionPaginator) {
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









                    //var fetchingFlats = FlatsManager.request('flat:entities', params),
                    //    flatsListLayout = new View.Layout(),
                    //    flatsListHeader = new View.Header(),
                    //    loadingView = new CommonViews.Loader();

                    //FlatsManager.mainRegion.show(flatsListLayout);
                    //flatsListLayout.headerRegion.show(flatsListHeader);
                    //flatsListLayout.flatsRegion.show(loadingView);

                    //$.when(fetchingFlats).done(function (flats) {
                    //    var flatsListView = new View.Flats({
                    //        collection: flats,
                    //        initialize: function() {
                    //            this.listenTo(this.collection, 'change', this.render);
                    //        },
                    //        afterRender: function () {
                    //            // TODO исправить, так не круто
                    //            //var _this = this;
                    //            //flatsListHeader.on('flats:search', function (filter) {
                    //            //    var searchedCollection = FlatsManager.request('flat:entities', filter);
                    //            //    _this.setLoader();
                    //            //    $.when(searchedCollection).done(function(newFlats) {
                    //            //        _this.collection.set(newFlats, { reset: true });
                    //            //    });
                    //            //});
                    //        },
                    //        setLoader: function() {
                    //            this.$el.append(loadingView.$el);
                    //        }
                    //    });

                    //    // принимаем параметры с бэка для пагинатора и инициируем пагинатор

                    //    flatsListLayout.flatsRegion.show(flatsListView);

                    //    // поиск, фильтрация квартир
                    //    //flatsListHeader.on('flats:search', function (query) {
                    //    //    flatsListView.triggerMethod('search:flats', query);

                    //    //});

                    //}).fail(function () {
                    //    var emptyView = new View.NoFlatsView();
                    //    flatsListLayout.flatsRegion.show(emptyView);
                    //});



                    // url model test
                    //var oneFlat = FlatsManager.request('flat:entity:new');
                    //oneFlat.url = 'opaopaopapa';
                    //oneFlat.set('id', 2);
                    //oneFlat.fetch();
                });


                //console.log('flats paginating start');
                //require(['entities/flat'], function() {
                //    var fetchingFlats = FlatsManager.request('pageable:flat:entities');
                //    var flatsListLayout = new View.Layout();
                //    var flatsListHeader = new View.Header();
                //    $.when(fetchingFlats).done(function (flats) {
                //        var flatsListView = new View.Flats({
                //            collection: flats
                //        });

                //        // создаем пагинатор
                //        var paginatorView = new PaginatorView({
                //            collection: flats
                //        });

                //        flatsListHeader.on('flats:search', function (query) {
                //            flatsListView('on:search:flats', query);
                //        });

                //        flatsListLayout.on('show', function() {
                //            flatsListLayout.headerRegion.show(flatsListHeader);
                //            flatsListLayout.flatsRegion.show(flatsListView);
                //            flatsListLayout.footerRegion.show(paginatorView);
                //        });

                //        FlatsManager.mainRegion.show(flatsListLayout);
                //    });
                //});
            }
        }
    });

    return FlatsManager.FlatsApp.List.Controller;
});