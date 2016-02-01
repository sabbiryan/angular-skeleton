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

            self.urls.baseUrl = "http://localhost:5000/api/";
            self.urls.dashboard = "http://localhost:5000/api/Dashboard";
            self.urls.home = "http://localhost:5000/api/Home";

            return self.urls;
        }
    ]);