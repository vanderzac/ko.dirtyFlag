define(['knockout', './fn'], function(ko, fn) {

    function AlertDirtyFlag(observable, initialValue, currentValue, dirtynessEmitter) {
    
        this._observable = observable;
        
        this.lastCleanState = ko.observable(this.getHashedValue(initialValue));
        this.isForcedDirty = ko.observable(false);
        this.emitters = ko.observableArray([dirtynessEmitter]);
        this.currentState = ko.pureComputed(this.computeCurrentState, this);
        this.isDirty = ko.pureComputed(this.computeIsDirty, this);
        this.matchesCleanState = ko.pureComputed(this.computeMatchesCleanState, this);
    }

    // Make sure you can clean-up
    AlertDirtyFlag.prototype.disposables = [];
    AlertDirtyFlag.prototype.dispose = fn.dispose;
    AlertDirtyFlag.prototype.disposeOne = fn.disposeOne;
    
    AlertDirtyFlag.prototype.getHashedValue = fn.getHashedValue;
    AlertDirtyFlag.prototype.hashFunction = ko.toJSON;
    AlertDirtyFlag.prototype.computeCurrentState = fn.computeCurrentState;
    AlertDirtyFlag.prototype.computeIsDirty = fn.computeIsDirty;
    AlertDirtyFlag.prototype.computeMatchesCleanState = fn.computeMatchesCleanState;
    AlertDirtyFlag.prototype.hashIsDefault = fn.hashIsDefault;
    AlertDirtyFlag.prototype.hashesMatch = fn.hashesMatch;
    AlertDirtyFlag.prototype.initialize = fn.afterInitialize;
    AlertDirtyFlag.prototype.onEmittersChange = fn.onEmittersChange;
    AlertDirtyFlag.prototype.onIsDirtyChange = fn.onIsDirtyChange;
    AlertDirtyFlag.prototype.addToEmitter = fn.addToEmitter;
    AlertDirtyFlag.prototype.removeFromEmitter = fn.removeFromEmitter;
    AlertDirtyFlag.prototype.registerEmitter = fn.registerEmitter;
    AlertDirtyFlag.prototype.reset = fn.reset;
    
    return AlertDirtyFlag;
});