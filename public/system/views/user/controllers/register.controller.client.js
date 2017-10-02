/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController($location, $rootScope, userService,userobject)   {

        var model = this;
        model.register  = register;
        model.createUser= createUser;
        model.curretLoggedUser = userobject;
        function init() {

        }
        init();


        function createUser(user) {
            //alert("Welcome " + user.username + " !!!");
            var newUser = {
                password:user.password1,

                userType:user.userType,
                username:user.username,
                profile:{
                    last_name:user.last_name,
                    first_name:user.first_name,
                    image_url:"uploads/heart-pulse.jpeg"
                }
            };
            if (user.userType === 'admin'){
            newUser.isAdmin = "True";
            }
            userService.createUser(newUser)
                .then( function (response) {
                    newUser = response.data;
                    //alert("Hey, " + user.username + " your userId is " + newUser._id);
                    // $rootScope.currentUser = newUser;
                    // $location.url("/user/" + newUser._id);
                    $location.url("/user");
                });
        }


        function register(user) {
                //console.log(user);
            console.log("inside register");
            if (user.userType === null || user.userType === '' || typeof user.userType === 'undefined')   {
                alert("Please select an 'User Type' !");
                return;
            }
            else if (user.password1 === user.password2 && typeof user.password1 !== "undefined")   {

                if (user.username === null || user.username === '' || typeof user.username === 'undefined')   {
                    alert("Please write an username !");
                    return;
                }
                else    {
                    console.log("Looking weather username " + user.username + "already exists");
                    userService
                        //.findUserByUsernameAndUserType(user.username, user.userType)
                        .findUserByUsername(user.username)
                        .then( function (response) {
                            model.inuser = response.data;
                            //console.log(model.inuser);
                            if(model.inuser !== null)   {
                                alert("Sorry username '" + model.inuser.username + "' already exists !");
                            }
                            else
                            {
                                alert("Welcome " + user.username + " !!!");
                                createUser(user);
                            }
                        }, function (err) {
                            console.log(err);
                            alert("Sorry username '" + model.inuser.username + "' already exists !");
                        });
                }
            }
            else {
                alert("Hi " + user.username + ", two passwords do not match!")
            }
        }

    }
})();