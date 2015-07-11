/// <reference path="../../../../Views/CourseLive/Test/HomeWorkAdd.cshtml" />

var moocModule = angular.module('app.oc.mooc', []);
//MOOC设置页面
moocModule.controller('MOOCController', ['$scope', '$filter', '$state', 'moocProviderUrl', 'FileUploader', 'uploadfileProviderUrl', function ($scope, $filter, $state, moocProviderUrl, FileUploader, uploadfileProviderUrl) {

    $scope.OCID = $G2S.request("currentoc"); //1选中课程目录；2选中课程资料


    $scope.type = 1; //1选中课程目录；2选中课程资料 3选中章节测试
    $scope.Step = 1; //1进阶式教程设计；2见面课设计；3发布与招生
    $scope.Chapter = null;  //当前操作的章节信息
    $scope.ChapterEnter = null;  //回车添加章节时候的信息
    $scope.ChapterList = []; //章节的集合
    $scope.OCMoocFileList = []; //资料集合

    $scope.OcMooc = null;   //MOOC基本信息
    $scope.OCMoocOfflineList = []; //见面课集合
    $scope.OCMoocOffline = null;     //当前操作的见面课
    $scope.Data = 1; //1本次见面课的目的 2教师要点说明 3学生组织说明 4评价与成绩说明 5资源配套说明 6考核方式
    $scope.Incomplete = 0; //没有准备好的资料数
    $scope.ClassList = []; //招生列表
    $scope.OCMoocLiveDiscussList = []; //章节讨论列表
    $scope.OCMoocLiveTestList = []; //章测试列表
    $scope.OCMoocLiveInit = 0; //章节讨论计数
    $scope.OCMoocRecruitStatus = 1;   //默认选中进行中招生
    $scope.OCMoocTotal = [];   //MOOC统计信息
    $scope.Step1Status = 0; //进阶式教程设计是否符合要求
    $scope.Step2Status = 0; //见面课设计是否符合要求
    $scope.Step3Status = 0; //是否发布
    $scope.OCTeamList = {};
    $scope.Tip = "您的MOOC课程还未全部建设完成，发布申请可能会被系统管理员驳回，您确定要发布吗？";
    $scope.KenList = []; //知识点列表
    $scope.filesuffix = ['.mp4', '.ppt', '.pptx', '.doc', '.docx', '.pdf', '.txt']; //文件类型集合

    $scope.TT = false;

    var bindBodyKeyUp;
    $scope.$watch('$viewContentLoaded', function () {
        fixedSreenBottom();
        bindBodyKeyUp = function () {
            dieBodyKeyUp();
            $('.course_detail').keyup(function (e) {
                var keyNumber = e.keyCode;
                switch (keyNumber) {
                    case 13:
                        Chapter_Enter_Add();    //回车添加新章节
                        $('body,html').animate({ scrollTop: 1000 }, 300);
                        break;
                }
            });
        }

        function dieBodyKeyUp() {
            $('.course_detail').unbind('keyup');
        }
        bindBodyKeyUp();

        $(".backto_top").click(function () {
            $('body,html').animate({ scrollTop: 0 }, 300);
            return false;
        });
    });

    function fixedSreenBottom() {

        $(window).scroll(function () {
            var dtop = $(document).scrollTop();
            if (dtop > 30) {
                $('.backto_top').show();
            } else {
                $('.backto_top').hide();
            }
        });
    }

    //设计向导-步骤
    $scope.ChangeStep = function (step) {
        $scope.Step = step;
        if (step == 2 && $scope.OCMoocOfflineList.length == 0) //首次进入见面课设计，读取列表
        {
            var url = moocProviderUrl + "/OCMoocOffline_List";
            var param = { OCID: $scope.OCID }
            $scope.baseService.post(url, param, function (data) {
                if (data.d != null) {
                    $scope.OCMoocOfflineList = data.d;
                    if ($scope.OCMoocOfflineList.length > 0) {
                        $scope.Step2Status = 1;
                    }
                }
            });
            OCTeamList();
        }

        if (step == 3) //首次进入见面课设计，读取列表
        {
            if ($scope.OCMoocOfflineList.length == 0) {
                var url = moocProviderUrl + "/OCMoocOffline_List";
                var param = { OCID: $scope.OCID }
                $scope.baseService.post(url, param, function (data) {
                    if (data.d != null) {
                        $scope.OCMoocOfflineList = data.d;
                        if ($scope.OCMoocOfflineList.length > 0) {
                            $scope.Step2Status = 1;
                        }
                    }
                });
                OCTeamList();
            }
            $scope.CompleteCheck(1);
        }
    }

    //Step1 Start
    $scope.OCMoocSave_Step1 = function (next) {
        var url = moocProviderUrl + "/OCMOOC_Edit";
        var param = { model: $scope.OcMooc };
        $scope.baseService.post(url, param, function (data) {

        });

        if ($scope.type == 1) {
            for (var i = 0; i < $scope.ChapterList.length; i++) {
                var url = moocProviderUrl + "/Chapter_Upd";
                var param = { model: $scope.ChapterList[i] };
                $scope.baseService.post(url, param, function (data) {

                });
            }
        }
        else if ($scope.type == 2) {
            var count = 0; //记录
            for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                
                if ($scope.OCMoocFileList[i].ChapterID == 0) //有未绑定章节的文件
                {
                    layer.msg("还有文件未绑定！");
                    return;
                }

                if (parseInt($scope.OCMoocFileList[i].TimelimitMin) > 0) {
                    $scope.OCMoocFileList[i].Timelimit = parseInt($scope.OCMoocFileList[i].TimelimitMin * 60);
                }
                else {
                    $scope.OCMoocFileList[i].Timelimit = 0;
                }

                $scope.OCMoocFileList[i].UploadTime = $filter('dateFormatAll')($scope.OCMoocFileList[i].UploadTime);
                var url = moocProviderUrl + "/OCMoocFile_Edit";
                var param = { model: $scope.OCMoocFileList[i], OCID: $scope.OCID };
                $scope.baseService.post(url, param, function (data) {
                });
            }
        }
        if (next == 1) {
            layer.msg('保存成功!', 1, 1);
        }
        else {
            $scope.Step = 2;
        }
    }

    //章节新增作业考试
    $scope.HomeWorkAdd_Chapter = function (Chapter) {
        if (Chapter.TestID > 0) {
            window.open("../../CourseLive/Test/HomeWorkAdd?Type=MOOC" + "&TestID=" + Chapter.TestID + "&Title=" + Chapter.Title + "&ChapterID=" + Chapter.ChapterID + "&OCID=" + Chapter.OCID);
        }
        else {
            TestID_ChapterID_Get(Chapter);
        }
    }

    //MOOC新增测试 
    $scope.HomeWorkAdd_MOOC = function () {
        if ($scope.OcMooc.TestID > 0) {
            window.open("../../CourseLive/Test/HomeWorkAdd?Type=MOOC" + "&TestID=" + $scope.OcMooc.TestID + "&Title=" + $scope.OcMooc.Name + "&ChapterID=0&OCID=" + $scope.OCID);
        }
        else {
            var url = moocProviderUrl + "/TestID_MOCC_Get";
            var param = { OCID: $scope.OCID };
            var promise = $scope.baseService.postPromise(url, param);
            promise.then(function (data) {
                if (data.d != null) {
                    var testID = data.d;
                    $scope.OcMooc.TestID = testID;
                    if (testID > 0) {
                        $scope.OcMooc.TestNum = 1;
                    }
                    window.open("../../CourseLive/Test/HomeWorkAdd?Type=MOOC" + "&TestID=" + testID + "&Title=" + $scope.OcMooc.Name + "&ChapterID=0&OCID=" + $scope.OCID);
                }
            })
        }
    }

    //获取章节的测试编号
    var TestID_ChapterID_Get = function (Chapter) {
        var url = moocProviderUrl + "/TestID_ChapterID_Get";
        var param = { model: Chapter };
        var promise = $scope.baseService.postPromise(url, param);
        promise.then(function (data) {
            if (data.d != null) {
                var testID = data.d;
                Chapter.TestID = testID;
                if (testID > 0) {
                    Chapter.TestNum = 1;
                }
                window.open("../../CourseLive/Test/HomeWorkAdd?Type=MOOC" + "&TestID=" + testID + "&Title=" + Chapter.Title + "&ChapterID=" + Chapter.ChapterID + "&OCID=" + Chapter.OCID);
            }
        })
    }

    //完整度检测
    $scope.CompleteCheck = function (type) {    //type:1 只检查不统计 2检查并统计
        $scope.Incomplete = 0
        for (var i = 0; i < $scope.ChapterList.length; i++) {
            if ($scope.ChapterList[i].ParentID == 0) {  //下列项只需检测章
                if ($scope.ChapterList[i].PlanDay == null || parseInt($scope.ChapterList[i].PlanDay) < 1) $scope.Incomplete++;
                if ($scope.ChapterList[i].MinHour == null || parseInt($scope.ChapterList[i].MinHour) < 1) $scope.Incomplete++;
                if ($scope.ChapterList[i].TestNum == null || parseInt($scope.ChapterList[i].TestNum) < 1) $scope.Incomplete++;
            }
            else {                                      //下列项只需检测节
                if ($scope.ChapterList[i].FileNum == null || parseInt($scope.ChapterList[i].FileNum) < 1) $scope.Incomplete++;
            }
            if ($scope.ChapterList[i].Title == null || $scope.ChapterList[i].Title == "") $scope.Incomplete++;
        }
        if ($scope.Incomplete > 0) {
            $scope.Step1Status = 1;
        }
        if (type != 2) {
            DataTotal();
        }
    }

    //统计
    var DataTotal = function () {
        if ($scope.OCMoocFileList.length == 0) {
            var url = moocProviderUrl + "/OCMoocFile_List";
            var param = { OCID: $scope.OCID, ChapterID: -1 }
            $scope.baseService.post(url, param, function (data) {
                if (data.d != null) {
                    $scope.OCMoocFileList = data.d;
                    for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                        $scope.OCMoocFileList[i].TimelimitMin = round($scope.OCMoocFileList[i].Timelimit / 60, 0);
                    }
                    DataStatistics();
                }
            });
        }
        else {
            DataStatistics();
        }
    }

    //统计
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
                $scope.OCMoocTotal.PlanDay += parseInt(Chapter.PlanDay);
                $scope.OCMoocTotal.MinHour += parseInt(Chapter.MinHour);
            }
        }
        if ($scope.OcMooc.TestID > 0)
        {
            $scope.OCMoocTotal.TestNum++;
        }
    }


    ////查看结果菜单
    //$scope.ViewCheckResult = function () {
    //    $('#div_CompleteCheck').modal('show');

    //}
    //绑定MOOC基本信息
    var OCMoocInfo_Get = function () {
        var url = moocProviderUrl + "/OCMoocInfo_Get";
        var param = { OCID: $scope.OCID }
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OcMooc = data.d.OcMooc;
                $scope.ChapterList = data.d.ChapterList;
                $scope.CompleteCheck(2);
                if ($scope.OcMooc.PublishStatus > 0) {
                    $scope.Step3Status = 1;
                }
            }
        });
    }

    //显示章节讨论详细
    $scope.PartDiscussion = function (Chapter) {
        if ($scope.OCMoocLiveDiscussList.length == 0) //首次进入，加载讨论列表
        {
            var url = moocProviderUrl + "/OCMoocLiveDiscuss_List";
            var param = { ChapterID: -1, OCID: $scope.OCID }
            $scope.baseService.post(url, param, function (data) {
                if (data.d != null) {
                    $scope.OCMoocLiveDiscussList = data.d;
                }
            });
        }
        $scope.Chapter = Chapter;
        $('#div_Discussion').modal('show');
    }

    //保存章节讨论新增
    $scope.OCMoocLiveDiscuss_Add = function () {
        $scope.OCMoocLiveInit++;
        var OCMoocLiveModel = new Object();
        OCMoocLiveModel.MoocLiveID = -1;
        OCMoocLiveModel.OCID = $scope.OCID;
        OCMoocLiveModel.TopicID = -1;
        OCMoocLiveModel.ForumTitle = "";
        OCMoocLiveModel.ChapterID = $scope.Chapter.ChapterID;
        OCMoocLiveModel.IsMust = true;
        OCMoocLiveModel.IsDiscuss = true;
        OCMoocLiveModel.active = true;
        OCMoocLiveModel.edit = true;//edit=1 则为编辑状态
        OCMoocLiveModel.count = $scope.OCMoocLiveInit; //计数，删除用
        $scope.OCMoocLiveDiscussList[$scope.OCMoocLiveDiscussList.length] = OCMoocLiveModel;
    }

    //章节讨论更新
    $scope.OCMoocLiveDiscuss_Upd = function () {
        for (var i = 0; i < $scope.OCMoocLiveDiscussList.length; i++) {
            if ($scope.OCMoocLiveDiscussList[i].ChapterID == $scope.Chapter.ChapterID) //保存当前章节的讨论
            {
                var num = i;
                if ($scope.OCMoocLiveDiscussList[num].edit) {
                    var url = moocProviderUrl + "/OCMoocLiveDiscuss_Edit";
                    var param = { model: $scope.OCMoocLiveDiscussList[num] }
                    $scope.baseService.post(url, param, function (data) {
                        if (data.d != null) {
                            $scope.OCMoocLiveDiscussList[num].edit = false;
                            $scope.OCMoocLiveDiscussList[num].MoocLiveID = data.d.MoocLiveID;
                        }
                    });
                }
            }
        }

        $scope.Chapter.TopicNum = $filter('MoocFilter')($scope.OCMoocLiveDiscussList, 'ChapterID', '=', $scope.Chapter.ChapterID).length;

        $('#div_Discussion').modal('hide');
    }

    //章节讨论删除
    $scope.OCMoocLiveDiscuss_Del = function (OCMoocLive) {
        var livebox = $.layer({
            shade: [0],
            dialog: {
                msg: '是否确定删除该章节讨论？',
                btns: 2,
                type: 4,
                btn: ['确认', '取消'],
                yes: function () {
                    if (OCMoocLive.MoocLiveID > 0)  //从库里删除
                    {
                        $scope.OCMoocLive_Del(OCMoocLive,1);
                    }
                    else if (OCMoocLive.MoocLiveID == -1) //数据还没入库,直接移除就可以 
                    {
                        for (var i = 0; i < $scope.OCMoocLiveDiscussList.length; i++) {
                            if ($scope.OCMoocLiveDiscussList[i].count == OCMoocLive.count) { //MoocLiveID=-1 数据还没入库,直接移除就可以
                                $scope.OCMoocLiveDiscussList.splice(i, 1);
                            }
                        }
                    }
                    layer.close(livebox);
                }, no: function () {
                    layer.close(livebox);
                }
            }
        });
    }


    //显示知识点
    $scope.PartKnowledge = function (Chapter) {
        $scope.Chapter = Chapter;
        if ($scope.KenList.length == 0) {
            var url = moocProviderUrl + "/Ken_List";
            var param = { OCID: $scope.OCID }
            $scope.baseService.post(url, param, function (data) {
                if (data.d != null) {
                    $scope.KenList = data.d;
                }
            });
        }
        $('#div_KnowledgePoint').modal('show');
    }

    //章节讨论更新
    $scope.Ken_Edit = function () {
        for (var i = 0; i < $scope.KenList.length; i++) {
            if ($scope.KenList[i].ChapterID == $scope.Chapter.ChapterID) //保存当前章节的
            {
                if ($scope.KenList[i].edit) {
                    $scope.KenList[i].UpdateTime = $filter('dateFormatAll')($scope.KenList[i].UpdateTime);
                    var url = moocProviderUrl + "/Ken_Edit";
                    var param = { model: $scope.KenList[i] };
                    $scope.baseService.post(url, param, function (data) {
                        if (data.d != null) {

                        }
                    });
                }
            }
        }

        $scope.Chapter.KenNum = $filter('MoocFilter')($scope.KenList, 'ChapterID', '=', $scope.Chapter.ChapterID).length;

        $('#div_KnowledgePoint').modal('hide');
    }

    //保存章节讨论新增
    $scope.Ken_Add = function () {
        $scope.OCMoocLiveInit++;
        var KenModel = new Object();
        KenModel.KenID = -1;
        KenModel.OCID = $scope.OCID;
        KenModel.ChapterID = $scope.Chapter.ChapterID;
        KenModel.active = true;
        KenModel.edit = true;//edit=1 则为编辑状态
        KenModel.count = $scope.OCMoocLiveInit; //计数，删除用
        $scope.KenList[$scope.KenList.length] = KenModel;
    }

    //章节讨论删除
    $scope.Ken_Del = function (Ken) {
        if (confirm("是否确定删除该知识点?")) {

            if (Ken.KenID > 0)  //从库里删除
            {
                var url = moocProviderUrl + "/Ken_Del";
                var param = { model: Ken }
                Ken.UpdateTime = $filter('dateFormatAll')(Ken.UpdateTime);
                $scope.baseService.post(url, param, function (data) {
                    for (var i = 0; i < $scope.KenList.length; i++) {
                        if ($scope.KenList[i].KenID == Ken.KenID) {
                            $scope.KenList.splice(i, 1);
                        }
                    }
                });
            }
            else if (Ken.KenID == -1) //数据还没入库,直接移除就可以 
            {
                for (var i = 0; i < $scope.KenList.length; i++) {
                    if ($scope.KenList[i].count == Ken.count) { //MoocLiveID=-1 数据还没入库,直接移除就可以
                        $scope.KenList.splice(i, 1);
                    }
                }
            }
        }
    }

    //章节启用状态
    $scope.PartStatus = function (Chapter) {
        $scope.Chapter = Chapter;
        if (Chapter.MoocStatus == 0) { //需要启用该节
            //后面的话加一些判断:是否符合启用条件
            Chapter.MoocStatus = 1;
        }
        else if (Chapter.MoocStatus == 1) //需要禁用该节
        {
            Chapter.MoocStatus = 0;
        }
        //$scope.Chapter_Upd();
    }



    //加载课程资料列表
    $scope.PartFile = function (Chapter) {
        if ($scope.OCMoocFileList.length == 0) //首次进入，加载课程资料列表
        {
            OCMoocFile_List();
        }
        $scope.Chapter = Chapter;
        $('#ChapterFile').modal('show');
    }


    //小节视频弹题
    $scope.PartVideo = function (Chapter) {
        window.open("mooc_chapter?ChapterID=" + Chapter.ChapterID + "&OCID=" + $scope.OCID + "&Title=" + encodeURI(Chapter.Title))
    }


    //置资料必读选读权限
    $scope.OCMoocFileStatus = function (OCMoocFile) {
        OCMoocFile.IsMust = !OCMoocFile.IsMust;
    }



    //显示章详细信息
    $scope.ChapterDetail = function (Chapter) {
        $scope.Chapter = Chapter;
        $('#div_Chapter').modal('show');
    }

    //显示节详细信息
    $scope.PartDetail = function (Chapter) {
        $scope.Chapter = Chapter;
        $('#div_Part').modal('show');
    }

    //章节保存
    $scope.Chapter_Upd = function () {
        var url = moocProviderUrl + "/Chapter_Upd";
        var param = { model: $scope.Chapter }
        $scope.baseService.post(url, param, function (data) {

        });
    }

    var keyCode = true; 
    //章节标题保存
    $scope.Chapter_Title_Upd = function (Chapter) {
        if (keyCode) {
            Chapter.active = false;
            $scope.Chapter = Chapter;
            $scope.Chapter_Upd();
        }
        else {
            keyCode = true;
        }
    }

    var Chapter_Enter_Add = function () //按回车键时候触发，鼠标在章上面新增章(如果该章下面有节，没有则还是增加节)
    {
        $scope.Chapter_Title_Upd($scope.ChapterEnter);
        keyCode = false; //回车时候触发了保存方法，blur事件的保存方法先不执行

        var isExists = false;
        if ($scope.ChapterEnter.ParentID == 0) {  //此时在章上面按的回车
            for (var i = 0; i < $scope.ChapterList.length; i++) {
                if ($scope.ChapterList[i].ParentID == $scope.ChapterEnter.ChapterID) {
                    isExists = true; //如果该章下面一个节都没，此时按回车是增加节，而不是章(理论上最后一个节不能被删除的)
                    break;
                }
            }
            if (isExists) {
                Chapter_Add($scope.ChapterEnter.ParentID); 
            }
            else {
                Chapter_Add($scope.ChapterEnter.ChapterID);
            }
        }
        else {
            Chapter_Add($scope.ChapterEnter.ParentID);  //此时在节上面按的回车
        }
    }

    var Chapter_Add = function (ParentID) {
        var ChapterModel = new Object();
        ChapterModel.OCID = $scope.OCID;
        ChapterModel.CourseID = $scope.OcMooc.CourseID;
        ChapterModel.ChapterID = -1;
        ChapterModel.Title = ParentID == 0 ? "请设置章名称..." : "请设置节名称...";
        ChapterModel.Brief = "";
        ChapterModel.PlanDay = 0;
        ChapterModel.MinHour = 0;
        ChapterModel.MoocStatus = 0;
        ChapterModel.ParentID = ParentID;

        var url = moocProviderUrl + "/Chapter_Add";
        var param = { model: ChapterModel }
        var promise = $scope.baseService.postPromise(url, param);
        promise.then(function (data) {  // 调用承诺API获取数据 .resolve  
            Chapter_Add_Back(data.d);
        }).then(function () {  // 调用承诺API获取数据 .resolve  

        });
    }

    var Chapter_Add_Back = function (ChapterModel) {
        if (ChapterModel != null) {
            ChapterModel.active = ChapterModel.ParentID == 0 ? false : true;
            $scope.ChapterList[$scope.ChapterList.length] = ChapterModel;
            if (ChapterModel.ParentID == 0) {
                Chapter_Add(ChapterModel.ChapterID)
            }
        }
    }

    $scope.Chapter_MouseOver = function (Chapter) //按回车键时候触发
    {
        $scope.ChapterEnter = Chapter;
        Chapter.ShowOperation = true;
    }

    $scope.Chapter_MouseLeave = function (Chapter) //按回车键时候触发
    {
        //$scope.ChapterEnter = Chapter;
        Chapter.ShowOperation = false;
    }


    //章节删除
    $scope.Chapter_Del = function (Chapter) {


        var chapterbox = $.layer({
            shade: [0],
            dialog: {
                msg: '是否确定删除该章节？',
                btns: 2,
                type: 4,
                btn: ['确认', '取消'],
                yes: function () {

                    var arr = $filter('MoocFilter')($scope.ChapterList, 'ParentID', '=', 0);
                    if (Chapter.ParentID == 0 && arr.length <= 1) { //如果删除的是章,并且是最后一个章
                        layer.msg("至少保留一个章");
                    }
                    else {
                        var url = moocProviderUrl + "/Chapter_Del";
                        var param = { model: Chapter }
                        $scope.baseService.post(url, param, function (data) {
                            for (var i = 0; i < $scope.ChapterList.length; i++) {
                                if ($scope.ChapterList[i].ChapterID == Chapter.ChapterID) {
                                    $scope.ChapterList.splice(i, 1);
                                }
                            }
                        });
                    }

                    layer.close(chapterbox);
                }, no: function () {
                    layer.close(chapterbox);
                }
            }
        });
    }

    //章节移动 type 1:上移 2:下移
    $scope.Chapter_Move = function (Chapter, type) {
        var ChapterTemp = new Object();
        var num = 0;
        if (type == 1) {
            var ChapterPre = null;
            for (var i = 0; i < $scope.ChapterList.length; i++) {
                if ($scope.ChapterList[i].ParentID == Chapter.ParentID) {
                    if ($scope.ChapterList[i].Orde < Chapter.Orde) {
                        if (ChapterPre == null || $scope.ChapterList[i].Orde > ChapterPre.Orde) {
                            ChapterPre = $scope.ChapterList[i];
                            num++;
                        }
                    }
                }
            }
            if (num > 0)     //存在它前面的章节
            {
                if (Chapter.ParentID == 0)    //章移动,章下面的节Orde也要改变
                {
                    var diffNum = Chapter.Orde - ChapterPre.Orde;
                    ChapterTemp.Orde = Chapter.Orde;
                    Chapter.Orde = ChapterPre.Orde;
                    ChapterPre.Orde = ChapterTemp.Orde;
                    for (var i = 0; i < $scope.ChapterList.length; i++) {
                        if ($scope.ChapterList[i].ParentID == Chapter.ChapterID) {
                            $scope.ChapterList[i].Orde = $scope.ChapterList[i].Orde - diffNum;
                        }
                        if ($scope.ChapterList[i].ParentID == ChapterPre.ChapterID) {
                            $scope.ChapterList[i].Orde = $scope.ChapterList[i].Orde + diffNum;
                        }
                    }
                }
                else {
                    ChapterTemp.Orde = Chapter.Orde;
                    Chapter.Orde = ChapterPre.Orde;
                    ChapterPre.Orde = ChapterTemp.Orde;
                }
            }
        }
        else if (type == 2) {
            var ChapterNext = null;
            for (var i = 0; i < $scope.ChapterList.length; i++) {
                if ($scope.ChapterList[i].ParentID == Chapter.ParentID) {
                    if ($scope.ChapterList[i].Orde > Chapter.Orde) {
                        if (ChapterNext == null || $scope.ChapterList[i].Orde < ChapterNext.Orde) {
                            ChapterNext = $scope.ChapterList[i];
                            num++;
                        }
                    }
                }
            }
            if (num > 0)     //存在它后面的章节
            {
                if (Chapter.ParentID == 0)    //章移动,章下面的节Orde也要改变
                {
                    var diffNum = ChapterNext.Orde - Chapter.Orde;
                    ChapterTemp.Orde = Chapter.Orde;
                    Chapter.Orde = ChapterNext.Orde;
                    ChapterNext.Orde = ChapterTemp.Orde;
                    for (var i = 0; i < $scope.ChapterList.length; i++) {
                        if ($scope.ChapterList[i].ParentID == Chapter.ChapterID) {
                            $scope.ChapterList[i].Orde = $scope.ChapterList[i].Orde + diffNum;
                        }
                        if ($scope.ChapterList[i].ParentID == ChapterNext.ChapterID) {
                            $scope.ChapterList[i].Orde = $scope.ChapterList[i].Orde - diffNum;
                        }
                    }
                }
                else {
                    ChapterTemp.Orde = Chapter.Orde;
                    Chapter.Orde = ChapterNext.Orde;
                    ChapterNext.Orde = ChapterTemp.Orde
                }
            }

        }
    }

    //切换课程目-录课程资料
    $scope.ChangeType = function (type) {
        $scope.type = type;
        if (type == 2 && $scope.OCMoocFileList.length == 0) //加载课程资料列表
        {
            OCMoocFile_List();
        }
        if (type == 3) //加载课程资料列表
        {
            OCMoocLiveTest_List();
        }
    }

    //加载文件列表
    var OCMoocFile_List = function () {
        var url = moocProviderUrl + "/OCMoocFile_List";
        var param = { OCID: $scope.OCID, ChapterID: -1 }
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCMoocFileList = data.d;
                for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                    $scope.OCMoocFileList[i].TimelimitMin = round($scope.OCMoocFileList[i].Timelimit / 60, 2);
                }
            }
        });
    }

    var round = function (v, e) {
        var t = 1;
        for (; e > 0; t *= 10, e--);
        for (; e < 0; t /= 10, e++);
        return Math.round(v * t) / t;

    }

    //文件删除
    $scope.OCMoocFile_Del = function (OCMoocFile) {

        var box = $.layer({
            shade: [0],
            dialog: {
                msg: '确定删除文件？',
                btns: 2,
                type: 4,
                btn: ['确认', '取消'],
                yes: function () {
                    $scope.OCMoocFile_Del_Confirm(OCMoocFile);
                    layer.close(box);
                }, no: function () {
                    layer.close(box);
                }
            }
        });
    }

    //文件删除
    $scope.OCMoocFile_Del_Confirm = function (OCMoocFile)
    {
        OCMoocFile.UploadTime = $filter('dateFormatAll')(OCMoocFile.UploadTime);
        var url = moocProviderUrl + "/OCMoocFile_Del";
        var param = {
            model: OCMoocFile
        }
        $scope.baseService.post(url, param, function (data) {
            for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                if ($scope.OCMoocFileList[i].FileID == OCMoocFile.FileID) {
                    $scope.OCMoocFileList.splice(i, 1);
                }
            }
        });
    }


    //批量删除文件
    $scope.OCMoocFile_Batch_Del = function (OCMoocFile) {

        var count = 0;
        for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
            if ($scope.OCMoocFileList[i].checked) {
                count++;
            }
        }

        if (count == 0) {
            layer.msg("请至少选择一个文件！");
        }
        else {
            var box = $.layer({
                shade: [0],
                dialog: {
                    msg: '确定删除这' + count + '个文件？',
                    btns: 2,
                    type: 4,
                    btn: ['确认', '取消'],
                    yes: function () {
                        for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                            if ($scope.OCMoocFileList[i].checked) {
                                $scope.OCMoocFile_Del_Confirm($scope.OCMoocFileList[i]);
                            }
                        }
                        layer.close(box);
                    }, no: function () {
                        layer.close(box);
                    }
                }
            });
        }
    }

    //文件全选
    $scope.FileSelect_TT = function () {
        if ($scope.OCMoocFileList.length > 0) {
            for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                $scope.OCMoocFileList[i].checked = !$scope.TT;
            }
        }
    }

    //批量修改文件对应章节
    $scope.OCMoocFile_Batch_Edit = function () {
        for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
            if ($scope.OCMoocFileList[i].checked) {
                $scope.OCMoocFileList[i].ChapterID = $scope.selectedChapterID;
            }
        }
    }


    //获得章和期末考试列表
    var OCMoocLiveTest_List = function (OCMoocLiveTest) {
        var url = moocProviderUrl + "/OCMoocLiveTest_List";
        var param = { ChapterID: -1, OCID: $scope.OCID }
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCMoocLiveTestList = data.d;
            }
        });
    }

    //获得章和期末考试列表 
    $scope.OCMoocLiveTest_Del = function (OCMoocLiveTest) {
        var livebox = $.layer({
            shade: [0],
            dialog: {
                msg: '是否确定删除该测试,学习答题记录将被清除？',
                btns: 2,
                type: 4,
                btn: ['确认', '取消'],
                yes: function () {
                    var url = moocProviderUrl + "/Test_Del";
                    var param = { TestID: OCMoocLiveTest.TestID }
                    $scope.baseService.post(url, param, function (data) {
                        if (data.d) //测试删除成功
                        {
                            $scope.OCMoocLive_Del(OCMoocLiveTest,2);
                        }
                    });
                    layer.close(livebox);
                }, no: function () {
                    layer.close(livebox);
                }
            }
        });
    }


    //作业设为历史 
    $scope.Test_IsHistroy_Upd = function (OCMoocLiveTest) {
        var livebox = $.layer({
            shade: [0],
            dialog: {
                msg: '是否确定设为历史？',
                btns: 2,
                type: 4,
                btn: ['确认', '取消'],
                yes: function () {
                    var url = moocProviderUrl + "/Test_IsHistroy_Upd";
                    var param = { TestID: OCMoocLiveTest.TestID }
                    $scope.baseService.post(url, param, function (data) {
                        $scope.OCMoocLive_Del(OCMoocLiveTest, 2);
                    });
                    layer.close(livebox);
                }, no: function () {
                    layer.close(livebox);
                }
            }
        });
    }

    //编辑作业 
    $scope.Test_Upd = function (OCMoocLiveTest) {
        window.open("../../CourseLive/Test/HomeWorkAdd?Type=MOOC" + "&TestID=" + OCMoocLiveTest.TestID + "&Title=" + OCMoocLiveTest.Title + "&ChapterID=" + OCMoocLiveTest.ChapterID + "&OCID=" + OCMoocLiveTest.OCID);
    }

    //删除互动
    $scope.OCMoocLive_Del = function (OCMoocLive,type) //type 1删除的是论坛互动 2删除TEST互动
    {
        var url = moocProviderUrl + "/OCMoocLive_Del";
        var param = { model: OCMoocLive }
        $scope.baseService.post(url, param, function (data) {
            if (type == 1)
            {
                for (var i = 0; i < $scope.OCMoocLiveDiscussList.length; i++) {
                    if ($scope.OCMoocLiveDiscussList[i].MoocLiveID == OCMoocLive.MoocLiveID)
                    {
                        $scope.OCMoocLiveDiscussList.splice(i, 1);
                    }
                }
            }

            if (type == 2)
            {
                for (var i = 0; i < $scope.OCMoocLiveTestList.length; i++) {
                    if ($scope.OCMoocLiveTestList[i].MoocLiveID == OCMoocLive.MoocLiveID) {
                        $scope.OCMoocLiveTestList.splice(i, 1);
                    }
                }   
                if (OCMoocLive.ChapterID == -1) {
                    $scope.OcMooc.TestID = -1;
                }
                else {
                    for (var i = 0; i < $scope.ChapterList.length; i++) {
                        if (OCMoocLive.ChapterID == $scope.ChapterList[i].ChapterID)
                        {
                            $scope.ChapterList[i].TestID = -1;
                        }
                    }
                }
            }
        });
    }
    //Step1 End

    //Step2 Start

    //教学团队列表
    var OCTeamList = function () {
        var url = moocProviderUrl + "/OCTeam_List";
        var param = { OCID: $scope.OCID }
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCTeamList = data.d;
                for (var i = 0; i < $scope.OCTeamList.length; i++) {
                    $scope.OCTeamList[i].checked = false;
                }
            }
        });
    }


    //获取教学团队列表

    $scope.OCTeamSelected = function (model) {
        model.checked = !model.checked;
        GetUserNames();
    }

    $scope.UserNames = "";
    $scope.UserIDs = "";
    var GetUserNames = function () {
        var UserNames = "";
        var UserIDs = "";
        for (var i = 0; i < $scope.OCTeamList.length; i++) {
            if ($scope.OCTeamList[i].checked) {
                UserNames = UserNames + $scope.OCTeamList[i].UserName + ",";
                UserIDs = UserIDs + $scope.OCTeamList[i].UserID + ",";
            }
        }
        UserNames = UserNames.substr(0, UserNames.length - 1);
        UserIDs = UserIDs.substr(0, UserIDs.length - 1);
        $scope.UserNames = UserNames;
        $scope.UserIDs = UserIDs;
    }

    //创建见面课
    $scope.OCMoocOffline_Add = function () {
        var OCMoocOfflineModel = new Object();
        OCMoocOfflineModel.MoocOfflineID = -1;
        OCMoocOfflineModel.OCID = $scope.OCID;
        OCMoocOfflineModel.Title = "";
        OCMoocOfflineModel.TaskType = "";
        OCMoocOfflineModel.Hours = 0;
        OCMoocOfflineModel.UserName = "";
        OCMoocOfflineModel.ChapterID = -1;
        OCMoocOfflineModel.Purpose = "";
        OCMoocOfflineModel.Points = "";
        OCMoocOfflineModel.Grouping = "";
        OCMoocOfflineModel.Score = "";
        OCMoocOfflineModel.Resource = "";
        OCMoocOfflineModel.Assess = "";
        $scope.OCMoocOffline = OCMoocOfflineModel;
        $scope.Data = 1;


        document.getElementById("frmoEditor1").contentWindow.setHTML("");

        $scope.UserNames = "";
        $scope.UserIDs = "";
        for (var i = 0; i < $scope.OCTeamList.length; i++) {
            $scope.OCTeamList[i].checked = false;
        }
        $('#div_OCMoocOffline').modal('show');
    }

    //删除见面课
    $scope.OCMoocOffline_Del = function (OCMoocOffline) {
        var livebox = $.layer({
            shade: [0],
            dialog: {
                msg: '是否确定删除该见面课？',
                btns: 2,
                type: 4,
                btn: ['确认', '取消'],
                yes: function () {
                    var url = moocProviderUrl + "/OCMoocOffline_Del";
                    var param = { model: OCMoocOffline }
                    $scope.baseService.post(url, param, function (data) {
                        for (var i = 0; i < $scope.OCMoocOfflineList.length; i++) {
                            if ($scope.OCMoocOfflineList[i].MoocOfflineID == OCMoocOffline.MoocOfflineID) {
                                $scope.OCMoocOfflineList.splice(i, 1);
                            }
                        }
                    });
                    layer.close(livebox);
                }, no: function () {
                    layer.close(livebox);
                }
            }
        });
    }

    //编辑面授课
    $scope.OCMoocOffline_Edit = function (OCMoocOffline) {
        $scope.SelectShow = false;
        $scope.OCMoocOffline = OCMoocOffline;
        var TeacherIDsArr = OCMoocOffline.TeacherUserIDs.split(',');
        for (var i = 0; i < $scope.OCTeamList.length; i++) {
            $scope.OCTeamList[i].checked = false;
            if (TeacherIDsArr != null && TeacherIDsArr.length > 0) {
                for (var j = 0; j < TeacherIDsArr.length; j++) {
                    if ($scope.OCTeamList[i].UserID == TeacherIDsArr[j]) {
                        $scope.OCTeamList[i].checked = true;
                    }
                }
            }
        }
        GetUserNames();
        $('#div_OCMoocOffline').modal('show');
        $scope.Data = 1;
        document.getElementById("frmoEditor1").contentWindow.setHTML($scope.OCMoocOffline.Purpose);
    }

    //更新面授课
    $scope.OCMoocOffline_Upd = function () {
        GetUserNames();
        var arr = new Array();
        if ($scope.UserNames != "") arr[arr.length] = $scope.UserNames;
        if ($scope.OCMoocOffline.Experts != "") arr[arr.length] = $scope.OCMoocOffline.Experts;
        $scope.OCMoocOffline.TeacherNames = arr.join(",");
        $scope.OCMoocOffline.TeacherUserIDs = $scope.UserIDs;
        var url = moocProviderUrl + "/OCMoocOffline_Edit";
        var param = { model: $scope.OCMoocOffline }
        $scope.baseService.post(url, param, function (data) {
            if (data != null) {
                for (var i = 0; i < $scope.ChapterList.length; i++) {
                    if ($scope.ChapterList[i].ChapterID == $scope.OCMoocOffline.ChapterID) {
                        $scope.OCMoocOffline.ChapterName = $scope.ChapterList[i].Title;
                    }
                }
                if ($scope.OCMoocOffline.MoocOfflineID == -1) { //新增面授
                    $scope.OCMoocOffline.MoocOfflineID = data.d.MoocOfflineID;
                    $scope.OCMoocOfflineList[$scope.OCMoocOfflineList.length] = $scope.OCMoocOffline;
                }
            }
        });
        $('#div_OCMoocOffline').modal('hide');

        $scope.OCMoocOffline_Bind($scope.Data);
    }


    //面授课编辑器内容绑定
    $scope.OCMoocOffline_Bind = function (DataType) {
        var html = document.getElementById("frmoEditor1").contentWindow.getHTML();
        var html2 = "";
        if ($scope.Data == 1) {
            $scope.OCMoocOffline.Purpose = html;
        }
        else if ($scope.Data == 2) {
            $scope.OCMoocOffline.Points = html;
        }
        else if ($scope.Data == 3) {
            $scope.OCMoocOffline.Grouping = html;
        }
        else if ($scope.Data == 4) {
            $scope.OCMoocOffline.Score = html;
        }
        else if ($scope.Data == 5) {
            $scope.OCMoocOffline.Resource = html;
        }
        else if ($scope.Data == 6) {
            $scope.OCMoocOffline.Assess = html;
        }
        $scope.Data = DataType;
        if (DataType == 1) {
            html2 = $scope.OCMoocOffline.Purpose;
        }
        else if (DataType == 2) {
            html2 = $scope.OCMoocOffline.Points;
        }
        else if (DataType == 3) {
            html2 = $scope.OCMoocOffline.Grouping;
        }
        else if (DataType == 4) {
            html2 = $scope.OCMoocOffline.Score;
        }
        else if (DataType == 5) {
            html2 = $scope.OCMoocOffline.Resource;
        }
        else if (DataType == 6) {
            html2 = $scope.OCMoocOffline.Assess;
        }
        if (html2 == null) {
            document.getElementById("frmoEditor1").contentWindow.setHTML("");
        }
        else {
            document.getElementById("frmoEditor1").contentWindow.setHTML(html2);
        }
    }

    //Step2 End



    //显示教学计划
    $scope.TeachingPlan = function () {
        $('#div_TeachingPlan').modal('show');
        DataTotal();
    }

    //MOOC发布
    $scope.MoocIssue = function () {
        $("#div_Warning").modal('show');
    }

    //MOOC发布
    $scope.MoocIssueConfirm = function () {
        var url = moocProviderUrl + "/OCMooc_Publish";
        var param = { OCID: $scope.OCID, ChapterID: -1 }
        $scope.baseService.post(url, param, function (data) {
            if (data != null) {
                $scope.OcMooc.PublishStatus = data.d;
            }
        });
        $("#div_Warning").modal('hide');
    }

    //=======================================↑方法 ↓过滤器、指令
    //过滤出当前章的文件列表
    $scope.fileFiter = function (e) {
        if ($scope.Chapter == null) {
            return;
        }
        return e.ChapterID == $scope.Chapter.ChapterID;
    }

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




    //保存当前章节下的资料
    $scope.ChapterFile_Upd = function () {
        if ($scope.OCMoocFileList.length > 0) {
            for (var i = 0; i < $scope.OCMoocFileList.length; i++) {
                if ($scope.OCMoocFileList[i].ChapterID == $scope.Chapter.ChapterID) {

                    if (parseInt($scope.OCMoocFileList[i].TimelimitMin) > 0) {
                        $scope.OCMoocFileList[i].Timelimit = parseInt($scope.OCMoocFileList[i].TimelimitMin * 60);
                    }
                    else {
                        $scope.OCMoocFileList[i].Timelimit = 0;
                    }

                    $scope.OCMoocFileList[i].UploadTime = $filter('dateFormatAll')($scope.OCMoocFileList[i].UploadTime)
                    var url = moocProviderUrl + "/OCMoocFile_Edit";
                    var param = { model: $scope.OCMoocFileList[i],OCID: $scope.OCID };
                    $scope.baseService.post(url, param, function (data) {

                    });
                }
            }

            $scope.Chapter.FileNum = $filter('MoocFilter')($scope.OCMoocFileList, 'ChapterID', '=', $scope.Chapter.ChapterID).length;


        }
    }

    //上传新资料
    $scope.UploadFiles = function (flag) {  //flag==true 批量上传
        $scope.flag = flag;
        if (flag == true) {
            $scope.Chapter = null;
        }
        $('#ChapterFile').modal('hide');
        $scope.ShowBox();
    }

    var box;
    $scope.ShowBox = function () {
        box = $.layer({
            type: 1,
            title: ["文件上传", true],
            shift: 'right-bottom',
            maxmin: true,
            area: ['800px', 'auto'],
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

    //单个上传完成
    $scope.$on("onSuccessItem", function (event, fileItem, response, status, headers) {
        if (response[0] != null) {
            FileToMoocFile(response[0]);
        }
    });

    //所有文件上传
    $scope.$on("onCompleteAll", function (event) {
        //layer.msg('上传完成!', 1, 1);
        layer.close(box);
        if ($scope.flag == false) {
            $('#ChapterFile').modal('show');
        }

    });

    //对象转换
    var FileToMoocFile = function (file) {
        var url = moocProviderUrl + "/FileToMoocFile";
        var ChapterID = $scope.Chapter == null ? 0 : $scope.Chapter.ChapterID;
        var param = { model: file, ChapterID: ChapterID }
        $scope.baseService.post(url, param, function (data) {

            if (data.d != null) {
                $scope.OCMoocFileList[$scope.OCMoocFileList.length] = data.d;
            }
        });
    }

    $scope.flag = false; //false节中上传资料 true批量上传资料，不对应到节
    //从资料库添加
    $scope.MyFiles = function (flag) {
        $scope.flag = flag;
        if (flag==true)
        {
            $scope.Chapter = null;
        }
        $('#ChapterFile').modal('hide');
        $('#MyFiles').modal('show');
        $scope.$broadcast('to-child', "");
    }

    $scope.$on('to-parent', function (event, data) { //父级接收子级controller数据    

        if ($scope.flag == false) {
            $('#ChapterFile').modal('show');
        }
        if (data != null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var isExists = false;   //是否存在 
                for (var j = 0; j < $scope.OCMoocFileList.length; j++) {
                    if ($scope.OCMoocFileList[j].FileID == data[i].FileID) {
                        isExists = true;
                    }
                }
                if (!isExists) {
                    var OCMoocFile = data[i];                
                    OCMoocFile.ChapterID = $scope.Chapter == null ? 0 : $scope.Chapter.ChapterID;
                    OCMoocFile.MoocFileID = -1;
                    OCMoocFile.IsMust = true;
                    $scope.OCMoocFileList[$scope.OCMoocFileList.length] = OCMoocFile;
                }
            }
        }
        $('#MyFiles').modal('hide');
    });



    var init = function () {
        OCMoocInfo_Get();
    }
    init();

}]);



