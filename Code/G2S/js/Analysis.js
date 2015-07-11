'use strict';

var analysisModule = angular.module('app.analysis', []);

analysisModule.controller('AnalysisController', ['$scope', '$state', 'AnalysisProvider', function ($scope, $state, AnalysisProviderUrl) {
    $scope.Analysis={
        OCID: 1,
        Type: 2,
        StartDate: '2014-10-01',
        EndDate: '2015-2-28',
        TopCount: 5
    };
    $scope.timespan = 1;
    //统计在线学生列表
    var OnLineStudentCount_Get = function () {
        var url = AnalysisProviderUrl + "/OnLineStudentCount_Get";
        var param = { model: $scope.Analysis };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OnLineStudentCount_List = data.d;
            }
        });
    }
    OnLineStudentCount_Get();
    //统计在线学生列表
    var StudentLiveness_Get = function () {
        var url = AnalysisProviderUrl + "/StudentLiveness_Get";
        var param = { model: $scope.Analysis };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.StudentLiveness_List = data.d;
            }
        });
    }
    StudentLiveness_Get();
}])