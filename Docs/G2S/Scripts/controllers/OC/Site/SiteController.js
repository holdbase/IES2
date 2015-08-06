'use strict';
var siteModule = angular.module('app.site', []);

siteModule.controller('SiteController', ['$scope', '$state', 'SiteProviderUrl', function ($scope, $state, siteProviderUrl) {
    $scope.txt_name = "2222222222222222";
    ///登录验证
    $scope.login = function (userName, password) {
        alert(1);
    }


}]);

