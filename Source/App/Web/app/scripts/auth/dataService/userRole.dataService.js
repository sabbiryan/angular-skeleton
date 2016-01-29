"use strict";

angular.module("authApp")
    .service("UserRoleDataService", [
        function() {
            return {
                get: function() {
                    this.userRoles = [
                        { Id: 1, UserId: 1, RoleId: 1 },
                        { Id: 2, UserId: 1, RoleId: 2 },
                        { Id: 3, UserId: 2, RoleId: 2 },
                        { Id: 4, UserId: 3, RoleId: 3 },
                    ];

                    return this.userRoles;
                }
            }
        }
    ]);