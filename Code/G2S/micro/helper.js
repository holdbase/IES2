'use strict';

var helper = angular.module('helperModule', []);

helper.factory('helper', ['$http', function ($http) {
    var service = {};

    //异步post
    service.ajaxPost = function (url, param, thenFn, errFn) {
        $http.post(getRootPath() + url, param)
            .success(function (data) { if (thenFn) { thenFn(data); } })
            .error(function (reason) { if (errFn) { errFn(reason); } });
    }

    return service;
}]);