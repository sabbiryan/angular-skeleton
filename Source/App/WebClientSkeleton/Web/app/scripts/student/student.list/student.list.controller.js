"use strict";


angular.module("myApp")
    .controller("StudentListController", [
        "$scope", "Students",
        function ($scope, Students) {
            $scope.Heading = "Student List";


            $scope.students = [];
            $scope.students = Students;


        }
    ]);



//angular.module("myApp")
//    .controller("StudentListController", [
//        "$scope", "StudentListService",
//        function ($scope, StudentListService) {
//            $scope.Heading = "Student List";

//            $scope.students = [];


//            StudentListService.get().then(function (response) {
//                $scope.students = response;
//            });


//        }
//    ]);
