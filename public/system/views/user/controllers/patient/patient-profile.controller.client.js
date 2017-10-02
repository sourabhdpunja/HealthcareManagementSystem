/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("patientProfileController", patientProfileController)

    function patientProfileController($routeParams, $location, userService, $rootScope,userobject) {

        var model = this;
        // model.userId = $routeParams["userId"];
        model.curretLoggedUser = userobject;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.firstname;
        model.lastname;

        if($routeParams["editId"])    {
            //alert("if");
            var adminL="True";
            var editId=$routeParams["editId"];
            model.userId = $routeParams["editId"];
        }
        else    {
            //alert("esle");
            var adminL="False";
            model.userId = userobject._id;
        }

        model.updateUser = updateUser;
        model.addNewDegree = addNewDegree;
        model.addNewSpecialty = addNewSpecialty;
        model.removeAllDegree = removeAllDegree;
        model.removeSpecialty = removeSpecialty;

        function init() {
            //alert("inside profile service!")
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    //console.log(user);
                    user.physic.birthday = new Date(user.physic.birthday);
                    user.smokeStatus = user.smokeStatus.toString();
                    // model.location = user.practices[0].visit_address;
                    // model.address = model.location.street + "," + model.location.street2 + "," + model.location.city + ","+ model.location.state + "," + model.location.zip
                    // model.phone = user.practices[0].phones[0]
                    // model.email = user.email
                    //console.log(model.user);
                    model.user = user;
                    model.firstname = model.user.profile.first_name;
                    model.lastname = model.user.profile.last_name;
                    //alert(user.isAdmin);


                    //console.log(model.user.educations);
                });
            //model.user = userService.findUserById(uId);

        }
        init();

        function updateUser(user) {
            //alert("inside update of controller");
            userService.updateUserByUserId(user, model.userId)
                .then(function (response){
                    userService
                        .findUserById(model.userId)
                        .then(function (response) {
                            var user = response.data;
                            //console.log(user);
                            user.physic.birthday = new Date(user.physic.birthday);
                            user.smokeStatus = user.smokeStatus.toString();
                            // model.location = user.practices[0].visit_address;
                            // model.address = model.location.street + "," + model.location.street2 + "," + model.location.city + ","+ model.location.state + "," + model.location.zip
                            // model.phone = user.practices[0].phones[0]
                            // model.email = user.email
                            //console.log(model.user);
                            model.user = user;
                            model.firstname = model.user.profile.first_name;
                            model.lastname = model.user.profile.last_name;
                            //alert(user.isAdmin);
                            var status = response.status;
                            if (status === 200){
                                model.message = "Update Successfull";
                            }else{
                                model.message = "Update not successfull";
                            }
                            if($routeParams["editId"])    {
                                ///admin/user/598baabf833d3e0004a891e6/edit
                                $location.url("/admin/user/" + $routeParams["editId"] + "/edit");
                            }
                            else    {
                                $location.url("/edit");
                            }
                            //console.log(model.user.educations);
                        });
                // console.log(model.user);
                // var usr = response.data;

                // console.log(usr);
                // usr.dob = new Date(usr.dob);
                // model.user = usr;
            });

        }

        function deleteUser(user) {
            console.log(model.userId);
            userService
                .deleteUserByUserId(model.userId)
                .then(function (response) {
                    suCode = response.data;
                    if (suCode === "200") {
                        // alert("Thank you for your patience, user with username '" + user.username + "' has been removed!");
                        $location.url("/login");
                    }
                });
        }


        function addNewDegree(newDegree) {
            //console.log("in");
            //console.log(newDegree);
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    user.educations.push(newDegree);

                    //console.log(user);
                    //console.log(model.userId);
                    userService
                        .updateUserByUserId(user, model.userId)
                        .then(function (status) {
                            console.log(status);
                            userService
                                .findUserById(model.userId)
                                .then(function (response) {
                                    model.user = user;
                                    model.firstname = model.user.profile.first_name;
                                    model.lastname = model.user.profile.last_name;
                                    user.physic.birthday = new Date(user.physic.birthday);
                                    user.smokeStatus = user.smokeStatus.toString();
                                    if($routeParams["editId"])    {
                                        ///admin/user/598baabf833d3e0004a891e6/edit
                                        $location.url("/admin/user/" + $routeParams["editId"] + "/edit");
                                        console.log("Not editId");
                                    }
                                    else    {
                                        console.log("Not editId");
                                        $location.url("/edit");
                                    }
                                    // $location.url("/user/" + model.userId + "/edit");

                                });
                        });
                });
        }

        function addNewSpecialty(newSpecialty) {
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    user.specialties.push(newSpecialty);

                    //console.log(user);
                    //console.log(model.userId);
                    userService
                        .updateUserByUserId(user, model.userId)
                        .then(function (status) {
                            console.log(status);
                            userService
                                .findUserById(model.userId)
                                .then(function (response) {
                                    model.user = user;
                                    model.firstname = model.user.profile.first_name;
                                    model.lastname = model.user.profile.last_name;
                                    user.physic.birthday = new Date(user.physic.birthday);
                                    user.smokeStatus = user.smokeStatus.toString();
                                    if($routeParams["editId"])    {
                                        ///admin/user/598baabf833d3e0004a891e6/edit
                                        $location.url("/admin/user/" + $routeParams["editId"] + "/edit");
                                    }
                                    else    {
                                        $location.url("/edit");
                                    }
                                });
                        });
                });
        }

        function removeSpecialty(oldSpecialty) {
            //console.log("in");
            //console.log(newDegree);
            console.log(oldSpecialty);
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    for (d in user.specialties)  {
                        if(user.specialties[d].name === oldSpecialty.name &&
                            user.specialties[d].category === oldSpecialty.category &&
                            user.specialties[d].description === oldSpecialty.description)    {
                            user.specialties.splice(d,1);
                        }
                        continue;
                    }

                    //console.log(user);
                    //console.log(model.userId);
                    userService
                        .updateUserByUserId(user, model.userId)
                        .then(function (status) {
                            console.log(status);
                            userService
                                .findUserById(model.userId)
                                .then(function (response) {
                                    model.user = user;
                                    model.firstname = model.user.profile.first_name;
                                    model.lastname = model.user.profile.last_name;
                                    user.physic.birthday = new Date(user.physic.birthday);
                                    user.smokeStatus = user.smokeStatus.toString();
                                    if($routeParams["editId"])    {
                                        ///admin/user/598baabf833d3e0004a891e6/edit
                                        $location.url("/admin/user/" + $routeParams["editId"] + "/edit");
                                    }
                                    else    {
                                        $location.url("/edit");
                                    }
                                });
                        });
                });
        }

        function removeAllDegree(oldDegree) {
            //console.log("in");
            //console.log(newDegree);
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    for (d in user.educations)  {
                        if(user.educations[d].degree === oldDegree.degree &&
                            user.educations[d].school === oldDegree.school &&
                            user.educations[d].graduation_year === oldDegree.graduation_year)    {
                            user.educations.splice(d,1);
                        }
                        continue;
                    }

                    //console.log(user);
                    //console.log(model.userId);
                    userService
                        .updateUserByUserId(user, model.userId)
                        .then(function (status) {
                            console.log(status);
                            userService
                                .findUserById(model.userId)
                                .then(function (response) {
                                    model.user = user;
                                    model.firstname = model.user.profile.first_name;
                                    model.lastname = model.user.profile.last_name;
                                    user.physic.birthday = new Date(user.physic.birthday);
                                    user.smokeStatus = user.smokeStatus.toString();
                                    if($routeParams["editId"])    {
                                        ///admin/user/598baabf833d3e0004a891e6/edit
                                        $location.url("/admin/user/" + $routeParams["editId"] + "/edit");
                                    }
                                    else    {
                                        $location.url("/edit");
                                    }
                                });
                        });
                });
        }
    }

})();