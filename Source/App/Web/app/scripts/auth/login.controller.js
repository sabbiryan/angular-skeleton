"use strict";

angular.module("app")
    .controller("LoginController", [
        "$rootScope", "$scope", "$state", "AuthenticationService",
        function ($rootScope, $scope, $state, authenticationService) {

            $scope.credentials = {
                Username: "",
                Password: ""
            };

            $scope.login = function(credentials) {

                var isLoggedInSuccess = authenticationService.authenticate($scope.credentials);

                if (isLoggedInSuccess) {

                    $rootScope.$broadcast('loggedIn');

                    if ($scope.returnToState)
                        $state.go($scope.returnToState.name, $scope.returnToStateParams);
                    else
                        $state.go("root.dashboard");

                } else {
                    $state.go("root.login", {}, { reload: true });                    
                }
            };

            
        }
    ]);