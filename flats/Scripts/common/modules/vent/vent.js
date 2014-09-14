define(['marionette', 'backbone'],
function (Marionette, Backbone) {
    var test = new Backbone.Wreqr.EventAggregator();
    var test2 = new Backbone.Wreqr.Commands();
    var globalChannel = Backbone.Wreqr.radio.channel('global');
    var userChannel = Backbone.Wreqr.radio.channel('user');
});