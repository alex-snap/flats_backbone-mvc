define(['FlatsManager',
        'utils',
        'tpl!apps/flats/list/templates/flats-list-layout.tpl.html',
        'tpl!apps/flats/list/templates/flats-list-header.tpl.html',
        'tpl!apps/flats/list/templates/flats-list.tpl.html',
        'tpl!apps/flats/list/templates/flats-list-item.tpl.html',
        'tpl!apps/flats/list/templates/flats-list-none.tpl.html',
        'module/paginator',
        'backbone.syphon'],
function(FlatsManager, Utils, LayoutTpl, HeaderTpl, ListTpl, ItemTpl, NoneTpl, paginator){
    FlatsManager.module('FlatsApp.List.View', function (View, FlatsManager, Backbone, Marionette, $, _) {

        // Layout
        // ---------------------
		View.Layout = Marionette.LayoutView.extend({
		    template: LayoutTpl,
			regions: {
				headerRegion    : '.fl-list__header',
				flatsRegion     : '.fl-list__items',
                footerRegion    : '.fl-list__footer'
			}
		});

        // Header
        // ---------------------
        View.Header = Marionette.ItemView.extend({
            template: HeaderTpl,
            prop: {
                pressTimer: null
            },
			events: {
			    'change input[type="radio"]'    : 'submitFilter',
                'paste input'                   : 'submitFilter',
                'submit form'                   : 'submitFilter',
                'keyup input'                   : 'keyPressed'
			},
			ui: {
                smartFilterBtn: '.js-smart-filter',
			    searchString:   '.js-flats-search__criterion'
			},
			submitFilter: function (e) {
			    e.preventDefault();
                var filter = Backbone.Syphon.serialize(this);
                this.trigger('flats:search', filter);
			},
			keyPressed: function (e) {
			    var _this = this;
                if (this.prop.pressTimer != null) {
                    clearTimeout(this.prop.pressTimer);
                    this.prop.pressTimer = null;
                } 
                this.prop.pressTimer = setTimeout(function () {
                    _this.submitFilter(e);
                }, 400);
            }
		});

        // Flat
        // ---------------------
		View.Flat = Marionette.ItemView.extend({
			template: ItemTpl,
		    // задаём метод render в ручную, 
            // чтобы добавить склонения слов в шаблон
			render: function () {
			    var modelData = this.model.attributes,
			        formattedWords = {
			            rooms   :   Utils.formatWords(+modelData.Rooms, ['комната', 'комнаты', 'комнат']),
			            sleeper :   Utils.formatWords(+modelData.Sleeper, ['спальное место', 'спальных места', 'спальных мест'])
			        };
                if (modelData.ImageLink == null) {
                    modelData.ImageLink = this.model.defaults.ImageLink;
                }
			    this.$el.html(this.template({ flat: modelData, words: formattedWords }));
			}
		});

        // No flats
        // ---------------------
		View.NoFlatsView = Marionette.ItemView.extend({
		    template:   NoneTpl,
            tag:        'div',
			className: 	'container'
		});

        // Flats
        // ---------------------
		View.Flats = Marionette.CompositeView.extend({
		    template: ListTpl,
            events: {
                'click .pagination a': 'changePage'
            },
            changePage: function (e) {
                this.trigger('page:change', $(e.currentTarget).data('page'));
            },
			emptyView: 	View.NoFlatsView,
			childView: 	View.Flat,
			childViewContainer: '.js-flats-wrap',
			initialize: function(){
				this.listenTo(this.collection, 'reset', function(){
					this.appendHtml = function(collectionView, childView, index){
						collectionView.$el.append(childView.el);
					}
				});
			},
			onRenderCollection: function() {
		        this.appendHtml = function(collectionView, childView, index) {
		            collectionView.$el.prepend(childView.el);
		        }
			},
			templateHelpers: function () {
			    return paginator.renderPaginator(this.options.pagination);
			}
		});
	});
	return FlatsManager.FlatsApp.List.View;
});