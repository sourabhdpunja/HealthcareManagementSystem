/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("profileController", profileController)

    var users = [
        {_id: "123", username: "alice", password:"alice", firstname:"aLicE", lastname:"wonderLanD"},
        {_id: "345", username: "bob", password:"bob", firstname:"bob", lastname:"marley"}
    ];

    function profileController($scope, $routeParams) {
        var uId = $routeParams.userId;
        for (u in users)    {
            if (users[u]._id === uId)   {
                $scope.user = users[u];

                $scope.message = "Welcome back '" + users[u].username + "' !!!";
                alert($scope.message);
            }
        }
    }

})();