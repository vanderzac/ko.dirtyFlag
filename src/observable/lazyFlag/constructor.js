define(['knockout', './factory', './prototype'], function(ko, dirtyFlag, DirtyFlag) {
        
    var options = {
        isPrototype: true,
        isFactory: false
    };
    
    function observableDirtyFlag (observable, dirtynessEmitter) {
        
        var dirtyFlag = 
            (options.isPrototype === true) ? new DirtyFlag(observable, dirtynessEmitter) 
            : (options.isFactory === true) ? dirtyFlag(observable, dirtynessEmitter)
            : {};
        
        if (dirtyFlag.initialize) 
            dirtyFlag.initialize();
        
        observable.dirtyFlag = ko.observable(dirtyFlag);
        
        return observable;
    }

    return observableDirtyFlag;
});