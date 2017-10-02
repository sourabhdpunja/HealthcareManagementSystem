/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($location, userService,userobject) {

        var model = this;
        model.login = login;
        // model.currentLoggedUser = userobject;
        model.curretLoggedUser = userobject;

        function login(user) {
            //alert("Hi from login controller");
            if(!user) {
                model.message = "Please input user";
                alert(model.message);
                return;
            }
            var promise = userService.findUserByUsernameAndPassword(user.username, user.password)
            promise.then(function (response)    {
                // console.log(error);
                inuser = response.data;
                //alert(inuser);
                if (inuser === null ) {
                    model.message = "Incorrect credentials for user '" + user.username + "' !!!";
                    // alert(model.message);
                }
                else {
                    // model.message = "Welcome back " + inuser.username + " !!!";
                    // $rootScope.currentUser = inuser;
                    //alert("user is " + inuser.username +" "+inuser.password+inuser._id);
                    // $location.url("/user/" + inuser._id);
                    $location.url("/user");
                }
            },function(err) {
                // console.log(err);
                model.message = "Incorrect credentials for user '" + user.username + "' !!!";
                // alert(model.message);
            });

        }

        model.register = (function () {
            $location.url("/register");
        })
    }
})();