define(['FlatsManager'],
function(FlatsManager){
    FlatsManager.module('FlatsApp', function (FlatsApp, FlatsManager, Backbone, Marionette, $, _) {
	    FlatsApp.Router = Marionette.AppRouter.extend({
	        appRoutes: {
			    'flats'         :   'listFlats',
                'flats/'        :   'listFlats',
                'flats/item/:id':   'showFlat',
                'flats/new'     :   'newFlat'
			}
	    });

	    // API, которое используется в качестве контроллера
        // для роутера подприложения FlatsApp
		var API = {
		    listFlats: function (criterion) {
			    require(['app/flats/list_controller'], function (ListController) {
					ListController.listFlats(criterion);
				});
			},
            showFlat: function(id) {
                require(['app/flats/show_controller'], function(ShowController) {
                    ShowController.showFlat(id);
                });
            },
            newFlat: function() {
                require(['app/flats/new_controller'], function(NewController) {
                    NewController.newFlat();
                });
            }
		};

	    // добавляем обработчики событий на главном приложении
	    // для того, чтобы иметь возможность вызвать нужный контроллер
        // простой командой
		FlatsManager.on('flats:list', function () {
		    FlatsManager.navigate('flats');
		    API.listFlats();
		});
	    FlatsManager.on('flat:show', function(id) {
	        FlatsManager.navigate('flats/' + id);
	        API.showFlat(id);
	    });
        FlatsManager.on('flat:new', function() {
            FlatsManager.navigate('flats/new');
            API.newFlat();
        });
        FlatsManager.addInitializer(function () {
		    new FlatsApp.Router({
				controller: API
			});
		});
	});

	return FlatsManager.FlatsApp;
});

// flats_app - это подприложение "квартиры" для управления квартирами 
// (отображение списка, одной квартиты и т.д.). Для приложения создается 
// своя отдельная система роутов или путей. Каждому роуту соответствует 
// свой контроллер, например listFlats, которому приложение flats_app 
// передает управление в соответствии с роутом. Подприложение запускается 
// по команде главного приложения, например 'flats:list'. По этой команде 
// подприложение осущесвтляет переход на новый роут, а с переходом и запускается
// контроллер.