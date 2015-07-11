
'use strict';
var siteModule = angular.module('app.site', []);
siteModule.controller('SiteController', ['$scope', '$state', 'siteProviderUrl', 'uploadfileProviderUrl', function ($scope, $state, siteProviderUrl, uploadfileProviderUrl) {
    ////设置模板
    $scope.hid_sidemod = "1";
    $scope.ocid = $G2S.request("currentoc", -1);

    $scope.indexTitle = "首页";
    $scope.OCID = -1;
    $scope.subjectNameByTheme = "";
    $scope.colorNameByTheme = "";
    $scope.palyurl = "";
    var strurl = window.location.href;
    var strsplit = strurl.split("/OC");
    $scope.palyurl = strsplit[0];
    //$scope.ContentType;//网站风格
    //$scope.ColumnDetail;
    $scope.ParentID = 0;
    $scope.FileList = [];
    $scope.SiteID = 0;
    $scope.Column_Type = 0;
    //$scope.columnchick = true;
    //更改模板
    $scope.chickbanmian = function (type) {
        $scope.hid_sidemod = type;
        OCSite_DisplayStyle_Upd(type);
    }
    //加载模块
    var OCSite_GetLoad = function () {
        // debugger;
        var ocid = $scope.ocid;
        $scope.OCID = ocid;
        var url = siteProviderUrl + "/OCSite_Get";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            $scope.SiteID = data.d[0].SiteID;
            $scope.hid_sidemod = data.d[0].DisplayStyle;
            var Language = data.d[0].Language;
            $scope.BuildMode = data.d[0].BuildMode;
            $('input[name="construction"]').each(function () {
                if ($(this).val() == $scope.BuildMode) {
                    $(this).attr("checked", true);
                }
            });
            $scope.OutSiteLink = data.d[0].OutSiteLink;
            $scope.ThemeNO = data.d[0].ThemeNO;
            if (data.d[0].BuildMode == 1) {
                $scope.BuildModetrue = true;
                $scope.BuildModefalse = false;
            } else {
                $scope.BuildModetrue = false;
                $scope.BuildModefalse = true;
            }
            if (Language == 1) {
                $("#Language_1").removeClass("english").addClass("chinese");
                $("#Language_0").removeClass("chinese").addClass("english");
            } else {
                $("#Language_1").removeClass("chinese").addClass("english");
                $("#Language_0").removeClass("english").addClass("chinese");
            }
            //GetMod();
            setTimeout(GetMod, 500);
            Attachment_List("OC");
            Attachment_List("OCSite");
        });
    }

    //新增主栏目
    $scope.OCSiteColumn_Edit = function () {
        var txtname = $scope.txt_column_name;
        if (txtname == "") {
            layer.msg('名称不能为空', 1, 8);
            return;
        }
        var ContentType = $('input[name="rad_addcolumns"]:checked').val();
        var ocid = $scope.ocid;
        var columnID = -1;
        if ($scope.columnid_edit != null) {
            columnID = $scope.columnid_edit;
        }
        var parentid = $scope.ParentID;
        var url = siteProviderUrl + "/OCSiteColumn_Edit";
        var param = { columnsname: txtname, type: ContentType, OCID: ocid, ColumnID: columnID, ParentID: parentid };
        $scope.baseService.post(url, param, function (data) {
            if (parseInt(data.d) > -1) {
                // 新增成功后跳转至相对应的栏目上
                $scope.OCSiteColumnByClick(ContentType, txtname, data.d, 0);
                $('#myModal').modal("hide");
                OCSite_Get();
            }
        });
    }
    var isnull = function (obj) {
        try { return obj == 0 ? false : !obj } catch (e) { return false; }
    }
    //弹出新增主栏目
    $scope.addColumn = function (type) {
        if ($scope.columnid_edit != null && type != -1) {
            var url = siteProviderUrl + "/OCSiteColumn_Get";
            var param = { ColumnID: $scope.columnid_edit };
            $scope.baseService.post(url, param, function (data) {
                $scope.ColumnDetail = data.d;
                var item = $scope.ColumnDetail[0];
                $scope.txt_column_name = item.Title;
                $scope.ContentType = item.ContentType;
                $('input[name="rad_addcolumns"]').each(function () {
                    if ($(this).val() == $scope.ContentType) {
                        $(this).attr("checked", true);
                    }
                    $(this).attr("disabled", "disabled");
                });
            });
        } else {
            $scope.columnid_edit = null;
            $scope.txt_column_name = "";
            $('input[name="rad_addcolumns"]').each(function () {
                if ($(this).val() == 0) {
                    $(this).attr("checked", true);
                }
                $(this).attr("disabled", false);
            });
        }
        $('#myModal').modal('show');
    }

    //获取网站栏目
    var OCSite_Get = function () {
        $scope.columnid_edit = null;
        $scope.ParentID = 0;
        $scope.siteSonparentID = null;
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSiteColumn_Tree";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            $scope.ColumnList = data.d;
        });
        $scope.$on('ngColumnGet', function (ngRepeatFinishedEvent) {
            $('.column_list li').hover(function () {
                $(this).children('.column_btn').show();
                $(this).addClass('active').siblings().removeClass('active');
            }, function () {
                $(this).children('.column_btn').hide();
                $(this).removeClass('active');
            })

        });
    }

    //切换语言
    $scope.OCSite_Language_Upd = function (type) {
        if (type == 1) {
            $("#Language_1").removeClass("english").addClass("chinese");
            $("#Language_0").removeClass("chinese").addClass("english");
        } else {
            $("#Language_1").removeClass("chinese").addClass("english");
            $("#Language_0").removeClass("english").addClass("chinese");
        }
        var siteid = $scope.SiteID;
        var url = siteProviderUrl + "/OCSite_Language_Upd";
        var param = { SiteID: siteid, Language: type };
        $scope.baseService.post(url, param, function (data) {

        });
    }

    //更换网站风格
    var OCSite_DisplayStyle_Upd = function (type) {
        var siteid = $scope.SiteID;
        var url = siteProviderUrl + "/OCSite_DisplayStyle_Upd";
        var param = { SiteID: siteid, DisplayStyle: type };
        $scope.baseService.post(url, param, function (data) {
            if (data.d) {
                GetMod();
            }
        });
    }

    //更新网站的发布状态
    $scope.OCSite_IsPublish_Upd = function (type) {
        $scope.Save();
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSite_IsPublish_Upd";
        var param = { OCID: ocid, IsPublish: type };
        $scope.baseService.post(url, param, function (data) {
            if (type == 0) {
                layer.msg('已保存', 1, 1);
            } else if (type == 1) {
                layer.msg('发布成功', 1, 1);
            } else if (type == 2) {
                layer.msg('请求已生成,请联系管理员审核.', 1, 1);
            }

        });
    }

    //导航点击方法    MOOC:12 教学资料13
    $scope.OCSiteColumnByClick = function (type, name, ColumnID, hierarchy) {
        //debugger;
        //type 1: 内页模式 3:列表模式 0:文本模式
        if (type == 11) {
            $("#div_indexhome").show();
            $("#div_ewebeditor").hide();
            $("#div_mainList").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $scope.ContentType = -1;
            $scope.indexTitle = name;
        }
        else if (type == 0) {
            $scope.Column_Type = 0;
            $("#div_indexhome").hide();
            $("#div_ewebeditor").show();
            $("#div_mainList").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            OCSiteColumn_Get(ColumnID);
            $scope.ContentType = 0;
            $scope.indexTitle = name;
        } else if (type == 3) {
            $scope.Column_Type = 1;
            $("#div_indexhome").hide();
            $("#div_mainList").show();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $scope.siteSonparentID = ColumnID;
            OCSiteColumn_List(ColumnID);
            $scope.ContentType = 3;
            $scope.indexTitle = name;
        }
        //}else if (type == 12) {
        //    $scope.Column_Type = 3;
        //    $("#div_indexhome").hide();
        //    $("#div_mainList").hide();
        //    $("#div_ewebeditor").hide();
        //    $("#div_mooc").show();
        //    $("#div_data").hide();
        //    $scope.siteSonparentID = ColumnID;
        //    OCSiteColumn_List(ColumnID);
        //    $scope.ContentType = 3;
        //} else if (type == 13) {
        //    $scope.Column_Type = 3;
        //    $("#div_indexhome").hide();
        //    $("#div_mainList").hide();
        //    $("#div_ewebeditor").hide();
        //    $("#div_mooc").hide();
        //    $("#div_data").show();
        //    $scope.siteSonparentID = ColumnID;
        //    OCSiteColumn_List(ColumnID);
        //    $scope.ContentType = 3;
        //}
        if (ColumnID > 0) {
            OCSiteColumn_Nav_Tree(ColumnID);
        }

    }
    //列表模式下导航
    $scope.OCSiteColumnByConten = function (type, name, ColumnID, hierarchy) {
        $scope.Column_Type = 0;
        $("#div_indexhome").hide();
        $("#div_ewebeditor").show();
        $("#div_mainList").hide();
        $("#div_mooc").hide();
        $("#div_data").hide();
        OCSiteColumn_Get(ColumnID);
        $scope.indexTitle = name;
        OCSiteColumn_Nav_Tree(ColumnID);
    }

    //加载模板样式
    var GetMod = function () {
        if ($scope.hid_sidemod == 1) {
            //left
            $("#side_top").removeClass("across_nav side_right");
            $("#side_top").addClass("side_left");
            var oHeight = $('.main_content').outerHeight(true);
            //var oHeight = $(window).height();
            $('.side_left').height(oHeight);
            var screenWidth = $(window).width();
            var boxWidth = $('.main_content').width();
            var sideWidth = $('.side_left').width();
            $('.main_content').css('left', (screenWidth - boxWidth + sideWidth) / 2);
            $(".column_box").attr("style", "width:200px;");
        } else if ($scope.hid_sidemod == 2) {
            //right
            $("#side_top").removeClass("across_nav ");
            $("#side_top").addClass("side_right");
            $("#side_top").removeClass("side_left");
            var oHeight = $('.main_content').outerHeight(true);
            $('.side_right').height(oHeight);
            var screenWidth = $(window).width();
            var boxWidth = $('.main_content').width();
            var sideWidth = $('.side_right').width();
            $('.main_content').css('left', (screenWidth - boxWidth - sideWidth) / 2);
            $(".column_box").attr("style", "width:200px;");
        } else if ($scope.hid_sidemod == 3) {
            //top
            var screenWidth = $(window).width();
            var boxWidth = $('.main_content').width();
            var sideWidth = $('.side_right').width();
            var strWidth = document.body.clientWidth;
            strWidth = (strWidth - 1300) / 2 + 28;
            $('.main_content').css('left', (screenWidth - boxWidth + sideWidth) / 2);
            $("#side_top").addClass("across_nav");
            $('#side_top').height(49);
        }
        $(".version_box.active").removeClass("active");
        $("#active_" + $scope.hid_sidemod).addClass("active");
        var screenWidth = $(window).width();
        var leftWidth = $('.across_nav .version_box').outerWidth(true);
        $('.across_nav .column_box').width(screenWidth - leftWidth);
    }

    //保存
    $scope.Save = function () {
        if ($scope.ContentType == 0) {
            $scope.frmoEditor1 = document.getElementById('frmoEditor1').contentWindow.getHTML();
            var url = siteProviderUrl + "/OCSiteColumn_Conten_Upd";
            var param = { ColumnID: $scope.ColumnID, Conten: $scope.frmoEditor1 };
            $scope.baseService.post(url, param, function (data) {
                OCSiteColumn_Get($scope.ColumnID);
            });
        } else if ($scope.ContentType == 3) {
            var frmoEditor2 = document.getElementById('frmoEditor1').contentWindow.getHTML();
            var url = siteProviderUrl + "/OCSiteColumn_Conten_Upd";
            var param = { ColumnID: $scope.ColumnID, Conten: frmoEditor2 };
            $scope.baseService.post(url, param, function (data) {
                OCSiteColumn_Get($scope.ColumnID);
            });
        }
        else {
            OC_Brief_Upd();
        }
    }

    //过滤 type:0 返回对象 1 返回序号
    var Columnfilter = function (id, type) {
        if (type == 0) {
            for (var i = 0; i < $scope.ColumnList.length; i++) {
                if (id == $scope.ColumnList[i].ColumnID) {
                    return $scope.ColumnList[i];
                }
            }
        } else if (type == 1) {
            for (var i = 0; i < $scope.ColumnList.length; i++) {
                if (id == $scope.ColumnList[i].ColumnID) {
                    return i;
                }
            }
        }
    }

    //获取网站的栏目下子栏目列表
    var OCSiteColumn_List = function (columnID) {
        var url = siteProviderUrl + "/OCSiteColumn_List";
        var param = { ColumnID: columnID };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length > 0) {
                $scope.ColumnSonList = data.d;
            } else {
                $scope.ColumnSonList = null;
            }
        });

        $scope.$on('ngColumnSonList', function (ngRepeatFinishedEvent) {
            $('.knowledge_list tr').hover(function () {
                $(this).addClass('active').siblings().removeClass('active');
            }, function () {
                $(this).removeClass('active');
            })
        });
    }

    //获取单个栏目详细
    var OCSiteColumn_Get = function (columnID) {
        var url = siteProviderUrl + "/OCSiteColumn_Get";
        var param = { ColumnID: columnID };
        $scope.baseService.post(url, param, function (data) {
            $scope.ColumnDetail = data.d;
            var item = $scope.ColumnDetail[0];
            $scope.Updatetime = item.Updatetime;
            $scope.ContentType = item.ContentType;
            $scope.ColumnID = item.ColumnID;
            $scope.frmoEditor1 = item.Conten;
            if ($scope.frmoEditor1 == null) {
                $scope.frmoEditor1 = "";
            }
            document.getElementById('frmoEditor1').contentWindow.setHTML($scope.frmoEditor1);
        });
    }



    //获取在线课程的基本信息
    var OC_Get = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OC_Get";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.Tags = data.d[0].Tags;
                $scope.SubjectName = data.d[0].SubjectName;
                $scope.Brief = data.d[0].Brief;
                $scope.CreateTime = data.d[0].CreateTime;
                $scope.Updatetime = data.d[0].UpdateTIme;
                $scope.ChargeUserName = data.d[0].ChargeUserName;
            }
        });
    }
    //主讲教师
    var OCTeam_List = function (role) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCTeam_List";
        var param = { OCID: ocid, Role: role };
        $scope.baseService.post(url, param, function (data) {
            $scope.OCTeam_List = data.d;

        });
    }

    //课程负责人
    var OCTeam_principal = function (role) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCTeam_List";
        var param = { OCID: ocid, Role: role };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.principalname = data.d[0].UserName;
            }
        });
    }

    //删除栏目
    $scope.OCSiteColumn_Del = function (columnid) {
        if (confirm("您确认删除吗?")) {
            var url = siteProviderUrl + "/OCSiteColumn_Del";
            var param = { ColumnID: columnid };
            $scope.baseService.post(url, param, function (data) {
                OCSite_Get();
            });
        }
    }

    //删除列表栏目
    $scope.OCSiteColumnContent_Del = function (columnid) {
        if (confirm("您确认删除吗?")) {
            var url = siteProviderUrl + "/OCSiteColumn_Del";
            var param = { ColumnID: columnid };
            $scope.baseService.post(url, param, function (data) {
                OCSiteColumn_List($scope.siteSonparentID);
            });
        }
    }

    //子栏目新增
    $scope.SonAdd = function (parentid, contentType) {
        $scope.ParentID = parentid;
        $scope.siteSonparentID = parentid;
        if (contentType == 0) {
            $('#myModal').modal('show');
            $scope.addColumn(-1);
        } else {
            $scope.ContentTypeAdd(-1);
        }
    }

    //子栏目编辑
    $scope.sinEdit = function (columnid, parentid, contentType) {
        $scope.columnid_edit = columnid;
        $scope.ParentID = parentid;
        $scope.siteSonparentID = parentid;
        //if (contentType == 0) {
        //    $('#myModal').modal('show');
        //    $scope.addColumn(1);
        //} else {
        //    $scope.ContentTypeAdd(columnid);
        //}
        $('#myModal').modal('show');
        $scope.addColumn(1);
    }

    //关闭
    $scope.closecolumn = function () {
        $scope.columnid_edit = null;
        $scope.ParentID = 0;
        $scope.siteSonparentID = null;
    }

    //列表模式新增
    $scope.ContentTypeAdd = function (type) {
        //debugger;
        if (type != -1) {
            $scope.columnid_edit = type;
            var url = siteProviderUrl + "/OCSiteColumn_Get";
            var param = { ColumnID: type };
            $scope.baseService.post(url, param, function (data) {
                $scope.ColumnDetail = data.d;
                var item = $scope.ColumnDetail[0];
                $scope.tabSiteColumntitle = item.Title;
                document.getElementById('frmoEditor2').contentWindow.setHTML(item.Conten);
            });
        } else {
            $scope.columnid_edit = null;
            $scope.tabSiteColumntitle = "";
            document.getElementById('frmoEditor2').contentWindow.setHTML("");

        }

        $('#mySiteColumnTypeModal').modal('show');

    }

    //获取导航栏
    var OCSiteColumn_Nav_Tree = function (columnid) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSiteColumn_Nav_Tree";
        var param = { OCID: ocid, ColumnID: columnid };
        $scope.baseService.post(url, param, function (data) {
            $scope.NavnameList = data.d;
            $scope.Column_NavCount = data.d.length;
        });
        OCSiteColumn_List(columnid);

    }

    //列表模式保存内容
    $scope.OCSiteColumn_Content_Edit = function () {
        var conten = document.getElementById('frmoEditor2').contentWindow.getHTML();
        var txtname = $scope.tabSiteColumntitle;
        if (txtname == "") {
            layer.msg('标题不能为空', 1, 8);
            return;
        }
        var ContentType = 3;
        var ocid = $scope.ocid;
        var columnID = -1;
        if ($scope.columnid_edit != null) {
            columnID = $scope.columnid_edit;
        }
        var parentid = $scope.siteSonparentID;
        var url = siteProviderUrl + "/OCSiteColumn_Content_Edit";
        var param = { columnsname: txtname, Conten: conten, type: ContentType, OCID: ocid, ColumnID: columnID, ParentID: parentid };
        $scope.baseService.post(url, param, function (data) {
            if (parseInt(data.d) > -1) {
                $('#mySiteColumnTypeModal').modal('hide');
                OCSiteColumn_List(parentid);
                $scope.OCSiteColumnByConten(ContentType, txtname, data.d, 1);
            }
        });

    }

    //上移 下移 上移一层 下移一层
    $scope.OCSiteColumn_Move = function (columnid, direction) {
        var url = siteProviderUrl + "/OCSiteColumn_Move";
        var param = { ColumnID: columnid, Direction: direction };
        $scope.baseService.post(url, param, function (data) {
            OCSite_Get();
        });
    }

    //网站栏目的启用
    $scope.OCSite_Field_Upd = function (conttype) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSite_Field_Upd";
        var param = { OCID: ocid, ContentType: conttype };
        $scope.baseService.post(url, param, function (data) {
            OCSite_Get();
        });
    }

    //获取网站下视频的预览
    var File_OCPreviewMP4_List = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/File_OCPreviewMP4_List";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.PreviewMP4List = data.d;
            }
        });
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //下面是在table render完成后执行的js 麻烦你看下 
            $('.video_item').listScroll({
                run_ul: '.video_list', //运动的列表；
                btn_l: '.icon_l',    //左按钮
                btn_r: '.icon_r',    //右按钮
                run_number: 1         //运动张数,超过可见数量就默认显示可见数量
            });

            // setTimeout(GetMod, 500);
            // GetMod();
        });
    }
    //课程网站推荐词
    var OC_Brief_Upd = function () {
        var ocid = $scope.ocid;
        var brief = $scope.site_brief;
        var url = siteProviderUrl + "/OC_Brief_Upd";
        var param = { OCID: ocid, Brief: brief };
        $scope.baseService.post(url, param, function (data) {

        });
    }

    //获取课程通知
    var OCNotice_List = function () {
        var ocid = $scope.ocid;
        var pageindex = 10;
        var pagesize = 1;
        var url = siteProviderUrl + "/OCNotice_List";
        var param = { OCID: ocid, PageIndex: pageindex, PageSize: pagesize };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCNotice_List = data.d;
            } else {
                $scope.OCNoticeCount = 0;
            }
        });
    }
    //预览
    $scope.preview = function () {
        // var ocid = $G2S.request("currentoc", -1);
        window.open("../../Site/Preview?currentoc=" + $scope.ocid);
    }



    //获取网站模板列表
    var OCTheme_List = function () {
        $scope.OCThemeCount = 0;
        var subject = $scope.subjectNameByTheme;
        var color = $scope.colorNameByTheme;
        var dateSpan = "-1";
        var courseID = "-1";
        var pageIndex = 1;
        var pageSize = 999999;
        var url = siteProviderUrl + "/OCTheme_List";
        var param = { Subject: subject, Color: color, DateSpan: dateSpan, CourseID: courseID, PageIndex: pageIndex, PageSize: pageSize };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCTheme_List = data.d;
                $scope.OCThemePageClick(1);
                $scope.OCThemeCount = data.d.length;
                OCTheme_ListBysubject();
                OCTheme_ListBycolor();
            }
        });
    }

    ////获取附件列表
    //var Attachment_List = function () {
    //    var source = "OCSite";
    //    var sourceID = $scope.ocid;
    //    var url = siteProviderUrl + "/Attachment_List";
    //    var param = { Source: source, SourceID: sourceID };
    //    $scope.baseService.post(url, param, function (data) {
    //        if (data.d != null) {
    //            //debugger;
    //            $scope.Attachment = data.d;

    //        }
    //    });
    //}
    $scope.inmPath = '';
    //获取附件列表
    //if()
    var Attachment_List = function (source) {
        var source = source;
        var sourceID = $scope.ocid;
        if (source == "OCSite") {
            sourceID = $scope.SiteID;
        }
        var url = siteProviderUrl + "/Attachment_List";
        var param = { Source: source, SourceID: sourceID };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length > 0) {
                if (source == "OC") {
                    $scope.AttachmentOC = data.d[data.d.length - 1];
                }
                else {
                    $scope.AttachmentOCSite = data.d[data.d.length - 1];
                    var ii = 0;
                    var interval = setInterval(function () {
                        $("#img_attach").attr("src", $scope.AttachmentOCSite.Thumbnail);
                        ii++;
                        if (ii >= 10) {
                            clearInterval(interval);
                        }
                    }, 1000);

                }
            }
        });
    }
    var OCTheme_ListBysubject = function () {
        var subject = "";
        var color = "";
        var dateSpan = "-1";
        var courseID = "-1";
        var pageIndex = 1;
        var pageSize = 999999;
        var url = siteProviderUrl + "/OCTheme_ListBysubject";
        var param = { Subject: subject, Color: color, DateSpan: dateSpan, CourseID: courseID, PageIndex: pageIndex, PageSize: pageSize };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCTheme_ListBysubject = data.d;
            }
        });
    }

    var OCTheme_ListBycolor = function () {
        var subject = "";
        var color = "";
        var dateSpan = "-1";
        var courseID = "-1";
        var pageIndex = 1;
        var pageSize = 999999;
        var url = siteProviderUrl + "/OCTheme_ListBycolor";
        var param = { Subject: subject, Color: color, DateSpan: dateSpan, CourseID: courseID, PageIndex: pageIndex, PageSize: pageSize };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCTheme_ListBycolor = data.d;
            }
        });
    }

    //下拉选中
    $scope.SelectThemeListBysubject = function (name) {
        $scope.subjectNameByTheme = name;
        OCTheme_List();
    }
    $scope.SelectThemeListBycolor = function (name) {
        $scope.colorNameByTheme = name;
        OCTheme_List();
    }

    //网站模板翻页
    $scope.OCThemePageClick = function (id) {
        var count = id * 15;
        for (var k = 0; k < $scope.OCTheme_List.length; k++) {
            $scope.OCTheme_List[k].IsShow = 0;
            $scope.OCTheme_List[k].IsPageActive = 0;
        }
        $scope.OCTheme_List[id - 1].IsPageActive = 1;
        var xunh = (id - 1) * 15;
        for (var i = xunh; i < $scope.OCTheme_List.length; i++) {
            if (xunh <= count) {
                $scope.OCTheme_List[i].IsShow = 1;
            }

        }
    }

    //模板点击
    $scope.OCSite_TemplateID_Upd = function (id, ThemeNO) {
        for (var k = 0; k < $scope.OCTheme_List.length; k++) {
            if ($scope.OCTheme_List[k].ID == id) {
                $scope.OCTheme_List[k].IsActive = 1;
            } else {
                $scope.OCTheme_List[k].IsActive = 0;
            }
        }

        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSite_TemplateID_Upd";
        var param = { OCID: ocid, TemplateID: id };
        $scope.baseService.post(url, param, function (data) {
            $scope.ThemeNO = ThemeNO;
        });
    }

    //课程档案编辑
    $scope.kcdaeditor = function () {
        window.open("../../OC/CourseIndex?currentoc=" + $scope.ocid);
    }
    //主讲教师编辑
    $scope.zjjseditor = function () {
        window.open("../../OC/Team/index?currentoc=" + $scope.ocid);
    }
    //附件上传
    $scope.File_Upload = function () {
        var url = uploadfileProviderUrl + "/File_Upload";
        var source_id = $scope.ocid;
        var sourceName = "OC";
        if (UplodeType == 2) {
            source_id = $scope.ocid;
            sourceName = "OC";
        }
        else {
            source_id = $scope.SiteID;
            sourceName = "OCSite";
        }
        console.log(UplodeType);

        var para = {
            source_id: source_id,
            sourceName: sourceName,
            list: $scope.FileList
        };
        $scope.baseService.post(url, para, function (data) {
            if (data.d != false) {
                layer.msg('上传成功!', 1, 1);
                if (UplodeType == 2) {
                    Attachment_List("OC");
                }
                else {
                    Attachment_List("OCSite");
                }
            }
        })
    }

    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        $scope.FileList.push(response[0]);
    });

    $scope.$on("onCompleteAll", function (event) {
        // layer.msg('上传完成!', 1, 1);
        $scope.File_Upload();
        layer.closeAll();
    });

    var box, videopre;
    var UplodeType = 1;  //2 上传图片 1上传片花
    $scope.ShowBox = function (type) {
        if (type == 1) {
            UplodeType = 1;
            $scope.FileSuffix = ['.mp4'];
            $scope.FileSize = 2048;
        } else {
            UplodeType = 2;
            $scope.FileSuffix = ['.jpg', '.gif', '.png'];
            $scope.FileSize = 5;
        }
        console.log(UplodeType);
        box = $.layer({
            type: 1,
            title: ["文件上传", true],
            shift: 'right-bottom',
            maxmin: true,
            area: ['800px', "auto"],
            shade: [0],
            page: { dom: '#box' },
            min: function (layero) {
                $(".xubox_max").addClass("xubox_maxmin");
                $(".xubox_max").show();
            },
            restore: function (layero) {
                $(".xubox_max").hide();
            }
        });
        $(".xubox_max").addClass("xubox_maxmin");
        $(".xubox_max").hide();
        $(".xubox_title").attr("style", "background:none repeat scroll 0 0 #374760;color:#fff;cursor: move;");
    }

    $scope.videopre = function (url) {
        // $scope.viewurl = "http://192.168.4.231:1221/Upload/738361b3-b91c-4ba2-83b4-d85797e3837c.mp4";
        $scope.viewurl = url;
        videopre = $.layer({
            type: 1,
            shade: [0.5, '#000'],
            area: ['auto', 'auto'],
            title: false,
            border: [0],
            page: { dom: '#videopre' },
            close: function () {
                $scope.viewurl = "";
            }
        });

    }



    //发布通知弹出框
    $scope.AddNotice = function (type) {
        $('#myAddNoticeModal').modal("show");
        $("#noticeText").val("");
        $("#txt_title").val("");
        $("#cb_istop").attr("checked", false);
    }

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
    //$("#noticeText").next().next().children().last()
    $("#noticeText").keyup(function () {
        // debugger;
        var $count = $(this).next().children().last();
        noticeRestChar($(this), $count);
    }).change(function () {
        var $count = $(this).next().children().last();
        noticeRestChar($(this), $count);
    }).bind('paste', function () {
        var $count = $(this).next().children().last();
        noticeRestChar($(this), $count);
    }).focus(function () {
        var $count = $(this).next().children().last();
        noticeRestChar($(this), $count);
    });

    //计算通知剩余的字数
    var noticeRestChar = function ($this, $count) {
        var val = $this.val();
        var length = (val == "" ? 0 : val.length);
        var restCount = 67 - parseInt(length);
        $count.html('<em>已输入' + parseInt(length) + '字</em>');

    }


    //发布通知
    $scope.PublishNotice = function () {
        if ($("#noticeText").val() == "") {
            alert("请输入通知内容！");
            return;
        }
        if ($("#noticeText").val() != "") {
            var istop = false;
            if ($("#cb_istop").attr("checked")) {
                istop = true;
            }
            var url = siteProviderUrl + "/OCNotice_ADD";
            var param = { NoticeID: -1, OCID: $scope.ocid, Title: $("#txt_title").val(), Conten: $("#noticeText").val(), IsTop: istop, IsSms: false, IsEMail: false, IsAll: true };
            $scope.baseService.post(url, param, function (data) {
                if (data.d != false) {
                    OCNotice_List();
                    $('#myAddNoticeModal').modal("hide");

                }
            });
        }
    }

    $scope.Notice_Del = function (noticeID) {
        if (confirm("是否删除通知，删除将无法恢复！")) {
            var url = siteProviderUrl + "/OCNotice_Del";
            var param = { NoticeID: noticeID, OCID: $scope.ocid };
            $scope.baseService.post(url, param, function (data) {
                // debugger;
                for (var i = 0; i < $scope.OCNotice_List.length; i++) {
                    if ($scope.OCNotice_List[i].NoticeID == noticeID) {
                        $scope.OCNotice_List[i].IsShow = 0;
                        return;
                    }
                }
            });
        }
    }






    var init = function () {
        File_OCPreviewMP4_List();
        OCTeam_principal(-2);
        OCTeam_List(10);
        OC_Get();
        OCSite_GetLoad();
        OCSite_Get();
        OCNotice_List();
        OCTheme_List();


    }
    init();
}]);


