
'use strict';

var classModule = angular.module('app.oc.class', []);

classModule.controller('ClassController', ['$scope', '$state', 'classProviderUrl', function ($scope, $state, classProviderUrl) {
    $scope.ocID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    var history = $G2S.request("IsHistroy", false);
    $scope.OCClass = {
        Key: "请输入‘班级’ ‘学生姓名’关键字",
        OCID: $scope.ocID,
        IsHistroy: history,
        TermID: -1,
        OCClassID: -1
    };

    $scope.PageSize = 10;
    $scope.PagesNum = 10;

    $scope.OCClassStudentList = null;//教学班学生列表
    //待更新的教学班信息
    $scope.OCClass_Temp = null;
    $scope.OCClass_Upd = {
        OCClassID: -1,
        RegNum: "",
        RegStatus: false
    };

    //教学班详细信息
    $scope.Class_Details = {
        OCClassID: -1,
        TeachingClassID: -1,
        TeachingClassName: "",
        StudentCount: 0
    };
    $scope.initOcPage = false; //是否可以初始化分页控件

    var GetClassList = function (Index) {
        if ($scope.OCClass.Key == "请输入‘班级’ ‘学生姓名’关键字")
            $scope.OCClass.Key = "";
        var url = classProviderUrl + "/ClassList";
        var param = {
            model: $scope.OCClass,
            PageIndex: Index,
            PageSize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                $scope.OCClassList = null;
                //layer.alert("暂无搜索数据！", -1, "提示框");
            } else {
                //console.log(data.d);
                $scope.OCClassList = data.d;
                if ($scope.initOcPage) {
                    $scope.PagesNum = Math.ceil(data.d[0].RowsCount / $scope.PageSize);

                    OCClassPage($scope.PagesNum);
                    $scope.initOcPage = false;
                }
            }
        });
    }
    //教学班分页信息
    var OCClassPage = function (Num) {
        laypage({
            cont: $('#ClassPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: Num, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                if (!$scope.initOcPage) {
                    GetClassList(e.curr);
                }

            }
        });
    }
    //教学班搜索
    $scope.SearchClassList = function () {
        $scope.initOcPage = true
        GetClassList(1);
    }
    ///教学班切换
    $scope.ShowHistroyOCClass = function (model) {
        if ($scope.OCClass.IsHistroy != model) {
            $scope.OCClass.IsHistroy = model;
            $scope.OCClass.Key = "";
            initClass();
        }
    }
    //初始化页面教学班数据
    var initClass = function () {
        $scope.initOcPage = true
        GetClassList(1);
    }
    initClass();
    //修改注册码 弹框
    $scope.RegNum_Upd = function (model) {
        $scope.OCClass_Temp = model;
        $scope.OCClass_Upd.OCClassID = model.OCClassID;
        $scope.OCClass_Upd.RegNum = model.RegNum;
        $scope.OCClass_Upd.RegStatus = model.RegStatus;
        $('#myRegNumModal').modal("show");
    }
    ///修改注册码
    $scope.OCClass_RegNum_Upd = function () {
        var url = classProviderUrl + "/OCClass_RegNum_Upd";
        var param = {
            model: $scope.OCClass_Upd
        };
        if ($scope.OCClass_Upd.RegStatus && ($scope.OCClass_Upd.RegNum == "" || $scope.OCClass_Upd.RegNum == null)) {
            layer.alert("注册码不能为空！请输入注册码", -1, "提示框");
            return;
        }


        $scope.baseService.post(url, param, function (data) {
            if (data.d == false) {
                layer.alert("修改失败！", -1, "提示框");
            } else {
                layer.alert("修改成功！", -1, "提示框");
                $scope.OCClass_Temp.OCClassID = $scope.OCClass_Upd.OCClassID;
                $scope.OCClass_Temp.RegNum = $scope.OCClass_Upd.RegNum;
                $scope.OCClass_Temp.RegStatus = $scope.OCClass_Upd.RegStatus;
                $scope.OCClass_Upd = {
                    OCClassID: -1,
                    RegNum: "",
                    RegStatus: false
                };
            }
        });

    }

    ///设为结业
    $scope.OCClass_IsHistroy_Upd = function (model) {
        var url = classProviderUrl + "/OCClass_IsHistroy_Upd";
        model.StartDate = "2014-01-01";
        model.EndDate = "2014-01-01";
        model.RecruitStartDate = "2014-01-01";
        model.RecruitEndDate = "2014-01-01";
        model.CreateTime = "2014-01-01";
        var param = {
            model: model
        };
        if (confirm("你确定设为结业教学班吗？")) {
            $scope.baseService.post(url, param, function (data) {
                if (data.d == false) {
                    layer.alert("设为结业失败！", -1, "提示框");
                } else {
                    //layer.alert("设为结业成功！", -1, "提示框");
                    GetClassList(1);
                }
            });
        }
    }

    //删除教学班
    $scope.OCClass_Del = function (model) {
        model.StartDate = "2014-01-01";
        model.EndDate = "2014-01-01";
        model.RecruitStartDate = "2014-01-01";
        model.RecruitEndDate = "2014-01-01";
        model.CreateTime = "2014-01-01";
        var url = classProviderUrl + "/OCClass_Del";
        var param = {
            model: model
        };
        if (confirm("你确定删除教学班吗？")) {
            $scope.baseService.post(url, param, function (data) {
                if (data.d == false) {
                    layer.alert("删除失败！", -1, "提示框");
                } else {
                    //alert("删除成功");
                    //GetClassList();
                    for (var i = 0; i < $scope.OCClassList.length; i++) {
                        if ($scope.OCClassList[i].OCClassID == model.OCClassID) {
                            $scope.OCClassList.splice(i, 1);
                            OCClassPage(Math.ceil((model.RowsCount - 1) / $scope.PageSize));
                            return;
                        }
                    }
                }
            });
        }
    }



    //begin查看详细
    //教学班全部学生信息
    $scope.OCClassStudent_List = function (model) {
        $('#myDetailsModal').modal("show");
        $scope.Class_Details.OCClassID = model.OCClassID;
        $scope.Class_Details.TeachingClassID = model.TeachingClassID;
        $scope.Class_Details.TeachingClassName = model.TeachingClassName;
        $scope.Class_Details.StudentCount = model.StudentCount;
        //$scope.PagesStudentNum = Math.ceil(model.StudentCount / $scope.PageSize);
        StudentList(Math.ceil(model.StudentCount / $scope.PageSize));
    }

    var GetClassStudentDetails = function (sIndex) {
        var url = classProviderUrl + "/OCClassStudent_List";
        var param = {
            occlass: $scope.Class_Details,
            PageIndex: sIndex,
            PageSize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                //layer.alert("暂无搜索数据！", -1, "提示框");
            } else {
                $scope.OCClassStudentList = data.d;
            }
        });
    }

    var StudentList = function (StudentNum) {
        laypage({
            cont: $('#StudentPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: StudentNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 5,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                GetClassStudentDetails(e.curr);
            }
        });
    }
    //end查看详细


    //编辑教学班
    $scope.Edit_OCClass = function (model) {
        //alert(model.OCClassID);
        window.location.href = "AddTeachingClass?OCClassID=" + model.OCClassID + "&TeachingClassID=" + model.TeachingClassID;
        //导航到添加页面
        ///TODO
    }

    //添加教学班
    $scope.OCClass_ADD = function () {
        //$scope.OCClass
        //导航到添加页面
        ///TODO
    }

    //导出全部教学班学生信息
    $scope.OCClass_InputOutAll = function (model) {
        var url = classProviderUrl + "/ExportAllClassStudent";
        var param = {
            teachingClassID: model,
            oCID: $scope.OCClass.OCID,
            isHistory: $scope.OCClass.IsHistroy
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length > 0) {
                var strurl = (window.location.href).toLowerCase();
                var strsplit = strurl.split("/oc/");
                //E:\IES2\IES2\G2S\Temp\c2f012e7-a62b-44f7-9d48-a6f6d01953e6StudentAll.xls
                var tempUrl = strsplit[0] + "/Temp/" + data.d
                //console.log(data.d);
                //console.log(tempUrl);
                window.open(tempUrl);
            }
            else {
                layer.alert("无数据！", -1, "提示框");
            }
        });

    }

    //begin学生申请审核列表
    //审核学生申请
    //$('.apply_btn').live('click', function () {
    //    if (!$(this).hasClass('click')) {
    //        $(this).addClass('click');
    //        $(this).parent().next().children().first().show();
    //        $(this).text('[收起]');
    //    } else {
    //        $(this).removeClass('click');
    //        $(this).parent().next().children().first().hide();
    //        $(this).text('[申请审核]')
    //    }
    //})

    //$scope.RegStudentList = null;
    //$scope.SelectRegAll = false;//是否全选

    //$scope.ckb_Reg_All = function () {
    //    $scope.SelectRegAll = !$scope.SelectRegAll;
    //    for (var i = 0; i < $scope.RegStudentList.length; i++) {
    //        $scope.RegStudentList[i].IsSelected = $scope.SelectRegAll;
    //    }
    //}
    //$scope.ckb_Reg_Single = function () {
    //    $scope.SelectRegAll = false;
    //}

    //$scope.ExamineModel = {
    //    OCID: $scope.ocID,
    //    IDs: '',
    //    ReviewStatus: 0,//审核结果
    //    Reason: '',      //驳回理由
    //    fType: 0,// 0批量审核  1单个审核
    //};
    //var GetRegStudentList = function () {
    //    var url = classProviderUrl + "/OCClassRegStudent_List";
    //    var param = {
    //        examinemodel: $scope.ExamineModel,
    //        PageIndex: 1,
    //        PageSize: 9999
    //    };
    //    $scope.baseService.post(url, param, function (data) {
    //        if (data.d === null) {
    //            $scope.RegStudentList = null;
    //        } else {
    //            $scope.RegStudentList = data.d;
    //        }
    //    });
    //}

    //GetRegStudentList();

    ////批量审核
    //$scope.BatchExamine = function () {
    //    $scope.ExamineModel.fType = 1;
    //    if ($scope.RegStudentList == null) {
    //        return;
    //    }
    //    for (var i = 0; i < $scope.RegStudentList.length; i++) {
    //        if ($scope.RegStudentList[i].IsSelected) {
    //            $scope.ExamineModel.IDs += $scope.RegStudentList[i].ID + ','
    //        }
    //    }
    //    if ($scope.ExamineModel.IDs.length < 1) {
    //        alert("请选择需要审核的人！");
    //        return;
    //    }
    //    $('#myExamineModal').modal("show");
    //}
    ////单个审核
    //$scope.SingleExamine = function (regstudent) {
    //    $scope.ExamineModel.IDs = regstudent.ID;
    //    $scope.ExamineModel.fType = 0;
    //    $('#myExamineModal').modal("show");
    //}
    ////确认审核
    //$scope.SaveExamine = function () {
    //    var url = classProviderUrl + "/Save_BatchExamine";
    //    var param = {
    //        examinemodel: $scope.ExamineModel
    //    };
    //    $scope.baseService.post(url, param, function (data) {
    //        if (data.d === null) {
    //        } else {
    //            SaveExamineSuccess();
    //        }
    //    });

    //}
    ////审核成功
    //var SaveExamineSuccess = function () {
    //    var ptl = 0;
    //    if ($scope.RegStudentList != null) {
    //        ptl = $scope.RegStudentList.length;
    //    }
    //    var n = ptl;
    //    //删除全局对象里面的数据
    //    if ($scope.ExamineModel.fType == 1) {
    //        for (var i = 0; i < ptl; i++) {
    //            var tactic = $scope.RegStudentList[i + n - ptl];
    //            if (tactic.IsSelected == true) {
    //                $scope.RegStudentList.splice(i + n - ptl, 1);
    //                n = n - 1;
    //            }
    //        }
    //    }
    //    else {
    //        for (var i = 0; i < ptl; i++) {
    //            var tactic = $scope.RegStudentList[i + n - ptl];
    //            if (tactic.ID == $scope.ExamineModel.IDs) {
    //                $scope.RegStudentList.splice(i + n - ptl, 1);
    //                break;
    //            }
    //        }
    //    }

    //    alert("审核成功！");
    //    $scope.ExamineModel.IDs = "";
    //    $("#myExamineModal").modal("hide");
    //}
    ////end学生申请审核列表

    //导入班级学生

    $scope.filesuffix = ['.xls', '.xlsx'];
    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        console.log(response);
        GetInmputStudents(response);
        $("#file").val("");
    });
    //$scope.$on("onCompleteAll", function (event) {
    //    layer.msg('上传完成!', 1, 1);
    //});
    var box;
    $scope.OCClassIDTemp = null;
    $scope.ShowBox = function (OCClassID) {
        $scope.OCClassIDTemp = OCClassID;
        box = $.layer({
            type: 1,
            title: ["导入教学班学生", true],
            //shift: 'right-bottom',
            maxmin: true,
            area: ['400px', "auto"],
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

    var GetInmputStudents = function (fileUrl) {
        if ($scope.OCClassIDTemp == null || $scope.OCClassIDTemp == -1) {
            layer.alert("请选择需要导入的班级！", -1, "提示框");
            return;
        }

        var url = classProviderUrl + "/TeachingClassStudent_List";
        var param = {
            fileUrl: fileUrl,
            OCClassID: $scope.OCClassIDTemp
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === "") {
                layer.alert("导入异常！", -1, "提示框");
            } else {
                // var messageStr = "excel文件中学生:" + data.d.split('@')[0] + "条  成功导入学生数:" + data.d.split('@')[1] + "个  失败学生数：" + data.d.split('@')[2];
                layer.alert(data.d, -1, "提示框");
                layer.close(box);
                $scope.OCClassIDTemp = null;
                initClass();
            }
        });
    }

    //导入班级学生

}]);

