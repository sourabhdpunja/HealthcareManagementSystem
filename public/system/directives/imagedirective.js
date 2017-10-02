/**
 * Created by Sourabh Punja on 8/16/2017.
 */
(function () {
    angular
        .module("imageDirective", [])
        .directive("wdImage", wdImage)

    function wdImage() {

        function linkFunction(scope, element) {
            console.log(element);
            var startIndex = -1;
            var stopIndex = -1;
            $(element)
                .onclick(
                    function(e){
                    console.log("Clicked");
                    e.preventDefault();
                    $("#upload:hidden").trigger('click');
                    });
        }

        return{
            scope:{},
            link:linkFunction,
            controller:"imageController",
            controllerAs:"model"
        }
    }

})();