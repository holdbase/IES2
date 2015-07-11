

var sitePreviewModule = angular.module('app.oc.site.preview', ['ui.router']);

sitePreviewModule.controller('SitePreviewController', ['$scope', '$filter', '$state', 'sitepreviewProviderUrl', function ($scope, $filter, $state, sitepreviewProviderUrl) {

    $scope.keyWords = "";
    $scope.OCID = $G2S.request("currentoc", -1);
    $scope.PageIndex = 1;
    $scope.PageSize = 2000;
    $scope.FileType = 0;
    $scope.DateSpan = 0;    //0全部 7一周内 30一个月内 180半年内
    $scope.FolderID = 0;    //默认主目录
    $scope.FileList = new Array();          //文件集合
    $scope.FolderList = new Array();        //目录集合
    $scope.FolderOrderList = new Array();   //目录排序后的集合

    $scope.ResourceInfo = function () {

        var url = sitepreviewProviderUrl + "/ResourceInfo_Get";
        var param = { OCID: $scope.OCID, FileType: $scope.FileType, FolderID: $scope.FolderID, DateSpan: $scope.DateSpan, SearchKey: $scope.keyWords }
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                if (data.d.FolderList != null) {
                    $scope.FolderList = data.d.FolderList;
                    $scope.FolderOrderList = new Array();
                    ChangeOrder(0);
                }
                if (data.d.ResourceList != null) {
                    $scope.FileList = data.d.ResourceList;
                }
            }
        });
    }

    //改变
    var ChangeOrder = function (ParentID) {
        for (var i = 0; i < $scope.FolderList.length; i++) {
            if ($scope.FolderList[i].ParentID == ParentID) {
                $scope.FolderOrderList[$scope.FolderOrderList.length] = $scope.FolderList[i];
                ChangeOrder($scope.FolderList[i].FolderID)
            }
        }
    }


    //文件夹目录导航
    $scope.Floder_Change = function (FolderID) {
        $scope.FolderID = FolderID;
        $scope.ResourceInfo();
    }

    //文件类型切换
    $scope.FileType_Change = function (FileType) {
        if ($scope.FileType != FileType) {
            $scope.FileType = FileType;
        }
        $scope.ResourceInfo();
    }

    //时间区间切换
    $scope.DateSpan_Change = function (DateSpan) {
        if ($scope.DateSpan != DateSpan) {
            $scope.DateSpan = DateSpan;
        }
        $scope.ResourceInfo();
    }

    //点击进入下一个文件夹
    $scope.Resource_Search = function (model) {
        $scope.FolderID = model.ResourceID;
        $scope.ResourceInfo();
    }

    //点击进入下一个文件夹
    $scope.Resource_View = function (model) {
        if (model.ViewUrl != null) {
            window.open(model.ViewUrl);
        }
    }

    var init = function () {
        $scope.ResourceInfo();
    }
    init();
}]);


