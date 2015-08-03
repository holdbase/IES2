
'use strict';

angular.module('microModule').controller('MicroCreateController',
['$scope', '$state', function($scope, $state){
    $scope.go = function (stateName) {
        $state.go(stateName);
    }
}]);
