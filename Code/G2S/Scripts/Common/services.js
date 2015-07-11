
'use strict';

var aService = angular.module('app.services', ['ngCookies']);

aService.value('version', '0.1');

aService.constant('projectName', '我的项目');

aService.constant('homeProviderUrl', '/DataProvider/Home/HomeProvider.aspx');

aService.constant('studentProviderUrl', '/DataProvider/Home/StudentProvider.aspx');

aService.constant('noticeProviderUrl', '/DataProvider/Home/NoticesProvider.aspx');

aService.constant('courseindexProviderUrl', '/DataProvider/OC/CourseIndexProvider.aspx');

aService.constant('userProviderUrl', '/DataProvider/UserProvider.aspx');

aService.constant('siteProviderUrl', '/DataProvider/OC/Site/SiteProvider.aspx');

aService.constant('fcProviderUrl', '/DataProvider/OC/FC/FCProvider.aspx');

aService.constant('fcSProviderUrl', '/DataProvider/OC/FC/FCSProvider.aspx');


aService.constant('fcAddProviderUrl', '/DataProvider/OC/FC/FCAddProvider.aspx');

aService.constant('teamProviderUrl', '/DataProvider/OC/Team/TeamProvider.aspx');

aService.constant('classProviderUrl', '/DataProvider/OC/Class/ClassProvider.aspx');

aService.constant('scoreProviderUrl', '/DataProvider/CourseLive/Score/ScoreProvider.aspx');

aService.constant('UserPermission', '/DataProvider/User/UserProvider.aspx');

aService.constant('moocProviderUrl', '/DataProvider/OC/MOOC/MOOCProvider.aspx');

aService.constant('forumProviderUrl', '/DataProvider/CourseLive/Forum/ForumProvider.aspx');

aService.constant('testProviderUrl', '/DataProvider/CourseLive/Test/TestProvider.aspx');
aService.constant('everyWorkProviderUrl', '/DataProvider/CourseLive/Test/EveryWorkProvider.aspx');
aService.constant('studentworklistproviderurl', '/DataProvider/CourseLive/Test/StudentWorkListProvider.aspx');
aService.constant('MarkingProviderUrl', '/DataProvider/CourseLive/Test/MarkingProvider.aspx');

aService.constant('MOOCPreviewProviderUrl', '/DataProvider/OC/MOOC/MOOCPreview.aspx');
aService.constant('affairsProviderUrl', '/DataProvider/Affairs/AffairsProvider.aspx');
aService.constant('studyprogressProviderUrl', '/DataProvider/CourseLive/StudyProgress/StudyProgressProvider.aspx');
aService.constant('sitepreviewProviderUrl', '/DataProvider/OC/Site/SitePreviewProvider.aspx');
aService.constant('uploadfileProviderUrl', '/DataProvider/UploadFile.aspx');

aService.constant('surveyProviderUrl', '/DataProvider/CourseLive/Survey/SurveyProvider.aspx');
aService.constant('PaperIndexProviderUrl', '/DataProvider/Resource/Paper/PaperIndexProvider.aspx');
///XHR调用


//路径前面加上 window.appPatch 可以解决网站发布后路径错误的问题,不影响本地访问
function getRootPath() {
    return window.appPatch;
}

aService.factory('baseService', ['$http', '$q', function ($http, $q) {

    var service = {};

    service.get = function (url, thenFn) {
        $http.get(getRootPath() + url).then(thenFn);
    }
    //异步post
    service.post = function (url, param, thenFn, errFn) {
        $http.post(getRootPath() + url, param)
            .success(function (data) { if (thenFn) { thenFn(data); } })
            .error(function (reason) { if (errFn) { errFn(reason); } });
    }
    //同步
    service.postPromise = function (url, param) {
        var deferred = $q.defer();

        $http.post(getRootPath()+url, param)
            .success(function (data) { deferred.resolve(data); })
            .error(function (reason) { deferred.reject(reason) });

        return deferred.promise;
    }

    service.runPromises = function (promises, thenFn) {
        $q.all(promises).then(function (results) {
            thenFn(results);
        });
    }

    //跨域
    service.jsonp = function (url, thenFn) {
        $http.jsonp(url)
            .success(function (data) {
                if (thenFn) {
                    thenFn(data);
                }
            })
    };
    return service;
}]);

