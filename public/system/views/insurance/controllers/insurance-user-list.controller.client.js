/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("insuranceController", insuranceController);

    function insuranceController($location, insuranceService, userService, $routeParams,userobject)   {

        var model = this;
        // model.userId = $routeParams.userId;
        model.userId = userobject._id;
        model.removePlan = removePlan;
        model.removeInsurance = removeInsurance;
        model.deleteInsurance = deleteInsurance;
        model.searchInsurances = searchInsurances;
        model.deleteInsuranceByAgent = deleteInsuranceByAgent;
        model.removeInsuranceFromUser = removeInsuranceFromUser;
        model.curretLoggedUser = userobject;

        function init() {
            listInsurance=[];
            userInsuracnce={};
            insuranceService
                .findAllInsurancesByUserId(model.userId)
                .then(function (insurances){
                    model.insurances = insurances;
                    /*for(i in insurances)   {
                        for (j in insurances[i].plans)  {
                            userInsuracnce.id = insurances[i].uid;
                            userInsuracnce.title = insurances[i].name;
                            userInsuracnce.name = insurances[i].plans[j].name;
                            userInsuracnce.planid = insurances[i].plans[j].uid;
                            userInsuracnce.category = insurances[i].plans[j].category;
                            listInsurance.push(userInsuracnce);
                            userInsuracnce={};
                        }
                    }
                    console.log(listInsurance);
                    model.listInsurance = listInsurance;*/
                    return model.insurances;
                });


        }
        init();

        function deleteInsuranceByAgent(insuranceId, planId) {
            //console.log(model.userId,insuranceId,planId);
            insuranceService
                .deleteInsuranceByAgent(model.userId,insuranceId,planId)
                .then(function (insurances){
                    model.insurances=insurances;
                    //$location.url('/user/'+ model.userId + "/insurance");
                    // removeInsuranceFromUser(insuranceId);
                });
        }

        function removeInsuranceFromUser(insuranceId){
            insuranceService
                .removeInsuranceFromUser(model.userId,insuranceId)
                .then(function (status){
                    // $location.url('/user/'+ model.userId);
                    $location.url('/user');
                });
        }

        function deleteInsurance(insuranceId,planId) {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user.data.userType);
                    removeInsuranceFromUser(insuranceId);
                    return;
                    /*if(user.data.userType === 'agent')    {
                        console.log(insuranceId);
                        console.log(planId);
                        deleteInsuranceByAgent(insuranceId,planId);
                        return;
                    }
                    else    {
                        removeInsuranceFromUser(insuranceId);
                        return;
                    }*/
                });
        }

        function removeInsurance(insuranceIn, plan) {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user.data.userType);
                    if(user.data.userType === 'agent' || user.data.userType === 'admin')    {
                        console.log(insuranceIn);
                        console.log(plan);
                        //removePlan(insuranceIn, plan);
                        removeInsuranceFromUser(insuranceIn._id);
                        insuranceService
                            .findAllInsurancesByUserId(model.userId)
                            .then(function (insurances) {
                                model.insurances = insurances;
                                $location.url("/user");
                            });
                    }
                    else    {
                        removeInsuranceFromUser(insuranceIn._id);
                        insuranceService
                            .findAllInsurancesByUserId(model.userId)
                            .then(function (insurances) {
                                model.insurances = insurances;
                                $location.url("/user");
                            });
                    }
                });
        }

        function searchInsurances() {
            // $location.url("/user/" + model.userId + "/insurance-search/#searchHere");
            $location.url("/insurance-search/#searchHere");
        }

        function removePlan(insuranceIn, plan) {
            //console.log(plan);
            insuranceService
                .findAllInsurancesByUserId(model.userId)
                .then(function (insurances){
                    //console.log(insurances);
                    for (i in insurances)  {
                        if (insurances[i].name !== insuranceIn.name  || insurances[i].uid !== insuranceIn.uid)    {
                            continue;
                        }
                        else    {
                            for(p in insurances[i].plans) {
                                //console.log("inside second for");
                                if ((insurances[i].plans[p].name === plan.name) &&
                                    (insurances[i].plans[p].uid  === plan.uid) )   {
                                /*if (insurances[i].plans[p] === plan)   {*/
                                //  &&    (insurances[i].plans[p].category === plan.category)

                                    //console.log("final");
                                    insurances[i].plans.splice(p,1);
                                    console.log(insurances);
                                    console.log(insurances[i]._id);
                                    //console.log(model.userId);

                                    insuranceService
                                        .updateInsurance(model.userId,insurances[i]._id,insurances[i])
                                        .then(function (response) {
                                            console.log("inside update");
                                            console.log(response);
                                        });


                                }
                                else continue;
                            }
                        }

                    }
                });
        }

    }
})();