classModule.controller('AddClassController', ['$scope', '$state', 'classProviderUrl', function ($scope, $state, classProviderUrl) {


    $scope.OCClass = null;
    $scope.OCClassTeachertList = null;
    $scope.OCClassStudentList = null;
    $scope.PageSize = 8;
    $scope.ocID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    $scope.OCClassID = $G2S.request("OCClassID", -1);

    $scope.TeachingClassID = $G2S.request("TeachingClassID", -1);

    $scope.OCClass = {
        OCID: $scope.ocID,
        OCClassID: $scope.OCClassID
    };
    $scope.OCClassTemp = {
        OCID: $scope.ocID,
        OCClassID: $scope.OCClassID
    };

    $scope.OCTeamTeacher = {
        OCID: $scope.ocID,
        OCClassID: $scope.OCClassID,
        Role: -1
    };
    //获取编辑教学班
    var OCClass_Get = function () {
        if ($scope.OCClassTemp.OCClassID != -1) {
            var url = classProviderUrl + "/OCClass_Get";
            var param = {
                occlass: $scope.OCClassTemp
            };
            $scope.baseService.post(url, param, function (data) {
                if (data.d === null) {
                } else {
                    $scope.OCClass = data.d;
                }
            });
        }
    }
    var OCClassStudent_List = function () {
        if ($scope.OCClassTemp.OCClassID != -1) {
            var url = classProviderUrl + "/OCClassStudent_List";
            var param = {
                occlass: $scope.OCClassTemp,
                PageIndex: 1,
                PageSize: 99999
            };
            $scope.baseService.post(url, param, function (data) {
                if (data.d.length <= 0) {

                } else {
                    $scope.OCClassStudentList = data.d;
                    $scope.OCClassStudentIndex = 1;
                    OCClassStudentPages(Math.ceil(data.d[0].RowsCount / $scope.PageSize), 0);
                    //$scope.$apply();
                }
            });
        }
    }
    if ($scope.OCClassID != -1) {
        OCClass_Get();
        OCClassStudent_List();
    }

    //获取编辑教学班授课教师
    var OCTeam_Dropdown_List = function () {
        var url = classProviderUrl + "/OCTeam_Dropdown_List";
        var param = {
            occlass: $scope.OCTeamTeacher
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {

            } else {
                $scope.OCClassTeachertList = data.d;
                //console.log($scope.OCClassTeachertList);
                GetTeamUserIDList();
            }
        });
    }
    OCTeam_Dropdown_List();
    //获取编辑教学班学生信息

    //添加其他授课教师

    $scope.ShowAddTeacherModel = function () {
        $('#myAddTeacherModal').modal("show");
        $scope.initPage = true;
        GetTeacherList(1);
    }
    $scope.CloseDialog = function () {
        $('#myAddTeacherModal').modal("hide");
    }
    $scope.TeacherModel = {
        Key: "",
        UserID: -1
    };
    var TeamPages = function (PageNum) {
        laypage({
            cont: $('#TeamPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                if (!$scope.initPage) {
                    GetTeacherList(e.curr);
                }
            }
        });

    }
    ///搜索获取站内用户列表
    var GetTeacherList = function (pageIndex) {
        var url = classProviderUrl + "/Teacher_List";
        var param = {
            teacher: $scope.TeacherModel,
            pageindex: pageIndex,
            pagesize: $scope.PageSize
        };

        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                layer.alert("暂无搜索数据！", -1, "提示框");
            } else {
                $scope.TeacherList = data.d;
                SetIsSelected();
                $scope.TeamNum = data.d[0].rowscount;
                if ($scope.initPage) {
                    TeamPages(Math.ceil($scope.TeamNum / $scope.PageSize));
                    $scope.initPage = false;

                }
            }
        });
    }
    $scope.SearchUserList = function () {
        if ($scope.TeacherModel.Key == "请输入关键字" || $scope.TeacherModel.Key == "") {
            layer.alert("请输入关键字！", -1, "提示框");
            return;
        }
        $scope.initPage = true;
        GetTeacherList(1);
    }
    //获取选择项
    $scope.GetSelectUser = function () {
        $('#myAddTeacherModal').modal("hide");
        var TeacherSelectModel = {
            OCClassID: -1,
            OCID: -1,
            Role: 1,
            UserID: null,
            UserName: "",
            IsSelected: true
        };

        for (var i = 0; i < $scope.TeacherList.length; i++) {
            if ($scope.TeacherList[i].UserID == $scope.TeacherModel.UserID) {
                TeacherSelectModel.UserID = $scope.TeacherList[i].UserID;
                TeacherSelectModel.UserName = $scope.TeacherList[i].UserName;
                TeacherSelectModel.IsSelected = true;
                $scope.OCClassTeachertList.push(TeacherSelectModel);
                $scope.TeacherModel.UserID = -1;
                GetTeamUserIDList();
                return;
            }
        }
    }

    var TeamUserIDList = "";//授课教师集合 
    var IsSelectTeamUser = false;

    var GetTeamUserIDList = function () {
        TeamUserIDList = "";
        if ($scope.OCClassTeachertList != null && $scope.OCClassTeachertList.length > 0) {
            for (var i = 0; i < $scope.OCClassTeachertList.length; i++) {
                TeamUserIDList += $scope.OCClassTeachertList[i].UserID + ',';
                if ($scope.OCClassTeachertList[i].IsSelected) {
                    IsSelectTeamUser = true;
                }
            }
        }
        if (TeamUserIDList.indexOf(',') > 0) {
            TeamUserIDList = ',' + TeamUserIDList;
        }
    }

    $scope.IsSelected = function (userID) {
        var userIDTemp = ',' + userID + ',';
        if (TeamUserIDList.indexOf(userIDTemp) > -1) {
            return true;
        }
        else {
            return false;
        }
    }

    var SetIsSelected = function () {
        for (var i = 0; i < $scope.TeacherList.length; i++) {
            var userIDTemp = ',' + $scope.TeacherList[i].UserID + ',';
            if (TeamUserIDList.indexOf(userIDTemp) > -1) {
                $scope.TeacherList[i].IsSelected = true;
            }
            else {
                $scope.TeacherList[i].IsSelected = false;
            }
        }
    }

    //End添加其他授课教师

    //教学班学生分页信息信息






    //授课起止日期
    //laydate({
    //    elem: '#start_date', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
    //    event: 'focus', //响应事件。如果没有传入event，则按照默认的click
    //    festival: true, //显示节日
    //    istime: true,
    //    format: "YYYY-MM-DD", //日期格式
    //    choose: function (datas) { //选择日期完毕的回调
    //        //$scope.OCClass.StartDate = datas;
    //        $scope.$apply();
    //    }
    //});
    //授课起止日期
    var initlaydate = function (id) {
        laydate({
            elem: '#' + id, //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
            min: laydate.now(),
            event: 'focus', //响应事件。如果没有传入event，则按照默认的click
            festival: true, //显示节日
            istime: true,
            format: "YYYY-MM-DD", //日期格式
            choose: function (datas) { //选择日期完毕的回调
                if (id == "end_date")
                    $scope.OCClass.EndDate = datas;
                if (id == "start_date")
                    $scope.OCClass.StartDate = datas;
                //$scope.$apply();
            }
        });
    }

    initlaydate("end_date");
    initlaydate("start_date");

    //begin-------------------------------------添加学生

    $scope.SearchType = true;//按行政班添加  false按学生添加
    $scope.ClassModel = {
        Key: "",
        ClassID: -1
    }
    $scope.SearchModel = {
        Key: "",
        UserNo: "",
        UserName: "",
        EnterDate: "",
        ClassName: "", //机构名称
        SpecialtyName: ""
    }
    //初始化搜索框
    var InitKey = function () {
        $scope.SearchModel = {
            Key: "",
            UserNo: "",
            UserName: "",
            EnterDate: "",
            ClassName: "", //机构名称
            SpecialtyName: ""
        }
        $scope.ClassModel = {
            Key: "",
            ClassID: -1
        }
        $scope.OCClassStudentSearchList = null;
        $scope.Class_List = null;
        $scope.init_Class_List = true;
        StudentPages(0);
        SClassPages(0);
    }

    $scope.InitSearchKey = function () {
        InitKey();
        //$scope.OCClassStudentSearchList = null;
        //OCClass_Student_List();
    }

    $scope.ShowAddModal = function () {
        InitKey();
        $('#addStudentModal').modal("show");
        if ($scope.SearchType) {
            $scope.init_Class_List = true;
            Class_List(1);
        }
        else {

        }
    }
    $scope.addSearchType = function (fType) {
        $scope.SearchType = fType;
    }
    ///########################################按学生添加
    //搜索添加学生
    $scope.OCClassStudentSearchList = null;//全部搜索结果

    $scope.PageSearchStudentIndex = 1;
    $scope.OCClassStudentIndex = 1;
    $scope.PageSearchClassIndex = 1;

    //搜索学生
    $scope.SearchStudent = function () {
        if ($scope.SearchModel.Key == "" && $scope.SearchModel.UserNo == ""
            && $scope.SearchModel.UserName == "" && $scope.SearchModel.EnterDate == ""
            && $scope.SearchModel.ClassName == "" && $scope.SearchModel.SpecialtyName == "") {
            layer.alert("请输入学号、姓名、年级、所属机构、专业等搜索条件！", -1, "提示框");
            return;
        }
        $scope.OCClassStudentSearchList = null;
        OCClass_Student_List();
    }
    //搜索学生
    var OCClass_Student_List = function () {
        var url = classProviderUrl + "/OCClass_Student_List";
        var param = {
            occlassid: $scope.SearchModel,
            PageIndex: 1,
            PageSize: 99999
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                layer.alert("暂无搜索数据！", -1, "提示框");
            } else {
                $scope.OCClassStudentSearchList = data.d;
                $scope.pagesNum = Math.ceil(data.d[0].RowsCount / $scope.PageSize);
                StudentPages($scope.pagesNum);
                //$scope.$apply();
            }
        });
    }
    //选择搜索结果



    //var GetSelectedStudentIDList = function () {
    //    SelectedStudentIDList = "";
    //    if ($scope.OCClassStudentList != null) {
    //        for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
    //            SelectedStudentIDList += $scope.OCClassStudentList[i].UserID + ',';
    //        }
    //    }
    //    if (SelectedStudentIDList.indexOf(',') > 0) {
    //        SelectedStudentIDList = ',' + SelectedStudentIDList;
    //    }
    //}

    $scope.SelectSelectedStudent = function () {
        //var url = classProviderUrl + "/SelectSelectedStudent_List";
        //var param = {
        //    occlassstudentsearchlist: $scope.OCClassStudentSearchList,//选择学生列表
        //    occlassstudentlist: $scope.OCClassStudentList//已选择学生列表
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d.length <= 0) {
        //    } else {
        //        $scope.OCClassStudentList = data.d;

        //        $('#addStudentModal').modal("hide");

        //        OCClassStudentPages(Math.ceil(data.d[0].RowsCount / $scope.PageSize), 1);
        //        $scope.OCClassStudentIndex = Math.ceil(data.d[0].RowsCount / $scope.PageSize);
        //        //$scope.$apply();
        //    }
        //});
        //UpdateOCClassStudentList($scope.OCClassStudentSearchList);
        //$('#addStudentModal').modal("hide");
        var SelectedStudentIDList = "";
        var OCClassStudentListTemp = [];
        var OCClassStudentListTempNew = [];
        if ($scope.OCClassStudentList != null) {
            for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
                SelectedStudentIDList += $scope.OCClassStudentList[i].UserID + ',';
                OCClassStudentListTemp.push($scope.OCClassStudentList[i]);
            }
        }
        if (SelectedStudentIDList.indexOf(',') > 0) {
            SelectedStudentIDList = ',' + SelectedStudentIDList;
        }

        if ($scope.OCClassStudentSearchList != null && $scope.OCClassStudentSearchList.length > 0) {
            for (var i = 0; i < $scope.OCClassStudentSearchList.length; i++) {
                var userIDTemp = ',' + $scope.OCClassStudentSearchList[i].UserID + ',';
                if ($scope.OCClassStudentSearchList[i].IsSelected == true && SelectedStudentIDList.indexOf(userIDTemp) == -1) {
                    OCClassStudentListTemp.push($scope.OCClassStudentSearchList[i]);
                }
            }
        }

        if (OCClassStudentListTemp != null && OCClassStudentListTemp.length > 0) {
            var RowsCount = OCClassStudentListTemp.length;
            for (var i = 0, j = 1; i < OCClassStudentListTemp.length; i++) {
                OCClassStudentListTemp[i].rownum = j;
                OCClassStudentListTemp[i].RowsCount = RowsCount;
                OCClassStudentListTempNew.push(OCClassStudentListTemp[i]);
                j++;
            }
        }

        if (OCClassStudentListTempNew != null && OCClassStudentListTempNew.length > 0) {
            $scope.OCClassStudentList = OCClassStudentListTempNew;
        }
        $('#addStudentModal').modal("hide");

        if ($scope.OCClassStudentList != null) {
            var tempIndex = Math.ceil($scope.OCClassStudentList.length / $scope.PageSize);
            if ($scope.OCClassStudentIndex > 1 && $scope.OCClassStudentIndex < tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), $scope.OCClassStudentIndex);
            } else if ($scope.OCClassStudentIndex >= tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), tempIndex);
            }
            else {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), 0);
            }
        }



    }

    // 学生是否已被选择
    $scope.IsSelectedSelected = function (UserNo) {
        var IsSelected = false;
        if ($scope.OCClassStudentList != null) {
            for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
                if ($scope.OCClassStudentList[i].UserNo == UserNo) {
                    return true;
                }
            }
        }

        return IsSelected;
    }






    //begin#弹出页全选操作
    //设置全选按钮
    $scope.SelectedType = {
        SelectAll: false,
        SelectPage: false,
        pageIndex: $scope.PageSearchStudentIndex
    };
    ///全选
    $scope.SelectAll = function (obj) {

        //var url = classProviderUrl + "/SelectAll_List";
        //var param = {
        //    occlassstudentsearchlist: $scope.OCClassStudentSearchList,//选择学生列表
        //    isselectall: obj//$scope.SelectedType.SelectAll
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d.length <= 0) {
        //    } else {
        //        $scope.OCClassStudentSearchList = data.d;
        //    }
        //});

        if ($scope.OCClassStudentSearchList != null && $scope.OCClassStudentSearchList.length > 0) {
            for (var i = 0; i < $scope.OCClassStudentSearchList.length; i++) {
                $scope.OCClassStudentSearchList[i].IsSelected = obj;
            }
        }

    }
    //全选当前页
    $scope.SelectPage = function (obj) {
        //var url = classProviderUrl + "/Select_Page_List";
        //var param = {
        //    occlassstudentsearchlist: $scope.OCClassStudentSearchList,//选择学生列表
        //    isselectall: obj,
        //    PageIndex: $scope.PageSearchStudentIndex,
        //    PageSize: $scope.PageSize
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d.length <= 0) {
        //        layer.alert("无搜索数据！", -1, "提示框");
        //    } else {
        //        $scope.OCClassStudentSearchList = data.d;
        //    }
        //});

        if ($scope.OCClassStudentSearchList != null && $scope.OCClassStudentSearchList.length > 0) {
            for (var i = 0; i < $scope.OCClassStudentSearchList.length; i++) {
                if (($scope.OCClassStudentSearchList[i].rownum <= $scope.PageSearchStudentIndex * $scope.PageSize) && ($scope.OCClassStudentSearchList[i].rownum >= (($scope.PageSearchStudentIndex - 1) * $scope.PageSize))) {
                    $scope.OCClassStudentSearchList[i].IsSelected = obj;
                }
            }
        }


    }

    $scope.SelectSingel = function () {
        $scope.SelectedType.SelectAll = false;
        $scope.SelectedType.SelectPage = false;
        setTimeout(function () {
            $scope.$apply(); //this triggers a $digest   
        }, 10);
    }
    //eng#弹出页操作


    //begin#编辑页面全选操作
    //设置全选按钮
    $scope.OCClassSelectedType = {
        SelectAll: false,
        SelectPage: false
    };
    ///全选
    $scope.OCClassSelectAll = function (obj) {
        //console.log(obj);
        //$scope.OCClassSelectedType.SelectAll = !$scope.OCClassSelectedType.SelectAll;

        //var url = classProviderUrl + "/SelectAll_List";
        //var param = {
        //    occlassstudentsearchlist: $scope.OCClassStudentList,//选择学生列表
        //    isselectall: obj// $scope.OCClassSelectedType.SelectAll
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d === null) {

        //    } else {
        //        $scope.OCClassStudentList = data.d;
        //    }
        //});
        if ($scope.OCClassStudentList != null && $scope.OCClassStudentList.length > 0) {
            for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
                $scope.OCClassStudentList[i].IsSelected = obj;
            }
        }
        //console.log($scope.OCClassSelectedType.SelectAll);
    }
    //全选当前页
    $scope.OCClassSelectPage = function (obj) {

        //var url = classProviderUrl + "/Select_Page_List";
        //var param = {
        //    occlassstudentsearchlist: $scope.OCClassStudentList,//选择学生列表
        //    isselectall: obj,
        //    PageIndex: $scope.OCClassStudentIndex,
        //    PageSize: $scope.PageSize
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d === null) {
        //    } else {
        //        $scope.OCClassStudentList = data.d;
        //    }
        //});

        if ($scope.OCClassStudentList != null && $scope.OCClassStudentList.length > 0) {
            for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
                if (($scope.OCClassStudentList[i].rownum <= $scope.OCClassStudentIndex * $scope.PageSize) && ($scope.OCClassStudentList[i].rownum >= (($scope.OCClassStudentIndex - 1) * $scope.PageSize))) {
                    $scope.OCClassStudentList[i].IsSelected = obj;
                }
            }
        }

    }

    $scope.OCClassSelectSingel = function () {
        $scope.OCClassSelectedType.SelectedAll = false;
        $scope.OCClassSelectedType.SelectedPage = false;
    }
    //eng#编辑页面全选操作



    //######---分页
    //教学班学生分页
    var OCClassStudentPages = function (PageNum, index) {
        if (index == 1) {
            index = PageNum;
        }

        laypage({
            cont: $('#OCClassStudentPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            curr: index, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 5,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //$scope.$apply();
                $scope.OCClassStudentIndex = e.curr;  //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                $scope.OCClassSelectedType.SelectedPage = false;
                setTimeout(function () {
                    console.log('message:' + $scope.OCClassStudentIndex);
                    $scope.$apply(); //this triggers a $digest   
                }, 10);

            }
        });

    }

    //学生搜索
    var StudentPages = function (PageNum) {
        laypage({
            cont: $('#SearchStuPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 5,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                $scope.PageSearchStudentIndex = e.curr;  //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                setTimeout(function () {
                    $scope.SelectedType.SelectAll = false;
                    $scope.SelectedType.SelectPage = false;
                    $scope.$apply(); //this triggers a $digest   
                }, 10);
            }
        });

    }


    $scope.init_Class_List = false;
    //教学班搜索
    var SClassPages = function (PageNum) {
        laypage({
            cont: $('#ClassPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: false, //若不显示，设置false即可
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                if (!$scope.init_Class_List) {
                    Class_List(e.curr);
                }
            }
        });

    }
    ///##############################################

    //begin##############################################按行政班添加 搜索行政班列表
    //行政班列表

    var Class_List = function (PageIndex) {
        var url = classProviderUrl + "/Class_List";
        var param = {
            model: $scope.ClassModel,
            PageIndex: PageIndex,
            PageSize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                layer.alert("暂无搜索数据！", -1, "提示框");
            } else {
                $scope.Class_List = data.d;
                $scope.ClassNum = data.d[0].rowscount;
                if ($scope.init_Class_List) {
                    SClassPages(Math.ceil(data.d[0].rowscount / $scope.PageSize));
                    $scope.init_Class_List = false;
                }
            }
        });

    }
    $scope.SearchClass = function () {
        if ($scope.ClassModel.Key == "请输入 '行政班名称' 关键字" || $scope.ClassModel.Key == "") {
            layer.alert("请输入关键字搜索！", -1, "提示框");
            return;
        }
        $scope.init_Class_List = true;
        Class_List(1);

    }
    //选择行政班学生
    $scope.SelectClassStudent = function () {
        if ($scope.ClassModel.ClassID > 0) {
            ClassStudent_List();
        }
        else {
            layer.alert("请选择行政班！", -1, "提示框");
        }
    }

    //通过行政班添加学生
    var ClassStudent_List = function () {
        var url = classProviderUrl + "/ClassStudent_List";
        var param = {
            occlass: $scope.ClassModel,//选中的行政班
            occlassstudentlist: null,// $scope.OCClassStudentList,//已选择学生列表
            PageIndex: 1,
            PageSize: 9999
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                layer.alert("暂无搜索数据！", -1, "提示框");
            } else {
                //$scope.OCClassStudentList = data.d;
                UpdateOCClassStudentList(data.d);
                //var SelectedStudentIDList = "";
                //var OCClassStudentListTemp = [];
                //var OCClassStudentListTempNew = [];
                //if ($scope.OCClassStudentList != null) {
                //    for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
                //        SelectedStudentIDList += $scope.OCClassStudentList[i].UserID + ',';
                //        OCClassStudentListTemp.push($scope.OCClassStudentList[i]);
                //    }
                //}
                //if (SelectedStudentIDList.indexOf(',') > 0) {
                //    SelectedStudentIDList = ',' + SelectedStudentIDList;
                //}

                //for (var i = 0; i < data.d.length; i++) {
                //    var userIDTemp = ',' + data.d[i].UserID + ',';
                //    if (TeamUserIDList.indexOf(userIDTemp) == -1) {
                //        OCClassStudentListTemp.push(data.d[i]);
                //    }
                //}
                //if (OCClassStudentListTemp != null && OCClassStudentListTemp.length > 0) {
                //    var RowsCount = OCClassStudentListTemp.length;
                //    for (var i = 0, j = 1; i < OCClassStudentListTemp.length; i++) {
                //        OCClassStudentListTemp[i].rownum = j;
                //        OCClassStudentListTemp[i].RowsCount = RowsCount;
                //        OCClassStudentListTempNew.push(OCClassStudentListTemp[i]);
                //        j++;
                //    }
                //}

                //if (OCClassStudentListTempNew != null && OCClassStudentListTempNew.length > 0) {
                //    $scope.OCClassStudentList = OCClassStudentListTempNew;
                //}

                //$('#addStudentModal').modal("hide");

                //if ($scope.OCClassStudentList != null) {
                //    var tempIndex = Math.ceil($scope.OCClassStudentList.length / $scope.PageSize);
                //    if ($scope.OCClassStudentIndex > 1 && $scope.OCClassStudentIndex < tempIndex) {
                //        OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), $scope.OCClassStudentIndex);
                //    } else if ($scope.OCClassStudentIndex >= tempIndex) {
                //        OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), tempIndex);
                //    }
                //    else {
                //        OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), 0);
                //    }
                //}
                $('#addStudentModal').modal("hide");
                $scope.OCClassSelectedType.SelectedAll = false;
                $scope.OCClassSelectedType.SelectedPage = false;
            }
        });
    }

    //添加导入学生数据源更新
    var UpdateOCClassStudentList = function (objList)
    {
        var SelectedStudentIDList = "";
        var OCClassStudentListTemp = [];
        var OCClassStudentListTempNew = [];
        if ($scope.OCClassStudentList != null) {
            for (var i = 0; i < $scope.OCClassStudentList.length; i++) {
                SelectedStudentIDList += $scope.OCClassStudentList[i].UserID + ',';
                OCClassStudentListTemp.push($scope.OCClassStudentList[i]);
            }
        }
        if (SelectedStudentIDList.indexOf(',') > 0) {
            SelectedStudentIDList = ',' + SelectedStudentIDList;
        }

        for (var i = 0; i < objList.length; i++) {
            var userIDTemp = ',' + objList[i].UserID + ',';
            if (SelectedStudentIDList.indexOf(userIDTemp) == -1) {
                OCClassStudentListTemp.push(objList[i]);
            }
        }
        if (OCClassStudentListTemp != null && OCClassStudentListTemp.length > 0) {
            var RowsCount = OCClassStudentListTemp.length;
            for (var i = 0, j = 1; i < OCClassStudentListTemp.length; i++) {
                OCClassStudentListTemp[i].rownum = j;
                OCClassStudentListTemp[i].RowsCount = RowsCount;
                OCClassStudentListTempNew.push(OCClassStudentListTemp[i]);
                j++;
            }
        }

        if (OCClassStudentListTempNew != null && OCClassStudentListTempNew.length > 0) {
            $scope.OCClassStudentList = OCClassStudentListTempNew;
        }
        if ($scope.OCClassStudentList != null) {
            var tempIndex = Math.ceil($scope.OCClassStudentList.length / $scope.PageSize);
            if ($scope.OCClassStudentIndex > 1 && $scope.OCClassStudentIndex < tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), $scope.OCClassStudentIndex);
            } else if ($scope.OCClassStudentIndex >= tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), tempIndex);
            }
            else {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), 0);
            }
        }
    }

    //----------------------------------------------

    //导入班级学生

    $scope.filesuffix = ['.xls', '.xlsx'];
    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        console.log(response);
        GetInmputStudents(response);
        $("#file").val("");
    });

    //$scope.$on("onCompleteAll", function (event) {
    //    layer.msg('上传完成!', 1, 1);
    //});
    var box;
    $scope.ShowBox = function () {
        box = $.layer({
            type: 1,
            title: ["导入教学班学生", true],
            //shift: 'right-bottom',
            maxmin: true,
            area: ['400px', "auto"],
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

    var GetInmputStudents = function (fileUrl) {
        var url = classProviderUrl + "/ImportStudent_List";
        var oldNum = 0;
        if ($scope.OCClassStudentList != null)
            oldNum = $scope.OCClassStudentList.length;

        var param = {
            fileUrl: fileUrl,
            teachingclassid: $scope.TeachingClassID,
            occlassstudentlist:null// $scope.OCClassStudentList//已选择学生列表 
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                layer.alert("没有数据导入！", -1, "提示框");
            } else {
                //$scope.OCClassStudentList = data.d;
                UpdateOCClassStudentList(data.d);
                var newNum = $scope.OCClassStudentList.length - oldNum;
                //$scope.OCClassStudentIndex = 1;
                //OCClassStudentPages(Math.ceil(data.d.length / $scope.PageSize), 1);
                layer.alert("成功导入学生" + newNum + "条", -1, "提示框");
                layer.close(box);
            }
        });
    }

    //导入班级学生


    //保存行政班信息
    var DoubleCliked = false
    $scope.OCClass_Edit = function () {
        if (DoubleCliked) {
            console.log(DoubleCliked);
            return;
        }
        DoubleCliked = true;
        $scope.OCClass.StartDate = DateFormate($scope.OCClass.StartDate, "yyyy-MM-dd");
        $scope.OCClass.EndDate = DateFormate($scope.OCClass.EndDate, "yyyy-MM-dd");

        if ($scope.OCClass.TeachingClassName == undefined || $scope.OCClass.TeachingClassName == "") {
            layer.alert("教学班名称不能为空！", -1, "提示框");
            DoubleCliked = false;
            return;
        }
        if ($scope.OCClass.StartDate == "" || $scope.OCClass.EndDate == "") {
            layer.alert("请选择授课起止日期！", -1, "提示框");
            DoubleCliked = false;
            return;
        }
        if ($scope.OCClass.StartDate > $scope.OCClass.EndDate) {
            layer.alert("授课开始日期不能大于结束日期！", -1, "提示框");
            DoubleCliked = false;
            return;
        }
        GetTeamUserIDList();
        if (!IsSelectTeamUser) {
            layer.alert("请选择授课教师！", -1, "提示框");
            DoubleCliked = false;
            return;
        }

        if ($scope.OCClass.RegStatus && ($scope.OCClass.RegNum == "" || $scope.OCClass.RegNum == null)) {
            layer.alert("注册码不能为空！请输入注册码", -1, "提示框");
            $scope.disabledClike = false;
            return;
        }


        var url = classProviderUrl + "/OCClass_Edit";
        $scope.OCClass.RecruitStartDate = "2014-01-01";
        $scope.OCClass.RecruitEndDate = "2014-01-01";
        $scope.OCClass.CreateTime = "2014-01-01";


        var param = {
            occlass: $scope.OCClass,
            octeamdropdownlist: $scope.OCClassTeachertList,
            occlassstudent: $scope.OCClassStudentList
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                if ($scope.OCClass.OCClassID != -1) {
                    layer.alert("修改成功！", -1, "提示框");
                    window.location.href = "index";
                }
                else {
                    layer.alert("添加成功！", -1, "提示框");
                    window.location.href = "index";
                }
            }
        });
    }
    //yyyy-MM-dd  ；yyyy-MM-dd hh:mm:ss；hh:mm；MM-dd；hh:mm；yyyy
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


    //end##############################################按行政班添加 搜索行政班列表


    //end-------------------------------------添加学生










    //删除学生
    $scope.DeleteStudent = function (occlassstudent) {
        //var url = classProviderUrl + "/DeleteStudent";
        //var param = {
        //    occlassstudent: occlassstudent,
        //    occlassstudentlist: $scope.OCClassStudentList
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d == false) {
        //        layer.alert("删除学生失败！", -1, "提示框");
        //    } else {
        //        $scope.OCClassStudentList = data.d;
        //    }
        //});
        var OCClassStudentListTemp = [];
        if ($scope.OCClassStudentList != null && $scope.OCClassStudentList.length > 0) {
            for (var i = 0, j = 1; i < $scope.OCClassStudentList.length; i++) {
                if ($scope.OCClassStudentList[i].UserID == occlassstudent.UserID) {
                    continue;
                }
                else {
                    $scope.OCClassStudentList[i].rownum = j;
                    OCClassStudentListTemp.push($scope.OCClassStudentList[i]);
                    j++;
                }
            }
            if (OCClassStudentListTemp.length > 0) {
                $scope.OCClassStudentList = OCClassStudentListTemp;
            }
            else {
                $scope.OCClassStudentList = [];
            }
        }
        if ($scope.OCClassStudentList != null) {
            //$scope.OCClassStudentIndex = 1;
            var tempIndex = Math.ceil($scope.OCClassStudentList.length / $scope.PageSize);
            if ($scope.OCClassStudentIndex > 1 && $scope.OCClassStudentIndex < tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), $scope.OCClassStudentIndex);
            } else if ($scope.OCClassStudentIndex >= tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), tempIndex);
            }
            else {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), 0);
            }
        }


    }

    //批量删除
    $scope.BatchDeleteStudent = function () {
        //var url = classProviderUrl + "/BatchDeleteStudent";
        //var param = {
        //    occlassstudentlist: $scope.OCClassStudentList
        //};
        //$scope.baseService.post(url, param, function (data) {
        //    if (data.d.length <= 0) {

        //        $scope.OCClassStudentList = null;
        //        OCClassStudent_List();
        //        //layer.alert("删除学生失败！", -1, "提示框");
        //    } else {
        //        $scope.OCClassStudentList = data.d;
        //        console.log($scope.OCClassStudentList);
        //        OCClassStudent_List();
        //    }
        //});
        var OCClassStudentListTemp = [];
        if ($scope.OCClassStudentList != null && $scope.OCClassStudentList.length > 0) {
            for (var i = 0, j = 1; i < $scope.OCClassStudentList.length; i++) {
                if ($scope.OCClassStudentList[i].IsSelected == false) {
                    $scope.OCClassStudentList[i].rownum = j;
                    OCClassStudentListTemp.push($scope.OCClassStudentList[i]);
                    j++;
                }
            }
            if (OCClassStudentListTemp.length > 0) {
                $scope.OCClassStudentList = OCClassStudentListTemp;
            }
            else {
                $scope.OCClassStudentList = [];
            }
        }
        if ($scope.OCClassStudentList != null) {
            //$scope.OCClassStudentIndex = 1;
            var tempIndex = Math.ceil($scope.OCClassStudentList.length / $scope.PageSize);
            if ($scope.OCClassStudentIndex > 1 && $scope.OCClassStudentIndex < tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), $scope.OCClassStudentIndex);
            } else if ($scope.OCClassStudentIndex >= tempIndex) {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), tempIndex);
            }
            else {
                OCClassStudentPages(Math.ceil($scope.OCClassStudentList.length / $scope.PageSize), 0);
            }
        }

        $scope.OCClassSelectedType.SelectedAll = false;
    }

    $scope.GoBack = function () {
        window.location.href = "../class/index";
    }

    $('.import_box').hover(function () {
        $(this).find('.download_box').toggle();
    })
}]);

