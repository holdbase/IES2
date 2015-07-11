var forumModule = angular.module('app.forum', []);

// index/topiclist
forumModule.controller('ForumCtrl', ['$scope', '$state', 'forumProviderUrl', function ($scope, $state, forumProviderUrl) {
    $scope.Forum_HotUser_Item = [];  //牛人
    $scope.ForumType_Item = [];//论坛版块
    $scope.Title = "创建讨论模块";
    $scope.flag = false;
    $scope.selected = 0;
    $scope.OCClass_Dropdown_Item = [];  //网络教学班
    $scope.ForumTopic_Active_Item = [];   //活跃
    $scope.ForumTopic_Item = []; //论题
    $scope.ForumTypeID = ($G2S.request("ForumTypeID") == "" || $G2S.request("ForumTypeID") == null || $G2S.request("ForumTypeID") == undefined) ? 0 : $G2S.request("ForumTypeID");

    try {
        $scope.OCID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    } catch (e) {

    }

    $('.model_text').on('mouseover', function () {
        layer.tips('只要你发帖数在小伙伴中能排在前十,就可以上牛人榜哦', this, {
            style: ['background-color:#374760; color:#fff', '#374760'],
            guide: 2,
            maxWidth: 200,
            time: 3
        });
    });
    $scope.IsMooc = ($G2S.request("mooc") == "" || $G2S.request("mooc") == null || $G2S.request("mooc") == undefined) ? 0 : $G2S.request("mooc");
    $scope.firstLoad = true;
    $scope.UserInfo = {};
    $scope.User_Info = function () {
        var url = forumProviderUrl + "/User_Info";
        var para = {};
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.UserInfo = data.d;
                $scope.Init();
            }
        });
    }

    $scope.ForumMy = {
        TopicID: 3,
        ResponseID: 0,// 0表示为主题加赞 ,否则为回复点赞 
        UserID: 1
    };
    $scope.active = {
        All: true,
        Essence: false,
        MyStart: false,
        MyJoin: false
    }

    $scope.ForumType = {
        OCID: $scope.OCID,
        CourseID: 1,
        Title: "",
        IsEssence: false,
        Brief: "",
        IsPublic: false,
        UserID: $scope.UserInfo.UserID,
        TeachingClassID: 2
    };

    $scope.ForumTopic = {
        SearchKey: '',
        OCID: $scope.OCID,
        UserID: $scope.UserInfo.UserID,
        ForumTypeID: $scope.ForumTypeID,
        IsEssence: false,
        IsMyStart: false,
        IsMyJoin: false,
        ResponseStatus: 0,
        Order: 0
    };

    $scope.activeInit = function () {
        $scope.active = {
            All: false,
            Essence: false,
            MyStart: false,
            MyJoin: false
        }
    }
    $scope.PageIndex = 1;
    $scope.PageSize = 5;
    //牛人列表
    $scope.Forum_HotUser_List = function () {
        var url = forumProviderUrl + "/Forum_HotUser_List";
        var para = { OCID: $scope.OCID, Top: 10 };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.Forum_HotUser_Item = data.d;
            }
        });
    }

    //版块列表
    $scope.ForumType_List = function () {
        var url = forumProviderUrl + "/ForumType_List";
        var para = { ft: { OCID: $scope.OCID, UserID: $scope.UserInfo.UserID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumType_Item = data.d;
            }
        });
    }
    //新增版块
    $scope.ForumType_ADD = function () {
        //debugger;
        if ($scope.selected == 0) {
            $scope.ForumType.IsPublic = true;
        }
        if ($scope.ForumType.Title == '') {
            layer.msg("请输入版块名称!")
            return;
        }
        $scope.ForumType.TeachingClassID = $scope.selected;
        var url = forumProviderUrl + "/ForumType_ADD";
        var para = { model: $scope.ForumType };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumType = {};//清空
                $scope.ForumType_List();
            }
        });
    }

    //删除讨论模块
    $scope.ForumType_Del = function (m) {
        var url = forumProviderUrl + "/ForumType_Del";
        m.CreateDate = new Date();
        var para = { model: m };
        if (!confirm("确定要删除吗?")) { return; }
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null || data.d === false) {

            } else {
                //从数组中移除
                for (var i = 0; i < $scope.ForumType_Item.length; i++) {
                    if ($scope.ForumType_Item[i].ForumTypeID == m.ForumTypeID) {
                        $scope.ForumType_Item.splice(i, 1);
                    }
                }
            }
        });
    }

    //编辑讨论模块
    $scope.ForumType_Upd = function () {

        if ($scope.selected == 0) {
            $scope.ForumType.IsPublic = true;
        }
        $scope.ForumType.CreateDate = new Date();
        $scope.ForumType.TeachingClassID = $scope.selected;
        var url = forumProviderUrl + "/ForumType_Upd";
        var para = { model: $scope.ForumType };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null || data.d === false) {
                $scope.ForumType_List();
            } else {
                layer.msg("编辑成功!", 1, 1)
                $scope.ForumType_List();
            }
        });
    }

    //编辑或新增
    $scope.AddOrEdit = function () {
        $scope.flag ? $scope.ForumType_ADD() : $scope.ForumType_Upd();
    }
    //显示 创建/编辑讨论模块
    $scope.EditOrAdd = function (flag, m) {
        $scope.OCClass_Dropdown_List();  //教学班下拉列表
        $scope.Title = flag ? "创建讨论模块" : "编辑讨论模块";
        $scope.flag = flag ? true : false;
        $scope.selected = 0;
        if (flag) {
            $scope.ForumType = {
                OCID: $scope.OCID,
                CourseID: 1,
                Title: "",
                IsEssence: false,
                Brief: "",
                IsPublic: false,
                UserID: $scope.UserInfo.UserID
            };
        } else {
            $scope.ForumType = m;
            $scope.selected = m.TeachingClassID;
        }

    }

    //教学班下拉列表
    $scope.OCClass_Dropdown_List = function () {
        var url = forumProviderUrl + "/OCClass_Dropdown_List";
        var para = { OCID: $scope.OCID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.OCClass_Dropdown_Item = data.d;
                $scope.OCClass_Dropdown_Item.splice(0, 0, { TeachingClassID: 0, TeachingClassName: "请选择班级" });
            }
        });
    }

    //活跃论题列表
    $scope.ForumTopic_Active_List = function () {
        var url = forumProviderUrl + "/ForumTopic_Active_List";
        var para = { OCID: $scope.OCID, UserID: $scope.UserInfo.UserID, Top: 5 };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumTopic_Active_Item = data.d;
            }
        });
    }

    //话题列表
    $scope.ForumTopic_Count = 0;
    $scope.ForumTopic_Search = function () {
        // $scope.firstLoad = false;
        var url = forumProviderUrl + "/ForumTopic_Search";
        //alert($scope.User_Info.UserID);
        $scope.ForumTopic.UserID = $scope.UserInfo.UserID;
        var para = { model: $scope.ForumTopic, PageIndex: $scope.PageIndex, PageSize: $scope.PageSize };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumTopic_Item = data.d;
                if (data.d.length > 0) {
                    $scope.ForumTopic_Count = data.d[0].RowsCount;
                    if ($scope.firstLoad) {
                        pageload();
                    }
                    $scope.ForumTopic.SearchKey = '';
                } else {
                    $scope.ForumTopic_Count = 0;
                }
            }
        });
    }
    //加载列表
    $scope.ForumTopic_list_load = function () {
        $scope.PageSize += 5;
        //alert($scope.ForumTopic_Count)
        if ($scope.PageSize >= $scope.ForumTopic_Count) {
            $scope.PageSize = $scope.ForumTopic_Count;
        }
        $scope.ForumTopic_Search();
    }
    //$scope.DateMoRen = (new Date()).getFullYear() + "-" + (new Date()).getMonth() + 1 + "-" + (new Date()).getDay();
    //laydate({
    //    elem: '#date', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
    //    event: 'focus', //响应事件。如果没有传入event，则按照默认的click
    //    festival: true, //显示节日
    //    istime: true,
    //    format: "YYYY-MM-DD" //日期格式
    //});
    //laydate.skin('molv')//墨绿皮肤

    $scope.InitSearch = function (type) {
        $scope.firstLoad = false;
        $scope.PageIndex = 1;
        $scope.ForumTopic = {
            SearchKey: '',
            OCID: $scope.OCID,
            UserID: $scope.UserInfo.UserID,
            ForumTypeID: $scope.ForumTypeID,
            IsEssence: false,
            IsMyStart: false,
            IsMyJoin: false,
            ResponseStatus: 0,
            Order: 0
        };
        if (type == 1) {
            $scope.ForumTopic.IsEssence = true;
        }
        if (type == 2) {
            $scope.ForumTopic.IsMyJoin = true;
        }
        if (type == 3) {
            $scope.ForumTopic.IsMyStart = true;
        }
        $scope.PageSize = 5;
        $scope.ForumTopic_Search();
        $scope.PageShow = false;
    }
    $scope.NextSearch = function (type) {
        $('#page').html("");
        $scope.PageSize = 10;
        $scope.PageShow = true
        if (type == 1) {
            $scope.ForumTopic.Order = 0;
        }
        if (type == 2) {
            $scope.ForumTopic.Order = 1;
        }
        if (type == 3) {
            $scope.ForumTopic.ResponseStatus = 0;
        }
        if (type == 4) {
            $scope.ForumTopic.ResponseStatus = 2;
        }
        if (type == 5) {
            $scope.ForumTopic.ResponseStatus = 1;
        }
        $scope.PageIndex = 1;
        $scope.ForumTopic_Search();
        $scope.firstLoad = true;
    }
    var pageload = function () {
        laypage({
            cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: $scope.ForumTopic_Count % 10 == 0 ? $scope.ForumTopic_Count / 10 : $scope.ForumTopic_Count / 10 + 1, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 5,//连续显示分页数
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                $scope.PageIndex = e.curr;
                if (!$scope.firstLoad) {
                    $scope.ForumTopic_Search();
                } else {
                    $scope.firstLoad = false;
                }
            }
        });
    }
    //点赞或取消
    $scope.ForumMy_IsGood_Upd = function (m) {
        $scope.ForumMy.TopicID = m.TopicID;
        $scope.ForumMy.ResponseID = (m.ResponseID == null || m.ResponseID == "" || m.ResponseID == undefined) ? 0 : m.ResponseID;
        //debugger;
        var url = forumProviderUrl + "/ForumMy_IsGood_Upd";
        var para = { model: $scope.ForumMy };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === false) {
            } else {
                m.IsGood = !m.IsGood
                m.IsGood ? m.Goods++ : m.Goods--;
            }
        });
    }

    //版块的详细信息
    $scope.ForumTypeInfo_Get = function () {
        var url = forumProviderUrl + "/ForumTypeInfo_Get";
        var para = { model: { ForumTypeID: $scope.ForumTypeID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
                $scope.ForumType = data.d.forumtype;
            }
        });
    }

    //获取用户的在线课程的角色   
    $scope.OCTeam_Role = {};
    $scope.OCTeam_Role_Get = function () {
        var url = forumProviderUrl + "/OCTeam_Role_Get";
        var para = { model: { OCID: $scope.OCID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.OCTeam_Role = data.d;
                if ($scope.OCTeam_Role.Role == 3) {
                    $scope.AuUserModule_UserID_List();
                }
            }
        });
    }

    //获取当前登录用户的指定在线课程模块列表
    $scope.AuUserModule_UserID_Items = [];
    $scope.AuUserModule_UserID_List = function () {
        var url = forumProviderUrl + "/AuUserModule_UserID_List";
        var para = { OCID: $scope.OCID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.AuUserModule_UserID_Items = data.d;
            }
        });
    }

    //用户权限
    $scope.UserRoleCheck = function (UserID, TeachingClassID, fl) {
        if ($scope.OCTeam_Role.Role == 0 || $scope.OCTeam_Role.Role == 1) {
            return true;
        } else if ($scope.OCTeam_Role.Role == 2) {
            var flag = false;
            if (fl) {
                flag = true;
            } else {
                if ($scope.OCTeam_Role.UserID == UserID) {
                    return true;
                }
                for (var i = 0; i < $scope.OCTeam_Role.TeachingClassID_list.length; i++) {
                    if ($scope.OCTeam_Role.TeachingClassID_list[i].TeachingClassID == TeachingClassID && $scope.OCTeam_Role.UserID == UserID) {
                        flag = true;
                    }
                }
            }
            return flag;
        } else if ($scope.OCTeam_Role.Role == 3) {
            var flag = false;

            if (fl) {
                for (var j = 0; j < $scope.AuUserModule_UserID_Items.length; j++) {
                    if ($scope.AuUserModule_UserID_Items[j].ModuleID == 'B141') {
                        flag = true;
                    }
                }
            } else {
                if ($scope.OCTeam_Role.UserID == UserID) {
                    return true;
                }

                for (var i = 0; i < $scope.OCTeam_Role.TeachingClassID_list.length; i++) {
                    if ($scope.OCTeam_Role.TeachingClassID_list[i].TeachingClassID == TeachingClassID) {
                        for (var j = 0; j < $scope.AuUserModule_UserID_Items.length; j++) {
                            if ($scope.AuUserModule_UserID_Items[j].ModuleID == 'B141') {
                                flag = true;
                            }
                        }

                    }
                }
            }
            return flag;
        } else {
            return false;
        }
    }

    $scope.Init = function () {
        $scope.OCTeam_Role_Get();
        $scope.ForumTypeInfo_Get();
        $scope.Forum_HotUser_List();
        $scope.ForumType_List();
        $scope.ForumTopic_Active_List();
        $scope.ForumTopic_Search();
    }

    $scope.User_Info();
}]);

