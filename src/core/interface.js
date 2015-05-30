define(['observable/interface', 'observableArray/interface', 'object/interface', 'utils/interface'], function(observable, observableArray, object, utils) {

    function interface (target, option) {
        
        if (option.observable === true)
            return observable(target, option);

        else if (option.observableArray === true)
            return observableArray(target, option);

        else if (option.object === true)
            return object(target, option);

        else
            return utils(target, option);
    }

    return interface;
});
