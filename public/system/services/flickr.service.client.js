/**
 * Created by prasadtajane on 8/6/17.
 */
(function () {
    angular
        .module("WamApp")
        .factory("flickrService",flickrService);

    function flickrService($http) {
        var key = "a3b7589fe9025dd1505d7ff171ba0373";
        var secret = "1e125bb9c810c36c";
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=" + key +"&text=";

        var api= {
            "searchPhotos": searchPhotos,
            "updatePhoto": updatePhoto
        };

        return api;

        function updatePhoto(userId,websiteId,pageId,widgetId,photoWidgetUrl){
            var url = "/api/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.put(url,photoWidgetUrl)
                .then(function(response){
                    return response.data;
                });
        }

        function searchPhotos(searchTerm) {
            console.log("In The Search Term");
            url = url + searchTerm;
            console.log("URL - " + url);
            return $http.get(url);
        }

    }


})();