classModule.controller('OnLineController', ['$scope', '$state', 'classProviderUrl', function ($scope, $state, classProviderUrl) {


    $scope.ocID = $G2S.request("courentoc", -1);
    if ($scope.ocID == -1) {
        $scope.ocID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    }

    $scope.PageSize = 10;
    $scope.AllstuCheck = false;
    $scope.OCMoocModel = {
        Key: "",
        OCID: $scope.ocID,
        TermID: -1,
        IsHistroy: -1
    };

    $scope.initMoocPage = false; //是否可以初始化分页控件
    $scope.OCMoocRecruitList = null;
    var GetOCMoocRecruitList = function (Index) {
        //if ($scope.OCMoocModel.Key == "请输入‘班级’ ‘学生姓名’关键字")
        //    $scope.OCMoocModel.Key = "";
        var url = classProviderUrl + "/OCMoocRecruit_List";
        var param = {
            ocmoocrecruit: $scope.OCMoocModel,
            PageIndex: Index,
            PageSize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length < 1) {
                //alert('暂无数据！');
            } else {
                $scope.OCMoocRecruitList = data.d;
                if ($scope.initMoocPage) {
                    OCMoocRecruitPage(Math.ceil(data.d[0].RowsCount / $scope.PageSize));
                    $scope.initMoocPage = false;
                }
            }
        });
    }
    //教学班分页信息
    var OCMoocRecruitPage = function (Num) {
        laypage({
            cont: $('#OCMoocPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: Num, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                if (!$scope.initMoocPage) {
                    GetOCMoocRecruitList(e.curr);
                }
            }
        });
    }
    //教学班搜索
    $scope.SearchOCMoocList = function () {
        initOCMoocList();
    }

    var initOCMoocList = function () {
        $scope.initMoocPage = true
        GetOCMoocRecruitList(1);
    }
    initOCMoocList();
    //招生状态修改  暂停启用
    $scope.RecruitStatusUpd = function (model) {
        var url = classProviderUrl + "/OCMoocRecruit_RecruitStatus_Upd";
        var param = {
            recruitID: model.RecruitID,
            OCID: $scope.ocID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == false) {
                layer.alert("暂停失败！", -1, "提示框");
            } else {
                model.RecruitStatus = !model.RecruitStatus
            }
        });
    }

    //招生状态修改 结业
    $scope.OCMoocRecruitHistory_Upd = function (model) {
        var msg = "你确定将网络招生班级设为结业吗？";
        if (model.IsHistroy) {
            msg = "确定将网络招生班级设为进行中吗？";
        }
        if (confirm(msg)) {
            var url = classProviderUrl + "/OCMoocRecruit_History_Upd";
            var param = {
                recruitID: model.RecruitID,
                OCID: $scope.ocID
            };
            $scope.baseService.post(url, param, function (data) {
                if (data.d == false) {
                    layer.alert("结业操作失败！", -1, "提示框");
                } else {
                    model.IsHistroy = !model.IsHistroy;
                }
            });
        }
    }
    //网络招生注册码修改
    $scope.OCMoocModel_Temp = null;
    $scope.OCMoocModel_Upd = {
        RecruitID: -1,
        RegNum: "",
        RegStatus: false,
        OCID: $scope.ocID
    };
    //修改注册码 弹框
    $scope.ShowRegNumUpdDialog = function (model) {
        $scope.OCMoocModel_Temp = model;
        $scope.OCMoocModel_Upd.RecruitID = model.RecruitID;
        $scope.OCMoocModel_Upd.RegNum = model.RegNum;
        $scope.OCMoocModel_Upd.RegStatus = model.RegStatus;
        $('#myRegNumModal').modal("show");
    }
    ///修改注册码
    $scope.OCMoocRegNum_Upd = function () {
        var url = classProviderUrl + "/OCMoocRecruit_RegNum_Upd";
        var param = {
            ocmoocrecruit: $scope.OCMoocModel_Upd
        };
        if ($scope.OCMoocModel_Upd.RegStatus && ($scope.OCMoocModel_Upd.RegNum == "" || $scope.OCMoocModel_Upd.RegNum == null)) {
            layer.alert("注册码不能为空！请输入注册码", -1, "提示框");
            return;
        }


        $scope.baseService.post(url, param, function (data) {
            if (data.d == false) {
                layer.alert("修改注册码失败！", -1, "提示框");
            } else {
                layer.alert("修改注册码成功！", -1, "提示框");
                $scope.OCMoocModel_Temp.RecruitID = $scope.OCMoocModel_Upd.RecruitID;
                $scope.OCMoocModel_Temp.RegNum = $scope.OCMoocModel_Upd.RegNum;
                $scope.OCMoocModel_Temp.RegStatus = $scope.OCMoocModel_Upd.RegStatus;
                $scope.OCMoocModel_Upd = {
                    RecruitID: -1,
                    RegNum: "",
                    RegStatus: false
                };
            }
        });
        $('#myRegNumModal').modal("hide");

    }

    //#end 修改注册码

    //begin 网络招生删除
    //删除教学班
    $scope.OCMooc_Del = function (model) {
        var url = classProviderUrl + "/OCMoocRecruit_Del";
        var param = {
            recruitid: model.RecruitID,
            OCID: $scope.ocID
        };
        if (confirm("你确定删除教学班吗？")) {
            $scope.baseService.post(url, param, function (data) {
                if (data.d == false) {
                    layer.alert("删除失败！", -1, "提示框");
                } else {
                    for (var i = 0; i < $scope.OCMoocRecruitList.length; i++) {
                        if ($scope.OCMoocRecruitList[i].RecruitID == model.RecruitID) {
                            $scope.OCMoocRecruitList.splice(i, 1);
                            OCMoocRecruitPage(Math.ceil((model.RowsCount - 1) / $scope.PageSize));
                            return;
                        }
                    }
                }
            });
        }
    }

    //#end网络招生删除


    //begin新增编辑网络招生
    $scope.AddorEditModel = {
        RecruitID: "-1",
        OCID: $scope.ocID,
        JoinType: 1,
        RecruitStartDate: null,
        RecruitEndDate: null,
        UserLimit: 0,
        RegNum: '',
        StartDate: null,
        EndDate: null,
        RegStatus: false,
        OCClassIDs: ""
    };
    $scope.ShortClassModel = {
        RecruitID: "-1",
        OCID: $scope.ocID
    };
    //弹出新增编辑网络招生框
    $scope.AddorEditOCMoocDialo = function (model) {
        if (model == -1) {
            $scope.AddorEditModel.RecruitID = -1;
            $scope.AddorEditModel.RecruitStartDate = null; //new Date().toLocaleDateString();
            $scope.AddorEditModel.RecruitEndDate = null;//new Date().toLocaleDateString();
            $scope.AddorEditModel.StartDate = null;
            $scope.AddorEditModel.EndDate = null;
            $scope.AddorEditModel.UserLimit = "";
            $scope.AddorEditModel.RegNum = '';
            $scope.AddorEditModel.RegStatus = false;
            $scope.ShortClassModel.RecruitID = -1;
        }
        else {
            $scope.AddorEditModel = model;

            $scope.AddorEditModel.RecruitStartDate = DateFormate($scope.AddorEditModel.RecruitStartDate, 'yyyy-MM-dd');
            $scope.AddorEditModel.RecruitEndDate = DateFormate($scope.AddorEditModel.RecruitEndDate, 'yyyy-MM-dd');
            $scope.AddorEditModel.StartDate = DateFormate($scope.AddorEditModel.StartDate, 'yyyy-MM-dd');
            $scope.AddorEditModel.EndDate = DateFormate($scope.AddorEditModel.EndDate, 'yyyy-MM-dd');
            $scope.ShortClassModel.RecruitID = model.RecruitID;
        }

        //GetRecruitClassDropdownList();
        $('#myAddOrEditModal').modal("show")

    }

    var clickMack = false;
    $scope.OCMoocRecruitEdit = function () {
        if (clickMack)
        { return; }
        clickMack = true
        $scope.AddorEditModel.RecruitStartDate = DateFormate($scope.AddorEditModel.RecruitStartDate, "yyyy-MM-dd");
        if ($scope.AddorEditModel.JoinType == 2) {
            if ($scope.AddorEditModel.RecruitStartDate == ""
                || $scope.AddorEditModel.RecruitEndDate == null
                || $scope.AddorEditModel.StartDate == null
                || $scope.AddorEditModel.EndDate == null) {
                layer.alert("日期不能为空！", -1, "提示框");
                clickMack = false;
                return
            }
        }
        else {
            $scope.AddorEditModel.RecruitEndDate = '1901-01-01';
            $scope.AddorEditModel.StartDate = '1901-01-01';
            $scope.AddorEditModel.EndDate = '1901-01-01';

            if ($scope.AddorEditModel.RecruitStartDate == "") {
                layer.alert("日期不能为空！", -1, "提示框");
                clickMack = false;
                return;
            }
            //$scope.OCClass.EndDate = DateFormate($scope.OCClass.EndDate, "yyyy-MM-dd");
        }
        $scope.AddorEditModel.CreateTime = '1901-01-01';

        if ($scope.AddorEditModel.UserLimit == null || $scope.AddorEditModel.UserLimit == "" || $scope.AddorEditModel.UserLimit <= 0) {
            $scope.AddorEditModel.UserLimit = 0;
        }


        //if ($scope.AddorEditModel.UserLimit != 0 && SamStudentCount > $scope.AddorEditModel.UserLimit) {
        //    layer.alert("指定教学班人数超过人数限制", -1, "提示框");
        //    return;
        //}

        //if ($scope.AddorEditModel.RegStatus && ($scope.AddorEditModel.RegNum == "" || $scope.AddorEditModel.RegNum == null)) {
        //    layer.alert("注册码不能为空！请输入注册码", -1, "提示框");
        //    return;
        //}


        var url = classProviderUrl + "/OCMoocRecruit_Edit";
        var param = {
            ocmoocrecruit: $scope.AddorEditModel
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == []) {
                //alert();
            } else {
                //if (data.d.IsCanUpdate == 1) {
                //    layer.alert("指定教学班人数超过人数限制", -1, "提示框");
                //    return;
                //}
                if ($scope.AddorEditModel.RecruitID == -1) {
                    layer.alert("新增成功！", -1, "提示框");
                }
                else {
                    layer.alert("编辑成功！", -1, "提示框");
                }
                $('#myAddOrEditModal').modal("hide")
                initOCMoocList();
            }
            clickMack = false;
        });



    }
    ///是否显示教学班列表
    $scope.SelecedClassValue = "";
    $scope.AddorEditModel.OCClassIDs = "";
    $scope.ShowOCMoocClass = false;
    $scope.OCMoocClassDropdownList = null;
    ///获取教学班列表
    var GetRecruitClassDropdownList = function () {
        var url = classProviderUrl + "/OCMoocRecruitClass_Dropdown_List";

        var param = {
            shortocmoocclass: $scope.ShortClassModel
        };

        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                $scope.OCMoocClassDropdownList = data.d;
                initSelecedClassValue();
            }
        });

    }
    ///是否显示教学班列表
    $scope.ShowOCMoocDownList = function () {
        $scope.ShowOCMoocClass = !$scope.ShowOCMoocClass
    }
    ///获取选择的教学班
    $scope.GetSelectedClass = function (OCClass) {
        OCClass.IsSelected = !OCClass.IsSelected
        //initSelecedClassValue();
    }
    var SamStudentCount = 0;
    var initSelecedClassValue = function () {
        SamStudentCount = 0;
        $scope.SelecedClassValue = "";
        $scope.AddorEditModel.OCClassIDs = "";
        for (var i = 0; i < $scope.OCMoocClassDropdownList.length; i++) {
            if ($scope.OCMoocClassDropdownList[i].IsSelected) {
                SamStudentCount += parseInt($scope.OCMoocClassDropdownList[i].StudentCount);
                $scope.SelecedClassValue += $scope.OCMoocClassDropdownList[i].TeachingClassName + ',';
                $scope.AddorEditModel.OCClassIDs += $scope.OCMoocClassDropdownList[i].OCClassID + ',';
            }
        }
        if ($scope.SelecedClassValue.indexOf(',') > 0) {
            $scope.SelecedClassValue = $scope.SelecedClassValue.substring(0, $scope.SelecedClassValue.length - 1);
        }

        if ($scope.AddorEditModel.OCClassIDs.indexOf(',') > 0) {
            $scope.AddorEditModel.OCClassIDs = $scope.AddorEditModel.OCClassIDs.substring(0, $scope.AddorEditModel.OCClassIDs.length - 1);
        }
    }


    //end新增编辑网络招生
    //初始日期控件
    var initOcMooklaydate = function (id) {
        laydate({
            elem: '#' + id, //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
            min: laydate.now(),
            event: 'focus', //响应事件。如果没有传入event，则按照默认的click
            festival: true, //显示节日
            istime: true,
            format: "YYYY-MM-DD", //日期格式
            choose: function (datas) { //选择日期完毕的回调
                if (id == "recruitStartDate")
                    $scope.AddorEditModel.RecruitStartDate = datas;
                if (id == "recruitEndDate")
                    $scope.AddorEditModel.RecruitEndDate = datas;
                if (id == "startDate")
                    $scope.AddorEditModel.StartDate = datas;
                if (id == "endDate")
                    $scope.AddorEditModel.EndDate = datas;
                //$scope.$apply();
            }

        });
    }
    initOcMooklaydate("recruitStartDate");
    initOcMooklaydate("recruitEndDate");
    initOcMooklaydate("startDate");
    initOcMooklaydate("endDate");

    //end初始日期控件

    //begin在读结业学生详细信息
    //SearchModeal
    $scope.SearchModeal = {
        RecruitID: "-1",
        OCID: $scope.ocID,
        OCClassID: 0,
        key: "",
        IsFinish: 0,
        StuNum: 0,
        UserLimit: 0
    };
    $scope.initMoocStudentPage = false; //是否可以初始化分页控件
    $scope.OCMoocStudentList = null;
    //录入学生是否全选
    $scope.IsSelectStu = function () {
        for (var i = 0; i < $scope.OCMoocStudentList.length; i++) {
            $scope.OCMoocStudentList[i].IsSelected = $scope.AllstuCheck;
        }
    }
    $scope.IsAllSelectStu = function () {
        var flag = true;
        for (var i = 0; i < $scope.OCMoocStudentList.length; i++) {
            if ($scope.OCMoocStudentList[i].IsSelected == false || $scope.OCMoocStudentList[i].IsSelected == undefined) {
                flag = false;
                break;
            }
        }
        $scope.AllstuCheck = flag;
    }
    //删除网络招生下的学生
    $scope.Student_Del = function (uids) {
        if (uids == 0) {
            uids = GetUserIDs();
            if (uids == "") {
                layer.alert("请选择要操作的项!", 3);
                return;
            }
        }
        layer.confirm("确定要删除选中学生吗?", function () {
            var url = classProviderUrl + "/OCMoocRecruitStudent_Del";
            var param = {
                RecruitID: $scope.SearchModeal.RecruitID,
                UserIDs: uids
            };
            $scope.baseService.post(url, param, function (data) {
                if (data.d) {
                    layer.msg("删除成功!", 1, 1);
                    GetOCMoocStudentList($scope.PageIndex);
                }
            });
        })
    }
    //修改网络招生下的学生审核状态
    $scope.Status_Upd = function (uids, sta) {
        if (uids == 0) {
            uids = GetUserIDs();
            if (uids == "") {
                layer.alert("请选择要操作的项!", 3);
                return;
            }
        }
        var url = classProviderUrl + "/OCMoocRecruitStudent_Status_Upd";
        var param = {
            RecruitID: $scope.SearchModeal.RecruitID,
            UserIDs: uids,
            Status: sta
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d) {
                GetOCMoocStudentList($scope.PageIndex);
            }
        });
    }
    //得到选择学生IDs
    function GetUserIDs() {
        var UserIDs = "";
        for (var i = 0; i < $scope.OCMoocStudentList.length; i++) {
            if ($scope.OCMoocStudentList[i].IsSelected == true) {
                UserIDs += $scope.OCMoocStudentList[i].UserID + ",";
            }
        }
        if (UserIDs != "") {
            UserIDs = UserIDs.substring(0, UserIDs.length - 1);
        }
        return UserIDs;
    }
    $scope.PageIndex = 1;//当前页
    //在读结业学生列表
    var GetOCMoocStudentList = function (Index) {
        $scope.PageIndex = Index;
        $scope.AllstuCheck = false;
        var url = classProviderUrl + "/OCMoocRecruitClassStudent_List";
        var param = {
            searchmodel: $scope.SearchModeal,
            PageIndex: Index,
            PageSize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length < 1) {

            } else {
                $scope.OCMoocStudentList = data.d;
                $scope.SearchModeal.StuNum = data.d[0].RowsCount;
                if ($scope.initMoocStudentPage) {
                    $scope.initMoocStudentPage = false;
                    OCMoocStudentPage(Math.ceil(data.d[0].RowsCount / $scope.PageSize));
                }
            }
        });
    }
    //在读结业学生分页信息
    var OCMoocStudentPage = function (Num) {
        laypage({
            cont: $('#MoocStudentPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: Num, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                if (!$scope.initMoocStudentPage) {
                    GetOCMoocStudentList(e.curr);
                }
            }
        });
    }
    var initMoocStudentList = function () {
        $scope.initMoocStudentPage = true
        GetOCMoocStudentList(1);
    }
    //查看网络招生详细
    $scope.ShowOCMoocStudentList = function (model, IsFinish) {

        $scope.SearchModeal.RecruitID = model.RecruitID;
        $scope.SearchModeal.IsFinish = IsFinish
        if (IsFinish == 1) {
            $scope.SearchModeal.StuNum = model.CompleteStudentNum;
        } else if (IsFinish == 0) {
            $scope.SearchModeal.StuNum = model.InReadStudentNum;
        } else {
            $scope.SearchModeal.StuNum = model.CompleteStudentNum + model.InReadStudentNum;
        }
        $scope.SearchModeal.UserLimit = model.UserLimit

        $('#myStudentDetailsModal').modal("show");
        $scope.OCMoocStudentList = null;
        initMoocStudentList();
    }

    //end在读结业学生详细信息

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

}]);


classModule.filter('listFilter111', function () {

    return function (arr, ope, num, size) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            if (ope == '>') {
                return item.rownum > num;
            }
            if (ope == '=') {
                return item.rownum == num;
            }
            if (ope == '<') {
                return item.rownum < num;
            }
            if (ope == 'between') {

                return item.rownum <= num * size && item.rownum >= ((num - 1) * size + 1);
            }

        });
    }
});

classModule.filter('listFilter222', function () {
    return function (arr, ope, num) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            if (ope == '>') {
                return item.IsSelected > num;
            }
            if (ope == '=') {
                //console.log(item.IsSelected == num);
                return item.IsSelected == num;
            }
            if (ope == '<') {
                return item.IsSelected < num;
            }

        });
    }
});

classModule.filter('shStatusFilter', function () {
    return function (i) {
        if (i == 0) {
            return "拒绝";
        } else if (i == 1) {
            return "待审核";
        } else if (i == 2) {
            return "通过";
        } else {
            return "";
        }
    }
});



