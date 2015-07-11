'use strict';

var homeModule = angular.module('app.home', []);

homeModule.controller('HomeController', ['$scope', '$state', 'homeProviderUrl', function ($scope, $state, homeProviderUrl) {


    $scope.PageSize = 2;
    $scope.PageIndex = 1;
    $scope.PagesNum = 1;
    //获取课程列表
    $scope.OcList = null;//课程列表
    $scope.OcPagesNumList = null;


    $scope.OcResourseList = null; //教学资源列表

    var GetOcList = function () {
        var url = homeProviderUrl + "/OC_List";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
                $scope.PageIndex = 1;//
            } else {
                $scope.OcList = data.d;
                $scope.PagesNum = Math.ceil(data.d.length / $scope.PageSize);
                initPageNum($scope.PagesNum);
            }
        });
    }
 


    $scope.HUserSpce = 0;
    var GetUserSpace = function () {
        var url = homeProviderUrl + "/GetUserSpace";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {

            } else {
                $scope.HUserSpce = data.d;
                var strurl = (window.location.href).toLowerCase();
                var strsplit = strurl.split("/home/");
                if ($scope.HUserSpce == 3 && (strsplit[1].split("?"))[0] == "index") {// 学生空间
                    window.location.href = "../Home/StudentIndex";
                }

            }
        });
    }

    GetUserSpace();

    GetOcList();



    //删除课程
    $scope.Del_OC = function (OCID, Role, IsHasMainTeacher) {
        var url = homeProviderUrl + "/OC_Del";
        var param = {
            OCID: OCID
        };

        if (IsHasMainTeacher == 1 && Role == 0) {
            layer.alert("该网站有其他课程负责人,请先删除课程负责人！", -1, "提示框");
            return;
        }
        var msc = "你确定删除课程吗？";
        if (Role != 0) {
            msc = "你确定退出该课程吗？";
        }

        if (confirm(msc)) {
            $scope.baseService.post(url, param, function (data) {
                if (data.d === null) {
                } else {
                    if (data.d == 1) {
                        layer.alert("删除失败！该网站有其他课程负责人,请先删除课程负责人！", -1, "提示框");
                        return;
                    }
                    else {
                        GetOcList();
                    }
                }
            });
        }
    }
    //初始页码列表
    var initPageNum = function (PageNum) {
        var pag = new Array();
        for (var i = 0; i < PageNum; i++) {
            pag[i] = i + 1;
        }
        if (pag.length == 0) {
            pag[0] = 1;
        }
        $scope.OcPagesNumList = pag;
    }
    //跳页
    $scope.JumpPage = function (num) {
        if (num >= 1 && num <= $scope.PagesNum) {
            $scope.PageIndex = num;
        }
        else {
            $scope.PageIndex = 1;
        }
    }



    //获取常见问题
    $scope.HelpModel = {
        HelpID: -1,
        SysID: 1
    };
    $scope.HelpDetails = [];
    var GetHelp_List = function () {
        var url = homeProviderUrl + "/Help_Rand_List";
        var param = {
            model: $scope.HelpModel
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                $scope.OcHelpList = data.d;
            }
        });
    }
    GetHelp_List();


    $scope.ShowHelpDetails = function (help) {
        $('#showHelpModal').modal("show");
        var url = homeProviderUrl + "/Help_Get";
        var param = {
            model: help
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0 || data.d == []) {
            } else {
                $scope.HelpDetails[0] = data.d;
            }
        });
    }

    // 0 上一页  1 下一页
    $scope.GetPageList = function (move) {
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
    }

    //点击课程图片继续学习
    $scope.GoOnLing = function (myOC) {

        var strurl = window.location.href;
        var strsplit = strurl.split("/Home");
        var url = "";
        //0 不可点击, 1 课程主页, 2 MOOC, 3 翻转课堂  
        if (myOC.ShowFirst == 2)//mooc
        {
            url = strsplit[0]+"/OC/MOOC/index?currentoc=" + myOC.OCID;

        }
        else if (myOC.ShowFirst == 3)//网站
        {
            url = "../OC/FC/index?currentoc=" + myOC.OCID;
        }
        else if (myOC.ShowFirst == 1) {
            url = strsplit[0]+"/OC/Site/index?currentoc=" + myOC.OCID;
        }
        if (url != "") {
            if (myOC.ShowFirst == 3) {
                window.location.href = url;
            } else {
                window.open(url);
            }
        }

    }


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

    //获取待处理事项
    $scope.WaitingProcess = {
        S_HomeworkNum: 0,
        S_EachHomeworkNum: 0,
        S_HomeworkScoreNum: 0,
        S_ApplyBackNum: 0,
        S_VoteNum: 0,
        S_AppraiseNum: 0,
        S_ForumReplyNum: 0,
        S_CourseScoreNum: 0,
        S_ActivityNum: 0,
        isShow: false,
        WaitingNum: 0,
        UserType: 1//教师 1 学生2 
    };
    var Get_WaitingProcess = function (isCache) {
        var url = homeProviderUrl + "/WaitingProcess_Get";
        var param = {
            isCache: isCache
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                $scope.WaitingProcess = data.d;
                //if ($scope.WaitingProcess.S_HomeworkNum > 0
                //    || $scope.WaitingProcess.S_EachHomeworkNum > 0
                //     || $scope.WaitingProcess.S_HomeworkScoreNum > 0
                //     || $scope.WaitingProcess.S_ApplyBackNum > 0
                //     || $scope.WaitingProcess.S_VoteNum > 0
                //     || $scope.WaitingProcess.S_AppraiseNum > 0
                //     || $scope.WaitingProcess.S_ForumReplyNum > 0
                //     || $scope.WaitingProcess.S_CourseScoreNum > 0
                //     || $scope.WaitingProcess.S_ActivityNum > 0
                //    ) {

                //    $scope.WaitingProcess.isShow = true;
                //    $scope.WaitingProcess.WaitingNum =
                //        $scope.WaitingProcess.S_HomeworkNum +
                //        $scope.WaitingProcess.S_EachHomeworkNum +
                //        $scope.WaitingProcess.S_HomeworkScoreNum +
                //        $scope.WaitingProcess.S_ApplyBackNum +
                //        $scope.WaitingProcess.S_VoteNum +
                //        $scope.WaitingProcess.S_AppraiseNum +
                //        $scope.WaitingProcess.S_ForumReplyNum +
                //        $scope.WaitingProcess.S_CourseScoreNum +
                //        $scope.WaitingProcess.S_ActivityNum
                //    ;
                //}

            }
        });
    }
    Get_WaitingProcess(false);

    $scope.GetWaitingProcessNoCache = function () {
        Get_WaitingProcess(true);
    }


    //$scope.$on('to-parent', function (event, data) {
    //    alert(data);       //父级能得到值
    //});



}]);