//从我的资料库选择
moocModule.controller('MyResourceController', ['$scope', '$state', 'moocProviderUrl', function ($scope, $state, moocProviderUrl) {

    $scope.T = false;
    $scope.OCFileList == [];  //课程资料文件列表
    $scope.KeyWords = "";
    $scope.type = 1; //  1显示课程资料文件列表 2显示个人资料文件列表
    $scope.SelectedFileList = [];
    $scope.ShowPage = false;

    PageIndex = 1;
    PageSize = 5;
    PageSum = 0;
    count = 0;   //判断是否是首次加载

    //搜索的时候,页码变成1
    $scope.OCFile_List_New = function () {
        PageIndex = 1;
        $scope.OCFile_List();
    }

    //文件列表
    $scope.OCFile_List = function () {
        var url = "";
        if ($scope.FCID > 0) {
            url = moocProviderUrl + "/FCFile_Select";
        }
        else {
            url = moocProviderUrl + "/MOOCFile_Select";
        }
        var param = {
            Searchkey: $scope.KeyWords, OCID: $scope.OCID, FCID: $scope.FCID,
            Type: $scope.type, PageSize: PageSize, PageIndex: PageIndex
        }
        var fileList = $scope.baseService.postPromise(url, param);


        $scope.baseService.runPromises({
            fileList: fileList
        }, function (data) {
            $scope.ShowPage = false;
            if (data.fileList.d != null) {
                $scope.OCFileList = data.fileList.d;
                if ($scope.OCFileList.length > 0) {
                    if ($scope.OCFileList[0].RowsCount > PageSize) {
                        $scope.ShowPage = true;
                    }
                    var PageSumNew = Math.ceil($scope.OCFileList[0].RowsCount / PageSize);
                    if (PageSumNew != PageSum || count == 0)  //分页控件只加载一次
                    {
                        PageSum = PageSumNew;
                        FilePage(PageSum);
                    }
                }
            }
        });
    }


    //分页
    var FilePage = function (PageSum) {
        laypage({
            cont: $('#page_OCFile'), //容器。值支持id名、原生dom对象，jquery对象, 'page'/document.getElementById('page')/$('#page')
            pages: PageSum, //总页数
            skip: true, //是否开启跳页
            skin: '#374760', //选中的颜色
            groups: 5,//连续显示分页数
            first: false, //若不显示，设置false即可  
            last: false, //若不显示，设置false即可
            jump: function (e) { //触发分页后的回调
                PageIndex = e.curr;
                $scope.T = false;
                if (count > 0) {
                    $scope.OCFile_List();
                }
                count++;
                $scope.SelectedFileList = [];
            }
        });
    }



    $scope.toParent = function () {
        $scope.$emit('to-parent', $scope.SelectedFileList);
    }

    $scope.$on('to-child', function (event, data) {
        $scope.SelectedFileList = [];
        $scope.OCFile_List();
    });

    $scope.Files_Search = function (type)   //type:1 课程资料
    {
        if ($scope.type != type) {
            $scope.type = type;
            count = 0; //分页控件重新加载
            PageIndex = 1;
            $scope.T = false;
            $scope.OCFile_List();
            $scope.SelectedFileList = [];

        }
    }

    //批量勾选文件
    $scope.FileSelect_All = function () {
        if ($scope.OCFileList.length > 0) {
            for (var i = 0; i < $scope.OCFileList.length; i++) {
                $scope.OCFileList[i].checked = !$scope.T;
                $scope.File_Check($scope.OCFileList[i]);
            }
        }
    }

    //选择文件
    $scope.FileSelect_Single = function (OCFile) {
        OCFile.checked = OCFile.checked == true ? false : true;
        $scope.File_Check(OCFile);

    }


    //添加或者删除文件
    $scope.File_Check = function (OCFile) {
        if (OCFile.checked) {
            var isExists = false;   //是否存在
            for (var j = 0; j < $scope.SelectedFileList.length; j++) {
                if ($scope.SelectedFileList[j].FileID == OCFile.FileID) {
                    isExists = true;
                }
            }
            if (!isExists) {
                $scope.SelectedFileList[$scope.SelectedFileList.length] = OCFile;
            }
        }
        else {
            for (var i = 0; i < $scope.SelectedFileList.length; i++) {
                if ($scope.SelectedFileList[i].FileID == OCFile.FileID) {
                    $scope.SelectedFileList.splice(i, 1);
                }
            }
        }
    }

}]);


