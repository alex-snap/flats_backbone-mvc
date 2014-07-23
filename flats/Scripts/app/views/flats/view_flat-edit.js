var App = App || {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {}
};

App.Views.FlatEdit = Backbone.View.extend({
    el: '.flat-list',
    render: function (options) {
        var _this = this;
        if (options.id) {
            var flat = new App.Models.Flat({ id: options.id });
            flat.fetch({
                success: function (flat) {
                    var template = _.template($('#tmp_flat__edit').html(), { flat: flat });
                    _this.$el.html(template);
                }
            });
        } else {
            var template = _.template($('#tmp_flat__edit').html(), { flat: null });
            this.$el.html(template);
        }
    },
    validate: function (data) {

    },
    events: {
        'submit .flat__edit-form': 'saveFlat'
    },
    saveFlat: function (ev) {
        var flatDetails = $(ev.currentTarget).serializeObject();
        var flat = new App.Models.Flat();
        flat.save(flatDetails, {
            success: function (flat) {
                alert('Flat Saved');
                console.log(flat);
                App.Routers.router.navigate('', { trigger: true });
            },
            error: function (res) {
                App.Routers.router.navigate('', { trigger: true });
            }
        });
        console.log(flatDetails);
        return false;
    }
});