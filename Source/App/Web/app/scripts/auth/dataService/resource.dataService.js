"use strict";


angular.module("app")
    .service("ResourceDataService", [
        function() {
            return {
                get: function() {

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