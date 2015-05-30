define(['knockout', './fn'], function(ko, fn) {

    function AlertDirtyFlag(observableArray, dirtyChildren, dirtynessEmitter) {

        this._observableArray = observableArray;
        this._dirtyChildren = dirtyChildren;
        this._dirtynessEmitter = dirtynessEmitter;

        // Observables
        this.isForcedDirty = ko.observable(false);

        // Observable Array
        this.containers = ko.observableArray([dirtynessEmitter]);
        this.addedPrimitives = ko.observableArray([]);
        this.addedNonPrimitives = ko.observableArray([]);
        this.deletedPrimitives = ko.observableArray([]);
        this.deletedNonPrimitives = ko.observableArray([]);

        // Computeds
        this.isDirty = ko.pureComputed(this.computeIsDirty, this);
        this.anyDirtyChildren = ko.pureComputed(this.computeAnyDirtyChildren, this);
        this.matchesCleanState = ko.pureComputed(this.computeMatchesCleanState, this);

        // Make sure you can clean-up
        this.disposables = [
            this._observableArray.subscribe(this.onObservableArrayChange, this, 'arrayChange'),
            this.containers.subscribe(this.onEmittersChange, this),
            this.isDirty.subscribe(this.onIsDirtyChange, this)
        ];
    }

    // Make sure you can clean-up
    AlertDirtyFlag.prototype.dispose = fn.dispose;
    AlertDirtyFlag.prototype.disposeOne = fn.disposeOne;

    AlertDirtyFlag.prototype.computeIsDirty = fn.computeIsDirty;
    AlertDirtyFlag.prototype.computeAnyDirtyChildren = fn.computeAnyDirtyChildren;
    AlertDirtyFlag.prototype.computeMatchesCleanState = fn.computeMatchesCleanState;

    AlertDirtyFlag.prototype.onObservableArrayChange = fn.onObservableArrayChange;
    AlertDirtyFlag.prototype.onEmittersChange = fn.onEmittersChange;
    AlertDirtyFlag.prototype.onIsDirtyChange = fn.onIsDirtyChange;

    AlertDirtyFlag.prototype.initialize = fn.afterInitialize;
    AlertDirtyFlag.prototype.forceDirty = fn.forceDirty;

    AlertDirtyFlag.prototype.reset = fn.reset;
    AlertDirtyFlag.prototype.resetChild = fn.resetChild;

    AlertDirtyFlag.prototype.hashFunction = ko.toJSON;
    AlertDirtyFlag.prototype.hashesMatch = fn.hashesMatch;
    AlertDirtyFlag.prototype.getHashedValue = fn.getHashedValue;

    AlertDirtyFlag.prototype.addToEmitter = fn.addToEmitter;
    AlertDirtyFlag.prototype.removeFromEmitter = fn.removeFromEmitter;
    AlertDirtyFlag.prototype.registerEmitterForChild = fn.registerEmitterForChild;
    AlertDirtyFlag.prototype.registerEmitter = fn.registerEmitter;

    return AlertDirtyFlag;
});