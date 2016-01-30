"use strict";

angular.module("app")
    .service("UserRoleDataService", [
        function() {
            return {
                get: function() {
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