'use strict';

var appModule = angular.module('app', [
    'ui.router',
    'app.filters',
    'app.directives',
    'app.services',
    'app.home',
    'app.home.student',
    'app.user',
    'app.site',
    'app.oc',
    'app.oc.team',
    'app.oc.class',
    'app.forum',
    'app.moocpreview',
    'app.affairs',
    'angularFileUpload',
    'app.oc.site.preview'
]);
// 'app.oc.team'
appModule.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider
        //index 
        .state('home', { url: '/Home/index', templateUrl: '/views/Home/index', controller: 'HomeController' })
        .state('studnethome', { url: '/Home/StudentIndex', templateUrl: '/views/Home/StudentIndex', controller: 'StudentController' })

        //登录
        .state('login', { url: '/login', layout: 'basic', templateUrl: '/views/User/Login', controller: 'UserController' })

        //注册
        .state('register', { url: '/register', templateUrl: '/views/User/Register', controller: 'UserController' })

        //用户管理-教学团队
        .state('Teamindex', { url: '/OC/Team/index', templateUrl: '/views/OC/Team/index', controller: 'TeamController' })
        .state('classlist', { url: '/OC/Class/index', templateUrl: '/views/OC/Class/index', controller: 'ClassController' })

        //教学小组管理
        .state('teachinggroup', { url: '/OC/Group/index', templateUrl: '/views/OC/Group/index.cshtml', controller: 'GroupController' })
        //.state('detail.ExpenseList', {
        //    url: '/ExpenseList',
        //    templateUrl: '/views/Finance/ExpenseList',
        //    controller: 'ExpenseListCtrl'
        //}) topicdetail

        //答疑论坛
        //.state('forumindex', { url: '/CourseLive/Forum/index', templateUrl: '/CourseLive/Forum/index', controller: 'ForumCtrl' })

        //.state('topicdetail', { url: '/CourseLive/Forum/topicdetail/:TopicID', templateUrl: '/CourseLive/Forum/topicdetail', controller: 'ForumTopicDetialCtrl' })

        //.state('topiclist', { url: '/CourseLive/Forum/topiclist', templateUrl: '/CourseLive/Forum/topiclist', controller: 'ForumCtrl' })

        //.state('Site', { url: '/OC/Site/index', templateUrl: '/views/OC/Site/index', controller: 'SiteController' })

        //.state('Site_data', { url: '/OC/Site/preview_data', templateUrl: '/views/OC/Site/preview_data', controller: 'SiteController' })
        //.state('Site_enter', { url: '/OC/Site/preview_enter', templateUrl: '/views/OC/Site/preview_enter', controller: 'SiteController' })
        //.state('Site_plan', { url: '/OC/Site/preview_plan', templateUrl: '/views/OC/Site/preview_plan', controller: 'SiteController' })

        //成绩类别管理
        .state('scoretype', { url: '/CourseLive/Score/ScoreType', templateUrl: '/views/CourseLive/Score/ScoreType', controller: 'ScoreTypeCtrl' })
        //成绩类别权重设置
        .state('scoreweight', { url: '/CourseLive/Score/ScoreWeight', templateUrl: '/views/CourseLive/Score/ScoreWeight', controller: 'ScoreWeightCtrl' })
        .state('scoremanageinfo', { url: '/CourseLive/Score/ScoreManageInfo', templateUrl: '/views/CourseLive/Score/ScoreManageInfo', controller: 'ScoreManageCtrl' })
        .state('scorewith', { url: '/CourseLive/Score/ScoreWith', templateUrl: '/views/CourseLive/Score/ScoreWith', controller: 'ScoreWithCtrl' })
        .state('scoreanalyse', { url: '/CourseLive/Score/ScoreAnalyse', templateUrl: '/views/CourseLive/Score/ScoreAnalyse', controller: 'ScoreAnalyseCtrl' })
        //翻转课堂首页
        .state('FC', { url: '/OC/FC/index', templateUrl: '/views/OC/FC/index', controller: 'FCController' })
        //新增翻转课堂step1
        .state('FCStep1', { url: '/OC/FC/step1', templateUrl: '/views/OC/FC/step1/:FCID', controller: 'FCAddController' })

        //.state('FCPreviewIndex', { url: '/OC/FC/FCPreviewIndex', templateUrl: '/views/OC/FC/FCPreviewIndex/:OCID', controller: 'FCLearnController' })

        //用户列表
        .state('userList', { url: '/userList', templateUrl: '/views/User/UserList', controller: 'UserListController' })
        //MOOC首页
        .state('MOOC', { url: '/OC/MOOC/index', templateUrl: '/views/OC/MOOC/index', controller: 'MOOCController' })

        //获得资料
        .state('MyResource', { url: '/OC/MOOC/MyResource', templateUrl: '/views/OC/MOOC/MyResource', controller: 'MyResourceController' })

        ////测试
        //.state('Test', { url: '/CourseLive/Test/index', templateUrl: '/views/CourseLive/Test/index', controller: 'TestController' })
        ////新增测试
        //.state('TestAdd', { url: '/CourseLive/Test/testAdd', templateUrl: '/views/CourseLive/Test/testAdd', controller: 'TestAddController' })

        .state('AffairsIndex', { url: '/Affairs/affairsindex', templateUrl: '/views/Affairs/AffairsIndex', controller: 'AffairsController' })

        //问卷调查
        .state('Survey', { url: '/CourseLive/Survey/index', templateUrl: '/views/CourseLive/Survey/index', controller: 'SurveyController' })
        //证书
        .state('Certificate', { url: '/Certificate/Default', templateUrl: '/views/Certificate/Default', controller: '' })



        //课程笔记
        .state('Notes', { url: '/CourseLive/Notes/index', templateUrl: '/views/CourseLive/Notes/index', controller: '' })


        //学习进度 ?
        .state('LearningPace', { url: '/LearningPace/index', templateUrl: '/views/LearningPace/index', controller: 'LearningPaceController' })
        //学习进度
        .state('StudyProgress', { url: '/CourseLive/StudyProgress/index', templateUrl: '/views/CourseLive/StudyProgress/index', controller: 'StudyProgressController' })

       .state('CourseRun', { url: '/Analysis/Student', templateUrl: '/views/Analysis/Student', controller: 'CourseRunController' })
        //新增作业
        //.state('HomeWorkAdd', { url: '/CourseLive/Test/HomeWorkAdd', templateUrl: '/views/CourseLive/Test/HomeWorkAdd', controller: 'HomeWorkAddController' })
        //新增考试
        .state('PaperAdd', { url: '/Resource/Paper/PaperAdd', templateUrl: '/views/Resource/Paper/PaperAdd', controller: 'PaperAddController' })
        //浏览试卷
        .state('BrowsePaper', { url: '/Resource/Paper/BrowsePaper', templateUrl: '/views/Resource/Paper/BrowsePaper', controller: 'BrowsePaperController' })
 
        .state('otherwise', {
            url: '*path',
            templateUrl: '/views/404',
            controller: 'Error404Ctrl'
        });

    $locationProvider.html5Mode(false);

}])

    .run(['$templateCache', '$rootScope', '$state', '$stateParams', 'baseService',
        function ($templateCache, $rootScope, $state, $stateParams, baseService) {

            var view = angular.element('#ui-view');
            $templateCache.put(view.data('tmpl-url'), view.html());

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.baseService = baseService;

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.layout = toState.layout;
            });

            $rootScope.$on('$locationChangeStart', function (event) {
            })
        }]);


