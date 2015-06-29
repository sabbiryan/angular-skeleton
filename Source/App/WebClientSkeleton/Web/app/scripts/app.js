'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
    'ngRoute',
    'ngResource'
]);

app.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'views/dashboard/dashboard.tpl.html', controller: 'DashboardCtrl' });
        $routeProvider.when('/student-list', { templateUrl: 'views/student/student-list/student-list.tpl.html', controller: 'StudentListCtrl' });
        $routeProvider.when('/student-manage', { templateUrl: 'views/student/student-manage/student-manage.tpl.html', controller: 'StudentManageCtrl' });
        $routeProvider.when('/about', { templateUrl: 'views/about/about.tpl.html', controller: 'AboutCtrl' });
        $routeProvider.when('/contact', { templateUrl: 'views/contact/contact.tpl.html', controller: 'ContactCtrl' });
        $routeProvider.otherwise({ redirectTo: '/' });
    }
]);
