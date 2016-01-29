"use strict";

angular.module("authApp")
    .service("RoleDataService", [
         function() {
             return {
                 get: function () {
                     this.roles = [
                         { Id: 1, Name: "Admin" },
                         { Id: 2, Name: "Manager" },
                         { Id: 3, Name: "Customer" }
                     ];

                     return this.roles;
                 },

                 getUserRole: function(roleId) {

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