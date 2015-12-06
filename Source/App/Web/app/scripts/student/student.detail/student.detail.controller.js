"use-strict";

angular.module("myApp")
    .controller("StudentDetailController", [
        "$scope", "$stateParams", "utils","$state",
        function ($scope, $stateParams, utils, $state) {
            $scope.id = $stateParams.studentId;

            $scope.test = "test";

            $scope.student = utils.findById($scope.students, $scope.id);

            $scope.edit = function (student) {
                $state.go("students.edit", {studentId: student.Id});
            };
        }
    ]);