/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider)   {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $routeProvider
            .when("/", {
                templateUrl: "./views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve:{
                    userobject:retrieveUser
                }
            })
            .when("/login", {
                templateUrl: "./views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve:{
                    userobject:retrieveUser
                }
            })
            // .when("/user/:userId", {
            .when("/user", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            // .when("/user/:userId/doctor/:detailId", {
            .when("/doctor/:detailId", {
                templateUrl: "./views/user/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            .when("/patient/:detailId", {
                templateUrl: "./views/user/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })/*
            .when("/user/:userId/doctor/:doctorId", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:userId/patient", {
                templateUrl: "./views/user/templates/patient-profile.view.client.html",
                controller: "patientProfileController",
                controllerAs: "model"
            })
             .when("/user/:userId/agent", {
             templateUrl: "./views/user/templates/agent-profile.view.client.html",
             controller: "agentProfileController",
             controllerAs: "model"
             })
             .when("/user/:userId/doctor/profile", {
             templateUrl: "./views/user/templates/doctor-profile.view.client.html",
             controller: "doctorProfileController",
             controllerAs: "model"
             })*/
            // .when("/user/:userId/edit", {
            .when("/edit", {
                templateUrl: "./views/user/templates/patient/patient-profile.view.client.html",
                controller: "patientProfileController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            .when("/register", {
                templateUrl: "./views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model",
                resolve:{
                    userobject:retrieveUser
                }
            })
            // .when("/doctor", {
            //     templateUrl: "./views/user/templates/doctor-list.view.client.html",
            //     controller: "doctorListController",
            //     controllerAs: "model",
            //     resolve:{
            //         userobject: checkNoUser
            //     }
            // })
            // .when("/user/:userId/doctor", {
            .when("/doctor", {
                templateUrl: "./views/user/templates/doctor/doctor-list.view.client.html",
                controller: "doctorListController",
                controllerAs: "model",
                resolve:{
                    userobject:retrieveUser
                }
            })
            // .when("/user/:userId/insurance", {
            .when("/insurance", {
                templateUrl: "./views/insurance/templates/insurance-user-list.view.client.html",
                controller: "insuranceController",
                controllerAs: "model",
                resolve:{
                    userobject:retrieveUser
                }
            })
                // .when("/user/:userId/insurance/:insuranceId", {
            .when("/insurance/:insuranceId", {
                templateUrl: "./views/insurance/templates/insurance-create.view.client.html",
                controller: "insuranceNewController",
                controllerAs: "model",
                    resolve:{
                        userobject:checkLogin
                    }
            })
            // .when("/user/:userId/insurance-search", {
            .when("/insurance-search", {
                templateUrl: "./views/insurance/templates/insurance-search-list.view.client.html",
                controller: "searchInsuranceController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            // .when("/insurance-search", {
            //     templateUrl: "./views/user/templates/insurance-search-list.view.client.html",
            //     controller: "searchInsuranceController",
            //     controllerAs: "model",
            //     resolve:{
            //         userobject: checkNoUser
            //     }
            // })
            .when("/appointment/:appointmentId/report/:reportId", {
                templateUrl: "./views/report/templates/report.view.client.html",
                controller: "reportController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            // .when("/user/:userId/appointment/:appointmentId", {
            .when("/appointment/:appointmentId", {
                templateUrl: "./views/appointment/templates/appointment.view.client.html",
                controller: "appointmentController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            .when("/review", {
            // .when("/user/:userId/review", {
                templateUrl: "./views/user/templates/review-list.view.client.html",
                controller: "reviewController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            .when("/admin", {
                templateUrl: "./views/user/templates/admin/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })
            .when("/admin/user/:editId/edit", {
                templateUrl: "./views/user/templates/patient/patient-profile.view.client.html",
                controller: "patientProfileController",
                controllerAs: "model",
                resolve:{
                    userobject:checkLogin
                }
            })


            .when("/profile/:userId/website", {
                templateUrl:"views/website/templates/website-list.view.client.html",
                controller: "weblistController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/new", {
                templateUrl:"views/website/templates/website-new.view.client.html",
                controller: "newWebsiteController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId", {
                templateUrl:"views/website/templates/website-edit.view.client.html",
                controller: "editWebsiteController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website/:websiteId/page", {
                templateUrl:"views/page/templates/page-list.view.client.html",
                controller: "pageController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/new", {
                ///profile/456/website/456/new
                templateUrl:"views/page/templates/page-new.view.client.html",
                controller: "newPageController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/:pageId", {
                ///profile/456/website/456/page/321
                templateUrl:"views/page/templates/page-edit.view.client.html",
                controller: "editPageController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website/:websiteId/page/:pageId/widget", {
                ///profile/456/website/456/page/432/widget
                templateUrl:"views/widget/templates/widget-list.view.client.html",
                controller: "widgetController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl:"views/widget/templates/widget-chooser.view.client.html",
                controller: "newWidgetController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl:"views/widget/templates/widget-edit.view.client.html",
                controller: "editWidgetController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search", {
                ///profile/456/website/456/page/321/widget/345/search
                templateUrl:"views/widget/templates/widget-flickr-search.view.client.html",
                controller: "flickrController",
                controllerAs: "model"
            })

    }

    function checkLogin(userService,$q,$location){
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function(user){
                if(!user){
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function retrieveUser(userService,$q){
        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function(user){
                if(!user){
                    user._id = undefined;
                    // deferred.reject();
                    // $location.url("/login");
                    deferred.resolve(user);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    // function checkNoLogin($q){
    //     var deferred = $q.defer();
    //     deferred.resolve();
    //     return deferred.promise;
    // }

    // function checkNoUser($q){
    //     var user ={_id:false}
    //     var deferred = $q.defer();
    //     deferred.resolve(user);
    //     return deferred.promise;
    // }

})();