"use strict";

angular.module("app")
    .factory("AuthenticationService", [
        "$q", "$http", "$timeout", "UserDataService", "LocalStorageService",
        function($q, $http, $timeout, userDataService, localStorageService) {

            return {
               
                authenticate: function(identity) {

                    if (localStorageService.getUserIsLoggedIn()) return true;

                    if (identity) {
                        var isloginSuccess = userDataService.isValidUser(identity);
                        if (isloginSuccess) return true;
                    }

                    localStorageService.clearUserInfo();

                    return false;
                }
               
            }
        }
    ])

    
    .factory("AuthorizationService", [
        "$rootScope", "$state", "AuthenticationService", "PermissionDataService", "LocalStorageService",
        function ($rootScope, $state, authenticationService, permissionDataService, localStorageService) {

            return {

                authorize: function (toState) {

                    //var userInfo = LocalStorageService.getUserInfo();
                    //var permission = PermissionDataService.checkUserPermission(userInfo, toState);

                    var permission = permissionDataService.checkUserTokenBasedPermission(toState);

                    return permission;
                }
            };
        }
    ]);