//topicadd
forumModule.controller('ForumTopicCtrl', ['$scope', '$state', 'forumProviderUrl', 'uploadfileProviderUrl', function ($scope, $state, forumProviderUrl, uploadfileProviderUrl) {
    $scope.ForumType_Item = [];//论坛版块
    $scope.selected = 0;
    $scope.fileList = [];  //文件列表

    try {
        $scope.OCID = $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    } catch (e) {

    }
    $scope.TopicID = ($G2S.request("TopicID") == "" || $G2S.request("TopicID") == undefined) ? 0 : $G2S.request("TopicID");
    $scope.ChapterID = ($G2S.request("ChapterID") == "" || $G2S.request("ChapterID") == undefined) ? 0 : parseInt($G2S.request("ChapterID"));
    $scope.selected = parseInt(($G2S.request("ForumTypeID") == "" || $G2S.request("ForumTypeID") == undefined) ? '0' : $G2S.request("ForumTypeID"));
    $scope.IsMooc = ($G2S.request("mooc") == "" || $G2S.request("mooc") == undefined) ? '0' : $G2S.request("mooc");
    $scope.UserInfo = {};
    $scope.User_Info = function () {
        var url = forumProviderUrl + "/User_Info";
        var para = {};
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.UserInfo = data.d;
                Init();
            }
        });
    }

    $scope.ReturnUrl = '';

    $scope.ReturnUrl = ($G2S.request("ReturnUrl") == "" || $G2S.request("ReturnUrl") == undefined) ? "#" : $G2S.request("ReturnUrl");
    var forumtype = ($G2S.request("ForumTypeID") == "" || $G2S.request("ForumTypeID") == undefined) ? '0' : $G2S.request("ForumTypeID");
    $scope.ReturnPage = function () {

        if ($scope.TopicID > 0) {
            window.location.href = "topicdetail?TopicID=" + $scope.TopicID + "&OCID=" + $scope.OCID + "&mooc=" + $G2S.request("mooc");
        } else {
            if ($G2S.request("ChapterID") != "" && parseInt($G2S.request("ChapterID")) > 0) {
                window.open("", "_self").close();
            } else {
                window.location.href = $scope.ReturnUrl + "?ForumTypeID=" + forumtype + "&mooc=" + $G2S.request("mooc");
            }
        }
    }

    $scope.TagItems = [];
    //标签
    $scope.Tag = '';
    $scope.Num = 0;
    //新增标签
    $scope.AddTag = function () {
        if ($scope.Tag == '') {
            layer.msg("请输入标签!")
        } else {
            if ($scope.TagItems.length >= 5) {
                layer.msg("最多5个标签!")
                $scope.Tag = '';
                return;
            }
            $scope.TagItems.push($scope.Tag);
            $scope.Tag = '';
        }
    }
    //删除标签
    $scope.DelTag = function (index) {
        $scope.TagItems.splice(index, 1);
    }

    $scope.ForumTopic = {
        SearchKey: '',
        OCID: $scope.OCID,
        ForumTypeID: 0, // 如果是小组讨论中发帖，则ForumTypeID = 0 
        IsEssence: false,
        IsMyStart: false,
        IsMyJoin: false,
        ResponseStatus: 0,
        ChapterID: 0,
        Order: 0,
        //上面是搜索条件
        Title: '',
        Conten: '',
        Tags: '',
        ForumTypeID: 1,
        UserID: $scope.UserInfo.UserID,
        UserName: $scope.UserInfo.UserName,
        TopicID: $scope.TopicID,
        CourseID: 0,
        GroupTaskID: 0, // 小组讨论的编号，如果不是小组讨论中发帖，该编号设置为0
        TopicType: 0  // 发帖的主题类型；  PBL中发帖，该编号设置为3,2:mooc；
    };

    //版块列表
    $scope.ForumType_List = function () {
        var url = forumProviderUrl + "/ForumType_List";
        var para = { ft: { OCID: $scope.OCID, UserID: $scope.UserInfo.UserID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {

                data.d.splice(0, 0, { ForumTypeID: 0, Title: '请选择板块' });
                //$scope.selected = 0;
                $scope.ForumType_Item = data.d;
            }
        });
    }

    //发帖
    $scope.ForumTopic_Add = function () {
        $scope.ForumTopic.ForumTypeID = $scope.selected;
        $scope.ForumTopic.Tags = '';
        for (var i = 0; i < $scope.TagItems.length; i++) {
            $scope.ForumTopic.Tags += $scope.TagItems[i] + "*#0086#"
        }
        if ($scope.IsMooc == 1) {
            $scope.ForumTopic.TopicType = 2;
            $scope.ForumTopic.ChapterID = $scope.ChapterID;
        }
        $scope.ForumTopic.UpdateTime = new Date();
        $scope.ForumTopic.LastUpdateTime = new Date();
        $scope.ForumTopic.Conten = document.getElementById("frmoEditor1").contentWindow.getHTML();

        if ($scope.ForumTopic.Conten == '' || $scope.ForumTopic.Title == '' || $scope.selected == 0 || ($scope.IsMooc == 1 && $scope.ChapterID == 0)) {
            layer.msg("请先完善信息!");
            return;
        }
        var url = forumProviderUrl + "/ForumTopic_Add";
        var para = {
            model: $scope.ForumTopic
        };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumTopic = data.d;
                //$scope.File_Upload();
                if ($scope.fileList.length > 0) {
                    $scope.File_Upload();
                }
                layer.msg("发布成功!", 1, 1)

                $scope.ReturnPage();
            }
        });
    }

    //关联文件
    $scope.File_Upload = function () {
        var url = uploadfileProviderUrl + "/File_Upload";
        var para = {
            source_id: $scope.ForumTopic.TopicID,
            sourceName: "ForumTopic",
            list: $scope.fileList
        };
        $scope.baseService.post(url, para, function (data) {
            if (data.d != false) {
                //window.location.href = "index";
            }
        })
    }

    //编辑帖子
    $scope.ForumTopic_Upd = function () {
        $scope.ForumTopic.ForumTypeID = $scope.selected;
        $scope.ForumTopic.Tags = '';
        for (var i = 0; i < $scope.TagItems.length; i++) {
            $scope.ForumTopic.Tags += $scope.TagItems[i] + "*#0086#"
        }
        if ($scope.IsMooc == 1) {
            $scope.ForumTopic.TopicType = 2;
            $scope.ForumTopic.ChapterID = $scope.ChapterID;
        }
        $scope.ForumTopic.UpdateTime = new Date();
        $scope.ForumTopic.LastUpdateTime = new Date();
        $scope.ForumTopic.Conten = document.getElementById("frmoEditor1").contentWindow.getHTML();
        if ($scope.ForumTopic.Conten == '' || $scope.ForumTopic.Title == '' || $scope.selected == 0 || ($scope.IsMooc == 1 && $scope.ChapterID == 0)) {
            layer.msg("请先完善信息!");
            return;
        }
        var url = forumProviderUrl + "/ForumTopic_Upd";
        var para = { model: $scope.ForumTopic };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                if ($scope.fileList.length > 0) {
                    $scope.File_Upload();
                }
                layer.msg("编辑成功!", 1, 1)

                $scope.ReturnPage();

            }
        });
    }
    //论坛主题的详细信息
    $scope.ForumTopic_Get = function () {
        var url = forumProviderUrl + "/ForumTopic_Get";
        var para = { TopicID: $scope.TopicID, UserID: $scope.UserInfo.UserID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumTopic = data.d;

                var tags = $scope.ForumTopic.Tags.split("*#0086#");
                for (var i = 0; i < tags.length - 1; i++) {
                    $scope.TagItems.push(tags[i]);
                }
                $scope.selected = $scope.ForumTopic.ForumTypeID;
            }
        });
    }

    //文件列表
    $scope.Attachment_NoCache_List = function () {
        var url = forumProviderUrl + "/Attachment_NoCache_List";
        var para = { model: { SourceID: $scope.TopicID, Source: "ForumTopic" } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.fileList = data.d;
                for (var i = 0; i < $scope.fileList.length; i++) {
                    $scope.fileList[i].Updatetime = new Date();
                }
            }
        });
    }
    //删除附件
    //AttachmentID
    $scope.Attachment_Del = function (index, m) {
        var url = forumProviderUrl + "/Attachment_Del";
        var para = { model: { AttachmentID: m.AttachmentID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d != false) {
                $scope.fileList.splice(index, 1);
            }
        });
    }

    $scope.filesuffix = ['.png', '.gif', '.jpg', '.jpeg', '.rar', '.zip', '.mp4', '.txt', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.pdf', '.swf', '.flv ', '.mp3 ', '.wmv', '.asf'];
    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        //console.log(response[0]);
        if (response.length > 0) {
            $scope.fileList.push(response[0]);
        }
    });

    $scope.$on("onCompleteAll", function (event) {
        layer.msg('上传完成!', 1, 1);
        layer.close($scope.box);
    });

    $scope.box;
    $scope.ShowBox = function () {
        $scope.box = $.layer({
            type: 1,
            title: ["文件上传", true],
            shift: 'right-bottom',
            maxmin: true,
            area: ['800px', "auto"],
            shade: [0],
            page: { dom: '#box' },
            success: function (layero) {
                $(".xubox_max").addClass("xubox_maxmin");
                $(".xubox_max").hide();
                $(".xubox_title").attr("style", "background:none repeat scroll 0 0 #374760;color:#fff;cursor: move;");
            },
            min: function (layero) {
                $(".xubox_max").addClass("xubox_maxmin");
                $(".xubox_max").show();
            },
            restore: function (layero) {
                $(".xubox_max").hide();
            }
        });
    }

    //章节讨论下拉列表
    $scope.ChapterName_Items = [];
    $scope.ChapterName_List = function () {
        var url = forumProviderUrl + "/ChapterName_List";
        var para = { OCID: $scope.OCID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d != null) {
                if (data.d.length > 0) {
                    data.d.splice(0, 0, { ChapterID: 0, Title: '请选择章节' });
                } else {
                    data.d.push({ ChapterID: 0, Title: '你还没有创建MOOC哦,快去创建吧' });
                }
                //$scope.ChapterID = 0;
                $scope.ChapterName_Items = data.d;
            }
        });
    }

    var Init = function () {
        if ($scope.TopicID > 0) {  //编辑
            $scope.ForumTopic_Get();
            $scope.Attachment_NoCache_List();
        }
        if ($scope.IsMooc == 1) {
            $scope.selected = -1;
            $scope.ChapterName_List();
        } else {
            $scope.ForumType_List();
        }
    }

    $scope.User_Info();
}]);