sitePreviewModule.controller('SitePreviewPlanController', ['$scope', '$filter', '$state', 'sitepreviewProviderUrl', function ($scope, $filter, $state, sitepreviewProviderUrl) {
    $scope.OCID = $G2S.request("currentoc", -1);;
    $scope.ChapterList = new Array();
    $scope.OCMoocOfflineList = new Array();
    $scope.OCMoocFileList = new Array();

    var List_Get = function () {
        var Chapter_List = $scope.baseService.postPromise(sitepreviewProviderUrl + "/Chapter_OCMooc_List", { OCID: $scope.OCID });
        var OCMoocOffline_List = $scope.baseService.postPromise(sitepreviewProviderUrl + "/OCMoocOffline_List", { OCID: $scope.OCID });
        var OCMoocFile_List = $scope.baseService.postPromise(sitepreviewProviderUrl + "/OCMoocFile_List", { OCID: $scope.OCID, ChapterID: -1 });
        $scope.baseService.runPromises({
            Chapter_List: Chapter_List,
            OCMoocOffline_List: OCMoocOffline_List,
            OCMoocFile_List: OCMoocFile_List
        }, function (data) {
            if (data.Chapter_List.d != null) {
                $scope.ChapterList = data.Chapter_List.d;
                $scope.OCMoocOfflineList = data.OCMoocOffline_List.d;
                $scope.OCMoocFileList = data.OCMoocFile_List.d;
                DataStatistics();
            }
        });

    }

    var DataStatistics = function () {
        $scope.OCMoocTotal = new Object();
        $scope.OCMoocTotal.FileNum = 0;
        $scope.OCMoocTotal.VideoNum = 0;
        $scope.OCMoocTotal.TestNum = 0;
        $scope.OCMoocTotal.TopicNum = 0;
        $scope.OCMoocTotal.KenNum = 0;
        $scope.OCMoocTotal.PlanDay = 0;
        $scope.OCMoocTotal.MinHour = 0;


        for (var i = 0; i < $scope.ChapterList.length; i++) {
            if ($scope.ChapterList[i].ParentID == 0) {
                var Chapter = $scope.ChapterList[i];
                Chapter.FileNumTotal = 0;
                Chapter.VideoNumTotal = 0;
                Chapter.TestNumTotal = Chapter.TestNum == "" ? 0 : Chapter.TestNum; //章上面也有测试，其它为0是章上面本身不绑定那些信息
                Chapter.KenNumTotal = Chapter.KenNum == "" ? 0 : Chapter.KenNum;

                for (var j = 0; j < $scope.ChapterList.length; j++) {
                    if ($scope.ChapterList[j].ParentID == Chapter.ChapterID) {
                        var ChapterChild = $scope.ChapterList[j];
                        Chapter.TestNumTotal += ChapterChild.TestNum;  //章测试统计
                        Chapter.KenNumTotal += ChapterChild.KenNum;
                        for (var k = 0; k < $scope.OCMoocFileList.length; k++) {
                            if ($scope.OCMoocFileList[k].ChapterID == ChapterChild.ChapterID) {
                                if ($scope.OCMoocFileList[k].FileType == 1) {   //视频文件
                                    Chapter.VideoNumTotal++;
                                }
                                else {      //其它类型
                                    Chapter.FileNumTotal++;
                                }
                            }
                        }

                    }
                }
                $scope.OCMoocTotal.FileNum += Chapter.FileNumTotal;
                $scope.OCMoocTotal.VideoNum += Chapter.VideoNumTotal;
                $scope.OCMoocTotal.TestNum += Chapter.TestNumTotal;
                $scope.OCMoocTotal.TopicNum += Chapter.TopicNum;
                $scope.OCMoocTotal.KenNum += Chapter.KenNumTotal;
                $scope.OCMoocTotal.PlanDay += Chapter.PlanDay;
                $scope.OCMoocTotal.MinHour += Chapter.MinHour;
            }
        }
    }

    var init = function () {
        List_Get();
    }
    init();

    $scope.$on('ngOCMoocOfflineGet', function (ngRepeatFinishedEvent) {
        $('.group_discuss a').live('click', function () {
            if (!$(this).hasClass('click')) {
                $(this).addClass('click');
                $(this).parents('.chapt_box').next().slideDown();
                $(this).text('[收起]');
            } else {
                $(this).removeClass('click');
                $(this).parents('.chapt_box').next().slideUp();
                $(this).text('[展开]');
            }
        })
    });
}]);

//sitePreviewModule.controller('SitePreviewOCMoocRecruitController', ['$scope', '$filter', '$state', 'siteProviderUrl', function ($scope, $filter, $state, siteProviderUrl) {
//    $scope.OCID = $G2S.request("currentoc", -1);;

//    $scope.OCMoocRecruitClassDescList = new Array();
//    $scope.ShortOCMoocClass = {
//        OCID: $scope.OCID,
//        RecruitID: -1,
//        UserID: -1
//    };

