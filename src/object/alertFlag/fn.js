define(['knockout', 'core/fn'], function(ko, fn) {

    var alertDirtyFlagFunctions = {

        computeIsDirty: function() {
            return this.isForcedDirty() === true || this.anyDirtyChildren() === true;
        },

        initialize: function() {

            this.anyDirtyChildren = ko.pureComputed(this.computeAnyDirtyChildren, this);
            this.isDirty = ko.pureComputed(this.computeIsDirty, this);

            this.disposables.push(this.emitters.subscribe(this.onEmittersChange, this));
            this.disposables.push(this.isDirty.subscribe(this.onIsDirtyChange, this));

            this.afterInitialize();
        }    
    };
    
    // Make sure you can clean-up
    alertDirtyFlagFunctions.dispose = alertDirtyFlagFunctions.dispose || fn.dispose;
    alertDirtyFlagFunctions.disposeOne = alertDirtyFlagFunctions.disposeOne || fn.disposeOne;

    alertDirtyFlagFunctions.computeIsDirty = alertDirtyFlagFunctions.computeIsDirty || fn.computeIsDirty;
    alertDirtyFlagFunctions.computeAnyDirtyChildren = alertDirtyFlagFunctions.computeAnyDirtyChildren || fn.computeAnyDirtyChildren;

    alertDirtyFlagFunctions.onIsDirtyChange = alertDirtyFlagFunctions.onIsDirtyChange || fn.onIsDirtyChange;
    alertDirtyFlagFunctions.onEmittersChange = alertDirtyFlagFunctions.onEmittersChange || fn.onEmittersChange;

    alertDirtyFlagFunctions.initialize = alertDirtyFlagFunctions.initialize || fn.afterInitialize;
    alertDirtyFlagFunctions.forceDirty = alertDirtyFlagFunctions.forceDirty || fn.forceDirty;

    alertDirtyFlagFunctions.addToEmitter = alertDirtyFlagFunctions.addToEmitter || fn.addToEmitter;
    alertDirtyFlagFunctions.removeFromEmitter = alertDirtyFlagFunctions.removeFromEmitter || fn.removeFromEmitter;    
    alertDirtyFlagFunctions.registerEmitterForChild = alertDirtyFlagFunctions.registerEmitterForChild || fn.registerEmitterForChild;
    alertDirtyFlagFunctions.registerEmitter = alertDirtyFlagFunctions.registerEmitter || fn.registerEmitter;

    alertDirtyFlagFunctions.reset = alertDirtyFlagFunctions.reset || fn.reset;
    alertDirtyFlagFunctions.resetChild = alertDirtyFlagFunctions.resetChild || fn.resetChild;

    return alertDirtyFlagFunctions
});