'use strict';

var studnetModule = angular.module('app.home.student', []);
studnetModule.controller('StudentController', ['$scope', '$state', 'studentProviderUrl', function ($scope, $state, studentProviderUrl) {

    var strurl = (window.location.href).toLowerCase();
    var strsplit = strurl.split("/home/");
    var xmlUrl = strsplit[0] + "/Frameworks/config/SchoolCustom.xml";

    $scope.IsShowTeacherSpace = false;
    $scope.IsShowTeacherSpace = $G2S.GetACC3FP(xmlUrl, "isStudentSpace");
    $scope.StudentOC = {
        IsHistroy: 0    //0 学习中的课程  1 历史课程
    };
    $scope.PageSize = 2;

    $scope.PageIndex = 1;
    $scope.PagesNum = 1;

    $scope.HistoryPageIndex = 1;
    $scope.HistoryPagesNum = 1;

    $scope.OnLineList = null;//在学课程列表
    $scope.HistoryList = null; //历史课程列表

    $scope.OnLinePagesNumList = null;
    $scope.HistoryPagesNumList = null;

    $scope.MyOCNew = null;


    $scope.HUserSpce = 0;
    var GetUserSpace = function () {
        var url = studentProviderUrl + "/GetUserSpace";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {

            } else {
                $scope.HUserSpce = data.d;
                if ($scope.HUserSpce == 2 && (strsplit[1].split("?"))[0] == "studentindex") {// 教师空间
                    window.location.href = "../Home/index";
                }

            }
        });
    }

    GetUserSpace();




    //课学生程列表列表
    var GetStudentOCList = function (histroy) {
        var url = studentProviderUrl + "/StudentOC_List";
        var param = {
            ishistory: histroy,
            pageindex: 1,
            pagesize: 999
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length<=0) {
                if (histroy == 0) {
                    $scope.PageIndex = 1;
                } else {
                    $scope.HistoryPageIndex = 1;
                }
            } else {
                if (histroy == 0) {
                    $scope.OnLineList = data.d;
                    $scope.PagesNum = Math.ceil(data.d.length / $scope.PageSize);
                    initPageNum($scope.PagesNum, 0);
                } else {
                    $scope.HistoryList = data.d;
                    $scope.HistoryPagesNum = Math.ceil((data.d.length + 1) / $scope.PageSize);
                    initPageNum($scope.HistoryPagesNum, 1);
                }
            }
        });
    }

    //在读列表
    GetStudentOCList(0);
    //历史列表
    GetStudentOCList(1);
    //获取分页码
    ///history 0 在读 1 历史
    var initPageNum = function (PagesNum, history) {
        var pag = new Array();
        for (var i = 0; i < PagesNum; i++) {
            pag[i] = i + 1;
        }
        if (pag.length == 0) {
            pag[0] = 1;
        }
        if (history == 0) {
            $scope.OnLinePagesNumList = pag;
        } else {
            $scope.HistoryPagesNumList = pag;
        }
    }
    ///history 0 在读 1 历史
    $scope.ChangeHistroyTab = function (history) {
        $scope.StudentOC.IsHistroy = history;
        //GetStudentOCList(history);
    }
    ///history 0 在读 1 历史
    $scope.ChangeTab = function (myOC, showfirst) {
        myOC.ShowFirst = showfirst;
    }

    //分页  ///history 0 在读 1 历史   0上一页 1下一页
    $scope.GetPageList = function (move, history) {
        if (history == 0) {
            if (move == '0') {
                if ($scope.PageIndex > 1) {
                    $scope.PageIndex = $scope.PageIndex - 1;
                }
                else {
                    $scope.PageIndex = $scope.PagesNum;
                }
            }
            else {
                if ($scope.PageIndex < $scope.PagesNum) {
                    $scope.PageIndex = $scope.PageIndex + 1;
                }
                else {
                    $scope.PageIndex = 1;
                }
            }
        } else {
            if (move == '0') {
                if ($scope.HistoryPageIndex > 1) {
                    $scope.HistoryPageIndex = $scope.HistoryPageIndex - 1;
                }
                else {
                    $scope.HistoryPageIndex = $scope.HistoryPagesNum;
                }
            }
            else {
                if ($scope.HistoryPageIndex < $scope.HistoryPagesNum) {
                    $scope.HistoryPageIndex = $scope.HistoryPageIndex + 1;
                }
                else {
                    $scope.HistoryPageIndex = 1;
                }
            }
        }


    }
    //跳页
    $scope.JumpPage = function (num, history) {
        if (history == 0) {
            if (num >= 1 && num <= $scope.PagesNum) {
                $scope.PageIndex = num;
            }
            else {
                $scope.PageIndex = 1;
            }
        } else {
            if (num >= 1 && num <= $scope.HistoryPagesNum) {
                $scope.HistoryPageIndex = num;
            }
            else {
                $scope.HistoryPageIndex = 1;
            }

        }
    }

    $scope.set_Style = function (Rate) {
        var index = 100 - Rate;
        return { 'width': Rate + '%', 'z-index': index }

    }


    //点击课程图片继续学习
    $scope.GoOnLing = function (myOC) {
        //var strurl = (window.location.href).toLowerCase();
        //var strsplit = strurl.split("/home/");
        var url = "#";
        if (myOC.ShowFirst == 2 && myOC.IsShowMooc)//MOOC
        {
            url = strsplit[0] + "/OC/MOOC/Preview?OCID=" + myOC.OCID;
        }
        else if (myOC.ShowFirst == 3 && myOC.IsShowFC)//翻转课堂
        {
            url = strsplit[0] + "/OC/FC/FCPreviewIndex?OCID=" + myOC.OCID;
        }
        else {
            url = strsplit[0] + "/Site/Preview?currentoc=" + myOC.OCID;
        }
        //window.location.href = url;
        window.open(url);
    }

    //
    $scope.GoToMyMoocFC = function (OCID, ftype) {
        //var strurl = (window.location.href).toLowerCase();
        //var strsplit = strurl.split("/home/");
        var url = "#";
        if (ftype == 3) {
            url = strsplit[0] + "/OC/FC/FCPreviewIndex?OCID=" + OCID;
        }
        else {
            url = strsplit[0] + "/OC/MOOC/Preview?OCID=" + OCID;
            //window.location.href = url;
        }

        window.open(url);
    }

    //$scope.$on('ngGetStudentOCList', function (ngRepeatFinishedEvent) {
    //    $('.lecture_nav li').live('click', function () {
    //        var num = $(this).index();
    //        $(this).addClass('active').siblings().removeClass('active');
    //        $(this).parent().siblings('.lecture_r').eq(num).show().siblings('.lecture_r').hide();
    //    })
    //});

    //课程让是
    $scope.$on('ngGetOcList', function (ngRepeatFinishedEvent) {
        $('.img_tit').hover(function () {
            $(this).find('.course_detail').stop(true).animate({ top: 0 }, 500);
        }, function () {
            $(this).find('.course_detail').stop(true).animate({ top: '-150px' }, 500);
        })
        $('.icon_list li').hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
        }, function () {
            $(this).removeClass('active');
        })

        //首页课程鼠标经过动画
        $('.course_all>li').hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).find('p').stop(true).animate({ bottom: '32px' }, 300);
            $(this).find('.small_icon').stop(true).animate({ top: '65px' }, 300);
        }, function () {
            $(this).removeClass('active');
            $(this).find('p').stop(true).animate({ bottom: '0' }, 300);
            $(this).find('.small_icon').stop(true).animate({ top: '97px' }, 300);
        })


    });
    $scope.ShowCourse = false;
    $scope.SlideCourse = function () {
        $scope.ShowCourse = !$scope.ShowCourse;
        var $this = $("#ShowCourse");
        if (!$scope.ShowCourse) {
            $this.html('展开全部课程↓')
        } else {
            $this.html('收起全部课程↑')
        }
    }
    $scope.$on('ngGetHistryOcList', function (ngRepeatFinishedEvent) {
        $('.img_tit').hover(function () {
            $(this).find('.course_detail').stop(true).animate({ top: 0 }, 500);
        }, function () {
            $(this).find('.course_detail').stop(true).animate({ top: '-150px' }, 500);
        })
        $('.icon_list li').hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
        }, function () {
            $(this).removeClass('active');
        })

        //首页课程鼠标经过动画
        $('.course_all>li').hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).find('p').stop(true).animate({ bottom: '32px' }, 300);
            $(this).find('.small_icon').stop(true).animate({ top: '65px' }, 300);
        }, function () {
            $(this).removeClass('active');
            $(this).find('p').stop(true).animate({ bottom: '0' }, 300);
            $(this).find('.small_icon').stop(true).animate({ top: '97px' }, 300);
        })


    });
    $scope.ShowHirstyCourse = false;
    $scope.SlideHirstyCourse = function () {
        $scope.ShowHirstyCourse = !$scope.ShowHirstyCourse;
        var $this = $("#ShowHirstyCourse");
        if (!$scope.ShowHirstyCourse) {
            $this.html('展开全部课程↓')
        } else {
            $this.html('收起全部课程↑')
        }
    }

}]);


studnetModule.filter('studentOCListFilter', function () {
    return function (arr, ope, num, size) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            if (ope == 'between') {
                return item.RowNum <= num * size && item.RowNum >= ((num - 1) * size + 1);
            }
        });
    }
});

//studnetModule.directive('onGetStudentOcList', function ($timeout) {
//    return {
//        restrict: 'AEC',
//        link: function (scope, element, attr) {
//            if (scope.$last === true) {
//                $timeout(function () {
//                    scope.$emit('ngGetStudentOCList');
//                });
//            }
//        }
//    };
//});

studnetModule.directive('onGetMyOcList', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngGetOcList');
                });
            }
        }
    };
});
studnetModule.directive('onGetMyHistryOcList', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngGetHistryOcList');
                });
            }
        }
    };
});
