/**
 * Created by Sourabh Punja on 8/16/2017.
 */


(function() {
    angular
        .module("imageDirective")
        .controller("imageController", imageController);

    function imageController(widgetService,$routeParams){
        var model = this;
        model.pageId = $routeParams.pageId;
        model.sort = sort;

        // function sort(start,end) {
        //     widgetService
        //         .sort(model.pageId,start,end);
        // }
    }
})();