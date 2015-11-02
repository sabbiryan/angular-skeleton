"use-strict";

angular.module("myApp")
    .controller("StudentController", [
        "$scope", "Students",
        function ($scope, Students) {

            $scope.students = Students;
        }
    ]);