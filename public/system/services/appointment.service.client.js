/**
 * Created by prasadtajane on 7/19/17.
 */
(function() {
    angular
        .module("WamApp")
        .factory("appointmentService", appointmentService);

    function appointmentService($http)  {

        var users = [];

        var api =  {
            createappointment:createappointment,
            updateappointment:updateappointment,
            deleteAppointment:deleteAppointment,
            findappointmentById:findappointmentById,
            "findappointmentByDate": findappointmentByDate,
            "findappointmentByPatient": findappointmentByPatient,
            "findappointmentByCategory": findappointmentByCategory,
            "findappointmentByPriority": findappointmentByPriority
        };
        return api;

        function findappointmentById(userId, appointmentId) {
            ///api/user/:userId/appointment/:appointmentId
            return $http.get("/api/user/" + userId + "/appointment/" + appointmentId);
                /*.then(function (response) {
                    response.data;
                });*/
        }

        function findappointmentByPatient(patientName)   {
            return $http.get("/api/user?patientName=" + patientName);
        }

        function findappointmentByDate(date)   {
            return $http.get("/api/user?date=" + date);
        }

        function findappointmentByCategory(category)   {
            return $http.get("/api/user?category=" + category);
        }

        function findappointmentByPriority(priority)   {
            return $http.get("/api/user?priority=" + priority);
        }

        function createappointment(userId, appointment)   {
            //console.log(newuser);
            ///api/user/:userId/appointment
            return $http.post("/api/user/" + userId + "/appointment", appointment);
        }

        function updateappointment(userId, appointmentId, appointment)   {
            ///api/user/:userId/appointment/:appointmentId
            return $http.put("/api/user/" + userId + "/appointment/" + appointmentId, appointment);
            //alert("inside update service " + userId + " " + user);
        }

        function deleteAppointment(userId, appointmentId) {
            ///api/user/:userId/appointment/:appointmentId
            return $http.delete("/api/user/" + userId + "/appointment/" + appointmentId);
        }

    }
})();
