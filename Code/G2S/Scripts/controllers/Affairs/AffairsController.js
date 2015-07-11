'use strict';

var affairsModule = angular.module('app.affairs', []);

affairsModule.controller('AffairsController', ['$scope', '$state', 'affairsProviderUrl', function ($scope, $state, affairsProviderUrl) {

    $scope.ocID = $G2S.request("currentoc", -1);
    if ($scope.ocID == -1) {
        $scope.ocID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    }
    $scope.PageSize = 20;

    $scope.PagesNum = 10;
    $scope.initPage = false; //是否可以初始化分页控件
    $scope.Affairs = {
        OCID: $scope.ocID,
        AffairIDs: '',
        DictID: 0,
        Status: 0,
        Type: 1
    };

    $scope.Dict = {
        Source: 'OCAffairs.Type'
    };
    //获取事务类型列表
    var GetDictList = function () {
        var url = affairsProviderUrl + "/Dict_List";
        var param = {
            model: $scope.Dict,
            OCID: $scope.ocID
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                //layer.alert("暂无数据", -1, "提示框");
            } else {
                $scope.DictList = data.d;
            }
        });
    }
    GetDictList();
    $scope.UserSpace = 2;
    var GetCUserSpace = function () {
        var url = affairsProviderUrl + "/GetCUserSpace";
        var param = {
        };
        $scope.baseService.post(url, param, function (data) {
            $scope.UserSpace = data.d;
            if ($scope.UserSpace == 3) {
                $scope.Affairs.Type = 2;
            }
            initList();
        });
    }
    GetCUserSpace();
    //1 我审核的  2 我申请的
    $scope.ChangeAffairsTab = function (fType) {
        $scope.Affairs.Type = fType;
        initList();
    }

    $scope.DictSelectChanged = function () {
        initList();
    }
    //获取申请审核列表
    var GetAffairsList = function (PageIndex) {
        var url = affairsProviderUrl + "/Affairs_List";
        var param = {
            model: $scope.Affairs,
            PageIndex: PageIndex,
            PageSize: $scope.PageSize
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d.length <= 0) {
                //layer.alert("暂无数据", -1, "提示框");
                $scope.AffairsList = null;
                $scope.PageIndex = 1;//
            } else {
                $scope.AffairsList = data.d;
                var pagenum = Math.ceil(data.d[0].rowscount / $scope.PageSize);
                if ($scope.initPage) {
                    $scope.initPage = false;
                    if (pagenum > 1) {
                        AffairsPages(Math.ceil($scope.CourseNum / $scope.PageSize));
                    }
                }
            }
        });
    }

    //请审核列表分页
    var AffairsPages = function (PageNum) {
        laypage({
            cont: $('#AffairsPage'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageNum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 3,//连续显示分页数
            first: false, //若不显示，设置false即可
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                //$scope.PageSearchStudentIndex = e.curr;  //为作用域外变量赋值一定要加上$scope.$apply(); 才能实现双向绑定
                if (!$scope.initPage) {
                    GetAffairsList(e.curr);
                }
            }
        });

    }

    var initList = function () {
        if ($scope.Affairs.DictID == null) {
            $scope.Affairs.DictID = 0;
        }
        $scope.initPage = true
        GetAffairsList(1);
    }

    $scope.GetUserType = function (type) {
        if (type == 1) {
            return "超级管理员";
        } else if (type == 2) {
            return "子管理员";
        }
        else if (type == 4) {
            return "学生";
        }
        else if (type == 8) {
            return "教师";
        }
        else if (type == 16) {
            return "系统外用户";
        }
        else {
            return "多个角色用户";
        }
    }


    $scope.CheckAll = false;
    ///全选
    $scope.SelectAll = function () {
        $scope.CheckAll = !$scope.CheckAll;
        for (var i = 0; i < $scope.AffairsList.length; i++) {
            $scope.AffairsList[i].IsSelected = $scope.CheckAll;
        }

    }
    ///单选
    $scope.SelectSingle = function () {
        $scope.CheckAll = false;
        $scope.$apply();
    }
    //操作
    //单对象操作
    $scope.StatusEdit = function (ocaffairs, StatusType) {
        $scope.Affairs.AffairIDs = "";
        $scope.Affairs.AffairID = ocaffairs.AffairID;
        $scope.Affairs.Status = StatusType;
        var url = affairsProviderUrl + "/OCAffairs_Status_Upd";
        var param = {
            model: $scope.Affairs
        };
        $scope.baseService.post(url, param, function (data) {
            if (data.d === null) {
                return false;
            } else {
                ocaffairs.Status = StatusType;
            }
        });


    }
    //批量操作
    $scope.BatchEdit = function (StatusType) {
        $scope.Affairs.AffairIDs = "";
        $scope.Affairs.AffairID = "-1";
        for (var i = 0; i < $scope.AffairsList.length; i++) {
            if ($scope.AffairsList[i].IsSelected == true) {
                $scope.Affairs.AffairIDs += $scope.AffairsList[i].AffairID + ',';
                //$scope.AffairsList[i].Status = StatusType;
            }
        }
        if ($scope.Affairs.AffairIDs != "") {
            $scope.Affairs.Status = StatusType;

            var url = affairsProviderUrl + "/OCAffairs_Beach_Upd";
            var param = {
                model: $scope.Affairs
            };
            //console.log($scope.Affairs.AffairIDs);
            $scope.baseService.post(url, param, function (data) {
                if (data.d === null) {
                    return false;
                } else {
                    for (var i = 0; i < $scope.AffairsList.length; i++) {
                        if ($scope.AffairsList[i].IsSelected == true) {
                            //$scope.Affairs.AffairIDs = $scope.AffairsList[i].AffairID + ',';
                            $scope.AffairsList[i].Status = StatusType;
                        }
                    }
                    $scope.$apply();
                }
            });
        }
        else {
            layer.alert("至少选择一条记录", -1, "提示框");
        }
    }


    //$scope.TestDate = "子级AffairsController";

    //$scope.click = function () {
    //    //$scope.$broadcast('to-child', 'child');
    //    $scope.$emit('to-parent', $scope.TestDate);
    //}

}]);

