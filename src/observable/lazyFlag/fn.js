define(['knockout', './../alertFlag/constructor', 'core/fn'], function(ko, alertDirtyFlag, fn) {

    var lazyDirtyFlagFunctions = {
        
        dispose: function () {
            this.observableSubscription.dispose();
        },

        initialize: function () {
            this.observableSubscription = this._observable.subscribe(this.onObservableChangeCheckWake, this);
        },

        onObservableChangeCheckWake: function (newValue) {

            // Minimum criteria for wake: observable must have mutated.
            if (newValue !== this.initialValue)
                this.wake(newValue);
        },

        wake: function (newValue) {

            // clean up
            this.dispose();

            // update our flag to an active flag
            alertDirtyFlag(this._observable, this.initialValue, newValue, this._dirtynessEmitter);
        }
    };
    
    lazyDirtyFlagFunctions.dispose = lazyDirtyFlagFunctions.dispose || fn.dispose;
    lazyDirtyFlagFunctions.onObservableChangeCheckWake = lazyDirtyFlagFunctions.onObservableChangeCheckWake || fn.onObservableChangeCheckWake;
    lazyDirtyFlagFunctions.wake = lazyDirtyFlagFunctions.wake || fn.wake;
    
    return lazyDirtyFlagFunctions
});