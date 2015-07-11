'use strict';

var teamModule = angular.module('app.oc.team', []);

teamModule.controller('TeamController', ['$scope', '$state', 'teamProviderUrl', function ($scope, $state, teamProviderUrl) {

    //课程负责人 和 创建者才能创建课程负责人

    $scope.ocID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    //$scope.ocID = $G2S.request("currentoc", -1);

    $scope.showAddTeacher = false;//添加课程负责人是否显示
    $scope.PageSize = 10;
    $scope.OCTeamNew = null;
    $scope.TeacherList = null;
    $scope.OcTeamFunctionInfo = null;
    $scope.SearchUserType = false;//false  课程负责人搜索 true 教学团队用户搜索
    $scope.initPage = false; //是否可以初始化分页控件
    var OCTeamNewIndex = -1;//课程负责人索引
    $scope.CurrentUserRole = {
        OCID: $scope.ocID,
        UserID: "-1",
        Role: "0"
    };
    $scope.TeamList = [];
    var TeamUserIDList = "";//教学团队成员集合  添加教学团队成员是 只能选取教学团队外的的用户
    var GetTeamUserIDList = function () {
        TeamUserIDList = "";
        if ($scope.CurrentUserRole != undefined && $scope.CurrentUserRole != null) {
            TeamUserIDList = $scope.CurrentUserRole.UserID + ',';
        }

        if ($scope.TeamList.length > 0) {
            for (var i = 0; i < $scope.TeamList.length; i++) {
                if ($scope.TeamList[i].UserID != -1) {
                    TeamUserIDList += $scope.TeamList[i].UserID + ',';
                    $scope.TeamList[i].IsAdd = 1;// 已有的教学团队
                }
                else {
                    $scope.TeamList[i].IsAdd = 0;// 新增的
                }
                $scope.TeamList[i].Index = i;//显示数据索引
               
            }
        }
        if (TeamUserIDList.indexOf(',') > 0) {
            TeamUserIDList = ',' + TeamUserIDList;
        }
        //console.log("123");
    }

    //获取教学团队列表
    var GetTeamList = function (OCID) {
        var url = teamProviderUrl + "/OCTeam_List";
        var param = { OCID: OCID };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {

            } else {
                console.log(data.d);
                $scope.TeamList = data.d;
                GetTeamUserIDList();
                //$scope.$apply();
            }
        });
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
            if ((',' + TeamUserIDList).indexOf(userIDTemp) > -1) {
                $scope.TeacherList[i].IsSelected = true;
            }
            else {
                $scope.TeacherList[i].IsSelected = false;
            }
        }
    }

    //编辑课程负责人简介
    $scope.EditTeamBrief = function (modal) {
        if (modal.UserID == -1) {
            return;
        }
        var url = teamProviderUrl + "/OCTeam_Brief_Upd";
        var param = {
            octeam: modal
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {

            } else {

            }
        });
    }


    //begin控制添加课程负责人是否显示
    $scope.showaddteacher = function showaddteacher() {
        $scope.showAddTeacher = !$scope.showAddTeacher;
    }
    $scope.hidaddteacher = function hidaddteacher() {
        $scope.showAddTeacher = false;
    }
    //end控制添加课程负责人是否显示

    //删除教学团队成员
    $scope.DelTeam = function (OcTeam) {
        if (OcTeam.UserID == -1) {
            $scope.TeamList.splice(OcTeam.Index, 1);
            GetTeamUserIDList();
            return;
        }
        if (confirm("是否删除教学团队成员")) {
            var url1 = teamProviderUrl + "/OCTeam_Del";
            var params = {
                motal: OcTeam
            };
            $scope.baseService.post(url1, params, function (data) {
                if (data.d == false) {
                    layer.alert("删除教学团队失败", -1, "提示框");
                } else {
                    for (var i = 0; i < $scope.TeamList.length; i++) {
                        if ($scope.TeamList[i].TeamID == OcTeam.TeamID) {
                            var userIDTemp = ',' + $scope.TeamList[i].UserID + ',';
                            if (TeamUserIDList.indexOf(userIDTemp) > -1) {
                                TeamUserIDList = (TeamUserIDList).replace(userIDTemp, ',');
                            }
                            $scope.TeamList.splice(i, 1);
                            GetTeamUserIDList();
                            break;
                        }

                    }
                }
            });
        }
    }
    //


    //begin锁定教学团队
    $scope.LockedTeam = function (OcTeam) {
        $scope.UpLockedOcTeam = OcTeam;
        if (OcTeam.IsLocked) {
            $('#myUnLockedModal').modal("show");
        }
        else {
            $('#myLockedModal').modal("show");
        }
    }
    $scope.LockedSure = function () {
        var url1 = teamProviderUrl + "/OCTeam_IsLocked_Upd";
        $scope.UpLockedOcTeam.IsLocked = !$scope.UpLockedOcTeam.IsLocked;
        var params = {
            octeam: $scope.UpLockedOcTeam
        };
        $scope.baseService.post(url1, params, function (data) {
            if (data.d == false) {
                layer.alert("锁定教学团队成员失败", -1, "提示框");
            } else {
                //$scope.UpLockedOcTeam.IsLocked = !$scope.UpLockedOcTeam.IsLocked;
            }
        });
    }
    //end锁定教学团队

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
                if (!$scope.initPage) {
                    console.log("162");
                    GetTeacherList(e.curr);
                }
            }
        });

    }
    ///搜索获取站内用户列表
    var GetTeacherList = function (pageIndex) {
        var url = teamProviderUrl + "/Teacher_List";
        var param = {
            teacher: $scope.TeacherModel,
            pageindex: pageIndex,
            pagesize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                layer.alert("暂无搜索数据", -1, "提示框");
            } else {
                $scope.TeacherList = data.d;
                $scope.TeamNum = data.d[0].rowscount;
                SetIsSelected();
                if ($scope.initPage) {
                    TeamPages(Math.ceil($scope.TeamNum / $scope.PageSize));
                    $scope.initPage = false;
                }
            }
        });
    }
    $scope.SearchUserList = function () {
        if ($scope.TeacherModel.Key == "请输入工号、姓名" || $scope.TeacherModel.Key == "") {
            layer.alert("请输入工号、姓名", -1, "提示框");
            return;
        }
        $scope.initPage = true;
        GetTeacherList(1);
    }

    ///获取要添加的课程负责人信息
    var GetTeam = function (UserID) {
        var url = teamProviderUrl + "/TeacherInfo";
        var param = {
            UserID: UserID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.OcTeam == null) {
                layer.alert("添加成员不存在！", -1, "");
            } else {
                $scope.OCTeamNew = data.d;
            }
        });
    }
    //获取当前用户角色
    var GetCurrentUserRole = function () {
        var url = teamProviderUrl + "/OCTeamRole_Get";
        var param = {
            OCID: $scope.ocID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == null) {
            } else {
                $scope.CurrentUserRole = data.d;
            }
        });
    }
    GetCurrentUserRole();

    if ($scope.ocID != -1) {
        GetTeamList($scope.ocID);
    }
    else {
        TeamUserIDList = ',' + $scope.CurrentUserRole.UserID + ',';
    }
    //获取自己作为课程负责人的信息
    //GetTeam(-1);
    $scope.GetSelectUser = function () {
        var UserID = $scope.TeacherModel.UserID;
        var userIDTemp = ',' + UserID + ',';
        if (TeamUserIDList.indexOf(userIDTemp) > -1) {
            layer.alert("你添加的课程负责人已存在！", -1, "");
            return;
        }
        $('#myAddTeacherModal').modal("hide");

        if ($scope.SearchUserType) {
            GetOcTeamFunctionInfo($scope.ocID, UserID);
            $('#myAddTeamModal').modal("show");
        }
        else {
            $scope.OCTeamNew.UserID = $scope.TeacherModel.UserID;
            $scope.OCTeamNew.UserName = $scope.TeacherModel.UserName;
            AddTeamUser();
            //GetTeam(UserID);
        }
        $scope.TeacherModel.UserID = -1;
    }
    $scope.RadiorClicked = function (obj) {
        $scope.TeacherModel.UserID = obj.UserID;
        $scope.TeacherModel.UserName = obj.UserName;
    }
    $scope.ShowSelectUser = function (Type,octeam) {
        if (octeam.Index != -1) {
            OCTeamNewIndex = octeam.Index;
            $scope.OCTeamNew = octeam;
        }
       
        $scope.SearchUserType = Type;
        if (Type) {
            if (!$scope.EditOrAdd) {
                $('#myAddTeacherModal').modal("show");
                $('#myAddTeamModal').modal("hide");
            }
        }
        else {
            $('#myAddTeacherModal').modal("show");
        }
        $scope.initPage = true;
        GetTeacherList(1);
    }
    $scope.CloseDialog = function () {
        if ($scope.SearchUserType) {
            if (!$scope.EditOrAdd) {
                $('#myAddTeacherModal').modal("hide");
                $('#myAddTeamModal').modal("show");
            }
        }
    }

    //添加课程负责人
    var AddTeamUser = function () {
        $scope.OCTeamNew.OCID = $scope.ocID;
        $scope.OCTeamNew.TeamID = -1;
        $scope.OCTeamNew.Brief = "";
        $scope.OCTeamNew.Role = 1;
        $scope.OCTeamNew.Status = 2;
        var url = teamProviderUrl + "/OCTeam_ADD";
        var param = {
            octeam: $scope.OCTeamNew
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == null || data.d == []) {
                layer.alert("添加的课程负责人失败！", -1, "");
            } else {
                $scope.OCTeamNew.TeamID = data.d.TeamID;
                $scope.OCTeamNew.IsAdd = 1;
                if (OCTeamNewIndex > -1) {
                    TeamUserIDList += $scope.OCTeamNew.UserID + ',';
                }
                $scope.TeamList[OCTeamNewIndex] = $scope.OCTeamNew;
                $scope.OCTeamNew = null;
                $scope.TeacherModel.Key = "";
                $scope.TeacherModel.UserID = -1;
                OCTeamNewIndex = -1;
                //GetTeamList($scope.ocID);
            }
        });
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

    //end添加课程负责人

    //begin用户权限管理
    $scope.FunctionCheckedAll = {
        ClassAll: false,
        ModuleAll: false
    }
    //begin按班级授权操作
    $scope.ckb_Class_All = function () {
        $scope.FunctionCheckedAll.ClassAll = !$scope.FunctionCheckedAll.ClassAll;
        for (var i = 0; i < $scope.OcTeamFunctionInfo.OcTeamFunctionClass.length; i++) {
            $scope.OcTeamFunctionInfo.OcTeamFunctionClass[i].IsSelected = $scope.FunctionCheckedAll.ClassAll;
        }
    }
    $scope.ckb_Class_Single = function () {
        $scope.FunctionCheckedAll.ClassAll = false;
    }
    //end按班级授权操作
    //begin按功能授权操作
    $scope.ckb_Module_All = function () {
        $scope.FunctionCheckedAll.ModuleAll = !$scope.FunctionCheckedAll.ModuleAll;
        for (var i = 0; i < $scope.OcTeamFunctionInfo.OcTeamFunctionModule.length; i++) {
            $scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].IsSelected = $scope.FunctionCheckedAll.ModuleAll;
        }
    }
    $scope.ckb_Module_Single = function (functionModuleModel) {
        $scope.FunctionCheckedAll.ModuleAll = false;
        //var IsSelected = !functionModuleModel.IsSelected;
        //var ModuleID = functionModuleModel.ModuleID;
        //var ParentID = functionModuleModel.ParentID;
        for (var i = 0; i < $scope.OcTeamFunctionInfo.OcTeamFunctionModule.length; i++) {

            //一级节点不可选
            if ($scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].ParentID == "0") {
                $scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].IsSelected = false;
            }
            //父级取消选中
            if ($scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].ModuleID == functionModuleModel.ParentID) {
                $scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].IsSelected = false;
            }
            //子集全选或者不选
            if ($scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].ParentID == functionModuleModel.ModuleID) {
                $scope.OcTeamFunctionInfo.OcTeamFunctionModule[i].IsSelected = !functionModuleModel.IsSelected;
            }

        }

    }

    //end按功能授权操作


    $scope.EditOrAdd = false; //false  新增 true 编辑
    var GetOcTeamFunctionInfo = function (OCID, UserID) {
        var url = teamProviderUrl + "/GetOcTeamFunctionInfo";
        var param = { OCID: OCID, UserID: UserID };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
            } else {
                $scope.OcTeamFunctionInfo = data.d;
            }
        });
    }

    $scope.AddOcTeamFunctionInfo = function () {
        $scope.EditOrAdd = false;
        $scope.SearchUserType = true;
        //$('#myAddTeamModal').modal("show");
        $('#myAddTeacherModal').modal("show");
        $scope.initPage = true;
        GetTeacherList(1);
        $scope.OcTeamFunctionInfo = null;
        $scope.EditOcTeam = null;
    }

    $scope.EditOcTeam = null;

    $scope.EditOcTeamFunctionInfo = function (modal) {
        $scope.EditOrAdd = true;
        $scope.EditOcTeam = modal;
        $('#myAddTeamModal').modal("show");
        GetOcTeamFunctionInfo($scope.ocID, modal.UserID);
    }
    //添加教学团队
    $scope.SaveOcTeamFunctionInfo = function () {
        var url = teamProviderUrl + "/OCTeam_Class_Function_Save";
        var param = {
            octeamfunctioninfo: $scope.OcTeamFunctionInfo
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d == null || data.d == []) {

            } else {
                $scope.OcTeamFunctionInfo = null;
                if (!$scope.EditOrAdd) {
                    GetTeamList($scope.ocID);
                    setTimeout(function () {
                        $scope.$apply();
                    }, 10);
                }
                else {
                    $scope.EditOcTeam.ClassCount = data.d.ClassCount;
                    $scope.EditOcTeam.FunctionCount = data.d.FunctionCount;
                    setTimeout(function () {
                        $scope.$apply();
                    }, 10);
                }

            }
        });

    }
    //end用户权限管理


}]);
//teamModule.filter('teamFilter', function () {
//    return function (arr, ope, num) {
//        if (arr == null || arr == '') {
//            return;
//        }
//        return arr.filter(function (item) {
//            if (ope == '=') {
//                return item.ParentID == num;
//            }
//        });
//    }
//});

teamModule.filter('teamFilter', function () {
    return function (arr, type, ope, num) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            if (type == "ParentID") {
                if (ope == '=') {
                    return item.ParentID == num;
                }
            }
            if (type == "Role") {
                if (ope == '=') {
                    return item.Role == num;
                }
                if (ope == '!=') {
                    return item.Role != num;
                }
            }
        });
    }
});