moocModule.filter('MoocFilter', function () {
    return function (arr, type, ope, num) {
        if ($G2S.isEmpty(arr)) {
            return;
        }
        return arr.filter(function (item) {
            if (type == 'ParentID') {
                if (ope == '>') {
                    return item.ParentID > num;
                }
                if (ope == '=') {
                    return item.ParentID == num;
                }
                if (ope == '<') {
                    return item.ParentID < num;
                }
            }
            if (type == 'ChapterID') {
                if (ope == '>') {
                    return item.ChapterID > num;
                }
                if (ope == '=') {
                    return item.ChapterID == num;
                }
                if (ope == '<') {
                    return item.ChapterID < num;
                }
            }
        });
    }
});

moocModule.filter('index', function () {
    return function (array) {
        return (array || []).map(function (item, index) {
            item.order = index + 1;
            return item;

        });
    };
});


moocModule.directive('onChapterGet', function ($timeout) {
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

moocModule.directive('onOfflineGet', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngOCMoocOfflineGet');
                });
            }
        }
    };
});

moocModule.directive('focusMe', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: { trigger: '@focusMe' },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value) {
                    $timeout(function () {
                        element[0].focus();
                        if (element[0].value == "请设置章名称..." || element[0].value == "请设置节名称...") {
                            element[0].value = "";
                        }
                    });
                }
            });
        }
    };
}]);

//moocModule.directive('contenteditable', function () {
//    return function (scope, element) {
//        element[0].focus();
//    };
//});

moocModule.directive('setFocus', function () {
    return function (scope, element) {
        element[0].focus();
    };
});


