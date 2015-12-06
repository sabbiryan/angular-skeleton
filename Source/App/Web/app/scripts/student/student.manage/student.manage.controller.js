"use strict";


angular.module("myApp")
    .controller("StudentManageController", [
        "$scope", "$state",
        function($scope, $state) {
            $scope.Heading = "Create Student";

            $scope.save = function(student) {
                alert(JSON.stringify(student));

                $state.go("students.list");
            };
        }
    ]);
