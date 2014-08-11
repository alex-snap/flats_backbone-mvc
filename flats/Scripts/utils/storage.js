define(function () {

    /* type = local or session */
    var storage = function (type, name) {

        var scope = {};

        if (type === 'local' && isLocalStorage()) {
            scope.storage = localStorage;
        } else if (type === 'session' && isSessionStorage()) {
            scope.storage = sessionStorage;
        } else {
            throw new Error('Type of storage is not defined or supported!');
        }

        scope.name = name;

        this.set = function (key, value) {
            try {
                scope.storage.setItem(scope.name + '-' + key, JSON.stringify(value));
            } catch (e) {
                throw new Error('Something is wrong!');
            }
        };

        this.get = function (key) {
            return JSON.parse(scope.storage.getItem(scope.name + '-' + key));
        };

        this.remove = function (key) {
            scope.storage.removeItem(scope.name + '-' + key);
        };

        this.clear = function () {
            scope.storage.clear();
        };

        function isLocalStorage() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }

        function isSessionStorage() {
            try {
                return 'sessionStorage' in window && window['sessionStorage'] !== null;
            } catch (e) {
                return false;
            }
        }

        return {
            set: this.set,
            get: this.get,
            remove: this.remove,
            clear: this.clear,
            length: scope.storage.length
        };
    };

    return storage;
});