//topicdetail
forumModule.controller('ForumTopicDetialCtrl', ['$scope', '$state', 'forumProviderUrl', 'uploadfileProviderUrl', function ($scope, $state, forumProviderUrl, uploadfileProviderUrl) {
    //console.log($stateParams);
    $scope.ForumType_Item = [];//论坛版块
    $scope.ForumResponseInfo_Item = [];  //回复列表
    $scope.selected = '';
    $scope.OCID = $G2S.request("OCID");// $(".exercise_nav_list .active a").attr("href").split("?")[1].split("=")[1];
    $scope.TopicID = $G2S.request("TopicID");
    $scope.UserInfo = {};
    $scope.SelTopicID = -1;
    $scope.fileList = [];  //文件列表

    $scope.User_Info = function () {
        var url = forumProviderUrl + "/User_Info";
        var para = {};
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.UserInfo = data.d;
                Init();
            }
        });
    }

    $scope.ForumMy = {
        TopicID: $scope.TopicID,
        ResponseID: 0,// 0表示为主题加赞 ,否则为回复点赞 
        UserID: $scope.UserInfo.UserID
    };
    $scope.ForumResponse = {
        ResponseID: 0,
        TopicID: $scope.TopicID,
        ParentID: 0,
        Conten: "",
        UserID: $scope.UserInfo.UserID,
        UserName: $scope.UserInfo.UserName
    }
    $scope.ForumTopic = {
        SearchKey: '',
        OCID: $scope.OCID,
        ForumTypeID: 0, // 如果是小组讨论中发帖，则ForumTypeID = 0 
        IsEssence: false,
        IsMyStart: false,
        IsMyJoin: false,
        ResponseStatus: 0,
        Order: 0,
        //上面是搜索条件
        IsTop: false,
        Title: '',
        Conten: '',
        Tags: '',
        ForumTypeID: 1,
        UserID: $scope.UserInfo.UserID,
        UserName: $scope.UserInfo.UserName,
        TopicID: 0,
        CourseID: 0,
        GroupTaskID: 0, // 小组讨论的编号，如果不是小组讨论中发帖，该编号设置为0
        TopicType: 0  // 发帖的主题类型；  PBL中发帖，该编号设置为3；
    };

    //版块列表
    $scope.ForumType_List = function () {
        var url = forumProviderUrl + "/ForumType_List";
        var para = { ft: { OCID: $scope.OCID, UserID: $scope.UserInfo.UserID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumType_Item = data.d;
                var ForumTypeIDS = $scope.ForumTopic.ForumTypeIDS.split(",");
                //alert(ForumTypeIDS);
                for (var i = 0; i < ForumTypeIDS.length - 1; i++) {
                    for (var j = 0; j < $scope.ForumType_Item.length; j++) {
                        if (ForumTypeIDS[i] == $scope.ForumType_Item[j].ForumTypeID) {
                            $scope.ForumType_Item[j].active = true;
                        }
                    }
                }
            }
        });
    }

    //获取主题回复列表及关注的列表
    $scope.ForumResponseInfo_List = function () {
        var url = forumProviderUrl + "/ForumResponseInfo_List";
        var para = { model: { TopicID: $scope.TopicID, UserID: $scope.UserInfo.UserID }, PageIndex: 1, PageSize: 10 };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumResponseInfo_Item = data.d.forumresponselist;
            }
        });
    }
    //论坛主题的详细信息
    $scope.ForumTopic_Get = function () {
        var url = forumProviderUrl + "/ForumTopic_Get";
        var para = { TopicID: $scope.TopicID, UserID: $scope.UserInfo.UserID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumTopic = data.d;
                $scope.ForumType_List();
                $scope.ForumTopic_Other();
            }
        });
    }
    //添加回复
    $scope.ForumResponse_ADD = function () {
        //debugger;
        if ($scope.ForumResponse.ParentID == 0) {
            $scope.ForumResponse.Conten = document.getElementById("frmoEditor1").contentWindow.getHTML();
            if ($scope.ForumResponse.Conten == "") {
                layer.msg("请输入内容！");
                return;
            }
        }
        var url = forumProviderUrl + "/ForumResponse_ADD";
        var para = { model: { TopicID: $scope.TopicID, ParentID: $scope.ForumResponse.ParentID, Conten: $scope.ForumResponse.Conten, UserName: $scope.UserInfo.UserName, UserID: $scope.UserInfo.UserID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.ForumResponseInfo_Item.push(data.d);
                $scope.ForumResponse.Conten = '';
                document.getElementById("frmoEditor1").contentWindow.setHTML("");
                if ($scope.Respone_File_List.length > 0) {
                    $scope.File_Upload(data.d);
                }
                $scope.ForumResponseInfo_List();
            }
        });
    }

    //初始化回复
    $scope.ResponseInit = function (m) {
        for (var i = 0; i < $scope.ForumResponseInfo_Item.length; i++) {
            $scope.ForumResponseInfo_Item[i].ResponseShow = false;
        }
        if (m == 0) {
            //alert(m);
            $scope.ForumResponse.ParentID = 0;
        } else {
            $scope.ForumResponse.UserName = m.UserName;
            $scope.ForumResponse.ParentID = m.ResponseID;
            $scope.ForumResponse.Conten = "";
            m.ResponseShow = true;
        }
    }
    //引用
    $scope.SetHtml = function (m, name, context) {
        if (m != 0) {
            name = m.UserName;
            context = m.Conten;
        }
        var strHtml = "";
        strHtml += "<div class='quote_box'style='background: none repeat scroll 0 0 #f2f2f2;margin: 5px 0;overflow: hidden;padding: 10px;font-size:12px;'>";
        strHtml += "    <span style='float: left;margin-right: 20px;font-size:12px;'>引用：</span>";
        strHtml += "    <div class='quote_user' style='color: #333;overflow: hidden;'>";
        strHtml += "        <p class='Name'>" + name + "</p>";
        strHtml += "        <p class='responseContext'>";
        strHtml += context;
        strHtml += "            <a href='javascript:;' style=' color: #aaa;float: right;margin-left: 15px;'>回复</a>";
        strHtml += "            <a href='javascript:;' style=' color: #aaa;float: right;margin-left: 15px;' ng-click='SetHtml(0," + name + "," + context + ")'>引用</a>";
        strHtml += "        </p>";
        strHtml += "    </div>";
        strHtml += "</div><br/><br/>";
        //console.info(target.parentNode.parentNode.getAttribute('class'));
        document.getElementById("frmoEditor1").contentWindow.setHTML(strHtml);
    }
    //点赞或取消
    $scope.ForumMy_IsGood_Upd = function (m) {
        $scope.ForumMy.TopicID = m.TopicID;
        $scope.ForumMy.ResponseID = (m.ResponseID == null || m.ResponseID == "" || m.ResponseID == undefined) ? 0 : m.ResponseID;
        var url = forumProviderUrl + "/ForumMy_IsGood_Upd";
        var para = { model: $scope.ForumMy };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
                m.IsGood = !m.IsGood
                m.IsGood ? m.Goods++ : m.Goods--;
            }
        });
    }

    //置顶或取消置顶
    $scope.ForumTopic_IsTop_Upd = function () {
        $scope.ForumTopic.IsTop = !$scope.ForumTopic.IsTop;
        var url = forumProviderUrl + "/ForumTopic_IsTop_Upd";
        var para = { TopicID: $scope.ForumTopic.TopicID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
            }
        });
    }

    //设置或取消精华 
    $scope.ForumTopic_IsEssence_Upd = function () {
        $scope.ForumTopic.IsEssence = !$scope.ForumTopic.IsEssence;
        var url = forumProviderUrl + "/ForumTopic_IsEssence_Upd";
        var para = { TopicID: $scope.ForumTopic.TopicID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
            }
        });
    }

    //分享帖子
    $scope.ForumTopicType_Edit = function () {
        var url = forumProviderUrl + "/ForumTopicType_Edit";
        var ForumTypeIDS = "";
        for (var i = 0; i < $scope.ForumType_Item.length; i++) {
            if ($scope.ForumType_Item[i].active) {
                ForumTypeIDS += $scope.ForumType_Item[i].ForumTypeID + ",";
            }
        }
        var para = { model: { TopicID: $scope.ForumTopic.TopicID, ForumTypeIDS: ForumTypeIDS } };
        //alert(ForumTypeIDS);
        $scope.baseService.post(url, para, function (data) {
            if (data.d == true) {
                layer.msg("操作成功!", 1, 1);
                //$('.share_content').slideUp();
            }
        });
    }

    //移动版块
    $scope.ForumTopic_ForumTypeID_Upd = function () {
        if ($scope.selected == null || $scope.selected == "") {
            alert("请选择版块!");
            return;
        }
        var url = forumProviderUrl + "/ForumTopic_ForumTypeID_Upd";
        var para = { TopicID: $scope.ForumTopic.TopicID, ForumTypeID: $scope.selected.ForumTypeID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
            }
        });
    }

    //删除帖子
    $scope.ForumTopic_Del = function () {

        if (!confirm("确定删除吗?")) {
            return;
        }
        var url = forumProviderUrl + "/ForumTopic_Del";
        var para = { TopicID: $scope.ForumTopic.TopicID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
                window.location.href = window.appPatch + "/CourseLive/Forum/index";
            }
        });
    }

    //删除回复
    $scope.ForumResponse_Del = function (m) {

        if (!confirm("确定删除吗?")) {
            return;
        }
        var url = forumProviderUrl + "/ForumResponse_Del";
        var para = { ResponseID: m.ResponseID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {
            } else {
                for (var i = 0; i < $scope.ForumResponseInfo_Item.length; i++) {
                    if ($scope.ForumResponseInfo_Item[i].ResponseID == m.ResponseID) {
                        $scope.ForumResponseInfo_Item.splice(i, 1);
                    }
                }
            }
        });
    }

    //计算时间差
    $scope.getDateDiff = function (desc, dateTimeStamp) {
        if (dateTimeStamp == null || dateTimeStamp == '') {
            return;
        }
        var re = /-?\d+/;
        var m = re.exec(dateTimeStamp);
        if (m < 0) { return ""; }
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - m;

        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;

        if (monthC >= 1) {
            result = desc + parseInt(monthC) + "个月前";
        }
        else if (weekC >= 1) {
            result = desc + parseInt(weekC) + "个星期前";
        }
        else if (dayC >= 1) {
            result = desc + parseInt(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = desc + parseInt(hourC) + "个小时前";
        }
        else if (minC >= 1) {
            result = desc + parseInt(minC) + "分钟前";
        } else {
            result = "刚刚发表";
        }
        return result;
    }


    //相关讨论
    $scope.ForumTopic_OtherItems = [];
    $scope.ForumTopic_Other = function () {
        var url = forumProviderUrl + "/ForumTopic_Other";
        var para = {
            TopicID: $scope.ForumTopic.TopicID,
            SourceID: $scope.ForumTopic.SourceID,
            Source: $scope.ForumTopic.Source,
            OCID: $scope.ForumTopic.OCID,
            UserID: $scope.ForumTopic.UserID
        };
        $scope.baseService.post(url, para, function (data) {
            $scope.ForumTopic_OtherItems = data.d;
            $scope.ForumTopic_OtherItems.splice(0, 0, { TopicID: -1, Title: "相关讨论" });
        });
    }

    //获取用户的在线课程的角色   
    $scope.OCTeam_Role = {};
    $scope.OCTeam_Role_Get = function () {
        var url = forumProviderUrl + "/OCTeam_Role_Get";
        var para = { model: { OCID: $scope.OCID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.OCTeam_Role = data.d;
                if ($scope.OCTeam_Role.Role == 3) {
                    $scope.AuUserModule_UserID_List();
                }
            }
        });
    }

    $scope.RoleByStu = false;


    //获取当前登录用户的指定在线课程模块列表
    $scope.AuUserModule_UserID_Items = [];
    $scope.AuUserModule_UserID_List = function () {
        var url = forumProviderUrl + "/AuUserModule_UserID_List";
        var para = { OCID: $scope.OCID };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.AuUserModule_UserID_Items = data.d;
            }
        });
    }

    //用户权限
    $scope.UserRoleCheck = function (UserID, TeachingClassID, fl) {
        if ($scope.OCTeam_Role.Role == 0 || $scope.OCTeam_Role.Role == 1) {
            $scope.RoleByStu = false;
            return true;
        } else if ($scope.OCTeam_Role.Role == 2) {
            $scope.RoleByStu = false;
            var flag = false;
            if (fl) {
                flag = true;
            } else {
                if ($scope.OCTeam_Role.UserID == UserID) {
                    return true;
                }
                for (var i = 0; i < $scope.OCTeam_Role.TeachingClassID_list.length; i++) {
                    if ($scope.OCTeam_Role.TeachingClassID_list[i].TeachingClassID == TeachingClassID) {
                        flag = true;
                    }
                }
            }
            return flag;
        } else if ($scope.OCTeam_Role.Role == 3) {
            $scope.RoleByStu = false;
            var flag = false;

            if (fl) {
                for (var j = 0; j < $scope.AuUserModule_UserID_Items.length; j++) {
                    if ($scope.AuUserModule_UserID_Items[j].ModuleID == 'B141') {
                        flag = true;
                    }
                }
            } else {
                if ($scope.OCTeam_Role.UserID == UserID) {
                    return true;
                }

                for (var i = 0; i < $scope.OCTeam_Role.TeachingClassID_list.length; i++) {
                    if ($scope.OCTeam_Role.TeachingClassID_list[i].TeachingClassID == TeachingClassID) {
                        for (var j = 0; j < $scope.AuUserModule_UserID_Items.length; j++) {
                            if ($scope.AuUserModule_UserID_Items[j].ModuleID == 'B141') {
                                flag = true;
                            }
                        }

                    }
                }
            }
            return flag;
        } else {
            if ($scope.OCTeam_Role.UserID == UserID) {
                $scope.RoleByStu = true;
                return true;
            }
            return false;
        }
    }
    //关联文件
    $scope.File_Upload = function (m) {
        var url = uploadfileProviderUrl + "/File_Upload";
        var para = {
            source_id: m.ResponseID,
            sourceName: "ForumResponse",
            list: $scope.Respone_File_List
        };
        $scope.baseService.post(url, para, function (data) {
            if (data.d != false) {
                $scope.Respone_File_List = [];
            }
        })
    }


    //文件列表
    $scope.fileList = [];

    $scope.Attachment_NoCache_List = function () {
        var url = forumProviderUrl + "/Attachment_NoCache_List";
        var para = { model: { SourceID: $scope.TopicID, Source: "ForumTopic" } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {
                $scope.fileList = data.d;
                for (var i = 0; i < $scope.fileList.length; i++) {
                    $scope.fileList[i].Updatetime = new Date();
                }
            }
        });
    }
    //回复的附件列表
    $scope.ResponsefileList = [];
    $scope.Responsefile_List = function (m) {
        var url = forumProviderUrl + "/Attachment_NoCache_List";
        var para = { model: { SourceID: m.ResponseID, Source: "ForumResponse" } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d === null) {

            } else {

                $scope.ResponsefileList = data.d;
                for (var i = 0; i < $scope.ResponsefileList.length; i++) {
                    $scope.ResponsefileList[i].Updatetime = new Date();
                }
                return data.d;
            }
        });
    }
    //删除附件
    //AttachmentID
    $scope.Attachment_Del = function (index, m) {
        var url = forumProviderUrl + "/Attachment_Del";
        var para = { model: { AttachmentID: m.AttachmentID } };
        $scope.baseService.post(url, para, function (data) {
            if (data.d != false) {
                $scope.Respone_File_List.splice(index, 1);
            }
        });
    }

    $scope.filesuffix = ['.png', '.gif', '.jpg', '.jpeg', '.rar', '.zip', '.mp4', '.txt', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.pdf', '.swf', '.flv ', '.mp3 ', '.wmv', '.asf'];
    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        //console.log(response[0]);
        if (response.length > 0) {
            $scope.Respone_File_List.push(response[0]);
        }
    });
    $scope.Respone_File_List = [];
    $scope.$on("onCompleteAll", function (event) {
        layer.msg('上传完成!', 1, 1);
        layer.close($scope.box);
    });

    $scope.box;
    $scope.ShowBox = function () {
        $scope.box = $.layer({
            type: 1,
            title: ["文件上传", true],
            shift: 'right-bottom',
            maxmin: true,
            area: ['800px', "auto"],
            shade: [0],
            page: { dom: '#box' },
            success: function (layero) {
                $(".xubox_max").addClass("xubox_maxmin");
                $(".xubox_max").hide();
                $(".xubox_title").attr("style", "background:none repeat scroll 0 0 #374760;color:#fff;cursor: move;");
            },
            min: function (layero) {
                $(".xubox_max").addClass("xubox_maxmin");
                $(".xubox_max").show();
            },
            restore: function (layero) {
                $(".xubox_max").hide();
            }
        });
    }

    var Init = function () {
        $scope.OCTeam_Role_Get();
        $scope.ForumTopic_Get();
        $scope.ForumResponseInfo_List();
        $scope.Attachment_NoCache_List();
    }

    $scope.User_Info();
}]);

//过滤回复列表
forumModule.filter('responseFilter', function () {
    return function (arr, num) {
        if (arr == null || arr == '') {
            return;
        }
        return arr.filter(function (item) {
            return item.ParentID == num;
        });
    }
});


forumModule.filter('ForumTypefilter', function () {
    return function (Items, ForumTypeID) {
        return Items.filter(function (item) {
            if (item.ForumTypeID != ForumTypeID) {
                return true;
            }
        });
    }
});

//过滤版块,给对象添加一个属性
forumModule.filter('addResponseShow', function () {
    return function (v) {
        if (v == undefined || v == '' || v == null) {
            return;
        }
        v.ResponseShow = false;
        //alert(v.ResponseShow);
        return v;
    }
});
