/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, $location, userService, appointmentService, $rootScope,userobject) {


        var model = this;
        // var uId = $routeParams["userId"];
        var detailId = $routeParams["detailId"];
        var uId = userobject._id;
        model.curretLoggedUser = userobject;

        model.cancel = cancel;
        model.postReview = postReview;
        model.searchDoctor = searchDoctor;
        model.searchInsurances = searchInsurances;
        model.createAppointment = createAppointment;
        model.showInsuranceById = showInsuranceById;
        model.showUserReportById = showUserReportById;
        model.rescheduleAppointment = rescheduleAppointment;

        function init() {
            var uId = uId;
            var detailId = $routeParams["detailId"];

            console.log("detailId");
            console.log(detailId);
            //alert("inside profile service!")
            model.user={};

            userService
                .findAllAppointmentsByUserId(detailId)
                .then(function (response) {
                    var user = response.data;
                    //console.log(user);

                    var _appointments_future = [];
                    var _appointments_previous = [];

                    model.user = user;
                    /*
                    model.user.email = user.email;
                    model.user.ratings = user.ratings;
                    model.user.profile = user.profile;
                    model.user.userType = user.userType;
                    model.user.username = user.username;
                    */

                    model.user._appointments_future = [];
                    model.user._appointments_previous = [];

                    //console.log(new Date(Date.now()));
                    //console.log(user);

                    for(d in user._appointments)   {
                        if (new Date(user._appointments[d].date) >= new Date(Date.now())) {
                            _appointments_future.push(user._appointments[d]);
                        }
                    };
                    model.user._appointments_future = _appointments_future.slice(0,3);

                    for(d in user._appointments)   {
                        if (new Date(user._appointments[d].date) < new Date(Date.now())) {
                            _appointments_previous.push(user._appointments[d]);
                        }
                    };
                    model.user._appointments_previous = _appointments_previous.slice(0,3);
                    //console.log(model.user._appointments);

                    if(model.user.userType == 'patient')    {
                        model.isPatient = "True";
                    }
                    //appointment.isApproved = "True";

                    return model.user;
                });

            //console.log(model.user.profile);
        }
        init();

        function createAppointment() {

            if (uId) {
                //console.log("User Online");
                //console.log($routeParams["userId"]);
                //console.log($routeParams["detailId"]);

                console.log(model.user.username);

                appointment = {
                    patient_name:"Your Name...",
                    patientId:uId,
                    doctor_name:model.user.profile.first_name + " " + model.user.profile.last_name,
                    doctorId:$routeParams["detailId"],
                    date:Date.now(),
                    time:"12:00 PM"
                };

                //console.log("##########");
                appointmentService
                    .createappointment(uId, appointment)
                    .then(function (appointmentOut) {
                        //console.log("************");
                        //console.log("inside profile controller then - createAppointment");
                        appointmentId = appointmentOut.data._id;
                        //console.log()
                        // $location.url("/user/" + uId + "/appointment/" + appointmentId);
                        $location.url("/appointment/" + appointmentId);
                    });
            }
            else {
                alert("Please Login Before Booking an Appointment.");
                $location.url("/login");
            };

        }

        /*function createAppointment() {
            $location.url("/user/" + uId + "/doctor");}*/

        function showInsuranceById () {
            // $location.url("/user/" + uId + "/insurance");
            $location.url("/insurance");
        }

        function showUserReportById () {
            // $location.url("/user/" + uId + "/appointment/" + model.user._appointments_previous[0]._id + "/report/" + model.user._appointments_previous[0]._reports[0]);
            $location.url("/appointment/" + model.user._appointments_previous[0]._id + "/report/" + model.user._appointments_previous[0]._reports[0]);
        }

        function rescheduleAppointment (appointmentId) {
            $location.url("/appointment/" + appointmentId);
        }

        function cancel() {
            // $location.url("/user/" + uId + "/doctor/" + detailId);
            $location.url("/doctor/" + detailId);
        }

        function postReview(review) {

            if (uId) {

                var ratings = {
                    provider: review.name,
                    rating: review.rating,
                    comments: review.comment,
                    provider_url:"/details/"+ uId,
                    //image_url:uId.url
                    image_url:"uploads/heart-pulse.jpeg"
                };
                //console.log(ratings);

                userService
                    .findAllAppointmentsByUserId(detailId)
                    .then(function (response) {
                        var user = response.data;
                        user.ratings.push(ratings);

                        //console.log(user);
                        //console.log(detailId);
                        userService
                            .updateUserByUserId(user, detailId)
                            .then(function (status) {
                                //console.log(status);
                                userService
                                    .findAllAppointmentsByUserId(detailId)
                                    .then(function (response) {
                                        var user = response.data;
                                        model.user = user;
                                        // $location.url("/user/" + uId + "/doctor/" + detailId + "/#topPage");
                                        $location.url("/doctor/" + detailId + "/#topPage");
                                    });
                            });
                    });
            }
            else {
                alert("Please Login Before Posting a Review.");
                $location.url("/login");
            }

        }

        function searchInsurances() {
            // if($rootScope.currentUser)    {
                // $location.url("/user/" + $rootScope.currentUser._id + "/insurance-search/#searchInsurance");
            // }
            // else {
                $location.url("/insurance-search/#searchInsurance");
            // }
        }

        function searchDoctor() {
            // if($rootScope.currentUser)    {
            //     $location.url("/user/" + $rootScope.currentUser._id + "/doctor/#searchDoctor");
            // }
            // else {
                $location.url("/doctor/#searchDoctor");
            // }
        }


    }

})();