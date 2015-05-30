define(['core/viewModelMappingStrategy', './disposalService', './logger'], function(viewModelMappingStrategy, disposalService, logger) {
    
    function interface (target, option) {

        if (option.getMappingStrategy === true)
            return viewModelMappingStrategy;

        else if (option.log === true)
            return logger.log();
        
        else if (option.dipspose === true)
            disposalService.dispose();
    }

    return interface;
});
