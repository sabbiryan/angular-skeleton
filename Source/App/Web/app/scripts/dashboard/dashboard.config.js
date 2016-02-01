﻿"use strict";

angular.module("app")
    .config([
        "$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state("root.dashboard", {
                    url: "/",
                    views: {
                        "": {
                            templateUrl: "views/dashboard/dashboard.tpl.html",
                            controller: "DashboardController"
                        }
                    }
                });
        }
    ]);