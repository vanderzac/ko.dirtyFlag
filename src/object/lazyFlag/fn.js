define(['knockout', './../alertFlag/constructor', 'core/fn' ], function(ko, alertDirtyFlag, fn) {

    var lazyDirtyFlagFunctions = {

        dispose: function () {
            this.dirtyChildrenSubscription.dispose();
        },

        initialize: function () {
            this.dirtyChildrenSubscription = this._dirtyChildren.subscribe(this.onDirtyChildrenChangeCheckWake, this);
        },

        wake: function () {

            // clean up
            this.dispose()

            // update our flag to an active flag
            alertDirtyFlag(this._object, this._dirtyChildren, this._dirtynessEmitter);
        }        
    };

    lazyDirtyFlagFunctions.dispose = lazyDirtyFlagFunctions.dispose || fn.dispose;
    lazyDirtyFlagFunctions.onDirtyChildrenChangeCheckWake = lazyDirtyFlagFunctions.onDirtyChildrenChangeCheckWake || fn.onDirtyChildrenChangeCheckWake;
    lazyDirtyFlagFunctions.wake = lazyDirtyFlagFunctions.wake || fn.wake;

    return lazyDirtyFlagFunctions
});