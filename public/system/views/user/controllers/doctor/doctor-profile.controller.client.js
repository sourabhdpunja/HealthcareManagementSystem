/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("doctorProfileController", doctorProfileController)

    function doctorProfileController($routeParams, $location, userService, $rootScope) {

        var model = this;
        //model.searchProfile = searchProfile;
        var updateUser = updateUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.curretLoggedUser = userobject;

        model.findWebsites = findWebsites;

        var uId = $routeParams["userId"];



        function init() {
            //alert("inside profile service!")
            var promise = userService.findUserById(uId);
            promise.then(function (response) {
                model.user = response.data;
                var user = model.user;
                return user;
                })
            //model.user = userService.findUserById(uId);

        }
        init();

        function updateUser(user) {
            //alert("inside update of controller");
            userService.updateUserByUserId(user, uId);
            alert("Hi " + user.username + " all values have been updated successfully!");

        }

        function deleteUser(user) {
            userService.deleteUserByUserId(uId)
                .then(function (response) {
                    suCode = response.data;
                    if (suCode === "200") {
                        alert("Thank you for your patience, user with username '" + user.username + "' has been removed!");
                        $location.url("/login");
                    }
                });
        }

        function findWebsites() {
            $location.url("/profile/" + uId + "/website");
        }
    }

})();