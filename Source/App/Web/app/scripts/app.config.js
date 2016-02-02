"use strict";


angular.module("app", ["ui.router", "ngResource", "ngAnimate", "ngGrid", "ui.bootstrap"])
    .config([
        "$urlRouterProvider", "$stateProvider",
        function($urlRouterProvider, $stateProvider) {

            $urlRouterProvider
                .when("/home", "/")
                .when("/dashboard", "/")                
                .otherwise("/");


            $stateProvider
                .state("root", {
                    abstract: true,
                    url: "",
                    template: "<div ui-view class=\"container-fluid slide\"></div>",
                    controller : "AppController"
                })
                .state("root.about", {
                    url: "/about",
                    views: {
                        "": {
                            templateUrl: "views/about/about.tpl.html",
                            controller: "AboutController"
                        }
                    }
                })
                .state("root.contact", {
                    url: "/contact",
                    views: {
                        "": {
                            templateUrl: "views/contact/contact.tpl.html",
                            controller: "ContactController"
                        }
                    }
                });
        }
    ])
    .run([
        "$rootScope", "$state", "$stateParams", "AuthenticationService", "AuthorizationService",
        function ($rootScope, $state, $stateParams, authenticationService, authorizationService) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;


            $rootScope.$on("$stateChangeStart", function(event, toState, toStateParams) {

                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;

                var isLogin = toState.name === "root.login";
                if (isLogin) return;

                var isAccessDenied = toState.name === "root.accessdenied";
                if (isAccessDenied) return;


                if (authenticationService.authenticate()) {
                    if (!authorizationService.authorize(toState)) {
                        event.preventDefault();
                        $state.go("root.accessdenied");
                    }
                } else {
                    event.preventDefault();
                    $state.go("root.login");
                }


            });
        }
    ]);
