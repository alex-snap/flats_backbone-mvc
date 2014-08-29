define(['marionette',
        templates['module/paginator']
],
function (Marionette, PaginatorTpl) {

    var paginator = Marionette.ItemView.extend({
        template: PaginatorTpl,
        events: {
            'click .js-next': 'nextPage',
            'click .js-prev': 'prevPage'
        },
        nextPage: function() {
            this.collection.getNextPage();
        },
        prevPage: function() {
            this.collection.getPreviousPage();
        }
    });

    return paginator;
});