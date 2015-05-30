define(['knockout', 'core/fn'], function(ko, fn) { 
    
    var alertDirtyFlagFunctions = {
        
        computeIsDirty: function () {
            return this.isForcedDirty() === true || this.anyDirtyChildren() === true || this.matchesCleanState() === false;
        },

        computeMatchesCleanState: function () {

            return this.addedPrimitives().length === 0 && 
                this.addedNonPrimitives().length === 0 && 
                this.deletedPrimitives().length === 0 && 
                this.deletedNonPrimitives().length === 0;
        },
        
        initialize: function () {
            this.isDirty = ko.pureComputed(this.computeIsDirty, this);
            this.anyDirtyChildren = ko.pureComputed(this.computeAnyDirtyChildren, this);
            this.matchesCleanState = ko.pureComputed(this.computeMatchesCleanState, this);

            this.disposables.push(this._observableArray.subscribe(this.onObservableArrayChange, this, 'arrayChange'));
            this.disposables.push(this.emitters.subscribe(this.onEmittersChange), this);
            this.disposables.push(this.isDirty.subscribe(this.onIsDirtyChange), this);

            this.afterInitialize();
        },
        
        onObservableArrayChange: function (changes) {

            ko.utils.arrayForEach(changes, function (change) {

                var isPrimitive = (typeof (change.value) !== 'object' && ko.isObservable(change.value) === false);

                var addTo = (change.status === 'added') ? 
                    ((isPrimitive === true) ? 
                     this.addedPrimitives 
                     : this.addedNonPrimitives)
                : (change.status === 'deleted') ? 
                    ((isPrimitive === true) ?
                     this.deletedPrimitives 
                     : this.deletedNonPrimitives)
                : undefined;

                var removeFrom = (change.status === 'added') ? 
                    ((isPrimitive === true) ? 
                     this.deletedPrimitives 
                     : this.deletedNonPrimitives)
                : (change.status === 'deleted') ? 
                    ((isPrimitive === true) ? 
                     this.addedPrimitives 
                     : this.addedNonPrimitives)
                : undefined;

                if (addTo === undefined || removeFrom === undefined) 
                    return;

                var toAdd = (isPrimitive === true) ? 
                    this.getHashedValue(change.value) 
                : change.value;

                var howToFind = (isPrimitive === true) ? 
                    function (hash) { return this.hashesMatch(toAdd, hash); }
                : function (toCompare) { return toAdd === toCompare; };

                if (removeFrom.remove(howToFind).length === 0)
                    addTo.push(toAdd);
            });
        }
    };

    
    alertDirtyFlagFunctions.dispose = alertDirtyFlagFunctions.dispose || fn.dispose;
    alertDirtyFlagFunctions.disposeOne = alertDirtyFlagFunctions.disposeOne || fn.disposeOne;

    alertDirtyFlagFunctions.computeIsDirty = alertDirtyFlagFunctions.computeIsDirty || fn.computeIsDirty;
    alertDirtyFlagFunctions.computeAnyDirtyChildren = alertDirtyFlagFunctions.computeAnyDirtyChildren || fn.computeAnyDirtyChildren;
    alertDirtyFlagFunctions.computeMatchesCleanState = alertDirtyFlagFunctions.computeMatchesCleanState || fn.computeMatchesCleanState;

    alertDirtyFlagFunctions.onObservableArrayChange = alertDirtyFlagFunctions.onObservableArrayChange || fn.onObservableArrayChange;
    alertDirtyFlagFunctions.onEmittersChange = alertDirtyFlagFunctions.onEmittersChange || fn.onEmittersChange;
    alertDirtyFlagFunctions.onIsDirtyChange = alertDirtyFlagFunctions.onIsDirtyChange || fn.onIsDirtyChange;

    alertDirtyFlagFunctions.initialize = alertDirtyFlagFunctions.afterInitialize || fn.afterInitialize;
    alertDirtyFlagFunctions.forceDirty = alertDirtyFlagFunctions.forceDirty || fn.forceDirty;

    alertDirtyFlagFunctions.reset = alertDirtyFlagFunctions.reset || fn.reset;
    alertDirtyFlagFunctions.resetChild = alertDirtyFlagFunctions.resetChild || fn.resetChild;

    alertDirtyFlagFunctions.hashFunction = alertDirtyFlagFunctions.toJSON || fn.toJSON;
    alertDirtyFlagFunctions.hashesMatch = alertDirtyFlagFunctions.hashesMatch || fn.hashesMatch;
    alertDirtyFlagFunctions.getHashedValue = alertDirtyFlagFunctions.getHashedValue || fn.getHashedValue;

    alertDirtyFlagFunctions.addToEmitter = alertDirtyFlagFunctions.addToEmitter || fn.addToEmitter;
    alertDirtyFlagFunctions.removeFromEmitter = alertDirtyFlagFunctions.removeFromEmitter || fn.removeFromEmitter;
    alertDirtyFlagFunctions.registerEmitterForChild = alertDirtyFlagFunctions.registerEmitterForChild || fn.registerEmitterForChild;
    alertDirtyFlagFunctions.registerEmitter = alertDirtyFlagFunctions.registerEmitter || fn.registerEmitter;
    
    return alertDirtyFlagFunctions
});