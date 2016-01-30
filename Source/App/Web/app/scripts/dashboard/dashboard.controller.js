"use strict";

angular.module("app")
    .controller("DashboardController", [
        "$scope",
        function($scope) {
            $scope.myData = [
                { Id: 1, Date: new Date().toLocaleDateString(), Status: { Name: "Status Value" } },
            ];

            var columnDefs = [
                {
                    field: "Id",
                    displayName: "Id",
                    cellTemplate: "<div  ng-click=\"detail(row.entity)\" style=\"padding-left: 5px\" ng-bind=\"row.getProperty(col.field)\"></div>"
                },
                { field: "Date", displayName: "Date" },
                //{ field: "StatusId", displayName: "Status" },
                {
                    field: "Status.Name",
                    displayName: "Status"
                }
            ];

            $scope.gridOptions = {
                data: "myData",
                columnDefs: columnDefs,
                //enablePinning: true,
                multiSelect: false,
                selectedItems: $scope.mySelections,
                //enableCellSelection: true,
                enableRowSelection: true
            }

            $scope.detail = function (row) {
                $state.go("dashboard.detail", { id: row.Id });
            }
        }
    ]);