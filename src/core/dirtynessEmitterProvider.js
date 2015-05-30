define(['knockout', 'utils/disposalService'], function(ko, disposalService) {

    var dirtynessEmitterProvider = {

        emitters: [
            ko.observableArray([])
        ],

        index: 0,

        addToEmitter: function (child) {
            this.getEmitter().push(child);
        },

        addNewEmitter: function () {

            this.emitters.push(ko.observableArray([]));
            this.index++;
        },

        getEmitterAndRemove: function () {

            this.index--;
            return this.emitters.pop();
        },

        getEmitter: function () {
            return this.emitters[(this.index)];
        },

        dispose: function () {
            ko.utils.arrayForEach(this.emitters, function (observableArray) {
                ko.utils.arrayForEach(observableArray, function (dirtyFlag) {
                    dirtyFlag.dispose();
                })
            });
        },

        reset: function () {
            this.dispose();
            this.emitters = [ko.observableArray([])];
            this.index = 0;
        }
    };

    disposalService.add({
        dispose: dirtynessEmitterProvider.dispose
    })

    return dirtynessEmitterProvider;
});