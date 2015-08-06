'use strict';

var appModuleMicro = angular.module('microModule', [
    'ui.router',
    'angularFileUpload'
]);

appModuleMicro.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.when("", "/");

    $locationProvider.html5Mode(false); 
}]);

appModuleMicro.run(['$templateCache', '$rootScope', '$state', '$stateParams', 
        function ($templateCache, $rootScope, $state, $stateParams) {

            var view = angular.element('#ui-view');
            $templateCache.put(view.data('tmpl-url'), view.html());

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            if (!$state.name) {
                $state.go('microCreate');
            }

            $rootScope.$on('$routeChangeStart', function (evt, next, current) {
                console.log('routeChangeStart');
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.layout = toState.layout;
            });
        }]);
