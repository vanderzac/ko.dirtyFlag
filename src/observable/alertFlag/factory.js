define(['knockout', './fn'], function(ko, fn) {
    
    function alertDirtyFlagFactory (observable, initialValue, currentValue, dirtynessEmitter) {

        return {
            
            _initialValue: initialValue,
            _observable: observable,
            
            // Make sure you can clean-up
            disposables: [],
            dispose: fn.dispose,
            disposeOne: fn.disposeOne,

            // Observables
            lastCleanState: undefined, //ko.observable(this.getHashedValue(initialValue)),
            isForcedDirty: ko.observable(false),

            // Observable Arrays
            emitters: ko.observableArray([dirtynessEmitter]),

            
            // Computeds within a factory method cannot be instantiated inline
            // because the computed function requires the object to proxy be provided at the time of declaration
            
            currentState: undefined, //ko.pureComputed(this.computeCurrentState, this);
            isDirty: undefined, //ko.pureComputed(this.computeIsDirty, this);
            matchesCleanState: undefined, //ko.pureComputed(this.computeMatchesCleanState, this);

            
            // Functions
            initialize: fn.initialize,
            afterInitialize: fn.afterInitialize,
            forceDirty: fn.forceDirty,
            hashesMatch: fn.hashesMatch,
            getHashedValue: fn.getHashedValue,
            hashFunction: ko.toJSON,
            onEmittersChange: fn.onEmittersChange,
            onIsDirtyChange: fn.onIsDirtyChange,
            addToEmitter: fn.addToEmitter,
            removeFromEmitter: fn.removeFromEmitter,
            registerEmitter: fn.registerEmitter,
            reset: fn.reset,
            computeCurrentState: fn.computeCurrentState,
            computeIsDirty: fn.computeIsDirty,
            computeMatchesCleanState: fn.computeMatchesCleanState
        };
    }
    
    return alertDirtyFlagFactory;
});