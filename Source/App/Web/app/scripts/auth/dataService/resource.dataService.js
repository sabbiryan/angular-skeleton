"use strict";


angular.module("authApp")
    .service("ResourceDataService", [
        function() {
            return {
                get: function() {

                    this.resources = [
                        { Id: 1, State: "home", Route: "", isPublic: true },
                        { Id: 1, State: "login", Route: "/login", isPublic: true },
                        { Id: 1, State: "admin", Route: "/admin", isPublic: false },
                    ];

                    return this.resources;
                }
            }
        }
    ]);