"use strict";


// Declare app level module which depends on filters, and services
angular.module("myApp", ["ui.router", "ngResource"])
    .run([
        "$rootScope", "$state", "$stateParams",
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .config([
        "$urlRouterProvider", "$stateProvider",
        function($urlRouterProvider, $stateProvider) {

            $urlRouterProvider
                .when("/d", "/")
                .when("/s", "/students")
                .when("/a", "/about")
                .when("/c", "/contact")
                .otherwise("/");

            $stateProvider
                .state("dashboard", {
                    url: "/",
                    templateUrl: "views/dashboard/dashboard.tpl.html",
                    controller: "DashboardController"
                })                
                .state("about", {
                    url: "/about",
                    templateUrl: "views/about/about.tpl.html",
                    controller: "AboutController"
                })
                .state("contact", {
                    url: "/contact",
                    templateUrl: "views/contact/contact.tpl.html",
                    controller: "ContactController"
                });
        }
    ]);
