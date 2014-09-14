define(['marionette',
        'tpl!common/modules/collection-paginator/collection-paginator.tpl.html'
        //templates['module/paginator']
],
function (Marionette, PaginatorTpl) {

    var paginator = {};

    paginator.Model = Backbone.Model.extend({
        defaults: {
            prev: false,
            next: false,
            start: 1,
            end: undefined,
            showPages: 5,

            pages: null,
            active: 1
        }
    });

    paginator.View = Marionette.ItemView.extend({
        template: PaginatorTpl,
        events: {
            'click a': 'changePage'
        },
        changePage: function (newPage) {
            var newModel = {};
            if (this.model.pages > this.model.showPages) {
                var range = floor(this.model.pages > this.model.showPages);
                for (var i = range; i > 0; i--) {
                    if (newPage + i <= this.model.pages) {
                        newModel.end = newPage + i;
                    }
                    if (range - i >= 0) {
                        newModel.start = newPage - i;
                    }
                }
            }
            --newPage > 0 ? newModel.prev = true : newModel.prev = false;
            ++newPage < this.model.end ? newModel.next = true : newModel.next = false;
            newModel.active = newPage;
            this.model.set(newModel);
            this.trigger('page:changed', newPage);
        },
        onRender: function () {
            debugger;
            this.changePage(this.model.get('curPage'));
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        }
    });

    function init(opts) {
        var paginatorModel = new paginator.Model(opts);
        var paginatorView = new paginator.View({
            model: paginatorModel
        });
        return paginatorView;

    }

    return {
        init: init
    };
});