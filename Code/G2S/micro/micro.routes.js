
'use strict';

angular.module('microModule').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
       .state('home', {
          url: '/micro/views/microBase',
          templateUrl: '/micro/views/microBase'
      })
       .state('microCreate', {
          url: '/micro/create',
          templateUrl: '/micro/views/microCreate',
          controller: 'MicroCreateController'
      })
      .state('microTest', {
          url: '/micro/test',
          templateUrl: '/micro/views/microTest',
          controller: 'MicroTestController'
      })
      .state('microPublish', {
          url: '/micro/publish',
          templateUrl: '/micro/views/microPublish',
          controller: 'MicroPublishController'
      })
    //$stateProvider
    //  .state('microView', {
    //      url: '/micro/view',
    //      templateUrl: '/micro/views/micro.view.html',
    //      controller: 'MicroViewController'
    //  })
    //  .state('microSubmit', {
    //      url: '/micro/submit',
    //      templateUrl: '/micro/views/micro.submit.html',
    //      controller: 'MicroSubmitController'
    //  })
    //  .state('microFinished', {
    //      url: '/micro/finished',
    //      templateUrl: '/micro/views/micro.finished.html',
    //      controller: 'MicroFinishedController'
    //  })
    //  .state('micro', {
    //      abstract: true,
    //      url: '/micro',
    //      templateUrl: '/micro/views/micro.base.html',
    //      controller: 'MicroBaseController'
    //  })
    //  .state('micro.create', {
    //      url: '/create',
    //      templateUrl: '/views/Micro/microCreate',
    //      controller: 'MicroCreateController'
    //  })
    //  .state('micro.test', {
    //      url: '/test',
    //      templateUrl: '/micro/views/micro.test.html',
    //      controller: 'MicroTestController'
    //  })
    //  .state('micro.overview', {
    //      url: '/overview',
    //      templateUrl: '/micro/views/micro.overview.html',
    //      controller: 'MicroOverviewController'
    //  })
    //  .state('micro.publish', {
    //      url: '/publish',
    //      templateUrl: '/micro/views/micro.publish.html',
    //      controller: 'MicroPublishController'
    //  })
}]);
