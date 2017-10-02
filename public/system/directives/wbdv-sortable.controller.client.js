/**
 * Created by prasadtajane on 8/1/17.
 */
(function () {
    angular
        .module("wbdvDirectives")
            .controller("sortableController", sortableController);


    function sortableController($routeParams, widgetService) {

        var pageId = -1;
        pageId = $routeParams.pageId;

        function init() {
            console.log(pageId);
        }
        init();

        //will NOT work without the 'vm' variable.
        var vm = this;
        vm.sort = sort;

        function sort(start, stop) {
            //console.log([start,stop]);
            widgetService.sort(pageId, start, stop);
        }
    }
})();