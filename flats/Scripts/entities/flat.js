define(['FlatsManager',
		'config/localstorage',
        'backbone.paginator',
        'backbone.validation'],
function (FlatsManager) {
    FlatsManager.module('Entities', function (Entities, FlatsManager, Backbone, Marionette, $, _) {

        // сущность flat
        // ---------------
		Entities.Flat = Backbone.Model.extend({
			urlRoot: 'flats',
			defaults: {
				Address : '',
				Price   : '',
				Rooms   : '',
				Sleeper: '',
				Description: '',
                ImageLink: '/content/img/default.png'
			},
            validation: {
                Address: {
                    requried: true
                },
                Price: {
                    required: true,
                    pattern: 'number',
                    min: 1
                },
                Rooms: {
                    required: true,
                    pattern: 'number',
                    min: 1
                },
                Sleepers: {
                    pattern: 'number',
                    min: 0
                },
                Images: {
                    minlength: 1
                }
            }
            // встроенный метод валидации backbone
			//validate: function(attrs, options){
			//    var errors = {};
            //    if (!attrs.address) {
            //        errors.address = 'Адрес обязателен';
            //    }
			//	if (!_.isEmpty(errors)){
			//		return errors;
			//	}
			//}
		});

        // добавляем миксину для работы с localstorage браузера
		//Entities.configureStorage(Entities.Flat);

        // коллекция flats для управления сущностями flat,
        // используется backbone.paginator
        // ---------------
		Entities.PageableFlatsCollection = Backbone.PageableCollection.extend({
            url: 'flats',
            model: Entities.Flat,
            state: {
                pageSize: 2,
                // атрибут модели для сортировки
                // sortKey: 'updated',
                // 1 - сорировка в убывающем порядке,
                // -1 - в вощрастающем,
                // 0 - сортировки на клиенте не будет
                order: 0
            },
            queryParams: {
                totalPages: null,
                totalRecords: null,
                sortKey: 'sort',
                queryString: ''
            },
            parseState: function (resp, queryParams, state, options) {
                return { totalRecords: resp.total_count };
            },
            parseRecords: function (resp, options) {
                return resp.items;
            }
		});

        // коллекция flats для управления сущностями flat
        // ---------------
        Entities.FlatsCollection = Backbone.Collection.extend({
        	url: 'flats',
        	model: Entities.Flat,
        	comparator: 'address',
            parse: function(response) {
                return {
                    flats: response.flats,
                    pagination: {
                        length: response.count
                    }
                }
            }
        });

        // добавляем миксину для работы с localstorage браузера
		//Entities.configureStorage(Entities.FlatsCollection);

        // функция создает, сохраняет и возвращает хардкод моделей квартир
        // ---------------
		var initializeFlats = function () {
            // создаем коллекцию с квартирами
			var flats = new Entities.FlatsCollection([
				{ id: 1, address: 'Московская 23, 22', imgSrc: '/Content/img/temp/flat.jpg', price: '2300', rooms: '1', sleeper: '3', description: 'Отличная квартира, в центре города. Все удобства, охраняемая стоянка в 5 минутах от дома.' },
                { id: 2, address: 'Товарищеская 30, 524', imgSrc: '/Content/img/temp/flat.jpg', price: '2400', rooms: '2', sleeper: '4', description: 'Неподалеку от квартиры находится замечательный аквапарк, можно дойти пешком. Станция метро в шаговой доступности.' },
                { id: 3, address: 'ул. Хади Такташ 89, 65', imgSrc: '/Content/img/temp/flat.jpg', price: '2350', rooms: '5', sleeper: '5', description: 'Большой пятикомнатный вдухэтажный пентхаус с выходом на крышу.' },
                { id: 4, address: 'ул. Ялчегола 13, 73', imgSrc: '/Content/img/temp/flat.jpg', price: '2200', rooms: '4', sleeper: '2' },
                { id: 5, address: 'Строителей 11, 22', imgSrc: '/Content/img/temp/flat.jpg', price: '2370', rooms: '3', sleeper: '1' }
			]);
		    // сохраняем квартиры, добавленные в коллекцию
		    // благодаря миксине configureStorage элементы сохраняются
            // в localstorage браузера
			flats.forEach(function(flat){
				flat.save();
			});

            // возвращаем модели коллекции
			return flats.models;
		};

        // API для работы с данными сущности "квартира"
        // ---------------
		var API = {
            // получить все квартиры с сервера
		    getFlatEntities: function (params) {
                // создаем коллекцию для синхронизации данных
				var flats = new Entities.FlatsCollection(params);
				var defer = $.Deferred();
				// fetch  - получает набор моделей с сервера
				// (в данном случае из local storage) и 
				// применяет его для данной коллекции (set), т.е.
				// обновляет коллекцию переданным списком моделей.
				// Так же мб переданы колбеки success и error.
				// Если передать параметр {reset: true}, то будет
				// вызван метод reset, который обновит массив данных целиком
				// а предыдущая коллекция будет доступна как options.previousModels.
				// Может быть передан атрибут {remove: false}, благодаря которому
				// старые записи, которых нет в новом наборе моделей
				// не будут удалены.
				// В метод fetch можно напрямую передать опции jQuery.ajax,
		        // например doc.fetch({data: {page: 3}}).

				flats.fetch({
					success: function(data){
						// deferred.resolve() вызывает обработчики успешного завершения
						// и переводит состояние объекта в "выполнено".
						// Повторный вызов resolve не приводит к изменению состояния
						// или повторному вызову обработчиков.
						// deferred.resolve(args) вызывает обработчики doneCallbacks с
						// параметрами args.
						// deferred.done(doneCallbacks) добавляет обработчик, который
						// будет вызван, когда объект перейдёт в состояние выполнено
						defer.resolve(data);
					},
                    error: function() {
                        defer.reject();
                    },
                    data: params
		        });

				// deferrer.promise() создаёт проекцию объекта - 
				// это своеобразная копия объекта, у которой есть
				// методы добавления обработчиков и проверки состояния.
				// Т.е. мы получаем deferred объект с той же очередью
				// обработчиков, что и оригинал. Это позволяет 
				// добавлять в него обработчики, просматривать состояние
				// но не даёт возможности изменить состояние объекта.
				// Таким образом мы даём возможность внешнему коду
				// добавлять обработчики в очередь, но при этом
				// защищаемся от несанкционированного вызова методов
				// изменения состояния оригинального объекта
				var promise = defer.promise();
				//$.when(promise).done(function(data){
				//	// если данных нет, то вставим фейковые,
				//	// что возвращает метод initializeFlats()
				//	if (data.length === 0){
				//		var models = initializeFlats();
				//		flats.reset(models);
				//	}
				//});
				return promise;
			},

            // получить квартиру с заданным id
		    getFlatEntity: function (flatId) {
                // создаем модель с указанным id для синхронизации её с сервером
				var flat = new Entities.Flat({id: flatId});
				var defer = $.Deferred();
				// при помощи таймера имитируем задержку загрузки с сервера
				setTimeout(function () {
                    // fetch для модели обновляет состояние модели данными с сервера
					flat.fetch({
						success: function(data){
							defer.resolve(data);
						},
						error: function(data){
							defer.resolve(undefined);
						}
					});
				}, 2000);
		        return defer.promise();
		    },

            // получить квартиры с сервера с возможностью пагинации
            getPageableFlatEntities: function() {
                var pageableFlats = new Entities.PageableFlatsCollection();
                var defer = $.Deferred();
                pageableFlats.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                $.when(promise).done(function (data) {
                    if (data.length === 0) {
                        var models = initializeFlats();
                        pageableFlats.reset(models);
                    }
                });
                return promise;
            }
		};

        // обрабатываем запросы приложения FlatsManager
        // ---------------
        FlatsManager.reqres.setHandlers({
            'flat:entities': function(params) {
                return API.getFlatEntities(params);
            },
            'flat:entity': function(id) {
                return API.getFlatEntity(id);
            },
            'flat:entity:new': function() {
                return new Entities.Flat();
            },
            'pageable:flat:entities': function() {
                return API.getPageableFlatEntities();
            }
        });
    });
	return;
});