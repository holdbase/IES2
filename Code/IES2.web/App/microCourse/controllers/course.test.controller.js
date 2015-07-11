
'use strict';

angular.module('microCourseModule').controller('CourseTestController',
['$scope', '_modal', function($scope, _modal){

  $scope.showLibrary = function(){
    _modal.showModal('/app/microCourse/views/course.library.html', 'CourseLibraryController', 'lg');
  }

}]);


angular.module('microCourseModule').controller('CourseLibraryController',
['$scope', '$modalInstance', function($scope, $modalInstance){

  $scope.close = function () {
      $modalInstance.close();
  }

}]);
