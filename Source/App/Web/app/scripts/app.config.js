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
                .state("app", {
                    abstract: true,
                    url: "",
                    template: "<div ui-view class=\"container-fluid slide\"></div>",
                    controller : "AppController"
                })
                .state("app.about", {
                    url: "/about",
                    views: {
                        "": {
                            templateUrl: "views/about/about.tpl.html",
                            controller: "AboutController"
                        }
                    }
                })
                .state("app.contact", {
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
        function ($rootScope, $state, $stateParams, AuthenticationService, AuthorizationService) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;


            $rootScope.$on("$stateChangeStart", function(event, toState, toStateParams) {

                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;

                var isLogin = toState.name === "app.login";
                if (isLogin) return;

                var isAccessDenied = toState.name === "app.accessdenied";
                if (isAccessDenied) return;


                if (AuthenticationService.authenticate()) {
                    if (!AuthorizationService.authorize(toState)) {
                        event.preventDefault();
                        $state.go("app.accessdenied");
                    }
                } else {
                    event.preventDefault();
                    $state.go("app.login");
                }


            });
        }
    ]);
