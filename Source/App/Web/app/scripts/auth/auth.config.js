"use strict";

angular.module("authApp")
    .config([
        "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRoutterProvider) {
            $stateProvider
                .state("login", {
                    parent: "site",
                    url: "/login",
                    resolve: {
                        Roles : ["RoleDataService", 
                            function(RoleDataService) {
                                return RoleDataService.get();
                            }
                        ]
                    },
                    views: {
                        '': {
                            templateUrl: "views/auth/login.tpl.html",
                            controller: "LoginController"
                        }
                    }
                })
                .state("admin", {
                    parent: "site",
                    url: "/admin",                   
                    views: {
                        '': {
                            templateUrl: "views/admin/admin.tpl.html"
                        }
                    }
                })
                .state("denied", {
                    parent: "site",
                    url: "/access-denied",                   
                    views: {
                        '': {
                            templateUrl: "views/auth/denied.tpl.html"
                        }
                    }
                });

        }
    ]);