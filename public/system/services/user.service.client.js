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
            findUserById:findUserById,
            "findAllUsers":findAllUsers,
            "findUserByNPI":findUserByNPI,
            updateUserByUserId:updateUserByUserId,
            deleteUserByUserId:deleteUserByUserId,
            "findUserByUsername": findUserByUsername,
            "findAllAppointmentsByUserId": findAllAppointmentsByUserId,
            findUserByUsernameAndUserType:findUserByUsernameAndUserType,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "checkLogin" : checkLogin

        };
        return api;

        function checkLogin(){
            return $http.get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsernameAndPassword(username, password) {
            var host = "/api/user?";
            var query = "username=" + username + "&password=" + password;
            // var url = host + query;
            // return $http.get(url);
            var url = "/api/login";
            return $http.post(url,{username: username,password:password});
            //alert(response);
            //return res;
        }

        function findAllUsers() {
            ///api/user
            return $http.get("/api/user");
        }

        function findUserById(userId) {
            ///api/user/:userId
            return $http.get("/api/user/" + userId);
                /*.then(function (response) {
                    response.data;
                });*/
        }

        function findUserByUsername(username)   {
            // return $http.get("/api/user?username=" + username);
            var url = "/api/user";
            // return $http.post("/api/user?username=" + username);
            return $http.post(url,{username: username});
        }

        function findUserByNPI(npi)   {
            // return $http.get("/api/user?npi=" + npi);
            var url = "/api/user";
            return $http.post(url,{npi: npi});
        }

        function findUserByUsernameAndUserType(username, uType)   {
            // return $http.get("/api/user?username=" + username + "&userType=" + uType);
            var url = "/api/user";
            return $http.post(url,{username: username,userType:uType});

            // var url = "/api/user?username=" + username + "&userType=" + uType
        }

        function createUser(newuser)   {
            //console.log(newuser);
            return $http.post("/api/user/create", newuser);
        }

        function findAllAppointmentsByUserId(userId)    {
            //"/api/user/:userId/populateappointments"
            return $http.get("/api/user/" + userId + "/populateappointments");
        }

        function updateUserByUserId(user, userId)   {
            return $http.put("/api/user/" + userId, user);
            //alert("inside update service " + userId + " " + user);
        }

        function deleteUserByUserId(userId) {
            ///api/user/:userId
            return $http.delete("/api/user/" + userId);
        }

    }
})();
