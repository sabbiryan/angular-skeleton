"use strict";

angular.module("app")
    .controller("AppController", [
        "$rootScope", "$scope", "$state", "$window", "LocalStorageService",
        function ($rootScope, $scope, $state, $window, localStorageService) {

            $scope.isLoggedIn = localStorageService.getUserIsLoggedIn();

            $scope.logout = function () {
                localStorageService.clearUserInfo();
                $scope.isLoggedIn = false;
                $rootScope.$broadcast('loggedOut');
                $state.go("root.login", {}, { reload: true });
            }

            $rootScope.$on('loggedIn', function (event, args) {
                console.log(event);
                $scope.isLoggedIn = localStorageService.getUserIsLoggedIn();
            });

            $rootScope.$on('loggedOut', function (event, args) {
                console.log(event);
            });

        }
    ]);