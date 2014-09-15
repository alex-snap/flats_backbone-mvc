define(['tpl!common/modules/collection-paginator/collection-paginator.tpl.html'
],
function (PaginatorTpl) {

    // count - общее количество элементов
    // opts - опции, такие как текущая страница, диапазон отображаемых номеров страниц,
    // количество элементов на одной странице

    var paginator = {
        renderPaginator: function (p) {
            var pagination = {},
                pages = Math.ceil(p.count / p.opts.perPage),
                page = parseInt(p.opts.page);
            if (p.count > p.opts.perPage) {
                for (var i = parseInt(p.opts.range); i > 0; i--) {
                    if (page + i <= pages && pagination.end == undefined) {
                        pagination.end = page + i;
                    }
                    if (page - i > 0 && pagination.start == undefined) {
                        pagination.start = page - i;
                    }
                }
            }
            pagination.start = pagination.start == undefined ? page : pagination.start;
            pagination.end = pagination.end == undefined ? page : pagination.end;
            pagination.first = 1;
            pagination.last = pages;
            pagination.page = page;
            page - 1 > 0 ? pagination.prev = true : pagination.prev = false;
            pagination.end ? pagination.next = true : pagination.next = false;
            pagination.show = p.opts.perPage < p.count ? true : false;
            return {
                pagination: function () {
                    return PaginatorTpl(pagination);
                }
            }
        }
    };

    return paginator;
});