define(['FlatsManager'],
function(FlatsManager){
	FlatsManager.module('FlatsApp', function(FlatsApp, FlatsManager, Backbone, Marionette, $, _){
	    FlatsApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'flats': 'listFlats'
			}
		});
		var API = {
			listFlats: function(criterion){
			    require(['app/flats/list_controller'], function (ListController) {
					ListController.listFlats(criterion);
				});
			}
		};
		FlatsManager.on('flats:list', function(){
			FlatsManager.navigate('flats');
		});
		FlatsManager.addInitializer(function(){
		    new FlatsApp.Router({
				controller: API
			});
		});
	});

	return FlatsManager.FlatsApp;
});

// flats_app - это подприложение "квартиры" для управления списком квартир.
// Для приложения создается своя отдельная система роутов или путей.
// Каждому роуту соответствует свой контроллер, например listFlats, 
// которому приложение flats_app передает управление в соответствии с роутом.

// Подприложение запускается по команде главного приложения, например 'flats:list'.
// По этой команде подприложение осущесвтляет переход на новый роут, а с переходом и запускается
// контроллер.