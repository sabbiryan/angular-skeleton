'use strict';

app.service('DashboardService', [
    '$q', function($q) {

        this.Data = null;

        this.getData = function() {
            var deferred = $q.defer();
            if (this.Data == null) {

                this.Data = [
                    { Id: 1, Name: "Student One", Phone: "01911831901", Address: "address 1", },
                    { Id: 1, Name: "Student Two", Phone: "01911831902", Address: "address 2", },
                    { Id: 1, Name: "Student Three", Phone: "01911831903", Address: "address 3", },
                    { Id: 1, Name: "Student Four", Phone: "01911831904", Address: "address 4", },
                    { Id: 1, Name: "Student Five", Phone: "01911831905", Address: "address 5", },
                    { Id: 1, Name: "Student Six", Phone: "01911831906", Address: "address 6", }
                ];

                deferred.resolve(this.Data);

            } else {
                deferred.resolve(this.Data);
            }

            return deferred.promise;
        }
    }
]);