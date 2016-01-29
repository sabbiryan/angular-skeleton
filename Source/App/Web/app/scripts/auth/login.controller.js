"use strict";

angular.module("authApp")
    .controller("LoginController", [
        "$rootScope", "$scope", "$state", "AuthenticationService",
        function ($rootScope, $scope, $state, AuthenticationService) {

            $scope.credentials = {
                Username: "",
                Password: ""
            };

            $scope.login = function(credentials) {

                var isLoggedInSuccess = AuthenticationService.authenticate($scope.credentials);

                if (isLoggedInSuccess) {

                    $rootScope.$broadcast('loggedIn');

                    if ($scope.returnToState)
                        $state.go($scope.returnToState.name, $scope.returnToStateParams);
                    else
                        $state.go("home");

                } else {
                    $state.go("login", {}, { reload: true });                    
                }
            };

            
        }
    ]);