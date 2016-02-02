"use strict";

angular.module("app")
    .service("RoleDataService", [
         function () {
             return {
                 get: function () {
                     this.roles = [
                         { Id: 1, Name: "Admin" },
                         { Id: 2, Name: "Manager" },
                         { Id: 3, Name: "Customer" }
                     ];

                     return this.roles;
                 },

                 getUserRole: function (roleId) {

                     var roles = this.get();

                     for (var r in roles) {
                         if (roles.hasOwnProperty(r)) {
                             if (roles[r].Id === roleId)
                                 return roles[r];
                         }
                     }

                     return null;
                 }
             }
         }
    ]);


angular.module("app")
    .service("UserDataService", [
        "$q", "$http", "RoleDataService", "LocalStorageService",
        function ($q, $http, roleDataService, localStorageService) {

            return {
                get: function () {
                    this.userList = [
                        { Id: 1, Name: "Suepr Admin", Username: "admin", Password: "admin", RoleId: 1 },
                    ];

                    return this.userList;
                },

                isValidUser: function (user) {

                    if (user) {
                        var userList = this.get();

                        for (var u in userList) {
                            if (userList.hasOwnProperty(u)) {
                                if (userList[u].Username === user.Username && userList[u].Password === user.Password) {

                                    userList[u].IsLogin = true;
                                    userList[u].Token = "ABFH^456DFJUIFDKSKNAKJHEBHR";

                                    localStorageService.setUserInfo(userList[u]);

                                    return true;
                                }
                            }
                        }

                        return undefined;
                    }
                }
            }
        }
    ]);




angular.module("app")
    .service("UserRoleDataService", [
        function () {
            return {
                get: function () {
                    this.userRoles = [
                        { Id: 1, UserId: 1, RoleId: 1 },
                        { Id: 2, UserId: 1, RoleId: 2 },
                        { Id: 3, UserId: 1, RoleId: 3 },
                    ];

                    return this.userRoles;
                }
            }
        }
    ]);



angular.module("app")
    .service("ResourceDataService", [
        function () {
            return {
                get: function () {

                    this.resources = [
                        { Id: 1, State: "root.dashboard", Route: "", isPublic: true },
                        { Id: 2, State: "root.login", Route: "/login", isPublic: true },
                        { Id: 3, State: "root.about", Route: "/about", isPublic: true },
                        { Id: 4, State: "root.contact", Route: "/contact", isPublic: true },
                    ];

                    return this.resources;
                }
            }
        }
    ]);



angular.module("app")
    .service("PermissionDataService", [
        "LocalStorageService",
        function (localStorageService) {

            return {
                get: function () {
                    this.permissionList = [
                        { Id: 1, UserId: 1, RoleId: 1, Permission: "root.dashboard" },
                        { Id: 2, UserId: 1, RoleId: 1, Permission: "root.login" },
                        { Id: 3, UserId: 1, RoleId: 1, Permission: "root.about" },
                        { Id: 4, UserId: 1, RoleId: 1, Permission: "root.contact" },
                    ];

                    return this.permissionList;
                },


                getUserPermissions: function (userInfo) {

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


                checkUserPermission: function (userInfo, permissionObject) {

                    var permissions = this.get();

                    if (userInfo && permissionObject) {

                        for (var p in permissions) {

                            if (permissions[p].UserId === userInfo.Id && permissions[p].RoleId === userInfo.RoleId && permissions[p].Permission === permissionObject.name)
                                return true;
                        }
                    }
                    return false;
                },


                checkUserTokenBasedPermission: function (permissionObject) {

                    var permissions = this.get();
                    var userInfo = localStorageService.getUserInfo();

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