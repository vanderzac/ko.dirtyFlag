define(['knockout', './fn'], function(ko, fn) {
    
    function LazyDirtyFlag(observableArray, dirtyChildren, dirtynessEmitter) {
        
        this._observableArray = observableArray;
        this._dirtyChildren = dirtyChildren;
        this._dirtynessEmitter = dirtynessEmitter;
        
        this.isDirty = ko.observable(false);
        this.dirtyChildrenSubscription = dirtyChildren.subscribe(this.onDirtyChildrenChangeCheckWake, this);
        this.observableArraySubscription = observableArray.subscribe(this.onObservableArrayChangeCheckWake, this, 'arrayChange');
    }

    LazyDirtyFlag.prototype.onDirtyChildrenChangeCheckWake = fn.onDirtyChildrenChangeCheckWake;
    LazyDirtyFlag.prototype.onObservableArrayChangeCheckWake = fn.onObservableArrayChangeCheckWake;
    LazyDirtyFlag.prototype.wake = fn.wake;
    LazyDirtyFlag.prototype.dispose = fn.dispose;
    LazyDirtyFlag.prototype.afterWakeNotifyChanges = fn.afterWakeNotifyChanges;

    return LazyDirtyFlag;
});