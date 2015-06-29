'use strict';


app.controller('DashboardCtrl', [
    '$scope', 'DashboardService',
    function($scope, dashboardService) {
        $scope.Heading = "Dashboard";


        $scope.students = [];

        $scope.data = dashboardService.getData();

        $scope.students = $scope.data.$$state.value;
    }
]);
