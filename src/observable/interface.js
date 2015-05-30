define(['./lazyFlag/constructor', 'core/dirtynessEmitterProvider', 'utils/logger'], function(dirtyFlag, dirtynessEmitterProvider, logger) {

    function interface (target, option) {

        if (option.before) { }

        else if (option.after) { }

        else { 
            logger.isObservable();
            var dirtynessEmitter = dirtynessEmitterProvider.getEmitter();
            return dirtyFlag(target, dirtynessEmitter); 
        }
    }
    
    return interface;
});