//    var OCMoocRecruitClassDescList_Get = function () {
//        var ClassDescList = $scope.baseService.postPromise(siteProviderUrl + "/OCMoocRecruitClassDescList", { OCID: $scope.OCID });
//        $scope.baseService.runPromises({
//            ClassDescList: ClassDescList
//        }, function (data) {
//            if (data.ClassDescList.d != null) {
//                $scope.OCMoocRecruitClassDescList = data.ClassDescList.d;
//            }
//        });

//    }

//    //var OCMoocRecruitClassDescList_Get = function () {
//    //    var url = classProviderUrl + "/OCMoocRecruitClassDesc_List";
//    //    var param = { shortocmoocclass: $scope.ShortOCMoocClass };
//    //    $scope.baseService.post(url, param, function (data) {
//    //        if (data.d.length < 1) {
//    //            //alert('暂无数据！');
//    //        } else {
//    //            $scope.OCMoocRecruitClassDescList = data.d;
//    //            console.log("SitePreviewOCMoocRecruitController");
//    //        }
//    //    });
//    //}
//    //var OCMoocRecruitClassDescList_Get = function () {
//    //    var url = classProviderUrl + "/OCMoocRecruitClassDesc_List";
//    //    var param = { OCID: $scope.OCID };
//    //    $scope.baseService.post(url, param, function (data) {
//    //        if (data.d.length < 1) {
//    //            //alert('暂无数据！');
//    //        } else {
//    //            $scope.OCMoocRecruitClassDescList = data.d;
//    //            console.log("SitePreviewOCMoocRecruitController");
//    //        }
//    //    });
//    //}
//    OCMoocRecruitClassDescList_Get();

//    $scope.OCMoocRecruitClassJoin = function (obj) {
//        //$scope.ShortOCMoocClass.RecruitID = obj.RecruitID;
//        var url = siteProviderUrl + "/OCMoocRecruitClass_Join";
//        var param = {
//            RecruitID: obj.RecruitID
//        };
//        $scope.baseService.post(url, param, function (data) {
//            if (data.d == 0) {
//                layer.alert("注册失败！", -1, "提示框");
//            }
//            else if (data.d == -1) {
//                layer.alert("未登录,请登录后报名课程！", -1, "提示框");

//            }
//            else {
//                OCMoocRecruitClassDescList_Get();
//                ShowRegist(obj);
//            }

//        });
//    }
//    var moocpageis;
//    $scope.ShowMooc = 0;
//    $scope.PageMoocRegister = function (obj) {
//        ShowRegist(obj);
//    }

//    var ShowRegist = function (obj) {
//        $scope.ShowMooc = obj.IsCanRead;
//        moocpageis = $.layer({
//            type: 1,
//            title: false,
//            area: ['auto', "200px"],
//            border: [0],
//            shade: [0.5, '#000'],
//            closeBtn: [0, false],
//            shift: 'top',
//            page: { dom: '#registerMoocPage' }
//        });
//    }
//    $scope.CloseMoocPage = function () {
//        $scope.ShowMooc = 0;
//        layer.close(moocpageis);
//    }

//    $scope.getDateDiff = function (desc, obj) {

//        if (obj.RecruitEndDate == null || obj.RecruitEndDate == '') {
//            return;
//        }
//        var re = /-?\d+/;
//        var m = re.exec(obj.RecruitEndDate);
//        if (m < 0) { return "离报名截止还有0天"; }
//        var minute = 1000 * 60;
//        var hour = minute * 60;
//        var day = hour * 24;
//        var halfamonth = day * 15;
//        var month = day * 30;
//        var now = re.exec(obj.CreateTime); //new Date().getTime();
//        var diffValue = m - now;
//        diffValue += 24 * 60 * 60 * 1000;
//        if (diffValue < 0) {
//            return "离报名截止还有0天";
//        }


