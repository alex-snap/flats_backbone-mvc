define(['FlatsManager',
		'app/flats/show_view',
        'commonViews'],
function (FlatsManager, View, CommonViews) {
	FlatsManager.module('FlatsApp.Show', function(Show, FlatsManager, Backbone, Marionette, $, _){
		Show.Controller = {
		    showFlat: function (id) {
		        console.log('FlatsApp:ShowController: method showFlat');
				require(['entities/flat'], function() {
				    var showingFlat = FlatsManager.request('flat:entity', id),
				        loaderView = new CommonViews.Loader();
				    FlatsManager.mainRegion.show(loaderView);
				    $.when(showingFlat).done(function (flat) {
				        if (flat !== undefined) {
				            var flatShowView = new View.Flat({
				                model: flat
				            });
                        }

						// отображаем лэйаут со всем содержимым в main region нашего приложения
						FlatsManager.mainRegion.show(flatShowView);
					});
				});
			}
		}
	});

	return FlatsManager.FlatsApp.Show.Controller;
});