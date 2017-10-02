/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .service("doctorService", doctorService);

    function doctorService($http)   {

        this.searchDoctorByName = searchDoctorByName;

        function searchDoctorByName(doctorName){
            var url = "https://api.betterdoctor.com/2016-03-01/doctors?name="+doctorName+"&user_key=09d8cd29366f73fbec522ef95f41fa69";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();