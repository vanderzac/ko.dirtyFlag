define(['knockout', './fn'], function(ko, fn) {
    
    function LazyDirtyFlag(object, dirtyChildren, dirtynessEmitter) {
        
        this._object = object;
        this._dirtyChildren = dirtyChildren;
        this._dirtynessEmitter = dirtynessEmitter;
        
        this.isDirty = ko.observable(false);
        this.dirtyChildrenSubscription = this._dirtyChildren.subscribe(this.onDirtyChildrenChangeCheckWake, this);
    }
    
    LazyDirtyFlag.prototype.dispose = fn.dispose;
    LazyDirtyFlag.prototype.onDirtyChildrenChangeCheckWake = fn.onDirtyChildrenChangeCheckWake;
    LazyDirtyFlag.prototype.wake = fn.wake;
    
    return LazyDirtyFlag;
});