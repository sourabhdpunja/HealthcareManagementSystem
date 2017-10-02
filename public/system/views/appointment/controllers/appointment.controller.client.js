/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("appointmentController", appointmentController);

    function appointmentController($routeParams, $location, appointmentService, reportService, userService, $rootScope,userobject) {

        var model = this;

        // var uId = $routeParams["userId"];
        var uId = userobject._id;
        var appointmentId = $routeParams["appointmentId"];

        model.createReport = createReport;
        model.updateAppointment = updateAppointment;
        model.deleteAppointment = deleteAppointment;
        model.approveAppointment = approveAppointment;
        model.function = selectFunction;
        model.editReport = editReport;
        model.searchDoctor = searchDoctor;
        model.searchInsurances = searchInsurances;
        model.curretLoggedUser = userobject;


        function init() {
            //alert("inside profile service!")
            var promise = appointmentService.findappointmentById(uId, appointmentId);
            promise.then(function (response) {
                model.appointment = response.data;
                model.appointment.date = new Date(model.appointment.date);
                var appointment = model.appointment;
                if(appointment.isApproved)    {
                    model.appointment.status = "Approved!";
                }
                else model.appointment.status = "Not Yet Approved!";
                return appointment;
                });

            model.isPatient;

            userService
                .findUserById(uId)
                .then(function (response) {
                    model.user = response.data;
                    model.button = "Approve";
                    if (model.user.userType === 'patient' || model.user.userType === 'agent')    {
                        model.button = "Save";
                        model.isPatient = "True";
                    }
                });
        }
        init();

        function selectFunction(appointment) {

            if (model.user.userType === 'patient' || model.user.userType === 'agent'    )    {
                updateAppointment(appointment);
            }
            else {
                approveAppointment(appointment);
            }
        }

        function updateAppointment(appointment) {
            //alert("inside update of controller");

            if (new Date(appointment.date) < new Date(Date.now())) {
                alert("Sorry, cannot book appointment for same date\nPlease contact us over phone.");
            }
            else    {
                appointmentService
                    .updateappointment(uId, appointmentId, appointment)
                    .then(function (appointmentOut) {
                        //console.log("************");
                        //console.log("inside appointment controller then - createAppointment");
                        appointmentId = appointmentOut.data._id;
                        //console.log();
                        $location.url("/user");
                    });
                alert("Values have been updated successfully!");
            }
        }

        function approveAppointment(appointment) {
            appointment.isApproved = "True";
            appointmentService
                .updateappointment(uId, appointmentId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside appointment controller then - createAppointment");
                    appointmentId = appointmentOut.data._id;
                    //console.log();
                    $location.url("/appointment/" + appointmentId);
                });
            alert("Appointment approved successfully!");

        }

        function deleteAppointment(appointment) {
            appointmentService
                .deleteAppointment(uId, appointmentId)
                .then(function (response) {
                    suCode = response.data;
                    if (suCode === "200") {
                        alert("Appointment has been removed!");
                        $location.url("/user");
                    }
                });
        }
        
        function createReport(appointment) {
            report = {
                doctorName:model.appointment.doctor_name,
                patientName:model.appointment.patient_name,
                _appointment:appointmentId,
                date:Date.now(),
                time:"00:00 AM"
            };

            reportService
                .createReport(uId, appointmentId, report)
                .then(function (report) {
                    $location.url("/appointment/" + appointmentId + "/report/" + report._id);
                });
        }

        function editReport(appointment, reportId) {
            $location.url("/appointment/" + appointmentId + "/report/" + reportId);
        }

        function searchInsurances() {
            // if($rootScope.currentUser)    {
            //     $location.url("/user/" + $rootScope.currentUser._id + "/insurance-search/#searchHere");
            // }
            // else {
                $location.url("/insurance-search/#searchHere");
            // }
        }

        function searchDoctor() {
            // if($rootScope.currentUser)    {
            //     $location.url("/user/" + $rootScope.currentUser._id + "/doctor/#searchHere");
            // }
            // else {
                $location.url("/doctor/#searchHere");
            // }
        }

    }

})();