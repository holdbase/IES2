'use strict';

angular.module('commonModule', []);

angular.module('componentModule', ['commonModule']);

angular.module('homeModule', []);

angular.module('microCourseModule', []);

angular.module('filterModule', [])

angular.module('directiveModule', []);

angular.module('app', [
    'ui.router'
    , 'ui.bootstrap'
    , 'checklist-model'
    , 'ngCookies'
    , 'commonModule'
    , 'componentModule'
    , 'microCourseModule'
    , 'directiveModule'
    , 'filterModule'
]);
