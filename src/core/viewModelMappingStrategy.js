define(['knockout'], function(ko) {

    return {
        makeObservable: function (target) { 
            return ko.observable(target).extend({ dirtyFlag: { observable: true } }); 
        },

        beforeProcessObservable: function (target) { 
            //return ko.extenders.dirtyFlag(target, { observable: true, before: true }); 
        },

        afterProcessObservable: function (result) { 
            //return ko.extenders.dirtyFlag(result, { observable: true, after: true }); 
        },

        makeObservableArray: function (target) { 
            return ko.observableArray(target).extend({ dirtyFlag: { observableArray: true } }); 
        },

        beforeProcessObservableArray: function (target) { 
            return ko.extenders.dirtyFlag(target, { observableArray: true, before: true }); 
        },

        afterProcessObservableArray: function (result) {
            //return ko.extenders.dirtyFlag(result, { observableArray: true, after: true });
        },

        beforeProcessObject: function (target) { 
            return ko.extenders.dirtyFlag(target, { object: true, before: true }); 
        },

        afterProcessObject: function (result) { 
            return ko.extenders.dirtyFlag(result, { object: true, after: true }); 
        }
    };
    
});