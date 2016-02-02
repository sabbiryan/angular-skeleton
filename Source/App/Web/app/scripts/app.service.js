"use strict";

angular.module("app")
    .service("AppService", [
        function() {

        }
    ])
    .service("UrlService", [
        function() {
            var self = this;

            self.urls = {};
            self.urls.baseUrl = "http://localhost:5000/";
            self.urls.baseApi = "http://localhost:5000/api/";

            self.urls.token = self.urls.baseUrl + "token";
            self.urls.dashboard = self.urls.baseApi + "Dashboard";
            self.urls.home =  self.urls.baseApi + "Home";

            return self.urls;
        }
    ]);