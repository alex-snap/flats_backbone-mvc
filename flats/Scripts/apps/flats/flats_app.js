define(['FlatsManager',
        'backbone.queryparams'],
function(FlatsManager){
    FlatsManager.module('FlatsApp', function (FlatsApp, FlatsManager, Backbone, Marionette, $, _) {

        FlatsApp.startWithParent = false;

        FlatsApp.onStart = function() {
            console.log('FlatsApp: started');
        }

        FlatsApp.onStop = function() {
            console.log('FlatsApp: stopped');
        }

	    FlatsApp.Router = Marionette.AppRouter.extend({
	        appRoutes: {
			    'flats'         :   'listFlats',
                'flats/'        :   'listFlats',
                'flats/item/:id':   'showFlat',
                'flats/new'     :   'newFlat'
			}
	    });

        // описываем функцию, которая выполняет определённый метод
        // подприложения, одновременно останавливая другие подприложения
        // и запуская своё
	    function executeAction(action, args) {
	        FlatsManager.startSubApp('FlatsApp');
	        action(args);
	    }

	    // API, которое используется в качестве контроллера
        // для роутера подприложения FlatsApp
		var API = {
		    listFlats: function (params) {
		        require(['app/flats/list_controller'], function (ListController) {
		            executeAction(ListController.listFlats, params);
				});
			},
            showFlat: function(id) {
                require(['app/flats/show_controller'], function (ShowController) {
                    executeAction(ShowController.showFlat, id);
                });
            },
            newFlat: function() {
                require(['app/flats/new_controller'], function (NewController) {
                    executeAction(NewController.newFlat);
                });
            },
            navbarFlats: function() {
                require(['app/flats/navbar_controller'], function (NavbarController) {
                    executeAction(NavbarController.showNavbar);
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

        // в поприложении flats во всех его представлениях
        // должен быть общий navbar
        FlatsApp.addInitializer(function() {
            API.navbarFlats();
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