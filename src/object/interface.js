define(['./lazyFlag/constructor', 'core/dirtynessEmitterProvider', 'utils/logger'], function(dirtyFlag, dirtynessEmitterProvider, logger) {

    function interface (target, option) {
        
        if (option.before === true) {
            dirtynessEmitterProvider.addNewEmitter(); 
        }

        else if (option.after === true) {
            logger.isObject();
            
            var dirtyChildren = dirtynessEmitterProvider.getEmitterAndRemove();
            var dirtynessEmitter = dirtynessEmitterProvider.getEmitter();
            return dirtyFlag(target, dirtyChildren, dirtynessEmitter); 
        }
    }
    
    return interface;
});