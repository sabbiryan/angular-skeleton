'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'ngResource'])
    .config([
        '$routeProvider',
        function($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'views/dashboard/dashboard.tpl.html',
                    controller: 'DashboardController'
                })
                //.when('/student-list', {
                //    templateUrl: 'views/student/student-list/student-list.tpl.html',
                //    controller: 'StudentListController'
                //})
                //.when('/student-manage', {
                //    templateUrl: 'views/student/student-manage/student-manage.tpl.html',
                //    controller: 'StudentManageController'
                //})
                .when('/about', {
                    templateUrl: 'views/about/about.tpl.html',
                    controller: 'AboutController'
                })
                .when('/contact', {
                    templateUrl: 'views/contact/contact.tpl.html',
                    controller: 'ContactController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
