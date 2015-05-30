define(['knockout', './factory', './prototype'], function(ko, dirtyFlag, DirtyFlag) {
    
    var options = {
        isPrototype: true,
        isFactory: false
    };
    
    function observableDirtyFlag (observable, initialValue, currentValue, dirtynessEmitter) {

        var dirtyFlag = 
            (options.isPrototype === true) ? new DirtyFlag(observable, initialValue, currentValue, dirtynessEmitter)
            : (options.isFactory === true) ? dirtyFlag(observable, initialValue, currentValue, dirtynessEmitter)
            : {};
        
        if (dirtyFlag.initialize) 
            dirtyFlag.initialize();
        
        observable.dirtyFlag(dirtyFlag);
        
        return dirtyFlag;
    }

    return observableDirtyFlag;
});