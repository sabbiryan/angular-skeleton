'use strict';


angular.module('myApp')
    .controller('StudentListController', [
        '$scope', 'StudentListService',
        function($scope, studentListService) {
            $scope.Heading = "Student List";


            $scope.students = [];

            studentListService.get().then(function(response) {
                $scope.students = response;
            });

            
        }
    ]);
