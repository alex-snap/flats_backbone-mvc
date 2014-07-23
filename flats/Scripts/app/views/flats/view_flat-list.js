var App = App || {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {}
};

App.Views.FlatList = Backbone.View.extend({
    el: '.flat-list',
    render: function () {
        var _this = this;
        var flats = new App.Collections.Flats();
        flats.fetch({
            success: function (flatlist) {
                var template = _.template($('#tpl_flat-list').html(), {
                    flats: flatlist
                });
                _this.$el.html(template);
            }
        });
    },
    events: {
        'submit .flat__edit-form': 'saveFlat'
    },
    saveFlat: function (ev) {
        var flatDetail = JSON.stringify($(ev.currentTarget).serializeObject());
        console.log(flatDetail);
        return false;
    }
});