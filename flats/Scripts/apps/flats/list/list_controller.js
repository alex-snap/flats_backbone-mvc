define(['FlatsManager',
		'app/flats/list_view'], 
function(FlatsManager, View){
	FlatsManager.module('FlatsApp.List', function(List, FlatsManager, Backbone, Marionette, $, _){
		List.Controller = {
		    listFlats: function () {
		        console.log('flats list controller start');
				require(['entities/flat'], function(){
					var fetchingFlats = FlatsManager.request('flat:entities');
					var flatsListLayout = new View.Layout();
					var flatsListHeader = new View.Header();
					$.when(fetchingFlats).done(function(flats){
						var flatsListView = new View.Flats({
							collection: flats
						});

						// когда показываем лэйаут, отображаем в регионах нашего
						// лэйаута view хедера и view списка квартир
						flatsListLayout.on('show', function(){
						    flatsListLayout.headerRegion.show(flatsListHeader);
						    flatsListLayout.flatsRegion.show(flatsListView);
						});

						// отображаем лэйаут со всем содержимым в main region нашего приложения
						FlatsManager.mainRegion.show(flatsListLayout);

						console.log(flats);
					});
				});
			}
		}
	});

	return FlatsManager.FlatsApp.List.Controller;
});