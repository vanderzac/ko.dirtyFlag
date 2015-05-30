define(['knockout', './fn'], function(ko, fn) {
    
    function AlertDirtyFlag(object, dirtyChildren, dirtynessEmitter) {

        this._object = object;
        this._dirtyChildren = dirtyChildren;
        this._dirtynessEmitter = dirtynessEmitter;

        // Make sure you can clean-up
        this.disposables = [
            this.emitters.subscribe(this.onEmittersChange, this),
            this.isDirty.subscribe(this.onIsDirtyChange, this),
        ];

        // Observables
        this.isForcedDirty = ko.observable(false);

        // Observable Array
        this.emitters = ko.observableArray([dirtynessEmitter]);


        // Computed
        this.isDirty = ko.pureComputed(this.computeIsDirty, this);
        this.anyDirtyChildren = ko.pureComputed(this.computeAnyDirtyChildren, this);
    }

    // Make sure you can clean-up
    AlertDirtyFlag.prototype.dispose = fn.dispose;
    AlertDirtyFlag.prototype.disposeOne = fn.disposeOne;

    AlertDirtyFlag.prototype.computeIsDirty = fn.computeIsDirty;
    AlertDirtyFlag.prototype.computeAnyDirtyChildren = fn.computeAnyDirtyChildren;

    AlertDirtyFlag.prototype.onIsDirtyChange = fn.onIsDirtyChange;
    AlertDirtyFlag.prototype.onEmittersChange = fn.onEmittersChange;

    AlertDirtyFlag.prototype.initialize = fn.afterInitialize;
    AlertDirtyFlag.prototype.forceDirty = fn.forceDirty;

    AlertDirtyFlag.prototype.addToEmitter = fn.addToEmitter;
    AlertDirtyFlag.prototype.removeFromEmitter = fn.removeFromEmitter;    
    AlertDirtyFlag.prototype.registerEmitterForChild = fn.registerEmitterForChild;
    AlertDirtyFlag.prototype.registerEmitter = fn.registerEmitter;

    AlertDirtyFlag.prototype.reset = fn.reset;
    AlertDirtyFlag.prototype.resetChild = fn.resetChild;

    return AlertDirtyFlag;
});