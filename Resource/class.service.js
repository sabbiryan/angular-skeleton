angular.module('vt.course').service('classService', ['$resource', '$q', 'appService',
    function classService($resource, $q, appService) {
        var get = function (id) {
            var deferred = $q.defer();
            var resource = $resource(appService.baseUrl + 'Class');
            resource.get({ id: id },
                function (response) {                    
                    return deferred.resolve(response);
                },
                function (error) {
                    //console.log(error);
                    return deferred.reject(error);
                });
            return deferred.promise;
        }
         
        return {
            get: get         
        }
    }]);
