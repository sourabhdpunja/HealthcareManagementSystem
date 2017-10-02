/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("searchInsuranceController", searchInsuranceController);

    function searchInsuranceController($location, $routeParams, $rootScope, insuranceService,userobject)   {

        var model = this;
        // model.userId = $routeParams.userId;
        model.userId = userobject._id;
        model.searchInsurances = searchInsurances;
        model.addInsuranceInUser = addInsuranceInUser;
        model.findAllInsurancesByName = findAllInsurancesByName;
        model.curretLoggedUser = userobject;

        function init() {
            var listInsurance=[];
            var userInsuracnce={};

            insuranceService
                .findAllInsurance()
                .then(function (insurances){
                    //model.insurances = insurances;
                    for(i in insurances)   {
                        for (j in insurances[i].plans)  {
                            userInsuracnce._id = insurances[i]._id;
                            userInsuracnce.uid = insurances[i].uid;
                            userInsuracnce.title = insurances[i].name;
                            userInsuracnce.name = insurances[i].plans[j].name;
                            userInsuracnce.planuid = insurances[i].plans[j].uid;
                            userInsuracnce.category = insurances[i].plans[j].category;
                            listInsurance.push(userInsuracnce);
                            userInsuracnce={};
                        }
                    }
                    console.log(listInsurance);
                    model.listInsurance = listInsurance;
                    return listInsurance;
                });
        }
        init();

        function findAllInsurancesByName(name) {
            var listInsurance=[];
            var userInsuracnce={};
            insuranceService
                .findAllInsurancesByName(name)
                .then(function (insurances){
                    //model.insurances = insurances;
                    for(i in insurances)   {
                        for (j in insurances[i].plans)  {
                            userInsuracnce._id = insurances[i]._id;
                            userInsuracnce.uid = insurances[i].uid;
                            userInsuracnce.title = insurances[i].name;
                            userInsuracnce.name = insurances[i].plans[j].name;
                            userInsuracnce.planuid = insurances[i].plans[j].uid;
                            userInsuracnce.category = insurances[i].plans[j].category;
                            listInsurance.push(userInsuracnce);
                            userInsuracnce={};
                        }
                    }
                    console.log(listInsurance);
                    model.listInsurance = listInsurance;
                    return listInsurance;
                });
        }

        function addInsuranceInUser(input){
            var plan = {};
            var plans = [];
            var insurance = {};
            insurance.plans = plans;
            // console.log(input);
            // console.log(insurance);

            if(!model.userId)    {
                $location.url("/login");
            }

           else {
                plan.name = input.name;
                plan.uid = input.planuid;
                insurance.uid = input.uid;
                insurance.name = input.title;
                plan.category = input.category;
                insurance.plans.push(plan);

                // console.log(insurance);

                insuranceService
                    .addInsuranceInUser(input._id, model.userId)
                    .then(function (status){
                        model.status = status;
                        $location.url("/user");
                        // $location.url("/user/" + model.userId);
                    });
            }
        }

        function searchInsurances() {
            // if($rootScope.currentUser)    {
            //     $location.url("/user/" + $rootScope.currentUser._id + "/doctor/#searchHere");
            // }
            // else {
                $location.url("/doctor/#searchHere");
            // }
        }
    }
})();