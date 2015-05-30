define(['knockout', './fn'], function(ko, fn) {
    
    function lazyDirtyFlagFactory(observable, dirtynessEmitter) {
        
        return {
            _observable: observable,
            _dirtynessEmitter: dirtynessEmitter,

            initialValue: observable(),
            isDirty: ko.observable(false),

            observableSubscription: undefined,
            
            dispose: fn.dispose,
            initialize: fn.initialize,
            onObservableChangeCheckWake: fn.onObservableChangeCheckWake,
            wake: fn.wake
        };
    }

    return lazyDirtyFlagFactory;
});