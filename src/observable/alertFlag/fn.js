define(['knockout', 'core/fn'], function(ko, fn) {

    var alertDirtyFlagFunctions = {
        
        computeCurrentState: function () {
            return this.getHashedValue(this._observable());
        },

        computeIsDirty: function () {
            return this.isForcedDirty() === true || this.matchesCleanState() === false;
        },

        computeMatchesCleanState: function () {

            var currentState = this.currentState();
            var lastCleanState = this.lastCleanState();

            return this.hashesMatch(currentState, lastCleanState);
        },
        
        initialize: function () {

            this.currentState = ko.pureComputed(this.computeCurrentState, this);
            this.isDirty = ko.pureComputed(this.computeIsDirty, this);
            this.matchesCleanState = ko.pureComputed(this.computeMatchesCleanState, this);

            this.lastCleanState = ko.observable(this.getHashedValue(this._initialValue));
            this.disposables.push(this.emitters.subscribe(this.onEmittersChange), this);
            this.disposables.push(this.isDirty.subscribe(this.onIsDirtyChange), this);

            this.afterInitialize();
        },
        
        onIsDirtyChange: function (newValue) {

            if (newValue === true)
                ko.utils.arrayForEach(this.emitters(), this.addToEmitter);
            else
                ko.utils.arrayForEach(this.emitters(), this.removeFromEmitter);
        },
        
        reset: function () {
            this.lastCleanState(this.currentState());
            this.isForcedDirty(false);
        }
    };
    
        // Make sure you can clean-up
    alertDirtyFlagFunctions.dispose = alertDirtyFlagFunctions.dispose || fn.dispose;
    alertDirtyFlagFunctions.disposeOne = alertDirtyFlagFunctions.disposeOne || fn.disposeOne;
    
    alertDirtyFlagFunctions.getHashedValue = alertDirtyFlagFunctions.getHashedValue || fn.getHashedValue;
    alertDirtyFlagFunctions.computeCurrentState = alertDirtyFlagFunctions.computeCurrentState || fn.computeCurrentState;
    alertDirtyFlagFunctions.computeIsDirty = alertDirtyFlagFunctions.computeIsDirty || fn.computeIsDirty;
    alertDirtyFlagFunctions.computeMatchesCleanState = alertDirtyFlagFunctions.computeMatchesCleanState || fn.computeMatchesCleanState;
    alertDirtyFlagFunctions.hashIsDefault = alertDirtyFlagFunctions.hashIsDefault || fn.hashIsDefault;
    alertDirtyFlagFunctions.hashesMatch = alertDirtyFlagFunctions.hashesMatch || fn.hashesMatch;
    alertDirtyFlagFunctions.initialize = alertDirtyFlagFunctions.initialize || fn.afterInitialize;
    alertDirtyFlagFunctions.onEmittersChange = alertDirtyFlagFunctions.onEmittersChange || fn.onEmittersChange;
    alertDirtyFlagFunctions.onIsDirtyChange = alertDirtyFlagFunctions.onIsDirtyChange || fn.onIsDirtyChange;
    alertDirtyFlagFunctions.addToEmitter = alertDirtyFlagFunctions.addToEmitter || fn.addToEmitter;
    alertDirtyFlagFunctions.removeFromEmitter = alertDirtyFlagFunctions.removeFromEmitter || fn.removeFromEmitter;
    alertDirtyFlagFunctions.registerEmitter = alertDirtyFlagFunctions.registerEmitter || fn.registerEmitter;
    alertDirtyFlagFunctions.reset = alertDirtyFlagFunctions.reset || fn.reset;
    
    return alertDirtyFlagFunctions
});