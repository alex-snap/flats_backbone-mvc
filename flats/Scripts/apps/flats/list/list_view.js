define(['FlatsManager',
        'utils',
        'tpl!apps/flats/list/templates/flats-list-layout.tpl.html',
        'tpl!apps/flats/list/templates/flats-list-header.tpl.html',
        'tpl!apps/flats/list/templates/flats-list.tpl.html',
        'tpl!apps/flats/list/templates/flats-list-item.tpl.html',
        'tpl!apps/flats/list/templates/flats-list-none.tpl.html',
        'backbone.syphon'],
function(FlatsManager, Utils, LayoutTpl, HeaderTpl, ListTpl, ItemTpl, NoneTpl){
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
			events: {
			    'click .js-flats-search': 'submitFilter',
			    'click .js-smart-filter': 'submitFilter',
                'change input'          : 'submitFilter'
			},
			ui: {
                smartFilterBtn: '.js-smart-filter',
			    searchString:   '.js-flats-search__criterion'
			},
			submitFilter: function () {
                var filter = Backbone.Syphon.serialize(this);
                this.trigger('flats:search', filter);
			}
            //searchClicked: function() {
            //    var query = $(this.ui.searchString).val();
            //    this.trigger('flats:search', query);
            //},
            //smartFilterClicked: function(e) {
            //    var $btn = $(e.target);
            //    if (!$btn.hasClass('active')) {
            //        $(this.ui.smartFilterBtn).removeClass('active');
            //        $btn.addClass('active');
            //    }
            //},
			//onSetFilterCriterion: function(criterion){
			//	$(this.ui.criterion).val(criterion);
			//}
		});

        // Flat
        // ---------------------
		View.Flat = Marionette.ItemView.extend({
			template: ItemTpl,
			triggers: {
				'click td a.js-edit'	: 	'flat:edit',
				'click button.js-delete': 	'flat:delete'
			},
		    // задаём метод render в ручную, 
            // чтобы добавить склонения слов в шаблон
			render: function () {
			    var modelData = this.model.attributes;
			    // склонения для количества комнат
                // и спальных мест
                var formattedWords = {
                    rooms: Utils.formatWords(+modelData.rooms, ['комната', 'комнаты', 'комнат']),
                    sleeper: Utils.formatWords(+modelData.sleeper, ['спальное место', 'спальных места', 'спальных мест'])
                }
			    this.$el.html(this.template({ flat: modelData, words: formattedWords }));
			},
			editClicked: function(e){
				e.preventDefault();
				e.stopPropagation();
				this.trigger('flat:edit', this.model);
			}
		});

        // No flats
        // ---------------------
		View.NoFlatsView = Marionette.ItemView.extend({
		    template:   NoneTpl,
            tag:        'div',
			className: 	'alert alert-warning'
		});

        // Flats
        // ---------------------
		View.Flats = Marionette.CompositeView.extend({
			template: 	ListTpl,
			emptyView: 	View.NoFlatsView,
			childView: 	View.Flat,
			childViewContainer: '.container',
			initialize: function(){
				this.listenTo(this.collection, 'reset', function(){
					this.appendHtml = function(collectionView, childView, index){
						collectionView.$el.append(childView.el);
					}
				});
			},
			onRenderCollection: function(){
				this.appendHtml = function(collectionView, childView, index){
					collectionView.$el.prepend(childView.el);
				}
			},
			onSearchFlats: function (query) {
                this.collection.fetch({ data: query });
            }
		});
    });

	return FlatsManager.FlatsApp.List.View;
});