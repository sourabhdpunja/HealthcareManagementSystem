/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .service("searchInuranceService", searchInuranceService);

    function searchInuranceService($http)   {

        this.searchDoctorByName = searchInuranceByName;

        function searchInuranceByName(insuranceName){
            var url = "https://api.betterdoctor.com/2016-03-01/insurances?name="+insuranceName+"&user_key=09d8cd29366f73fbec522ef95f41fa69";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();