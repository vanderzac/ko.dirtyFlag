define(['knockout'], function(ko) {

    var coreFunctions = {

        addToEmitter: function(emitter) {

            if (emitter.indexOf(this) === -1)
                emitter.push(this);
        },
        
        afterInitialize: function() {
            this.isDirty.notifySubscribers(this.isDirty());
        },
        
        computeAnyDirtyChildren: function() {
            return this._dirtyChildren().length !== 0;
        },
        
        dispose: function() {

            // dispose of any disposables we've stored
            ko.utils.arrayForEach(this.disposables, this.disposeOne);

            // dispose of each object on this
            ko.utils.objectForEach(this, this.disposeOne);
        },

        disposeOne: function(propertyOrValue, value) {

            var disposable = value || propertyOrValue;

            if (disposable && typeof disposable.dispose === "function") {
                disposable.dispose();
            }
        },

        forceDirty: function() {
            this.isForcedDirty(true);
        },

        getHashedValue: function (value) {

            var hash = this.hashFunction(value).toString();

            while (hash.charAt(0) === "\"" && hash.charAt(hash.length - 1) === "\"") {
                hash = hash.substr(1);
                hash = hash.substr(0, hash.length - 1);
            }

            return hash;
        },

        hashesMatch: function (h1, h2) {

            return (h1 === h2) || this.hashIsDefault(h1) && this.hashIsDefault(h2);
        },

        hashIsDefault: function (hash) {
            return hash === null || hash === 'null' || hash === '' || hash === 0 || hash === '0';
        },

        onDirtyChildrenChangeCheckWake: function (changes) {

            // Minimum criteria for wake: child is dirty
            if (this._dirtyChildren().length !== 0)
                this.wake();
        },

        onEmittersChange: function(changes) {

            // we only need to add ourself to the new emitter if we are dirty
            if (this.isDirty() === true)
                ko.utils.arrayForEach(this.emitters(), this.addToEmitter);
        },

        onIsDirtyChange: function(newValue) {

            if (newValue === true) {
                ko.utils.arrayForEach(this.emitters(), this.addToEmitter);
                ko.utils.arrayForEach(this._dirtyChildren(), this.registerEmitterForChild);
            }

            else {
                ko.utils.arrayForEach(this.emitters(), this.removeFromEmitter);
            }
        },

        registerEmitter: function(emitter) {

            if (this.emitters.indexOf(emitter) === -1)
                this.emitters.push(emitter);
        },

        registerEmitterForChild: function(child) {
            child.registerEmitter(this._dirtynessEmitter);
        },
        
        removeFromEmitter: function(emitter) {
            emitter.remove(this);
        },

        reset: function() {

            this.isForcedDirty(false);

            // use a while loop on child 0 because children remove themselves as they are reset.
            while (this.anyDirtyChildren()) {
                this.resetChild(this._dirtyChildren()[0]);
            }
        },

        resetChild: function(child) {

            child.reset();
        }
    };

    return coreFunctions;
})