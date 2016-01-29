"use strict";

angular.module("authApp")
    .service("PermissionDataService", [
        "LocalStorageService",
        function(LocalStorageService) {

            return {
                get: function() {
                    this.permissionList = [
                        { Id: 1, UserId: 1, RoleId: 1, Permission: "admin" },
                        { Id: 2, UserId: 1, RoleId: 1, Permission: "home" },
                        { Id: 3, UserId: 2, RoleId: 2, Permission: "home" },
                        { Id: 4, UserId: 3, RoleId: 3, Permission: "home" },
                        { Id: 5, UserId: 4, RoleId: 1, Permission: "admin" },
                    ];

                    return this.permissionList;
                },


                getUserPermissions: function(userInfo) {

                    var permissions = this.get();
                    var userPermission = [];

                    if (userInfo) {

                        for (var p in permissions) {
                            if (permissions[p].UserId === userInfo.Id && permissions[p].RoleId === userInfo.RoleId)
                                userPermission.push(permissions[p]);
                        }
                    }
                    return userPermission;
                },


                checkUserPermission: function(userInfo, permissionObject) {

                    var permissions = this.get();

                    if (userInfo && permissionObject) {

                        for (var p in permissions) {

                            if (permissions[p].UserId === userInfo.Id && permissions[p].RoleId === userInfo.RoleId && permissions[p].Permission === permissionObject.name)
                                return true;
                        }
                    }
                    return false;
                },


                checkUserTokenBasedPermission: function(permissionObject) {

                    var permissions = this.get();
                    var userInfo = LocalStorageService.getUserInfo();

                    if (permissionObject) {

                        for (var p in permissions) {

                            if (permissions[p].UserId === userInfo.Id && permissions[p].RoleId === userInfo.RoleId && permissions[p].Permission === permissionObject.name)
                                return true;
                        }
                    }
                    return false;
                }
            }
        }
    ]);