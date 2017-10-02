/**
 * Created by Sourabh Punja on 8/15/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("insuranceNewController", insuranceNewController);

    function insuranceNewController($location, insuranceService, userService, $routeParams,userobject)   {

        var model = this;
        // model.userId = $routeParams.userId;
        model.userId = userobject._id;
        model.curretLoggedUser = userobject;
        model.insuranceId= $routeParams.insuranceId;
        model.updateInsurance = updateInsurance;
        model.addNewPlan=addNewPlan;
        model.deleteInsuranceByAgent = deleteInsuranceByAgent;
        var saveinsurance={};
        var presentInsurances;

        function init() {
            userInsurance={};
            console.log(model.userId,model.insuranceId);
            /*insuranceService
                .findInsuranceById(model.userId,model.insuranceId)
                .then(function (insurance){
                    saveinsurance = insurance;
                    console.log(insurance)
                    userInsurance.id = insurance.uid;
                    userInsurance.title = insurance.name;
                        for (j in insurance.plans)  {
                            userInsurance.name = insurance.plans[j].name;
                            userInsurance.planid = insurance.plans[j].uid;
                            userInsurance.category = insurance.plans[j].category;
                            userInsurance.dataplanid = insurance.plans[j]._id;
                        }
                    console.log(userInsurance);
                    model.userInsurance = userInsurance;
                    return userInsurance;
                });*/

            listInsurance=[];
            userInsuracnce={};
            insuranceService
                .findAllInsurancesByUserId(model.userId)
                .then(function (insurances){
                    model.insurance = insurances[0];
                    presentInsurances = insurances;

                    console.log(presentInsurances);

                    return model.insurance;
                });
        }
        init();

        function updateInsurance(insurance) {
            saveinsurance={};
            saveinsurance.uid= insurance.id;
            saveinsurance.name= insurance.title;
            saveinsurance.plans = [{uid:insurance.planid,name:insurance.name,category:insurance.category}]
            console.log(saveinsurance);
            // model.userInsurance = userInsurance;

            insuranceService
                .updateInsurance(model.userId,model.insuranceId,saveinsurance)
                .then(function (insurance){
                    saveinsurance = insurance;
                    console.log(insurance);
                    userInsurance.id = insurance.uid;
                    userInsurance.title = insurance.name;
                    for (j in insurance.plans)  {
                        userInsurance.name = insurance.plans[j].name;
                        userInsurance.planid = insurance.plans[j].uid;
                        userInsurance.category = insurance.plans[j].category;
                    }
                    console.log(userInsurance);
                    model.userInsurance = userInsurance;
                    // $location.url('/user/'+ model.userId + "/insurance");
                    $location.url("/insurance");
                    return userInsurance;
                });
        }

        function deleteInsuranceByAgent(userId,insuranceId,planId) {
            //console.log(insuranceId);
            insuranceService
                .deleteInsuranceByAgent(model.userId,model.insuranceId,planId)
                .then(function (insurances){
                    $location.url("/insurance");
                    // removeInsuranceFromUser(insuranceId);
                });
        }

        function addNewPlan(newPlan)    {

            var newInsurance = {
                uid:model.userId,
                name:(userobject.profile.first_name + " " + userobject.profile.last_name),
                plans:[{
                    name: newPlan.name,
                    uid: newPlan.uid,
                    category: newPlan.category
                }]
            };
            console.log("creating insurance");
            insuranceService
                .createInsurance(model.userId, newInsurance)
                .then(function (responce) {
                    var insurance = responce;
                    // $location.url("/user/" + uId + "/insurance/" + insurance._id);
                    $location.url("/insurance");
                });
        }

        /*function addNewPlan(newPlan) {
            console.log("Creating new Plan");
            p = {
                name: newPlan.name,
                uid: newPlan.uid,
                category: newPlan.category
            };
            presentInsurances[0].plans.push(p);
            console.log("present = ");
            console.log(presentInsurances);

            console.log(model.userId,model.insuranceId);
            insuranceService
                .updateInsurance(model.userId,model.insuranceId,presentInsurances)
                .then(function (insurance){
                    console.log(insurance);
                    /!*userInsurance.id = insurance.uid;
                    userInsurance.title = insurance.name;
                    for (j in insurance.plans)  {
                        userInsurance.name = insurance.plans[j].name;
                        userInsurance.planid = insurance.plans[j].uid;
                        userInsurance.category = insurance.plans[j].category;
                    }
                    console.log(userInsurance);
                    model.userInsurance = userInsurance;*!/
                    $location.url("/insurance");
                });
        }*/

    }
})();