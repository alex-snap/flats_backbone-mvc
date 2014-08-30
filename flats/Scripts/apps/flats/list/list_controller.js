define(['FlatsManager',
		'app/flats/list_view',
        'module/paginatorView'],
function(FlatsManager, View, PaginatorView){
	FlatsManager.module('FlatsApp.List', function(List, FlatsManager, Backbone, Marionette, $, _){
		List.Controller = {
		    listFlats: function () {
		        console.log('flats list method start');
				require(['entities/flat'], function(){
				  var fetchingFlats = FlatsManager.request('flat:entities');
					var flatsListLayout = new View.Layout();
				    $.when(fetchingFlats).done(function (flats) {
				        var flatsListHeader = new View.Header();
					    var flatsListView = new View.Flats({
							collection: flats
						});

						// когда показываем лэйаут, отображаем в регионах нашего
						// лэйаута view хедера и view списка квартир
						flatsListLayout.on('show', function(){
						    flatsListLayout.headerRegion.show(flatsListHeader);
						    flatsListLayout.flatsRegion.show(flatsListView);
						});

                        // поиск, фильтрация квартир
						flatsListHeader.on('flats:search', function (query) {
					        flatsListView.triggerMethod('search:flats', query);
						});

					    // отображаем лэйаут со всем содержимым в main region нашего приложения
						FlatsManager.mainRegion.show(flatsListLayout);

				    }).fail(function () {
				        var flatsListHeader = new View.Header({
				            filterUiHide: true
				        });
					    var emptyView = new View.NoFlatsView();
					    flatsListLayout.on('show', function () {
					        flatsListLayout.headerRegion.show(flatsListHeader);
					        flatsListLayout.flatsRegion.show(emptyView);
					    });

					    // отображаем лэйаут со всем содержимым в main region нашего приложения
					    FlatsManager.mainRegion.show(flatsListLayout);
					});
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