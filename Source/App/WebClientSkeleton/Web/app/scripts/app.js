"use strict";


// Declare app level module which depends on filters, and services
angular.module("myApp", ["ui.router", "ngResource"])
    .config([
        "$urlRouterProvider", "$stateProvider",
        function($urlRouterProvider, $stateProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("dashboard", {
                    url: "/",
                    templateUrl: "views/dashboard/dashboard.tpl.html",
                    controller: "DashboardController"
                })
                .state("studentList", {
                    url: "/student-list",
                    templateUrl: "views/student/student-list/student-list.tpl.html",
                    controller: "StudentListController",
                    resolve: {
                        Students: ["StudentListService", function(studentListService) {
                            return studentListService.get();
                        }]
                    }
                })
                .state("studentManage", {
                    url: "/student-manage",
                    templateUrl: "views/student/student-manage/student-manage.tpl.html",
                    controller: "StudentManageController"
                })
                .state("about", {
                    url: "/about",
                    templateUrl: "views/about/about.tpl.html",
                    controller: "AboutController"
                })
                .state("contact", {
                    url: "/contact",
                    templateUrl: "views/contact/contact.tpl.html",
                    controller: "ContactController"
                });
        }
    ]);
