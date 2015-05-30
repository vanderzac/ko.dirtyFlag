define(['knockout', './factory', './prototype'], function(ko, dirtyFlag, DirtyFlag) {
    
    var options = {
        isPrototype: true,
        isFactory: false
    };
    
    function objectDirtyFlag (object, dirtyChildren, dirtynessEmitter) {
        
        var dirtyFlag = 
            (options.isPrototype === true) ? new DirtyFlag(object, dirtyChildren, dirtynessEmitter) 
            : (options.isFactory === true) ? dirtyFlag(object, dirtyChildren, dirtynessEmitter)
            : {};
        
        if (dirtyFlag.initialize)
            dirtyFlag.initialize();
                        
        object.dirtyFlag = ko.observable(dirtyFlag);

        return object;
    }

    return objectDirtyFlag;
});

