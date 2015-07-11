'use strict';

var courseindexModule = angular.module('app.oc', []);

courseindexModule.controller('CourseIndexController', ['$scope', '$state', 'courseindexProviderUrl', function ($scope, $state, courseindexProviderUrl) {

    //$('.select_btn').live('click', function () {
    //    $(this).parent().next().show();
    //})

    $scope.ocID = $G2S.request("currentoc", -1);


    $scope.showAddTeacher = true;//添加课程负责人是否显示
    $scope.PageSize = 10;
    $scope.OCTeamNew = null;
    var OCTeamNewIndex = -1;
    $scope.initPage = false; //是否可以初始化分页控件
    $scope.initPage2 = false;//是否可以初始化分页控件 团队
    $scope.ShowType = false;
    //$scope.CurrentUserRole =null;

    $scope.CurrentUserRole = {
        OCID: $scope.ocID,
        UserID: "-1",
        Role: "0"
    };
    //$scope.SelectValue = null;
    //$scope.SelectID = -1;

    $scope.CourseNew = {
        CourseID: -1,
        Name: "",
        SubjectID: -1,
        OCID: $scope.ocID,
        Tags: "",
        SelectValue: ""
    };

    $scope.ParentSpecialtyType = {
        SpecialtyTypeID: -1,
        SpecialtyTypeName: "",
        ParentID: 0
    };
    $scope.ChildSpecialtyType = {
        SpecialtyTypeID: -1,
        SpecialtyTypeName: "",
        ParentID: 0
    };

    //课程选择
    $scope.CourseModel = {
        Key: "",
        Property: -1,
        CourseID: -1,
        TermTypeID: -1,
        OrganizationID: -1,
        CourseTypeID: -1,
        TeachingTypeID: -1,
        SubjectID1: -1,
        SubjectID2: -1,
        OCID: $scope.ocID
    };


    $scope.HUserSpce = 0;
    var GetUserSpace = function () {
        var url = courseindexProviderUrl + "/GetUserSpace";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {

            } else {
                if (data.d == 3) {// 学生空间  不可以建课
                    window.location.href = "../Home/StudentIndex";
                }
            }
        });
    }
    GetUserSpace();

    $scope.TeamList = [];
    var TeamUserIDList = "";//教学团队成员集合  

    ////获取当前用户角色
    var GetCurrentUserRole = function () {
        var url = courseindexProviderUrl + "/OCTeamRole_Get";
        var param = {
            OCID: $scope.ocID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == null) {
                console.log("NULL");
            } else {
                $scope.CurrentUserRole = data.d;
                TeamUserIDList = $scope.CurrentUserRole.UserID + ',';
                console.log($scope.CurrentUserRole.Role);
            }
        });
    }
    GetCurrentUserRole();
    ///获取要编辑的课程信息
    var GetOC = function (OCID) {
        var url = courseindexProviderUrl + "/OC_Get";
        var param = {
            OCID: OCID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null || data.d == []) {
            } else {
                $scope.CourseNew.CourseID = data.d.CourseID
                $scope.CourseNew.SubjectID = data.d.SubjectID;
                $scope.CourseNew.SelectValue = data.d.SubjectName;
                $scope.CourseNew.Tags = data.d.Tags;
                $scope.CourseNew.Name = data.d.Name;
                //$scope.$apply();

            }
        });
    }

    ///获取要编辑的课程负责人信息
    var GetOCTeamList = function (OCID) {
        var url = courseindexProviderUrl + "/OCTeam_List";
        var param = {
            OCID: OCID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {

            } else {
                $scope.TeamList = data.d;
                GetTeamUserIDList(1);
            }
        });
    }
    var GetTeamUserIDList = function (index) {
        TeamUserIDList = "";
        if ($scope.CurrentUserRole != undefined && $scope.CurrentUserRole != null) {
            TeamUserIDList = $scope.CurrentUserRole.UserID + ',';
        }

        if ($scope.TeamList.length > 0) {
            for (var i = 0; i < $scope.TeamList.length; i++) {
                if ($scope.TeamList[i].UserID != -1 && $scope.TeamList[i].IsAdd != 2) {
                    TeamUserIDList += $scope.TeamList[i].UserID + ',';
                }
                if (index == 1) {
                    $scope.TeamList[i].IsAdd = 1;// 已有的教学团队
                }
                $scope.TeamList[i].Index = i;//显示数据索引
            }

        }

        //console.log($scope.TeamList.length);
    }

    $scope.ShowSelectDialog = function (type, octeam) {
        if (type == 0) {
            $scope.OCTeamNew = octeam;
            OCTeamNewIndex = octeam.Index;
            $('#myAddTeacherModal').modal("show");
            $scope.initPage2 = true;
            GetTeacherList(1);
        }
        else {
            $('#myCourseModal').modal("show");
            $scope.initPage = true
            GetCourseList(1);
        }
    }


    $scope.CloseDialog = function (type) {
        if (type == 0) {
            $('#myAddTeacherModal').modal("hide");
        }
        else {
            $('#myCourseModal').modal("hide");

        }
    }


    var CoursePages = function (PageNum) {
        laypage({
            cont: $('#CoursePage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: false, //若不显示，设置false即可
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                if (!$scope.initPage) {
                    GetCourseList(e.curr);
                }
            }
        });

    }
    ///搜索获取站内用户列表
    var GetCourseList = function (pageIndex) {
        var url = courseindexProviderUrl + "/Course_List";
        var param = {
            course: $scope.CourseModel,
            pageindex: pageIndex,
            pagesize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0 || data.d == []) {
                layer.alert("暂无搜索数据", -1, "提示框");
            } else {
                $scope.CourseList = data.d;
                $scope.CourseNum = data.d[0].rowscount;
                //初始化分页
                if ($scope.initPage) {
                    CoursePages(Math.ceil($scope.CourseNum / $scope.PageSize));
                    $scope.initPage = false;
                }
            }
        });
    }
    $scope.SearchCourseList = function () {
        if ($scope.CourseModel.Key == "请输入课程代码或名称！" || $scope.CourseModel.Key == "") {
            layer.alert("请输入课程代码或名称！", -1, "提示框");
            return;
        }
        $scope.initPage = true
        GetCourseList(1);
    }


    ///获取将要添加的课程信息
    $scope.GetSelectCourse = function () {
        var CourseID = $scope.CourseModel.CourseID;
        for (var i = 0; i < $scope.CourseList.length; i++) {
            if ($scope.CourseList[i].CourseID == CourseID) {
                $scope.CourseNew.Name = $scope.CourseList[i].CourseName;
                $scope.CourseNew.CourseID = $scope.CourseList[i].CourseID;
                return;
            }
        }
        $('#myCourseModal').modal("hide");
    }


    //获的课程属性列表
    var GetTypeList = function () {
        var url = courseindexProviderUrl + "/SpecialtyType_Tree_List";
        var param = {

        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
                layer.alert("还没有课程分类，请维护课程分类", -1, "提示框");
            } else {
                $scope.SpecialtyType = data.d;
            }
        });
    }

    $scope.ShowSpecialtyType = function () {
        $scope.ShowType = !$scope.ShowType;
        console.log(2);
    }

    //获取选择的值
    $scope.ShowSelectInfo = function (type) {
        if (type == 0) {
            $scope.ChildSpecialtyType = {
                SpecialtyTypeID: -1,
                SpecialtyTypeName: "",
                ParentID: 0
            };
        }
        if ($scope.ParentSpecialtyType != null && $scope.ParentSpecialtyType.SpecialtyTypeID != -1) {
            $scope.CourseNew.SelectValue = $scope.ParentSpecialtyType.SpecialtyTypeName;
            $scope.CourseNew.SubjectID = $scope.ParentSpecialtyType.SpecialtyTypeID
        }
        else {
            $scope.CourseNew.SelectValue = "";
            $scope.CourseNew.SubjectID = -1;
        }

        if ($scope.ChildSpecialtyType != null && $scope.ChildSpecialtyType.SpecialtyTypeID != -1) {
            $scope.CourseNew.SelectValue = $scope.ParentSpecialtyType.SpecialtyTypeName + ">" + $scope.ChildSpecialtyType.SpecialtyTypeName;
            $scope.CourseNew.SubjectID = $scope.ChildSpecialtyType.SpecialtyTypeID
        }

        if (type == 1) {
            //$scope.ShowType = !$scope.ShowType;
            console.log(1);
        }



    }
    //end获的课程属性列表

    //---------

    //begin控制添加课程负责人是否显示
    //修改添加课程负责人
    //$scope.showaddteacher = function showaddteacher() {
    //    //$scope.showAddTeacher = !$scope.showAddTeacher;
    //}
    //end控制添加课程负责人是否显示

    //begin添加课程负责人
    //站内用户搜索分页
    $scope.TeacherModel = {
        Key: "",
        UserID: -1,
        UserName: ''
    };
    var TeamPages = function (PageNum) {
        laypage({
            cont: $('#TeamPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: false, //若不显示，设置false即可
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                if (!$scope.initPage2) {
                    GetTeacherList(e.curr);
                    //SetIsSelected();
                }
            }
        });

    }
    ///搜索获取站内用户列表
    var GetTeacherList = function (pageIndex) {

        var url = courseindexProviderUrl + "/Teacher_List";
        var param = {
            teacher: $scope.TeacherModel,
            pageindex: pageIndex,
            pagesize: $scope.PageSize
        };

        $scope.baseService.post(url, param, function (data) {
            if (data.d === null || data.d.length <= 0) {
                layer.alert("无搜索数据", -1, "提示框");
            } else {
                $scope.TeacherList = data.d;
                SetIsSelected();
                $scope.TeamNum = data.d[0].rowscount;
                if ($scope.initPage2) {
                    TeamPages(Math.ceil($scope.TeamNum / $scope.PageSize));
                    $scope.initPage2 = false;
                }
            }
        });
    }
    $scope.SearchUserList = function () {
        if ($scope.TeacherModel.Key == "请输入工号、姓名" || $scope.TeacherModel.Key == "") {
            layer.alert("请输入工号、姓名", -1, "提示框");
            return;
        }
        $scope.initPage2 = true;
        GetTeacherList(1);
    }
    //ng-disabled="IsSelected(Teacher.UserID)"
    $scope.IsSelected = function (userID) {
        var userIDTemp = ',' + userID + ',';
        if ((',' + TeamUserIDList).indexOf(userIDTemp) > -1) {
            console.log(TeamUserIDList + ":" + userID);
            return true;
        }
        else {
            return false;
        }
    }

    var SetIsSelected = function () {
        for (var i = 0; i < $scope.TeacherList.length; i++) {
            var userIDTemp = ',' + $scope.TeacherList[i].UserID + ',';
            if ((',' + TeamUserIDList).indexOf(userIDTemp) > -1) {
                $scope.TeacherList[i].IsSelected = true;
            }
            else {
                $scope.TeacherList[i].IsSelected = false;
            }
        }
    }

    ///获取要添加的课程负责人信息
    var GetTeam = function (UserID) {
        var url = courseindexProviderUrl + "/TeacherInfo";
        var param = {
            UserID: UserID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == [] || data.d == null) {
                layer.alert("添加成员不存在！", -1, "");
            } else {
                $scope.OCTeamNew = data.d.OCTeam;

            }
        });
    }

    //添加课程负责人
    //$scope.AddTeamUser = function () {

    //    if ($scope.OCTeamNew.UserID == null) {
    //        layer.alert("请选择需要添加的课程负责人", -1, "提示框");
    //        return;
    //    }
    //    // 添加到列表
    //    $scope.OCTeamNew.Role = 1;
    //    $scope.OCTeamNew.Status = 2;
    //    $scope.OCTeamNew.IsAdd = 0;//编辑添加的  1 已有课程负责人  2 删除
    //    TeamUserIDList += $scope.OCTeamNew.UserID + ',';
    //    var isExistes = false;
    //    for (var i = 0; i < $scope.TeamList.length; i++) {
    //        if ($scope.TeamList[i].UserID == $scope.OCTeamNew.UserID) {
    //            $scope.TeamList[i].IsAdd = 1;
    //            $scope.TeamList[i].Brief = $scope.OCTeamNew.Brief;
    //            isExistes = true;
    //            break;
    //        }
    //    }
    //    if (!isExistes) {
    //        $scope.TeamList.push($scope.OCTeamNew);
    //    }
    //    $scope.OCTeamNew = null;
    //    $scope.TeacherModel.Key = "";
    //    $scope.TeacherModel.UserID = -1;
    //}
    //移除课程负责人
    $scope.RemoveTeam = function (team) {
        //for (var i = 0; i < $scope.TeamList.length; i++) {
        //    if (($scope.TeamList[i].UserID == team.UserID && $scope.TeamList[i].IsAdd == 0) || $scope.TeamList[i].UserID == -1) {
        //        $scope.TeamList.splice(i, 1);
        //        GetTeamUserIDList(0);
        //        return;
        //    }
        //    else {
        //        if ($scope.TeamList[i].UserID == team.UserID && $scope.TeamList[i].IsAdd == 1) {
        //            if (confirm("你确定删除课程负责人吗？保存的时候将被删除！")) {
        //                $scope.TeamList[i].IsAdd = 2;//删除已有的课程负责人
        //                GetTeamUserIDList(0);
        //            }

        //            return;
        //        }
        //    }
        //}
        if (team.IsAdd == 0 || team.UserID == -1) {
            $scope.TeamList.splice(team.Index, 1);
            GetTeamUserIDList(0);
            return;
        }
        else {
            if (team.IsAdd == 1) {
                if (confirm("你确定删除课程负责人吗？保存的时候将被删除！")) {
                    $scope.TeamList[team.Index].IsAdd = 2;//删除已有的课程负责人
                    GetTeamUserIDList(0);
                }

                return;
            }
        }
    }

    $scope.AddTeam = function () {
        var OcTeam_New = {
            Role: "1",
            Status: 2,
            IsAdd: 0,
            UserID: -1,
            Brief: '',
            Index: ''
        };
        if ($scope.TeamList.length > 0) {
            OcTeam_New.Index = $scope.TeamList.length;
        }
        else {
            OcTeam_New.Index = 0;
        }
        $scope.TeamList.push(OcTeam_New);
    }

    ///获取将要添加的课程负责人信息
    $scope.GetSelectUser = function () {
        //var UserID = $scope.TeacherModel.UserID;
        $('#myAddTeacherModal').modal("hide");
        $scope.OCTeamNew.UserID = $scope.TeacherModel.UserID;
        $scope.OCTeamNew.UserName = $scope.TeacherModel.UserName;
        //$scope.OCTeamNew.IsAdd = 0;//编辑添加的  1 已有课程负责人  2 删除   
        if (OCTeamNewIndex > -1) {
            if ($scope.TeamList[OCTeamNewIndex].UserID != -1) {
                TeamUserIDList = (',' + TeamUserIDList).replace(',' + $scope.TeamList[OCTeamNewIndex].UserID + ',', ',');
                TeamUserIDList += $scope.OCTeamNew.UserID + ',';
            }
            $scope.TeamList[OCTeamNewIndex] = $scope.OCTeamNew;
        }
        $scope.OCTeamNew = null;
        $scope.TeacherModel.Key = "";
        $scope.TeacherModel.UserID = -1;
        OCTeamNewIndex = -1;
        //console.log(TeamUserIDList);
    }

    $scope.RadiorClicked = function (obj) {
        $scope.TeacherModel.UserID = obj.UserID;
        $scope.TeacherModel.UserName = obj.UserName;
    }


    var GoToUrl = function () {
        console.log($scope.SelectMode);
        var strurl = (window.location.href).toLowerCase();
        var strsplit = strurl.split("/oc/");

        console.log(strsplit[0]);
        var Url = "../Home/index";
        if ($scope.SelectMode == 3) {
            //window.location.href = "FC/index?currentoc=" + $scope.CourseModel.OCID;
            Url = strsplit[0] + "/OC/FC/fcAdd?FCID=0&OCID=" + $scope.CourseModel.OCID;
        }
        else if ($scope.SelectMode == 2) {
            //window.location.href = "Site/index?currentoc=" + $scope.CourseModel.OCID;
            Url = strsplit[0] + "/OC/Site/index?currentoc=" + $scope.CourseModel.OCID;
        }
        else if ($scope.SelectMode == 4) {
            //window.location.href = "MOOC/index?currentoc=" + $scope.CourseModel.OCID;
            Url = strsplit[0] + "/OC/MOOC/index?currentoc=" + $scope.CourseModel.OCID;
        }
        else if ($scope.SelectMode == 1) {
            //window.location.href = "../CourseLive/Forum/index?currentoc=" + $scope.CourseModel.OCID;
            Url = strsplit[0] + "/CourseLive/Forum/index?currentoc=" + $scope.CourseModel.OCID;
        }
        else {
            //window.location.href = "../Home/index";
            Url = "../Home/index";
        }
        console.log(Url);

        if (Url == "../Home/index" || $scope.SelectMode == 4) {
            window.location.href = Url;
        } else {
            window.open(Url);
            window.location.href = "../Home/index";
        }

    }
    $scope.SelectMode = 0;//课程创建模式
    $scope.SureBtn = false;
    $scope.CreateCourse = function (ftype) {
        if ($scope.SureBtn) {
            return;
        }
        $scope.SureBtn = true;
        $scope.SelectMode = ftype;
        console.log($scope.SelectMode);
        //$scope.CourseNew.CourseID == -1 || 
        if ($scope.CourseNew.Name == "") {
            layer.alert("请选择课程、课程名称不能为空", -1, "提示框");
            $scope.SureBtn = false;
            return;
        }
        if ($scope.CourseNew.SubjectID == undefined || $scope.CourseNew.SubjectID == -1) {
            $scope.SureBtn = false;
            layer.alert("请选择课程所属分类", -1, "提示框");
            return
        }

        if ($scope.OCAttachModelTemp == null || $scope.OCAttachModelTemp.AttachmentID == -1 || $scope.OCAttachModelTemp.IsUpdate) {
            layer.alert("请上传课程图片", -1, "提示框");
            return;
        }




        var url = courseindexProviderUrl + "/OCCourse_ADD";

        //$scope.OCTeamNew.OcTeam.OCID = -1;
        //$scope.OCTeamNew.OcTeam.TeamID = -1;
        //$scope.OCTeamNew.OcTeam.Role = 1;//课程创建人、 1 课程负责人 ;  2 课程负责人  ;  3 助教（需对功能模块授权） ；
        //4 教学督导（该用户不体现在教学团队中，系统默认创建，教学督导有对资源建设、互动的浏览权限）。
        //$scope.OCTeamNew.OcTeam.Status = 2;//审核是否通过 审核状态： 0 待审核，1审核未通过 ；2审核通过
        var param = {
            OC: $scope.CourseNew,
            octeamlist: $scope.TeamList
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null || data.d == []) {
                layer.alert("编辑添加课程失败！", -1, "提示框");
                $scope.SureBtn = false;
            } else {
                //console.log(data.d.OCID);
                OCAttachment_SourceID_Upd(data.d.OCID);
                $scope.CourseModel.OCID = data.d.OCID;
                //有同名课程
                if ($scope.CourseNew.CourseID == -1 && data.d.IsHasCourse == 1) {
                    GetSpecifiedList();
                }
                else {
                    GoToUrl();
                }
                $scope.SureBtn = false;
            }
        });
    }




    //获取指定课程
    $scope.SpecifiedList = null;
    var GetSpecifiedList = function () {
        var url = courseindexProviderUrl + "/Course_CourseName_List";
        var param = {
            coursename: $scope.CourseNew.Name
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                $scope.SpecifiedList = data.d;
                $('#mySpecifiedModal').modal("show");
            }
        });
    }

    $scope.SelectedSpecifiedCourse = function () {
        var url = courseindexProviderUrl + "/OC_CourseID_Upd";
        var param = {
            ocid: $scope.CourseModel.OCID,
            courseID: $scope.CourseModel.CourseID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == false) {
                layer.alert("编辑添加课程失败！", -1, "提示框");
            } else {
                $('#mySpecifiedModal').modal("hide");
                GoToUrl();
            }
        });

    }


    $scope.NoSelectCourse = function () {
        $('#mySpecifiedModal').modal("hide");
        GoToUrl();
    }
    GetTypeList();

    var OCAttachment_Get = function (FileID) {
        var url = courseindexProviderUrl + "/Attachment_Get";
        var param = {
            FileID: FileID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {

            }
            else {
                $scope.OCAttachModelTemp = data.d
                $scope.OCAttachModelTemp.IsUpdate = false;
            }
        });
    }
    //编辑课程的时候加载图片
    var OCAttachment_List = function (SourceID) {
        var url = courseindexProviderUrl + "/Attachment_NoCache_List";
        var param = {
            SourceID: SourceID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                var strurl = (window.location.href).toLowerCase();
                var strsplit = strurl.split("/oc/");
                $scope.OCAttachModelTemp.DownURL = strsplit[0] + "/Images/no-image.gif";
            }
            else {
                $scope.OCAttachModelTemp = data.d[data.d.length - 1];
                $scope.OCAttachModelTemp.IsUpdate = true;
            }
        });
    }

    //跟新课程图片
    var OCAttachment_SourceID_Upd = function (SourceID) {
        if ($scope.OCAttachModelTemp == null || $scope.OCAttachModelTemp.AttachmentID == -1 || $scope.OCAttachModelTemp.IsUpdate) {
            return;
        }
        else {
            $scope.OCAttachModel.SourceID = SourceID;
            $scope.OCAttachModel.Guid = $scope.OCAttachModelTemp.Guid;
        }
        var url = courseindexProviderUrl + "/Attachment_SourceID_Upd";
        var param = {
            model: $scope.OCAttachModel
        };
        $scope.baseService.post(url, param, function (data) {

        });
    }


    //上传课程附件图片
    $scope.OCAttachModelTemp = [];

    if ($scope.ocID != -1) {
        GetCurrentUserRole();
        GetOC($scope.ocID);
        GetOCTeamList($scope.ocID);
        OCAttachment_List($scope.ocID);
    } else {
        GetCurrentUserRole();
        //获取自己作为课程负责人的信息
        var strurl = (window.location.href).toLowerCase();
        var strsplit = strurl.split("/oc/");
        $scope.OCAttachModelTemp.DownURL = strsplit[0] + "/Images/no-image.gif";
        //alert($scope.OCAttachModelTemp.DownURL);
    }


    //no - image.gif
    $scope.OCAttachModel = {
        AttachmentID: -1,
        Source: "OC",
        SourceID: $scope.ocID,
        Guid: "",
        DownURL: "",
        IsUpdate: true
    };
    $scope.filesuffix = ['.png', '.gif', '.jpg', '.jpeg'];
    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        //console.log(response);
        if (response.length >= 0) {
            OCAttachment_Get(response[0].AttachmentID);
            layer.close(box);
        }
    });
    var box;
    $scope.ShowBox = function () {
        box = $.layer({
            type: 1,
            title: ["上传课程图片 支持类型：<span style='color:red'>(.png;.gif;.jpg;.jpeg)</span>", true],
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
        $(".xubox_title em").attr("style", "width:100%");
    }
    //上传课程附件图片

}]);
courseindexModule.filter('listFilter5', function () {
    return function (arr, ope, num) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            if (ope == '=') {
                return item.ParentID == num;
            }
        });
    }
});

courseindexModule.filter('listTeamFilter', function () {
    return function (arr, ope, num) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            if (ope == '!=') {
                return item.IsAdd != num;
            }
        });
    }
});


