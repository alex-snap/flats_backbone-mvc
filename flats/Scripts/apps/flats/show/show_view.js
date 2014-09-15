define(['FlatsManager',
        'utils',
        'tpl!apps/flats/show/templates/flats-show-item.tpl.html'],
function(FlatsManager, Utils, FlatTpl){
	FlatsManager.module('FlatsApp.Show.View', function(View, FlatsManager, Backbone, Marionette, $, _) {
	    View.Flat = Marionette.ItemView.extend({
	        template: FlatTpl,
            ui: {
                map: '#js-flat-on-map'
            }
	    });

	});
	return FlatsManager.FlatsApp.Show.View;
});