'use strict';

angular.module('myApp')
    .service('StudentListService', [
        '$resource', '$q',
        function studentListService($resource, $q) {

            var get = function() {
                var deferred = $q.defer();

                /*var resource = $resource(appService.baseUrl + 'StudentList');
                resource.get(
                    function(response) {
                        return deferred.resolve(response);
                    },
                    function(error) {
                        console.log(error);
                        return deferred.reject(error);
                    }
                );*/

                //temporary resource start
                this.StudentList = [
                    { Id: 1, Name: "Student One", Phone: "01911831901", Address: "address 1", },
                    { Id: 2, Name: "Student Two", Phone: "01911831902", Address: "address 2", },
                    { Id: 3, Name: "Student Three", Phone: "01911831903", Address: "address 3", },
                    { Id: 4, Name: "Student Four", Phone: "01911831904", Address: "address 4", },
                    { Id: 5, Name: "Student Five", Phone: "01911831905", Address: "address 5", },
                    { Id: 6, Name: "Student Six", Phone: "01911831906", Address: "address 6", }
                ];

                deferred.resolve(this.StudentList);
                //temporary resource end

                return deferred.promise;
            }

            return {
                get: get
            }
        }
    ]);