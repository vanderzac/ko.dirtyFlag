define(['knockout', './factory', './prototype'], function(ko, dirtyFlag, DirtyFlag) {
    
    var options = {
        isPrototype: true,
        isFactory: false
    };
    
    function observableArrayDirtyFlag (observableArray, dirtyChildren, dirtynessEmitter) {

        var dirtyFlag = 
            (options.isPrototype === true) ? new DirtyFlag(observableArray, dirtyChildren, dirtynessEmitter)
            : (options.isFactory === true) ? dirtyFlag(observableArray, dirtyChildren, dirtynessEmitter)
            : {};
        
        if (dirtyFlag.initialize) 
            dirtyFlag.initialize();
        
        observableArray.dirtyFlag(dirtyFlag);
        
        return dirtyFlag;
    }

    return observableArrayDirtyFlag;
});