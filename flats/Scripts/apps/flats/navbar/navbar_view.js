define(['FlatsManager',
        'tpl!apps/flats/navbar/templates/flats-navbar.tpl.html'],
function(FlatsManager, FlatsNavbarTpl){
	FlatsManager.module('FlatsApp.Navbar.View', function(View, FlatsManager, Backbone, Marionette, $, _) {
	    View.Navbar = Marionette.ItemView.extend({
	        template: FlatsNavbarTpl
	    });
	});
	return FlatsManager.FlatsApp.Navbar.View;
});