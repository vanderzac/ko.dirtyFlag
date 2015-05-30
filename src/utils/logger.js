define([], function() {

    return {

        _observable: 0,
        _observableArray: 0,
        _object: 0,

        log: function () {
            console.log(this);
        },
        
        isObservable: function () {
            this._observable++;
        },
        
        isObservableArray: function () {
            this._observableArray++;
        },
        
        isObject: function () {
            this._object++;
        },
        
        reset: function (options) {
            this._observable = 0;
            this._observableArray = 0;
            this._object = 0;
        }
    };

});