//        var monthC = diffValue / (month);
//        var weekC = diffValue / (7 * day);
//        var dayC = diffValue / (day);
//        var hourC = diffValue / (hour);
//        var minC = diffValue / (minute);

//        if (monthC >= 1) {
//            result = desc + parseInt(monthC) + "个月";
//        }
//        else if (weekC >= 1) {
//            result = desc + parseInt(weekC) + "个星期";
//        }
//        else if (dayC >= 1) {
//            result = desc + parseInt(dayC) + "天";
//        }
//        else if (hourC >= 1) {
//            result = desc + parseInt(hourC) + "个小时";
//        } else {
//            result = "离报名截止还有0天";
//        }
//        return result;
//    }

//    $scope.GetTrue = function (obj, fType) {
//        //debugger;
//        var re = /-?\d+/;
//        if (obj == null) {
//            return false;
//        }
//        //var m = re.exec(DateFormate(obj.RecruitEndDate, "yyyy-MM-dd"));
//        var m2 = re.exec(obj.RecruitStartDate); //注册开始时间
//        var m1 = re.exec(obj.RecruitEndDate);    //注册结束时间
//        var now = re.exec(obj.CreateTime);//当前时间
//        //if (m1 < 0) { return false; }
//        //var now = new Date().getTime();     
//        var diffValue1 = now - m2;//随时加入 是否到注册时间 >=0 可以注册
//        var diffValue2 = m1 - now; // +24 * 60 * 60 * 1000 >0  可以注册

//        //diffValue1 -= 24 * 60 * 60 * 1000;
//        diffValue2 += 24 * 60 * 60 * 1000;// 


//        if (fType == 1) {//可以报名
//            if (obj.JoinType == 2 && obj.RecruitStatus == 1 && obj.IsJoin == 0 && obj.IsFull == 0 && diffValue1 >= 0 && diffValue2 >= 0) {//统一开课
//                return true;
//            }
//            else if (obj.JoinType == 1 && obj.RecruitStatus ==1 && obj.IsJoin == 0 && obj.IsFull == 0 && diffValue1 >= 0) {//随时招生
//                return true;
//            }
//            else {
//                return false;
//            }

//        }
//        if (fType == 2) {//不可报名（暂停招生、未开始招生、招生已满） 未过期
//            if (obj.IsJoin == 0 && obj.JoinType == 2 && (obj.RecruitStatus == 0 || obj.IsFull == 1 || diffValue1 < 0)) {
//                return true;
//            }
//            else if (obj.IsJoin == 0 && obj.JoinType == 1 && (obj.RecruitStatus == 0 || obj.IsFull == 1 || diffValue1 < 0)) {
//                return true;
//            }
//            else {
//                return false;
//            };
//        }
//        if (fType == 3) {//已报名
//            console.log(obj.RecruitStatus == 1 && obj.IsJoin == 0 && diffValue1 >= 0 && obj.JoinType == 1);
//            if (obj.IsJoin == 1) {
//                return true;
//            }
//            else {
//                return false;
//            };
//        }
//        if (fType == 4) {//可以报名 已过期
//            if (obj.IsJoin == 0 && obj.JoinType == 2 && obj.RecruitStatus == 1 && diffValue2 < 0) {
//                return true;
//            }
//            else {
//                return false;
//            };
//        }
//    }
//    $scope.set_Style = function (obj) {
//        var height;
//        if (obj.UserLimit > 0) {
//            var prace = obj.StuCount / obj.UserLimit;
//            height = prace * 100;
//        }

//        return { 'height': height + '%' }

//    }
//    var DateFormate = function (v, format) {
//        if (v == null || v == undefined) { return ""; }
//        if (v.indexOf("Date") == -1) {
//            return v
//        } else {
//            //if (v == undefined) { return ""; }
//            var re = /-?\d+/;
//            var m = re.exec(v);
//            if (parseInt(m) < 0) { return ""; }
//            var d = new Date(parseInt(m[0]));
//            return d.Format(format);
//        }
//    }
//}]);

