(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("wdSortable", wdSortable)

    function wdSortable() {

        function linkFunction(scope, element) {
            //console.log(element);
            var startIndex = -1;
            var stopIndex = -1;
            element
                .sortable({
                    start:(function (event, ui) {
                        //console.log($(ui.item).index());
                        startIndex=$(ui.item).index();
                    }),
                    stop:(function (event, ui) {
                        //console.log($(ui.item).index());
                        stopIndex=$(ui.item).index();
                        scope.sortableController.sort(startIndex, stopIndex)
                    })
                });
        }

        return{
            scope:{},
            link:linkFunction,
            controller:"sortableController",
            controllerAs:"sortableController"
        }
    }

})();