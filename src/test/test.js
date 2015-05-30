define(['knockout', './bigPojoModel', './smallPojoModel', 'lib/knockout.viewmodel.custom'], function (ko, bigPojoModel, smallPojoModel) {
    
    return function () {
        
        var viewModelMappingStrategy = ko.extenders.dirtyFlag({}, { getMappingStrategy: true });
        //var koModel = ko.viewmodel.fromModel(bigPojoModel, viewModelMappingStrategy);
        var koModel = ko.viewmodel.fromModel(smallPojoModel, viewModelMappingStrategy);
      
        console.log(koModel);
    };
})