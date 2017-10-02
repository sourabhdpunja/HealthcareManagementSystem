(function () {
    angular
        .module("WamApp")
        .controller("homeController", homeController);

    function homeController($location, $rootScope,userobject) {

        var model = this;
        model.searchDoctor = searchDoctor;
        model.searchInsurances = searchInsurances;
        model.curretLoggedUser = userobject;
        // model.profile = profile;

        function init() {
        }
        init();

        // function profile(){
        //     if ($rootScope.currentUser.userType === 'doctor'){
        //         $location.url("/user/"+ $rootScope.currentUser._id+"/doctor/"+
            // }
        // }


        function checklog(){
            if (!userobject){
                return false;
            }
            else {
                return true;
            }

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