"use strict";

angular.module("app")
    .config([
        "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRoutterProvider) {
            $stateProvider
                .state("root.login", {
                    url: "/login",
                    views: {
                        '': {
                            templateUrl: "app/views/auth/login.tpl.html",
                            controller: "LoginController"
                        }
                    }
                })
                .state("root.accessdenied", {
                    url: "/access-denied",                   
                    views: {
                        '': {
                            templateUrl: "app/views/auth/access-denied.tpl.html"
                        }
                    }
                });

        }
    ]);