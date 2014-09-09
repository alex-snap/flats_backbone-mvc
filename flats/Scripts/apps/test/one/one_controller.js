define(['FlatsManager'],
function(FlatsManager){
    FlatsManager.module('TestApp.One', function (One, FlatsManager, Backbone, Marionette, $, _) {
        One.Controller = {
            runTest: function() {
                console.log('TestApp:OneController: method runTest');
                FlatsManager.mainRegion.empty();
            }
        }
    });

	return FlatsManager.TestApp.One.Controller;
});