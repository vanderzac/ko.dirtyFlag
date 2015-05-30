define(['knockout'], function(ko) {

    function DisposalService() {
        this.disposables = [];
    }
    
    DisposalService.prototype.add = function (disposable) {
        this.disposables.push(disposable);
    }
    
    DisposalService.prototype.dispose = function () {

        // dispose of any disposables we've stored
        ko.utils.arrayForEach(this.disposables, this.disposeOne);

        // dispose of each object on this
        ko.utils.objectForEach(this, this.disposeOne);
    }

    DisposalService.prototype.disposeOne = function (propertyOrValue, value) {

        var disposable = value || propertyOrValue;

        if (disposable && typeof disposable.dispose === "function") {
            disposable.dispose();
        }
    }
    
    return new DisposalService();
});