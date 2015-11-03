"use-strict";

angular
    .module("myApp")
    .config([
        "$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state("students", {
                    abstract: true,
                    url: "/students",
                    templateUrl: "views/student/student.tpl.html",
                    controller: "StudentController",
                    resolve: {
                        Students: [
                            "StudentListService", function(studentListService) {
                                return studentListService.get();
                            }
                        ]
                    }
                })
                .state("students.list", {
                    url: "",
                    templateUrl: "views/student/student.list/student.list.tpl.html"
                })
                .state("students.list.grid", {
                    url: "/gridview",
                    views: {
                        'nggrid@students': {
                            templateUrl: "views/student/student.list/student.list.grid.html",
                            controller: ["$scope", function($scope) {

                                $scope.data = $scope.students;

                                $scope.mySelections = [];

                                $scope.gridOptions = {
                                    data: "data",
                                    columnDefs: [
                                        {
                                            field: "Id",
                                            displayName: "ID",
                                            cellTemplate: '<div ng-class="{green: row.getProperty(col.field) > 4}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>',
                                            enableCellEdit: false,

                                            width: 120, pinned: true
                                        },
                                        { field: "Name", displayName: "NAME", enableCellEdit: true, width: 120, pinned: true },
                                        { field: "Phone", displayName: "PHONE", enableCellEdit: true, width: 120, pinned: true },
                                        { field: "Address", displayName: "ADDRESS", enableCellEdit: true, width: 120, pinned: true }
                                    ],
                                    showGroupPanel: true,
                                    jqueryUIDraggable: true,

                                    rowTemplate: '<div style="height: 100%" ng-class="{green: row.getProperty(\'Id\') < 3}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                                        '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                                        '<div ng-cell></div>' +
                                        '</div></div>',

                                    //jqueryUITheme: true,

                                    selectedItems: $scope.mySelections,
                                    //multiSelect: false,
                                    enableCellSelection: true,

                                    enableRowSelection: false,
                                    //enableCellEditOnFocus: true,
                                    enableCellEdit: true,

                                    enablePinning: true,
                                };
                            }]
                        }
                    }
                })
                .state("students.detail", {
                    url: "/{studentId:[0-9]{1,4}}",
                    views: {
                        '': {
                            templateUrl: "views/student/student.detail/student.detail.tpl.html",
                            controller: "StudentDetailController"
                        }
                    }
                })
                .state("students.edit", {
                    url: "/{studentId:[0-9]{1,4}}/edit",
                    views: {
                        '': {
                            templateUrl: "views/student/student.manage/student.manage.tpl.html",
                            controller: [
                                "$scope", "utils", "$stateParams", "$state",
                                function ($scope, utils, $stateParams, $state) {
                                $scope.isEdit = true;

                                $scope.id = $stateParams.studentId;

                                $scope.student = utils.findById($scope.students, $scope.id);

                                $scope.Heading = $scope.student.Name + " Edit";

                                $scope.update = function(student) {
                                    alert(JSON.stringify(student));

                                    $state.go("students.detail", {studentId: $scope.id});
                                }
                            }]
                        }
                    }
                })
                
                .state("students.create", {
                    url: "/create",
                    views: {
                        '': {
                            templateUrl: "views/student/student.manage/student.manage.tpl.html",
                            controller: "StudentManageController"
                        }
                    }
                });

        }
    ]);