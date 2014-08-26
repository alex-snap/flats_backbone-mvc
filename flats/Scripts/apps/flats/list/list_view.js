define(['FlatsManager',
        'utils',
        templates['apps/flats/list/list_layout'],
        templates['apps/flats/list/list_header'],
        templates['apps/flats/list/list'],
        templates['apps/flats/list/list_item'],
        templates['apps/flats/list/list_none']],
function(FlatsManager, Utils, LayoutTpl, HeaderTpl, ListTpl, ItemTpl, NoneTpl){
	FlatsManager.module('FlatsApp.List.View', function(View, FlatsManager, Backbone, Marionette, $, _){
		View.Layout = Marionette.LayoutView.extend({
		    template: LayoutTpl,
			regions: {
				headerRegion    : '.fl-list__header',
				flatsRegion     : '.fl-list__items'
			}
		});
		View.Header = Marionette.ItemView.extend({
		    template: HeaderTpl,
			triggers: {
				'click button.js-new': 'contact:new',
				'click button.js-delete-all': 'contacts:delete_all'
			},
			events: {
				'click button.js-filter': 'filterClicked'
			},
			ui: {
				criterion: 'input.js-filter-criterion'
			},
			filterClicked: function(){
				var criterion = $(this.ui.criterion).val();
				this.trigger('contacts:filter');
			},
			onSetFilterCriterion: function(criterion){
				$(this.ui.criterion).val(criterion);
			}
		});
		View.Flat = Marionette.ItemView.extend({
			template: ItemTpl,
			triggers: {
				'click td a.js-edit'	: 	'contact:edit',
				'click button.js-delete': 	'contact:delete'
			},
			events: {
				'click': 					'highlightName',
				'click td a.js-show': 		'showClicked'
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
			flash: function(cssClass){
				var $view = this.$el;
				$view.hide().toggleClass(cssClass).fadeIn(800, function(){
					setTimeout(function(){
						$view.toggleClass(cssClass);
					}, 500);
				});
			},
			highlightName: function(e){
				this.$el.toggleClass('warning');
			},
			showClicked: function(e){
				e.preventDefault();
				e.stopPropagation();
				this.trigger('contact:show', this.model);
			},
			editClicked: function(e){
				e.preventDefault();
				e.stopPropagation();
				this.trigger('contact:edit', this.model);
			},
			// переопределяем метод remove, который вызывается при удалении модели
			// для плавного скрытия элемента при  удалении
			remove: function(){
				this.$el.fadeOut(function(){
					$(this).remove();
				});
			}
		});

		var noFlatsView = Marionette.ItemView.extend({
			template: 	NoneTpl,
			className: 	'alert'
		});

		View.Flats = Marionette.CompositeView.extend({
			template: 	ListTpl,
			emptyView: 	noFlatsView,
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
			}
		});
	});
	return FlatsManager.FlatsApp.List.View;
});