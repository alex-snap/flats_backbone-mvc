define(['FlatsManager',
        'utils',
        'tpl!apps/flats/show/templates/flats-show-item.tpl.html'],
        //templates['apps/flats/show/show_flat']],
function(FlatsManager, Utils, FlatTpl){
	FlatsManager.module('FlatsApp.Show.View', function(View, FlatsManager, Backbone, Marionette, $, _) {
	    View.Flat = Marionette.ItemView.extend({
	        template: FlatTpl,
            ui: {
                map: '#js-flat-on-map'
            },
            afterRender: function() {
                require(['google-map'], function () {
                    var mapOptions = {
                        center: new google.maps.LatLng(44.5403, -78.5463),
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    var map = new google.maps.Map(this.ui.map, mapOptions);
                });
            }
	    });



	    //View.Layout = Marionette.LayoutView.extend({
		//    template: LayoutTpl,
		//	regions: {
		//		headerRegion    : '.fl-list__header',
		//		flatsRegion     : '.fl-list__items'
		//	}
		//});
		//View.Header = Marionette.ItemView.extend({
		//    template: HeaderTpl,
		//	triggers: {
		//		'click button.js-new': 'contact:new',
		//		'click button.js-delete-all': 'contacts:delete_all'
		//	},
		//	events: {
		//		'click button.js-filter': 'filterClicked'
		//	},
		//	ui: {
		//		criterion: 'input.js-filter-criterion'
		//	},
		//	filterClicked: function(){
		//		var criterion = $(this.ui.criterion).val();
		//		this.trigger('contacts:filter');
		//	},
		//	onSetFilterCriterion: function(criterion){
		//		$(this.ui.criterion).val(criterion);
		//	}
		//});
		//View.Flat = Marionette.ItemView.extend({
		//	template: ItemTpl,
		//	triggers: {
		//		'click td a.js-edit'	: 	'contact:edit',
		//		'click button.js-delete': 	'contact:delete'
		//	},
		//	events: {
		//		'click': 					'highlightName',
		//		'click td a.js-show': 		'showClicked'
		//	},
		//    // задаём метод render в ручную, 
        //    // чтобы добавить склонения слов в шаблон
		//	render: function () {
		//	    var modelData = this.model.attributes;
		//	    // склонения для количества комнат
        //        // и спальных мест
        //        var formattedWords = {
        //            rooms: Utils.formatWords(+modelData.rooms, ['комната', 'комнаты', 'комнат']),
        //            sleeper: Utils.formatWords(+modelData.sleeper, ['спальное место', 'спальных места', 'спальных мест'])
        //        }
		//	    this.$el.html(this.template({ flat: modelData, words: formattedWords }));
		//	},
		//	flash: function(cssClass){
		//		var $view = this.$el;
		//		$view.hide().toggleClass(cssClass).fadeIn(800, function(){
		//			setTimeout(function(){
		//				$view.toggleClass(cssClass);
		//			}, 500);
		//		});
		//	},
		//	highlightName: function(e){
		//		this.$el.toggleClass('warning');
		//	},
		//	showClicked: function(e){
		//		e.preventDefault();
		//		e.stopPropagation();
		//		this.trigger('contact:show', this.model);
		//	},
		//	editClicked: function(e){
		//		e.preventDefault();
		//		e.stopPropagation();
		//		this.trigger('contact:edit', this.model);
		//	},
		//	// переопределяем метод remove, который вызывается при удалении модели
		//	// для плавного скрытия элемента при  удалении
		//	remove: function(){
		//		this.$el.fadeOut(function(){
		//			$(this).remove();
		//		});
		//	}
		//});

		//var noFlatsView = Marionette.ItemView.extend({
		//	template: 	NoneTpl,
		//	className: 	'alert'
		//});

		//View.Flats = Marionette.CompositeView.extend({
		//	template: 	ListTpl,
		//	emptyView: 	noFlatsView,
		//	childView: 	View.Flat,
		//	childViewContainer: '.container',
		//	initialize: function(){
		//		this.listenTo(this.collection, 'reset', function(){
		//			this.appendHtml = function(collectionView, childView, index){
		//				collectionView.$el.append(childView.el);
		//			}
		//		});
		//	},
		//	onRenderCollection: function(){
		//		this.appendHtml = function(collectionView, childView, index){
		//			collectionView.$el.prepend(childView.el);
		//		}
		//	}
		//});
	});
	return FlatsManager.FlatsApp.Show.View;
});