define(['FlatsManager',
		'backbone.syphon'], 
function(ContactManager){
	ContactManager.module('ContactsApp.Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
		Views.Form = Marionette.ItemView.extend({
			template: '#form',
			events: {
				'click button.js-submit': 'submitClicked'
			},
			submitClicked: function(e){
				e.preventDefault();
				var data = Backbone.Syphon.serialize(this);
				this.trigger('form:submit', data);
			}
		});
	});
});