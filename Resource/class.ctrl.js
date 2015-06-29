angular.module('vt.course').controller('classController', ['$rootScope', '$scope', '$routeParams', '$location', 'classService', function classController($rootScope, $scope, $routeParams, $location, classService) {

    $scope.content = { Type:0};
    $scope.showVideo = true;

    function init() {

        var id = $routeParams.id;
        classService.isUnlocked(id).then(function (response1) {        
            if (response1.IsSuccess) {
                classService.get(id).then(function (response) {
                    console.log(response);
                    if (response.IsSuccess) {
                        $scope.content = response.Data;
                        if ($scope.content.Type === 2) {
                            $scope.loadQuiz();
                        }   
                        else if ($scope.content.VideoUrl) {                         
                            setTimeout(function() {
                                wistiaEmbed = Wistia.embed($scope.content.VideoUrl, {
                                    videoFoam: true
                                });
                            },500);                            
                        }                        
                    }
                  
                });
            } else {
                alert('The requested content is not unlocked yet.');
                $location.path('/');
            }
        }, function (response2) {
            console.log(response2);
            alert(response2.Message);
            $location.path('/');
        });
    }


    init();     
}]);