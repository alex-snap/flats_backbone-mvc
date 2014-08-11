define(['jquery',
        'backbone',
        templatesPath['flat-list.tpl']],
function ($, Backbone, flatList_tpl) {

    var FlatListView = Backbone.View.extend({
        el: '.flat-list',
        render: function() {
            console.log('flat view list is render');
            var _this = this;
            //var flats = new App.Collections.Flats();
            //flats.fetch({
            //    success: function(flatlist) {
            //        var template = _.template(flatList_tpl, {
            //            flats: flatlist
            //        });
            //        _this.$el.html(template);
            //    }
            //});
        },
        events: {
            'submit .flat__edit-form': 'saveFlat'
        },
        saveFlat: function(ev) {
            var flatDetail = JSON.stringify($(ev.currentTarget).serializeObject());
            console.log(flatDetail);
            return false;
        }
    });

    return new FlatListView();

});