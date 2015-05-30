define(['knockout', './../alertFlag/constructor', 'core/fn'], function(ko, alertDirtyFlag, fn) {
    
    var lazyDirtyFlagFunctions = {
        
        afterWakeNotifyChanges: function (changes) {
            
            return function () {
                this._observableArray.dirtyFlag().onObservableArrayChange(changes);
            }
        },
        
        dispose: function () {

            this.dirtyChildrenSubscription.dispose();
            this.observableArraySubscription.dispose();
        },

        initialize: function () {

            this.dirtyChildrenSubscription = this._dirtyChildren.subscribe(this.onDirtyChildrenChangeCheckWake, this);
            this.observableArraySubscription = this._observableArray.subscribe(this.onObservableArrayChangeCheckWake, this, 'arrayChange');
        },

        onObservableArrayChangeCheckWake: function (changes) {

            // Minimum criteria for wake: add or remove observable array member
            var addOrRemoveFound = false;
            ko.utils.arrayForEach(changes, function (change) {
                
                if (addOrRemoveFound === true) return;
                
                if (change.status === 'added' || change.status === 'deleted')
                    addOrRemoveFound = true;
            });

            if (addOrRemoveFound === true)
                this.wake(this.afterWakeNotifyChanges(changes));
        },

        wake: function (callback) {

            // clean up
            this.dispose();

            // update our flag to an alert flag
            alertDirtyFlag(this._observableArray, this._dirtyChildren, this._dirtynessEmitter);

            if (typeof (callback) === 'function')
                callback();
        }
    };
    
    lazyDirtyFlagFunctions.onDirtyChildrenChangeCheckWake = lazyDirtyFlagFunctions.onDirtyChildrenChangeCheckWake || fn.onDirtyChildrenChangeCheckWake;
    lazyDirtyFlagFunctions.onObservableArrayChangeCheckWake = lazyDirtyFlagFunctions.onObservableArrayChangeCheckWake || fn.onObservableArrayChangeCheckWake;
    lazyDirtyFlagFunctions.wake = lazyDirtyFlagFunctions.wake || fn.wake;
    lazyDirtyFlagFunctions.dispose = lazyDirtyFlagFunctions.dispose || fn.dispose;
    lazyDirtyFlagFunctions.afterWakeNotifyChanges = lazyDirtyFlagFunctions.afterWakeNotifyChanges || fn.afterWakeNotifyChanges;
    
    return lazyDirtyFlagFunctions
});