define(['knockout', './fn'], function(ko, fn) {
    
    function lazyDirtyFlagFactory(object, dirtyChildren, dirtynessEmitter) {
        
        return {
            _object: object,
            _dirtyChildren: dirtyChildren,
            _dirtynessEmitter: dirtynessEmitter,

            isDirty: ko.observable(false),
            dirtyChildrenSubscription: undefined, //this.dirtyChildrenSubscription = this._dirtyChildren.subscribe(this.onDirtyChildrenChangeCheckWake, this);
            
            dipose: fn.dispose,
            initialize: fn.initialize
        };
    }

    return lazyDirtyFlagFactory;
});