//预览
siteModule.controller('PreviewController', ['$scope', '$state', 'siteProviderUrl', function ($scope, $state, siteProviderUrl) {
    var type = $G2S.request("type", 0);
    $scope.palyurl = "";
    var strurl = window.location.href;
    var strsplit = strurl.split("/OC");
    $scope.palyurl = strsplit[0];
    $scope.SiteID = 0;
    $scope.ocid = $G2S.request("currentoc", -1);
    $scope.octeamlength = 0;
    //判断课程互动
    var IsCanCourseInteraction = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/IsCanCourseInteraction";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == "0") {
                if ($scope.ColumnList != null) {
                    for (var i = 0; i < $scope.ColumnList.length; i++) {
                        if ($scope.ColumnList[i].ContentType == "14") {
                            $scope.ColumnList[i].IsShow = false;
                        }
                    }
                }
            }
        });


    }

    //加载模块
    var OCSite_GetLoad = function () {
        // debugger;
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSite_Get";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            $scope.SiteID = data.d[0].SiteID;
            $scope.hid_sidemod = data.d[0].DisplayStyle;
            var Language = data.d[0].Language;
            $scope.BuildMode = data.d[0].BuildMode;
            $('input[name="construction"]').each(function () {
                if ($(this).val() == $scope.BuildMode) {
                    $(this).attr("checked", true);
                }
            });
            $scope.OutSiteLink = data.d[0].OutSiteLink;
            $scope.ThemeNO = data.d[0].ThemeNO;
            if (data.d[0].BuildMode == 1) {
                $scope.BuildModetrue = true;
                $scope.BuildModefalse = false;
            } else {
                $scope.BuildModetrue = false;
                $scope.BuildModefalse = true;
            }
            if (Language == 1) {
                $("#Language_1").removeClass("english").addClass("chinese");
                $("#Language_0").removeClass("chinese").addClass("english");
            } else {
                $("#Language_1").removeClass("chinese").addClass("english");
                $("#Language_0").removeClass("english").addClass("chinese");
            }
            setTimeout(GetMod, 500);;
            //Attachment_List();
            Attachment_List("OC");
            Attachment_List("OCSite");
        });
    }
    var GetMod = function () {
        if ($scope.hid_sidemod == 1) {
            //left
            //debugger;
            $("#side_top").removeClass("across_nav side_rightPreview");
            $("#side_top").addClass("side_leftPreview preview_side");
            //var oHeight = $('.main_content').outerHeight(true);
            var oHeight = $(window).height();
            $('.side_leftPreview').height(oHeight);
            var screenWidth = $(window).width();
            var boxWidth = $('.main_content').width();
            var sideWidth = $('.side_leftPreview').width();
            $('.main_content').css('left', (screenWidth - boxWidth + sideWidth) / 2);
        } else if ($scope.hid_sidemod == 2) {
            //right
            $("#side_top").removeClass("across_nav ");
            $("#side_top").addClass("side_rightPreview preview_side");
            $("#side_top").removeClass("side_leftPreview");
            //var oHeight = $('.main_content').outerHeight(true);
            var oHeight = $(window).height();
            $('.side_rightPreview').height(oHeight);
            var screenWidth = $(window).width();
            var boxWidth = $('.main_content').width();
            var sideWidth = $('.side_rightPreview').width();
            $('.main_content').css('left', (screenWidth - boxWidth - sideWidth) / 2);
        } else if ($scope.hid_sidemod == 3) {
            //top
            var screenWidth = $(window).width();
            var boxWidth = $('.main_content').width();
            var sideWidth = $('.side_rightPreview').width();
            var strWidth = document.body.clientWidth;
            strWidth = (strWidth - 1300) / 2 + 28;
            $('.main_content').css('left', (screenWidth - boxWidth + sideWidth) / 2);
            $("#side_top").addClass("across_nav preview_across");
            $("#side_top").removeClass("preview_sidePreview");
            $('#side_top').height(49);
        }
        $(".version_box.active").removeClass("active");
        $("#active_" + $scope.hid_sidemod).addClass("active");
    }

    //课程负责人
    var OCTeam_principal = function (role) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCTeam_List";
        var param = { OCID: ocid, Role: role };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.principalname = data.d[0].UserName;
            }
        });
    }
    //获取网站栏目
    var OCSite_Get = function () {
        $scope.columnid_edit = null;
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSiteColumn_Tree";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            $scope.ColumnList = data.d;
        });

        $scope.$on('ngColumnGet', function (ngRepeatFinishedEvent) {
            $('.column_list li').hover(function () {
                $(this).children('.column_btn').show();
                $(this).addClass('active').siblings().removeClass('active');
            }, function () {
                $(this).children('.column_btn').hide();
                $(this).removeClass('active');
            })
            // debugger;
            if ($G2S.request("type") == "" || $G2S.request("type") == undefined) {
                $(".column_list a:first").click();
            }

        });
    }

    //获取在线课程的基本信息
    var OC_Get = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OC_Get";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.Tags = data.d[0].Tags;
                $scope.SubjectName = data.d[0].SubjectName;
                $scope.Brief = data.d[0].Brief;
                $scope.CreateTime = data.d[0].CreateTime;
                $scope.Name = data.d[0].Name;
            }
        });
    }

    //主讲教师
    var OCTeam_List = function (role) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCTeam_List";
        var param = { OCID: ocid, Role: role };
        $scope.baseService.post(url, param, function (data) {
            $scope.OCTeam_List = data.d;

            if (data.d == null) {
                $scope.octeamlength = 0;
            } else {
                $scope.octeamlength = data.d.length;
            }
        });
    }
    //导航点击方法（范）
    $scope.OCSiteColumn_Conten_Upd = function (type, name, ColumnID, hierarchy) {

        //type 1: 内页模式 3:列表模式 0:文本模式
        if (type == 11) {
            $("#div_indexhome").show();
            $("#div_ewebeditor").hide();
            $("#div_mainList").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
        }
        else if (type == 0) {
            $("#div_indexhome").hide();
            $("#div_ewebeditor").show();
            $("#div_mainList").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
            OCSiteColumn_Get(ColumnID);
        } else if (type == 3) {
            $("#div_indexhome").hide();
            $("#div_mainList").show();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
            OCSiteColumn_List(ColumnID);
        }
        else if (type == 12) {
            $("#div_indexhome").hide();
            $("#div_mainList").hide();
            $("#div_ewebeditor").hide();
            $("#div_mooc").show();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
        }
        else if (type == 13) {
            $("#div_indexhome").hide();
            $("#div_mainList").hide();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").show();
            $("#div_OcMoocRecruit").hide();
        }
        else if (type == 15) {
            $("#div_indexhome").hide();
            $("#div_mainList").hide();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").show();
            //OCMoocRecruitClassDescList_Get();
        }
        else if (type == 14) {
            window.open(window.appPatch + "/CourseLive/Forum/index?currentoc=" + $scope.ocid);
        }
        $scope.indexTitle = name;
        if (ColumnID > 0) {
            OCSiteColumn_Nav_Tree(ColumnID);
        }
    }

    //点击导航栏跳转
    var OCSiteColumn_NavClick = function (thi) {
        var name = $(thi).attr("nid");
        var ColumnID = $(thi).attr("kid");
        var type = $(thi).attr("pid");
        if (name == "首页") {
            $("#div_indexhome").show();
            $("#div_ewebeditor").hide();
            $("#div_mainList").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
        }
        else if (type == 0) {
            $("#div_indexhome").hide();
            $("#div_ewebeditor").show();
            $("#div_mainList").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
            OCSiteColumn_Get(ColumnID);
        } else if (type == 3) {
            $("#div_indexhome").hide();
            $("#div_mainList").show();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
            OCSiteColumn_List(ColumnID);
        }
        else if (type == 12) {
            $("#div_indexhome").hide();
            $("#div_mainList").hide();
            $("#div_ewebeditor").hide();
            $("#div_mooc").show();
            $("#div_data").hide();
            $("#div_OcMoocRecruit").hide();
        }
        else if (type == 13) {
            $("#div_indexhome").hide();
            $("#div_mainList").hide();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").show();
            $("#div_OcMoocRecruit").hide();
        }
        else if (type == 15) {
            $("#div_indexhome").hide();
            $("#div_mainList").hide();
            $("#div_ewebeditor").hide();
            $("#div_mooc").hide();
            $("#div_data").show();
            $("#div_OcMoocRecruit").show();
        }
        OCSiteColumn_Nav_Tree(ColumnID);
    }

    //获取导航栏
    var OCSiteColumn_Nav_Tree = function (columnid) {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/OCSiteColumn_Nav_Tree";
        var param = { OCID: ocid, ColumnID: columnid };
        $scope.baseService.post(url, param, function (data) {
            $scope.NavnameList = data.d;
            $scope.Column_NavCount = data.d.length;
        });
        OCSiteColumn_List(columnid);

    }

    var OCSiteColumn_Get = function (columnID) {
        var url = siteProviderUrl + "/OCSiteColumn_Get";
        var param = { ColumnID: columnID };
        $scope.baseService.post(url, param, function (data) {
            $scope.ColumnDetail = data.d;
            var item = $scope.ColumnDetail[0];
            $scope.Updatetime = item.Updatetime;
            $scope.ContentType = item.ContentType;
            $scope.ColumnID = item.ColumnID;
            $scope.frmoEditor1 = item.Conten;
            if ($scope.frmoEditor1 == null) {
                $scope.frmoEditor1 = "";
            }
            $("#div_Conten").html($scope.frmoEditor1);
        });
    }
    //获取网站的栏目下子栏目列表
    var OCSiteColumn_List = function (columnID) {
        var url = siteProviderUrl + "/OCSiteColumn_List";
        var param = { ColumnID: columnID };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length > 0) {
                $scope.OCColumnCount = data.d.length;
                $scope.ColumnSonList = data.d;
            } else {
                $scope.OCColumnCount = 0;
                $scope.ColumnSonList = null;
            }
        });
    }
    //获取网站下视频的预览
    var File_OCPreviewMP4_List = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/File_OCPreviewMP4_List";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.PreviewMP4List = data.d;
            }
        });
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //下面是在table render完成后执行的js
            $('.video_item').listScroll({
                run_ul: '.video_list', //运动的列表；
                btn_l: '.icon_l',    //左按钮
                btn_r: '.icon_r',    //右按钮
                run_number: 1         //运动张数,超过可见数量就默认显示可见数量
            });

        });
    }
    //获取课程通知
    var OCNotice_List = function () {
        var ocid = $scope.ocid;
        var pageindex = 10;
        var pagesize = 1;
        var url = siteProviderUrl + "/OCNotice_List";
        var param = { OCID: ocid, PageIndex: pageindex, PageSize: pagesize };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCNotice_List = data.d;
            } else {
                $scope.OCNoticeCount = 0;
            }
        });
    }
    //列表模式下导航
    $scope.OCSiteColumnByConten = function (type, name, ColumnID, hierarchy) {
        $scope.Column_Type = 0;
        $("#div_indexhome").hide();
        $("#div_ewebeditor").show();
        $("#div_mainList").hide();

        $("#div_mooc").hide();
        $("#div_data").hide();

        OCSiteColumn_Get(ColumnID);
        $scope.indexTitle = name;
        OCSiteColumn_Nav_Tree(ColumnID)
    }


    //zxy 20150610
    $scope.IsSignUp = 1;
    $scope.IsRegisterSuccess = false;
    $scope.Mooc_Is_SignUp = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/Mooc_Is_SignUp";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                if (data.d == -1) {
                    $scope.IsSignUp = 1;
                } else {
                    $scope.IsSignUp = data.d;
                }
            } else {
                $scope.IsSignUp = 1;
            }
        });
    }
    $scope.Mooc_Is_SignUp();
    var pageis;
    $scope.RegNum = "";
    $scope.OC_Register = function () {
        var ocid = $scope.ocid;
        var regnum = $scope.RegNum;
        var url = siteProviderUrl + "/OC_Register";
        var param = { OCID: ocid, RegNum: regnum };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == 3) {
                $scope.IsSignUp = 1;
                $scope.IsRegisterSuccess = true;
            } else {
                layer.alert("注册码无效!", 3);
            }
        });
    }
    $scope.PageRegister = function (ocid) {
        $scope.IsRegisterSuccess = false;
        $scope.RegNum = "";
        pageis = $.layer({
            type: 1,
            title: false,
            area: ['auto', 'auto'],
            border: [0],
            shade: [0.5, '#000'],
            closeBtn: [0, false],
            shift: 'top',
            page: { dom: '#registerPage' }
        });
    }
    $scope.ClosePage = function () {
        layer.close(pageis);
    }
    //end

    //标签点击事件 
    $scope.NvaColumnSonClick = function (thi) {
        //debugger;
        //遍历所有的元素 操作isshow 如果为true的样式 全部为false 来达到单个选中的目的;
        for (var i = 0; i < $scope.ColumnSonList.length; i++) {
            if ($scope.ColumnSonList[i].IsShow) {
                $scope.ColumnSonList[i].IsShow = false;
            }
        }
        thi.columnson.IsShow = true;
        // $("#div_indexhome").hide();
        // $("#div_ewebeditor").show();
        // $("#div_mainList").hide();
        //OCSiteColumn_Get(thi.columnson.ColumnID);
        //OCSiteColumn_List(thi.columnson.ColumnID);

        $("#div_indexhome").hide();
        $("#div_ewebeditor").show();
        $("#div_mainList").hide();
        OCSiteColumn_Nav_Tree(thi.columnson.ColumnID);
        OCSiteColumn_List(thi.columnson.ColumnID);
        OCSiteColumn_Get(thi.columnson.ColumnID);


        //if (thi.columnson.ContentType == 0) {
        //    $("#div_indexhome").hide();
        //    $("#div_ewebeditor").show();
        //    $("#div_mainList").hide();
        //    OCSiteColumn_Get(thi.columnson.ColumnID);
        //    alert("gkj1");
        //} else if (thi.columnson.ContentType == 3) {
        //    $("#div_indexhome").hide();
        //    $("#div_mainList").show();
        //    $("#div_ewebeditor").hide();
        //    OCSiteColumn_List(thi.columnson.ColumnID);
        //    alert("gkj3");
        //}      
    }

    //获取附件列表
    //var Attachment_List = function () {
    //    var source = "OCSite";
    //    var sourceID = $scope.ocid;
    //    var url = siteProviderUrl + "/Attachment_List";
    //    var param = { Source: source, SourceID: sourceID };
    //    $scope.baseService.post(url, param, function (data) {
    //        if (data.d != null) {
    //            //debugger;
    //            $scope.Attachment = data.d;

    //        }
    //    });
    //}
    var Attachment_List = function (source) {
        var source = source;
        var sourceID = $scope.ocid;
        if (source == "OCSite") {
            sourceID = $scope.SiteID;
        }
        console.log(sourceID);
        var url = siteProviderUrl + "/Attachment_List";
        var param = { Source: source, SourceID: sourceID };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length > 0) {
                if (source == "OC") {
                    $scope.AttachmentOC = data.d[data.d.length - 1];
                }
                else {
                    $scope.AttachmentOCSite = data.d[data.d.length - 1];
                    $("#img_attach").attr("src", $("#img_attach").attr("src"));
                }


            }
        });
    }
    $scope.videopre = function (url) {
        $scope.viewurl = url;
        videopre = $.layer({
            type: 1,
            shade: [0.5, '#000'],
            area: ['auto', 'auto'],
            title: false,
            border: [0],
            page: { dom: '#videopre' },
            close: function () {
                $scope.viewurl = "";
            }
        });

    }

    $scope.Notice_Del = function (noticeID) {
        if (confirm("是否删除通知，删除将无法恢复！")) {
            var url = siteProviderUrl + "/OCNotice_Del";
            var param = { NoticeID: noticeID, OCID: $scope.ocid };
            $scope.baseService.post(url, param, function (data) {
                // debugger;
                for (var i = 0; i < $scope.OCNotice_List.length; i++) {
                    if ($scope.OCNotice_List[i].NoticeID == noticeID) {
                        $scope.OCNotice_List[i].IsShow = 0;
                        return;
                    }
                }
            });
        }
    }

    var init = function () {
        File_OCPreviewMP4_List();
        OCSite_Get();
        OCSite_GetLoad();
        OCTeam_principal(-2);
        OCTeam_List(10);
        OC_Get();
        OCNotice_List();
        OCMoocRecruitClassDescList_Get();
        if (type == 12) {
            $scope.OCSiteColumn_Conten_Upd(type, "mooc", 0, "")
        }
        else if (type == 13) {
            $scope.OCSiteColumn_Conten_Upd(type, "教学资料", 0, "")
        }
        IsCanCourseInteraction();
    }

    //var OCMoocRecruitClassDescList_Get = function () {
    //    var ClassDescList = $scope.baseService.postPromise(siteProviderUrl + "/MoocRecruit_List", { OCID: $scope.ocid });
    //    $scope.baseService.runPromises({
    //        ClassDescList: ClassDescList
    //    }, function (data) {
    //        if (data.ClassDescList.d != null) {
    //            $scope.OCMoocRecruitClassDescList = data.ClassDescList.d;
    //        }
    //    });

    //}

    var OCMoocRecruitClassDescList_Get = function () {
        var ocid = $scope.ocid;
        var url = siteProviderUrl + "/MoocRecruit_List";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length < 1) {
                //alert('暂无数据！');
            } else {
                $scope.OCMoocRecruitClassDescList = data.d;
                console.log("SitePreviewOCMoocRecruitController");
            }
        });


    }


    $scope.OCMoocRecruitClassJoin = function (obj) {
        //$scope.ShortOCMoocClass.RecruitID = obj.RecruitID;
        var url = siteProviderUrl + "/OCMoocRecruitClass_Join";
        var param = {
            RecruitID: parseInt(obj.RecruitID)
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == 0) {
                layer.alert("注册失败！", -1, "提示框");
            }
            else if (data.d == -1) {
                layer.alert("未登录,请登录后报名课程！", 9, function () {
                    window.location.href = "/portal/login.aspx?BackURL=/G2S/Site/Preview?currentoc=" + $scope.ocid;
                });

            }
            else {
                OCMoocRecruitClassDescList_Get();
                $scope.ShowFirst = 1;
                ShowRegist(obj);
            }

        });
    }
    var moocpageis;
    $scope.ShowMooc = 0;
    $scope.ShowFirst = 0;
    $scope.PageMoocRegister = function (obj) {
        ShowRegist(obj);
    }

    var ShowRegist = function (obj) {
        $scope.ShowMooc = obj.IsCanRead;
        moocpageis = $.layer({
            type: 1,
            title: false,
            area: ['auto', "200px"],
            border: [0],
            shade: [0.5, '#000'],
            closeBtn: [0, false],
            shift: 'top',
            page: { dom: '#registerMoocPage' }
        });
    }
    $scope.CloseMoocPage = function () {
        $scope.ShowMooc = 0;
        layer.close(moocpageis);
    }

    $scope.getDateDiff = function (desc, obj) {

        if (obj.RecruitEndDate == null || obj.RecruitEndDate == '') {
            return;
        }
        var re = /-?\d+/;
        var m = re.exec(obj.RecruitEndDate);
        if (m < 0) { return "离报名截止还有0天"; }
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = re.exec(obj.CreateTime); //new Date().getTime();
        var diffValue = m - now;
        diffValue += 24 * 60 * 60 * 1000;
        if (diffValue < 0) {
            return "离报名截止还有0天";
        }


        var monthC = diffValue / (month);
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / (day);
        var hourC = diffValue / (hour);
        var minC = diffValue / (minute);

        if (monthC >= 1) {
            result = desc + parseInt(monthC) + "个月";
        }
        else if (weekC >= 1) {
            result = desc + parseInt(weekC) + "个星期";
        }
        else if (dayC >= 1) {
            result = desc + parseInt(dayC) + "天";
        }
        else if (hourC >= 1) {
            result = desc + parseInt(hourC) + "个小时";
        } else {
            result = "离报名截止还有0天";
        }
        return result;
    }

    $scope.GetTrue = function (obj, fType) {
        //debugger;
        var re = /-?\d+/;
        if (obj == null) {
            return false;
        }
        //var m = re.exec(DateFormate(obj.RecruitEndDate, "yyyy-MM-dd"));
        var m2 = re.exec(obj.RecruitStartDate); //注册开始时间
        var m1 = re.exec(obj.RecruitEndDate);    //注册结束时间
        var now = re.exec(obj.CreateTime);//当前时间
        //if (m1 < 0) { return false; }
        //var now = new Date().getTime();     
        var diffValue1 = now - m2;//随时加入 是否到注册时间 >=0 可以注册
        var diffValue2 = m1 - now; // +24 * 60 * 60 * 1000 >0  可以注册

        //diffValue1 -= 24 * 60 * 60 * 1000;
        diffValue2 += 24 * 60 * 60 * 1000;// 


        if (fType == 1) {//可以报名
            if (obj.JoinType == 2 && obj.RecruitStatus == 1 && obj.IsJoin == 0 && obj.IsFull == 0 && diffValue1 >= 0 && diffValue2 >= 0) {//统一开课
                return true;
            }
            else if (obj.JoinType == 1 && obj.RecruitStatus == 1 && obj.IsJoin == 0 && obj.IsFull == 0 && diffValue1 >= 0) {//随时招生
                return true;
            }
            else {
                return false;
            }

        }
        if (fType == 2) {//不可报名（暂停招生、未开始招生、招生已满） 未过期
            if (obj.IsJoin == 0 && obj.JoinType == 2 && (obj.RecruitStatus == 0 || obj.IsFull == 1 || diffValue1 < 0)) {
                return true;
            }
            else if (obj.IsJoin == 0 && obj.JoinType == 1 && (obj.RecruitStatus == 0 || obj.IsFull == 1 || diffValue1 < 0)) {
                return true;
            }
            else {
                return false;
            };
        }
        if (fType == 3) {//已报名
            if (obj.IsJoin == 1) {
                return true;
            }
            else {
                return false;
            };
        }
        if (fType == 4) {//可以报名 已过期
            if (obj.IsJoin == 0 && obj.JoinType == 2 && obj.RecruitStatus == 1 && diffValue2 < 0) {
                return true;
            }
            else {
                return false;
            };
        }
    }
    $scope.set_Style = function (obj) {
        var height;
        if (obj.UserLimit > 0) {
            var prace = obj.StuCount / obj.UserLimit;
            height = prace * 100;
        }

        return { 'height': height + '%' }

    }
    var DateFormate = function (v, format) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format(format);
        }
    }

    init();



}]);

//过滤器
siteModule.filter('sitefilter', function () {
    return function (item, param1) {
        for (var i = 0; i < $scope.ColumnList.length; i++) {
            if (param1 == $scope.ColumnList[i].ColumnID) {
                item = $scope.ColumnList[i];
                return item;
            }
        }
    };
});

////移除焦点事件
//siteModule.directive('ngBlur', function ($parse) {
//    return function (scope, element, attr) {
//        var fn = $parse(attr['ngBlur']);
//        $(element).on('focusout', function (event) {
//            fn(scope, { $event: event });
//        });
//    }
//});
//指令在这
siteModule.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

siteModule.directive('onColumnGet', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngColumnGet');
                });
            }
        }
    };
});

//ColumnSonList
siteModule.directive('onColumnSonList', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngColumnSonList');
                });
            }
        }
    };
});


siteModule.filter('OCTheme_ListCount', function () {
    return function (item) {
        if (item == null || item == "") {
            return;
        }
        return item.filter(function (i) {
            var rslt = i.rowsCount / 15;
            rslt = Math.ceil(rslt);
            return i.rownum <= rslt;
        });
    }
});