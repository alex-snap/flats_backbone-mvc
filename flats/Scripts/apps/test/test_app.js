define(['FlatsManager'],
function(FlatsManager){
    FlatsManager.module('TestApp', function (TestApp, FlatsManager, Backbone, Marionette, $, _) {
        TestApp.startWithParent = false;

        TestApp.onStart = function() {
            console.log('TestApp: was started');
        }

        TestApp.onStop = function() {
            console.log('TestApp: was stopped');
        }

        TestApp.Router = Marionette.AppRouter.extend({
	        appRoutes: {
			    'test': 'runTest'
			}
        });

		var API = {
		    runTest: function () {
		        require(['app/test/one_controller'], function (TestController) {
		            FlatsManager.startSubApp('TestApp');
					TestController.runTest();
				});
			}
		};

		FlatsManager.on('test:runtest', function () {
		    FlatsManager.navigate('test');
		    API.runTest();
		});

        FlatsManager.addInitializer(function () {
		    new TestApp.Router({
				controller: API
			});
        });

    });

	return FlatsManager.TestApp;
});