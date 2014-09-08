define(['FlatsManager',
		'app/flats/navbar_view'], 
function (FlatsManager, View) {
	FlatsManager.module('FlatsApp.Navbar', function(Navbar, FlatsManager, Backbone, Marionette, $, _){
		Navbar.Controller = {
		    showNavbar: function () {
		        console.log('FlatsApp:NavbarController: method showNavbar');
		        var navbarView = new View.Navbar();
		        FlatsManager.headerRegion.show(navbarView);
			}
		}
	});

	return FlatsManager.FlatsApp.Navbar.Controller;
});