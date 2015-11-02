"use-strict";

angular.module("myApp")
    .controller("StudentDetailController", [
        "$scope", "$stateParams", "utils",
        function ($scope, $stateParams, utils) {
            $scope.id = $stateParams.studentId;

            $scope.test = "test";

            $scope.student = utils.findById($scope.students, $scope.id);
        }
    ]);