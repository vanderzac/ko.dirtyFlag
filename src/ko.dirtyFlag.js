define(['knockout', 'core/interface', 'test/test'], function(ko, interface, test) {
    
    // README: the concept here is really really simple. Performance!
    // Do not - extend sleeping dirty flag unless you absolutely must.

    // Benchmarks - Knockout is one of the few options available when dealing with massive objects.
    // DirtyFlag runs imperceptibly fast for models of a reasonable size, and can handle massive models too.
    // These tests use a model with aproximately 6k objects, 250 arrays, and 28k primatives.
    
    // minimum baseline measurements for mapping the model without dirtyness logic.
    // 110ms - pure mapping with no extenders
    // 150ms - extender creates a single observable property on each target with the value false (no logic)
    
    // minimum baseline measurement for mapping the model with dirtyness logic
    // 345ms - extender evaluates and saves current target value and a single pure computed of new value === old value
    
    // current release
    // 450ms - extender registeres all features of the lazy dirty flag, which extends itself with alert flag features if the value changes
    
    // Usage:
    // var viewModelMappingStrategy = ko.extenders.dirtyFlag({}, { getMappingStrategy: true });
    // var koModel = ko.viewmodel.fromModel(pojoModel, viewModelMappingStrategy);

    // Note:
    // the ko.viewmodel plugin must be modified to use a mappingStrategy
    // by registering hooks at the appropriate flow control locations

    // Future Plans:
    // DirtyFlag is precompiled into a single requirejs script. This should be updated so that it precompiles into an independent package.
    
    ko.extenders.dirtyFlag = ko.extenders.dirtyFlag || interface;
    test();
});