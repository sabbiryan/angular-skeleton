"use strict";

angular.module("app")
    .service("PermissionDataService", [
        "LocalStorageService",
        function(LocalStorageService) {

            return {
                get: function() {
                    this.permissionList = [
                        { Id: 1, UserId: 1, RoleId: 1, Permission: "root.dashboard" },
                        { Id: 2, UserId: 1, RoleId: 1, Permission: "root.login" },
                        { Id: 3, UserId: 1, RoleId: 1, Permission: "root.about" },
                        { Id: 4, UserId: 1, RoleId: 1, Permission: "root.contact" },
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