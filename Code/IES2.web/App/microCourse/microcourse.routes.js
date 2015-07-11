
'use strict';

angular.module('microCourseModule').config(['$stateProvider', function(
  $stateProvider) {

  $stateProvider
    .state('courseView', {
      url: '/course/view',
      templateUrl: '/app/microcourse/views/course.view.html',
      controller: 'CourseViewController'
    })
    .state('courseSubmit', {
      url: '/course/submit',
      templateUrl: '/app/microcourse/views/course.submit.html',
      controller: 'CourseSubmitController'
    })
    .state('courseFinished', {
      url: '/course/finished',
      templateUrl: '/app/microcourse/views/course.finished.html',
      controller: 'CourseFinishedController'
    })
    .state('course', {
      abstract: true,
      url: '/course',
      templateUrl: '/app/microcourse/views/course.base.html',
      controller: 'CourseBaseController'
    })
    .state('course.create', {
      url: '/create',
      templateUrl: '/app/microcourse/views/course.create.html',
      controller: 'CourseCreateController'
    })
    .state('course.test', {
      url: '/test',
      templateUrl: '/app/microcourse/views/course.test.html',
      controller: 'CourseTestController'
    })
    .state('course.overview', {
      url: '/overview',
      templateUrl: '/app/microcourse/views/course.overview.html',
      controller: 'CourseOverviewController'
    })
    .state('course.publish', {
      url: '/publish',
      templateUrl: '/app/microcourse/views/course.publish.html',
      controller: 'CoursePublishController'
    })
}]);
