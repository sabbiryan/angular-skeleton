"use strict";

angular.module("authApp")
    .factory("AuthenticationService", [
        "$q", "$http", "$timeout", "UserDataService", "LocalStorageService",
        function($q, $http, $timeout, UserDataService, LocalStorageService) {

            return {
               
                authenticate: function(identity) {

                    if (LocalStorageService.getUserIsLoggedIn()) return true;

                    if (identity) {
                        var isloginSuccess = UserDataService.isValidUser(identity);
                        if (isloginSuccess) return true;
                    }

                    LocalStorageService.clearUserInfo();

                    return false;
                }
               
            }
        }
    ])

    
    .factory("AuthorizationService", [
        "$rootScope", "$state", "AuthenticationService", "PermissionDataService", "LocalStorageService",
        function ($rootScope, $state, AuthenticationService, PermissionDataService, LocalStorageService) {

            return {

                authorize: function (toState) {

                    //var userInfo = LocalStorageService.getUserInfo();
                    //var permission = PermissionDataService.checkUserPermission(userInfo, toState);

                    var permission = PermissionDataService.checkUserTokenBasedPermission(toState);

                    return permission;
                }
            };
        }
    ]);
