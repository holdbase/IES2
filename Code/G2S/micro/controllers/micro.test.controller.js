
'use strict';

angular.module('microModule').controller('MicroTestController',
['$scope', '_modal', function($scope, _modal){

  $scope.showLibrary = function(){
    _modal.showModal('/app/microCourse/views/course.library.html', 'CourseLibraryController', 'lg');
  }

}]);


angular.module('microModule').controller('MicroLibraryController',
['$scope', '$modalInstance', function($scope, $modalInstance){

  $scope.close = function () {
      $modalInstance.close();
  }

}]);
