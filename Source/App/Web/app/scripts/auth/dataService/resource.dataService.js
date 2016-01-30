"use strict";


angular.module("app")
    .service("ResourceDataService", [
        function() {
            return {
                get: function() {

                    this.resources = [
                        { Id: 1, State: "app.dashboard", Route: "", isPublic: true },
                        { Id: 2, State: "app.login", Route: "/login", isPublic: true },
                        { Id: 3, State: "app.about", Route: "/about", isPublic: true },
                        { Id: 4, State: "app.contact", Route: "/contact", isPublic: true },
                    ];

                    return this.resources;
                }
            }
        }
    ]);