homeModule.controller('NoticesController', ['$scope', '$state', 'noticeProviderUrl', function ($scope, $state, noticeProviderUrl) {
    $scope.PageSize = 30;
    $scope.PageIndex = 1;
    $scope.PagesNum = 1;
    $scope.initPage = true;
    $scope.commentPageSize = 10;//
    $scope.ShortPageSize = 5;//

    $scope.NoticeModel = {
        OCIDS: '',
        OCID: 0,
        SysID: 1,
        ModuleID: 1,
        Title: "",
        Conten: "",
        IsTop: false,
        IsEmail: false,
        IsSms: false,
        Source: "TeachingClassID",
        SourceIDs: ""

    };

    $scope.UserSpce = 0;
    var GetCourentUserSpace = function () {
        var url = noticeProviderUrl + "/GetUserSpace";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {

            } else {
                $scope.UserSpce = data.d;



            }
        });
    }
    GetCourentUserSpace();
    //通知列表
    var GetNoticeList = function (pageIndex) {
      
        var url = noticeProviderUrl + "/GetNoticeList";
        var param = {
            notice: $scope.NoticeModel,
            PageSize: $scope.PageSize,
            PageIndex: pageIndex
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                $scope.PageIndex = 1;//
                $scope.NoticeList = null;
            } else {
                $scope.NoticeList = ReplaceStrToImg(data.d);
                $scope.NoticeNum = data.d[0].rowscount;
                var NoticeP = Math.ceil($scope.NoticeNum / $scope.PageSize);
                if ($scope.initPage && NoticeP > 1) {
                    NoticePages(NoticeP);
                    $scope.initPage = false;
                }
            }
        });
    }
    ///切换通知类型
    $scope.ShowNotice = function (ModuleID) {
        console.log(ModuleID);
        if ($scope.NoticeModel.ModuleID != ModuleID) {
            $scope.NoticeModel.ModuleID = ModuleID;
            $scope.PageIndex = 1;
            $scope.initPage = true
            GetNoticeList(1);
        }
    }
    $scope.ShowNotice(-1);

    var ReplaceStrToImg = function (NoticeListTemp) {
   
        for (var i = 0; i < NoticeListTemp.length; i++) {
            for (var j = 0; j < NoticeListTemp[i].NoticeResponse.length; j++) {
                if (NoticeListTemp[i].NoticeResponse[j].Conten != "" && NoticeListTemp[i].NoticeResponse[j].Conten != undefined)
                    NoticeListTemp[i].NoticeResponse[j].Conten = replaceStrToImg(NoticeListTemp[i].NoticeResponse[j].Conten);

            }
        }
        return NoticeListTemp;
    }
    var ReplaceStrToImgTwo = function (ResponseList) {
        for (var i = 0; i < ResponseList.length; i++) {
            if (ResponseList[i].Conten != "" && ResponseList[i].Conten != undefined)
                ResponseList[i].Conten = replaceStrToImg(ResponseList[i].Conten);
        }
        return ResponseList;
    }

    //通知分页列表
    var NoticePages = function (PageNum) {
        laypage({
            cont: $('#NoticePages'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: false, //若不显示，设置false即可
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                if (!$scope.initPage) {
                    GetNoticeList(e.curr);
                }
            }
        });

    }

    //###############################
    //获取评论
    $scope.GetCommentShortDetail = function (Notice) {
        var PageNum = Math.ceil(Notice.ResponseCount / $scope.commentPageSize);
        if (PageNum > 1) {
            Notice.ShowPage = true;
            Notice.ShowMore = false;
        }
        else {
            Notice.ShowPage = false;
            Notice.ShowMore = false;
        }
        ResponcePages(PageNum, Notice.NoticeID);
    }
    var GetCommentDetail = function (index, NoticeID) {
        var url = noticeProviderUrl + "/GetCommentList";
        var param = {
            NoticeID: NoticeID,
            PageSize: $scope.commentPageSize,
            PageIndex: index
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                for (var i = 0; i < $scope.NoticeList.length; i++) {
                    if ($scope.NoticeList[i].NoticeID == NoticeID) {
                        $scope.NoticeList[i].NoticeResponse = ReplaceStrToImgTwo(data.d);
                        return;
                    }

                }
            }
        });
    }

    $scope.ResponseNotice = function (NoticeID, RConten) {

        //calculateRestChar($("#text_area_" + NoticeID), $("#talkCountTxt_" + NoticeID));
        //alert($("#text_area_" + NoticeID).val());
        //console.log($("#text_area_" + NoticeID).val());

        var obj = $("#text_area_" + NoticeID);
        if (RConten == null || RConten == "") {
            RConten = $(obj).val()
        }
        if (obj.attr("isFirst") != null) {
            return;
        }
        obj.attr("isFirst", "1");

        var text = RConten;
        text = $("#text_area_" + NoticeID).val();
        var val = text.replace(expandReplaceReg, "0");
        //console.log(val);
        var length = (val == "" ? 0 : val.length);

        if (length == 0) {
            obj.attr("isFirst", null);
            layer.alert("请填写评论内容", -1, "提示框");
            return;
        }
        if (length > 250) {
            obj.attr("isFirst", null);
            layer.alert("评论内容不能超过250字符!", -1, "提示框");
            obj.removeAttr("isFirst");
            return;
        }
        var url = noticeProviderUrl + "/NoticeResponse_ADD";
        var param = {
            NoticeID: NoticeID,
            RConten: text
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
                layer.alert("评论失败！", -1, "提示框");
                obj.attr("isFirst", null);
            } else {

                for (var i = 0; i < $scope.NoticeList.length; i++) {
                    if ($scope.NoticeList[i].NoticeID == NoticeID) {
                        data.d.Conten = replaceStrToImg(text);
                        $scope.NoticeList[i].NoticeResponse.splice(0, 0, data.d);
                        $scope.NoticeList[i].ResponseCount = $scope.NoticeList[i].ResponseCount + 1;
                        //$scope.NoticeList.splice(0, 0, data.d);
                        $scope.NoticeList[i].RConten = "";
                        obj.attr("isFirst", null);
                        var $count = obj.parent().next().children().last();
                        calculateRestChar(obj, $count);
                        bindDocumentClickBlur();
                        obj.attr("isFirst", null);
                        $("#text_area_" + NoticeID).val("");
                        console.log($("#text_area_" + NoticeID).val());
                    }
                }
                obj.attr("isFirst", null);
            }
        });
    }


    //分页列表
    var ResponcePages = function (PageNum, id) {
        laypage({
            cont: $('#ResponcePages_' + id), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: false, //若不显示，设置false即可
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                GetCommentDetail(e.curr, id);
                //$scope.$apply();
            }
        });

    }
    //######################
    $scope.$on('ngGetNoticeList', function (ngRepeatFinishedEvent) {
        loadFace($("#myBody"));//载入表情选择框
        $(document).bind("click", function () {
            hideFace();
        });//载入表情选择框
        $(".comment_btn").click(function () {
            var NoticeID = ($(this).context.id).split('_')[2];
            var $cmt_text = $("#cmt_text_" + NoticeID);
            if ($cmt_text.text() == '评论') {
                $cmt_text.text("收起");
            } else {
                $cmt_text.text("评论");
            }
            var $source = $(this);
            if ($source.attr("loaded") == "true") {
                var $insert_list_comment = $("#comment_box_" + NoticeID);
                $insert_list_comment.toggle();
                return;
            }
            else {
                //GetCommentShortDetail(NoticeID);
                var $insert_list_comment = $("#comment_box_" + NoticeID);
                $insert_list_comment.toggle();
            }
            $source.attr("loaded", "true");

        });
        $('.chat_detail').click(function () {
            $(this).hide();
            $(this).next().show().focus();
            $(this).parent().next().show();

            var NoticeIDTemp = this.id.split('_')[this.id.split('_').length - 1];
            var $this = $("#text_area_" + NoticeIDTemp);
            var $this1 = $("#biaoqing_" + NoticeIDTemp);
            showFace($this1, $this, function () {
                var $count = $this.parent().next().children().last();
                calculateRestChar($this, $count);
            });
        });


        //绑定展开提问表情事件
        $(".biaoqing").live("mouseover", function () {
            $(this).attr("isShow", "true");
        });
        $(".biaoqing").live("mouseout", function () {
            $(this).attr("isShow", "false");
        });
        //$(".biaoqing").live("click", function () {
        //    var NoticeIDTemp = this.id.split('_')[this.id.split('_').length - 1]
        //    showFace($(this), $("#text_area_" + NoticeIDTemp), function () {
        //        var $this = $("#text_area_" + NoticeIDTemp);
        //        var $count = $this.parent().next().children().last();
        //        calculateRestChar($this, $count);
        //    });  
        //});
        selectFace();
        $(".text_area").live("focus", function () {
            $(this).keyup(function () {
                var $count = $(this).parent().next().children().last();
                calculateRestChar($(this), $count);
            }).change(function () {
                var $count = $(this).parent().next().children().last();
                calculateRestChar($(this), $count);
            }).bind('paste', function () {
                var $count = $(this).parent().next().children().last();
                calculateRestChar($(this), $count);
            }).focus(function () {
                var $count = $(this).parent().next().children().last();
                calculateRestChar($(this), $count);
            });
        });
        $(".text_area").live("blur", function () {
            var mainId = this.id.split('_')[this.id.split('_').length - 1]
            if ($("#biaoqing_" + mainId).attr("isShow") == "true") {
                return false;
            }
            var commentText = $.trim($(this).val());
            if (commentText == "") {
                $(this).hide();
                $("#expression_" + mainId).hide();
                $("#chat_detail_" + mainId).show();
            }
        });



        $('.issue_detail').hover(function () {
            $(this).find('.notice_btn_del').show();
        }, function () {
            $(this).find('.notice_btn_del').hide();
        })

    });

    //计算回复剩余的字数
    var calculateRestChar = function ($this, $count) {
        //把表情字体替换为0只算一个字符
        var val = $this.val().replace(expandReplaceReg, "0");
        var length = (val == "" ? 0 : val.length);
        var restCount = 250 - parseInt(length);
        if (restCount >= 0) {
            $count.html('还能输入<em>' + restCount + '</em>字');
            $count.find("em").css("color", "");
        } else {
            $count.html('超过<em>' + Math.abs(restCount) + '</em>字');
            $count.find("em").css("color", "red");
            $this.css("border", "1px solid rgb(255,55,2)");
            return;
        }
        if (length == 0) {
            $this.css("border", "1px solid rgb(255,55,2)");
        } else {
            $this.css("border", "1px solid rgb(204,204,204)");
        }
    }

    $("#noticeText").keyup(function () {
        var $count = $(this).next().next().children().last();
        noticeRestChar($(this), $count);
    }).change(function () {
        var $count = $(this).next().next().children().last();
        noticeRestChar($(this), $count);
    }).bind('paste', function () {
        var $count = $(this).next().next().children().last();
        noticeRestChar($(this), $count);
    }).focus(function () {
        var $count = $(this).next().next().children().last();
        noticeRestChar($(this), $count);
    });

    //计算通知剩余的字数
    var noticeRestChar = function ($this, $count) {
        var val = $this.val();
        var length = (val == "" ? 0 : val.length);
        var restCount = 67 - parseInt(length);
        if ($scope.NoticeModel.IsMSM) {
            if (restCount >= 0) {
                $count.html('<em>还能输入' + restCount + '字</em>');
            } else {
                $count.html('<em>超过' + Math.abs(restCount) + '字</em>');
                $count.find("em").css("color", "red");
                return;
            }
        }
        else {
            $count.html('<em>已输入' + parseInt(length) + '字</em>');
        }
    }


    //发布通知弹出框
    $scope.AddNotice = function () {
        $('#myAddNoticeModal').modal("show");
    }

    //begin班级全选
    $scope.ClasCheckedAll = {
        ClassAll: false
    }

    //选择班级弹出框
    $scope.ShowClass = function () {
        $('#mySelectClassModal').modal("show");
        if ($scope.ClassList == null || $scope.ClassList.length <= 0) {
            GetOCClass_Tree();
        }
    }
    var GetOCClass_Tree = function () {
        var url = noticeProviderUrl + "/OCClass_Tree";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
            } else {
                $scope.ClassList = data.d;
            }
        });
    }
    $scope.ckb_Class_All = function () {
        $scope.ClasCheckedAll.ClassAll = !$scope.ClasCheckedAll.ClassAll;
        for (var i = 0; i < $scope.ClassList.length; i++) {
            $scope.ClassList[i].IsSelected = $scope.ClasCheckedAll.ClassAll;
        }
    }
    $scope.ckb_OC_Single = function (oCModel) {
        //console.log(new Date().getMilliseconds())
        $scope.ClasCheckedAll.ClassAll = false;//全选按钮取消
        for (var i = 0; i < $scope.ClassList.length; i++) {
            //子集全选或者不选
            if ($scope.ClassList[i].ParentID != 0 && $scope.ClassList[i].ParentID == oCModel.ID) {
                $scope.ClassList[i].IsSelected = !oCModel.IsSelected;
            }
        }
        //console.log(new Date().getMilliseconds())
    }
    $scope.ckb_Class_Single = function (classModel) {
        $scope.ClasCheckedAll.ClassAll = false;//全选选中取消
        for (var i = 0; i < $scope.ClassList.length; i++) {
            //父级取消选中
            if ($scope.ClassList[i].ParentID == 0 && $scope.ClassList[i].ID == classModel.ParentID) {
                $scope.ClassList[i].IsSelected = false;
            }
        }

    }

    $scope.GetSelectClass = function () {
        GetSelectStr();
        GetSelectOCIDStr();
        $('#mySelectClassModal').modal("hide");
    }
    //获取选中的班级
    var GetSelectStr = function () {
        $scope.NoticeModel.SourceIDs = "";
        for (var i = 0; i < $scope.ClassList.length; i++) {
            if ($scope.ClassList[i].ParentID != 0 && $scope.ClassList[i].IsSelected) {
                $scope.NoticeModel.SourceIDs += $scope.ClassList[i].ID + ',';
            }
        }
        if ($scope.NoticeModel.SourceIDs.indexOf(',') > 0) {
            $scope.NoticeModel.SourceIDs = $scope.NoticeModel.SourceIDs.substring(0, $scope.NoticeModel.SourceIDs.length - 1);
        }
    }
    // 获取选中的课程
    var GetSelectOCIDStr = function () {
        $scope.NoticeModel.OCIDS = "";
        for (var i = 0; i < $scope.ClassList.length; i++) {
            if ($scope.ClassList[i].ParentID == 0 && $scope.ClassList[i].IsSelected) {
                $scope.NoticeModel.OCIDS += $scope.ClassList[i].ID + ',';
            }
        }
        if ($scope.NoticeModel.SourceIDs.indexOf(',') > 0) {
            $scope.NoticeModel.OCIDS = $scope.NoticeModel.OCIDS.substring(0, $scope.NoticeModel.OCIDS.length - 1);
        }
    }
    //发布通知
    $scope.PublishNotice = function () {
        if ($scope.NoticeModel.Conten == "") {
            layer.alert("请输入通知内容！", -1, "提示框");
            return;
        }
        if ($scope.NoticeModel.IsMSM && $scope.NoticeModel.Conten.length > 67) {
            layer.alert("发短信不得超过67字符，含标点符号、空格、签名！", -1, "提示框");
            return;
        }
        if ($scope.NoticeModel.SourceIDs == "") {
            layer.alert("请选择通知对象！", -1, "提示框");
            return;
        }
        var url = noticeProviderUrl + "/Notice_ADD";
        $scope.NoticeModel.ModuleID = 1;
        var param = {
            model: $scope.NoticeModel
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {

            } else {
                //data.d.IsCanDel = true;
                //$scope.NoticeList.splice(0, 0, data.d);
                if (data.d.IsCanSendMsg) {
                    layer.alert("非常抱歉，由于您的短信额度已经用完，短信通知发送失败，请及时告知学校 “系统管理员” 联系客服增加短信条数！", -1, "提示框");
                }
                $scope.initPage = true;
                GetNoticeList(1);
                $('#myAddNoticeModal').modal("hide");
            }
        });

    }


    $scope.Notice_Del = function (NoticeID) {
        if (confirm("是否删除通知，删除将无法恢复！")) {
            var url = noticeProviderUrl + "/Notice_Del";
            var param = {
                NoticeID: NoticeID
            };
            $scope.baseService.post(url, param, function (data) {
                if (data.d === null) {
                } else {
                    for (var i = 0; i < $scope.NoticeList.length; i++) {
                        if ($scope.NoticeList[i].NoticeID == NoticeID) {
                            $scope.NoticeList.splice(i, 1);
                            return;
                        }
                    }
                }
            });
        }
    }

    $scope.DelClass = function (Class) {
        Class.IsSelected = false;
        GetSelectStr();
    }

    //$scope.click = function ()
    //{
    //    $scope.$emit('to-parent', "cdsadf");
    //}


}]);

homeModule.filter('listFilter3', function () {
    return function (arr, ope, num) {
        if ($G2S.isEmpty(arr)) {
            return;
        }
        return arr.filter(function (item) {
            if (ope == '=') {
                return item.ParentID == num;
            }
        });
    }
});

homeModule.filter('listFilter4', function () {
    return function (arr, ope, num) {
        if ($G2S.isEmpty(arr)) {
            return;
        }
        return arr.filter(function (item) {
            if (ope == '!=') {
                return item.ParentID != num && item.IsSelected == true;
            }
        });
    }
});



homeModule.filter('ocListFilter', function () {
    return function (arr, ope, num, size) {
        if ($G2S.isEmpty(arr)) {
            return;
        }
        return arr.filter(function (item) {
            if (ope == 'between') {
                return item.RowNum <= num * size && item.RowNum >= ((num - 1) * size + 1);
            }
        });
    }
});

homeModule.directive('onGetOcList', function ($timeout) {
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


homeModule.directive('onGetNoticeList', function ($timeout) {
    return {
        restrict: 'EAC',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngGetNoticeList');
                });
            }
        }
    };
});