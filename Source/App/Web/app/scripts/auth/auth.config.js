"use strict";

angular.module("app")
    .config([
        "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRoutterProvider) {
            $stateProvider
                .state("app.login", {
                    url: "/login",
                    views: {
                        '': {
                            templateUrl: "views/auth/login.tpl.html",
                            controller: "LoginController"
                        }
                    }
                })
                .state("app.accessdenied", {
                    url: "/access-denied",                   
                    views: {
                        '': {
                            templateUrl: "views/auth/access-denied.tpl.html"
                        }
                    }
                });

        }
    ]);