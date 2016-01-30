"use strict";

angular.module("app")
    .controller("AppController", [
        "$rootScope", "$scope", "$state", "$window", "LocalStorageService",
        function ($rootScope, $scope, $state, $window, LocalStorageService) {

            $scope.isLoggedIn = LocalStorageService.getUserIsLoggedIn();

            $scope.logout = function () {
                LocalStorageService.clearUserInfo();
                $scope.isLoggedIn = false;
                $rootScope.$broadcast('loggedOut');
                $state.go("app.login", {}, { reload: true });
            }

            $rootScope.$on('loggedIn', function (event, args) {
                console.log(event);
                $scope.isLoggedIn = LocalStorageService.getUserIsLoggedIn();
            });

            $rootScope.$on('loggedOut', function (event, args) {
                console.log(event);
            });

        }
    ]);