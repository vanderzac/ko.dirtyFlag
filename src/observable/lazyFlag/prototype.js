define(['knockout', './fn'], function(ko, fn) {
    
    function LazyDirtyFlag(observable, dirtynessEmitter) {
        
        this._observable = observable;
        this._dirtynessEmitter = dirtynessEmitter;
        
        this.initialValue = observable();
        this.isDirty = ko.pureComputed(function() { return this._observable() === this.initialValue; }, this);
        this.isDirty = ko.observable(false);
        this.observableSubscription = observable.subscribe(this.onObservableChangeCheckWake, this);
    }
    
    LazyDirtyFlag.prototype.dispose = fn.dispose;
    LazyDirtyFlag.prototype.onObservableChangeCheckWake = fn.onObservableChangeCheckWake;
    LazyDirtyFlag.prototype.wake = fn.wake;
    
    return LazyDirtyFlag;
});

/* Used to test benchmarks for minimum footprint with logic
define(['knockout', './fn'], function(ko, fn) {
    
    function LazyDirtyFlag(observable, dirtynessEmitter) {
        
        this._observable = observable;   
        this.initialValue = observable();
        this.isDirty = ko.pureComputed(function() { return this._observable() !== this.initialValue; }, this);
    }
    
    return LazyDirtyFlag;
});
*/