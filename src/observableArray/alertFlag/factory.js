define(['knockout', './fn'], function(ko, fn) {
    
    function alertDirtyFlagFactory (observableArray, dirtyChildren, dirtynessEmitter) {
        
        return {
            
            _observableArray: observableArray,
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
            addedPrimitives: ko.observableArray([]),
            addedNonPrimitives: ko.observableArray([]),
            deletedPrimitives: ko.observableArray([]),
            deletedNonPrimitives: ko.observableArray([]),
            
            // Computeds within a factory method cannot be instantiated inline
            // because the computed function requires the object to proxy be provided at the time of declaration
            
            isDirty: undefined, //ko.pureComputed(this.computeIsDirty, this),
            anyDirtyChildren: undefined, //ko.pureComputed(this.computeAnyDirtyChildren, this),
            matchesCleanState: undefined, //ko.pureComputed(this.computeMatchesCleanState, this),
            
            computeIsDirty: fn.computeIsDirty,
            computeAnyDirtyChildren: fn.computeAnyDirtyChildren,
            computeMatchesCleanState: fn.computeMatchesCleanState,
            
            onObservableArrayChange: fn.onObservableArrayChange,
            onEmittersChange: fn.onEmittersChange,
            onIsDirtyChange: fn.onIsDirtyChange,
            
            initialize: fn.initialize,
            afterInitialize: fn.afterInitialize,
            forceDirty: fn.forceDirty,
            
            reset: fn.reset,
            resetChild: fn.resetChild,
            
            hashFunction: ko.toJSON,
            hashesMatch: fn.hashesMatch,
            getHashedValue: fn.getHashedValue,
            
            addToEmitter: fn.addToEmitter,
            removeFromEmitter: fn.removeFromEmitter,
            registerEmitterForChild: fn.registerEmitterForChild,
            registerEmitter: fn.registerEmitter
        };
    }
    
    return alertDirtyFlagFactory;
});