/**
 * Created by prasadtajane on 7/19/17.
 */
(function() {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http)  {

        var users = [];

        var api =  {
            createUser:createUser,
            updateUserByUserId:updateUserByUserId,
            deleteUserByUserId:deleteUserByUserId,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            findUserById:findUserById,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function findUserByUsernameAndPassword(username, password) {
            ///api/profile?username=alice&password=alice
            var host = "/api/profile?"
            var query = "username=" + username + "&password=" + password;
            var url = host + query;
            var response = $http.get(url);
            //alert(response);
            return response;
        }

        function findUserById(userId) {
            return $http.get("/api/profile/" + userId);
                /*.then(function (response) {
                    response.data;
                });*/
        }

        function findUserByUsername(username)   {
            return $http.get("/api/profile?username=" + username);
        }

        function createUser(newuser)   {
            console.log(newuser);
            return $http.post("/api/profile/", newuser);
        }

        function updateUserByUserId(user, userId)   {
            $http.put("/api/profile/" + userId, user);
            //alert("inside update service " + userId + " " + user);
        }

        function deleteUserByUserId(userId) {
            return $http.delete("/api/profile/" + userId);
        }

    }
})();
