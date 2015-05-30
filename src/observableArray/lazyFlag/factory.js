define(['knockout', './fn'], function(ko, fn) {

    function lazyDirtyFlagFactory(observableArray, dirtyChildren, dirtynessEmitter) {
        
        return {

            _dirtyChildren: dirtyChildren,
            _observableArray: observableArray,
            _dirtynessEmitter: dirtynessEmitter,
            
            isDirty: ko.observable(false),
            dirtyChildrenSubscription: undefined,
            observableArraySubscription: undefined,
            
            dispose: fn.dispose,
            initialize: fn.initialize,
            onDirtyChildrenChangeCheckWake: fn.onDirtyChildrenChangeCheckWake,
            onObservableArrayChangeCheckWake: fn.onObservableArrayChangeCheckWake,
            wake: fn.wake,
            afterWakeNotifyChanges: fn.afterWakeNotifyChanges
        };
    }
    
    return lazyDirtyFlagFactory;
});