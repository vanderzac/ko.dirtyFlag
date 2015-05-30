define(['knockout', './fn'], function(ko, fn) {
    
    function alertDirtyFlagFactory (object, dirtyChildren, dirtynessEmitter) {

        return {

            _object: object,
            _dirtyChildren: dirtyChildren,
            _dirtynessEmitter: dirtynessEmitter,

            // Make sure you can clean-up
            disposables: [],
            dispose: fn.dispose,
            disposeOne: fn.disposeOne,

            // Observables
            isForcedDirty: ko.observable(false),

            // Observable Array
            emitters: ko.observableArray([dirtynessEmitter]),

            // Computeds within a factory method cannot be instantiated inline
            // because the computed function requires the object to proxy be provided at the time of declaration

            isDirty: undefined, //this.isDirty = ko.pureComputed(this.computeIsDirty, this),
            anyDirtyChildren: undefined, //this.anyDirtyChildren = ko.pureComputed(this.computeAnyDirtyChildren, this),

            computeIsDirty: fn.computeIsDirty,
            computeAnyDirtyChildren: fn.computeAnyDirtyChildren,

            // Functions
            forceDirty: fn.forceDirty, 
            initialize: fn.initialize, 
            afterInitialize: fn.afterInitialize,
            onIsDirtyChange: fn.onIsDirtyChange, 
            onEmittersChange: fn.onEmittersChange, 
            addToEmitter: fn.addToEmitterr, 
            removeFromEmitter: fn.removeFromEmitter,
            registerEmitterForChild: fn.registerEmitterForChild, 
            registerEmitter: fn.registerEmitter, 
            reset: fn.reset, 
            resetChild: fn.resetChild
        };
    }

    return alertDirtyFlagFactory;
});