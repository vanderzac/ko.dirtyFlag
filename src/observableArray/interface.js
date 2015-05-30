define(['./lazyFlag/constructor', 'core/dirtynessEmitterProvider', 'utils/logger'], function(dirtyFlag, dirtynessEmitterProvider, logger) {

    function interface (target, option) {

        if (option.before) { dirtynessEmitterProvider.addNewEmitter(); }

        else if (option.after) { }

        else { 
            logger.isObservableArray();
            var dirtyChildren = dirtynessEmitterProvider.getEmitterAndRemove();
            var dirtynessEmitter = dirtynessEmitterProvider.getEmitter();
            return dirtyFlag(target, dirtyChildren, dirtynessEmitter); 
        }
    }
    
    return interface;
});