/**
 * Created by Sourabh Punja on 8/14/2017.
 */

(function () {
    angular
        .module("WamApp")
        .factory("reportService",reportService);

    function reportService($http) {

        var api= {
            "findReportByApppointmentId": findReportByApppointmentId,
            "findReportByPatientName": findReportByPatientName,
            "findAllReport": findAllReport,
            "createReport": createReport,
            "updateReport": updateReport,
            "deleteReport": deleteReport,
            "findReportById": findReportById
        };

        return api;

        function findAllReport(userId){
            var url = "/api/user/"+userId+ "/allreports";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var pagelist=[];
            // for (var p in pages){
            //     if (pages[p].websiteId === websiteId){
            //         pagelist.push(pages[p]);
            //     }
            // }
            // return pagelist;
        }

        function findReportByPatientName(userId,appointmentId,patientName){
            var url = "/api/user/"+userId+ "/appointment/"+appointmentId+"/report?patient="+patientName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var pagelist=[];
            // for (var p in pages){
            //     if (pages[p].websiteId === websiteId){
            //         pagelist.push(pages[p]);
            //     }
            // }
            // return pagelist;
        }

        function findReportByApppointmentId(userId,appointmentId){
            var url = "/api/user/"+userId+ "/appointment/"+appointmentId+"/report";
            return $http.get(url)
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;
                });
            // var pagelist=[];
            // for (var p in pages){
            //     if (pages[p].websiteId === websiteId){
            //         pagelist.push(pages[p]);
            //     }
            // }
            // return pagelist;
        }

        function findReportById(userId,appointmentId,reportId){
            var url = "/api/user/"+userId+ "/appointment/"+appointmentId+"/report/"+reportId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
            // for (var p in pages){
            //     if (pages[p]._id === pageId){
            //         return angular.copy(pages[p]);
            //     }
            // }
        }

        function createReport(userId,appointmentId,report){
            var url = "/api/user/"+userId+ "/appointment/"+appointmentId+"/report/";
            return $http.post(url,report)
                .then(function(response){
                    return response.data;
                });
            // page._id = (new Date()).getTime() + "";
            // pages.push(page);
            // return page;
        }

        function updateReport(userId,appointmentId,reportId,report){
            var url = "/api/user/"+userId+ "/appointment/"+appointmentId+"/report/"+reportId;
            return $http.put(url,report)
                .then(function(response){
                    return response;
                });
            // for (var p in pages){
            //     if (pages[p]._id === pageId){
            //         pages[p]=page;
            //         return pages[p];
            //     }
            // }
        }

        function deleteReport(userId,appointmentId,reportId) {
            var url = "/api/user/"+userId+ "/appointment/"+appointmentId+"/report/"+reportId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
            // for (var p in pages) {
            //     if (pages[p]._id === pageId) {
            //     pages.splice(p,1);
            //     return;
            //     }
            // }
        }

    }

})();