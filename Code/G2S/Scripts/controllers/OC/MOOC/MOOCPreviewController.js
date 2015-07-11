'use strict';
var MOOCPreviewModule = angular.module('app.moocpreview', []);
MOOCPreviewModule.controller('MOOCPreviewController', ['$scope', '$state', 'MOOCPreviewProviderUrl', function ($scope, $state, MOOCPreviewProviderUrl) {
    $scope.Videoprogress = "0";
    $scope.OCID = $G2S.request("OCID");
    $scope.PageTime = 99999999;
    $scope.div3name = "";
    $scope.setfiledata;
    var Promptlayer;
    //课程主页跳转
    $scope.kczy = function () {
        window.open("../../Site/Preview?currentoc=" + $scope.OCID);

    }
    //课程资料跳转
    $scope.kczl = function () {
        window.open("../../Site/Preview?currentoc=" + $scope.OCID + "&type=" + 13);
    }
    //教学计划
    $scope.jxjh = function () {
        window.open("../../Site/Preview?currentoc=" + $scope.OCID + "&type=" + 12);
    }


    //页面跳转
    var setPageTime = 0;
    var t;
    var flag = 0;
    var  GetPageTime=function() {
        //t = setTimeout("GetPageTime()", 1000);
        t = setTimeout(function () {
            $scope.$apply(GetPageTime());
        }, 1000);

        var strtime = $scope.PageTime * 60;
        if (strtime == setPageTime) {
            GetXuexiPrompt();
            clearTimeout(t);
            setPageTime = 0;
        } else {
            // setPageTime = setPageTime + 20;
           setPageTime++;
        }

    }

    var fCount = 0;
    function GetXuexiPrompt() {
        fCount++;
        if (document.getElementById("div_play_wrapper")) {
            if (jwplayer().getState() == "PLAYING") {
                jwplayer().pause();
            }
        } else {
            ClearPieTime();
            $("#ifFile").hide();
        }
        var strHtml = "<div style='width:350px; text-align:center;'>";
        strHtml += "<div style='float:left;width:100px;'><img src='../../Images/ico_smile.png' width='96' height='96' style='margin-top: 10px; margin-left: 20px;'></div>";
        strHtml += "<div style='width:250px; text-align:center;float:left;'>"
        strHtml += "<div style='margin-top:10px;'>已保持在线学习<span style='color:#F36911;font-size:28px;'>" + $scope.PageTime * fCount + "</span>分钟</div></br>";
        strHtml += "<div style='margin-top:10px;'>让我们再接再厉吧</div>";
       // strHtml += "<div style='margin-top:10px;'><input style='float:right;margin-right:20px;' type='button' onclick='GetAgert()' value='继续学习' class=\"GSButtonStand\" onmouseover=\"this.className='GSButtonHover'\" onmouseout=\"this.className='GSButtonStand'\"/></div>";
        strHtml += "</div>";
        strHtml += "</div>";

        Promptlayer = $.layer({
            type: 1,
            closeBtn: [0, true],
            title: "<span style='color:#F36911;'>在线提示</span>", //不显示默认标题栏
            shade: [0.5, '#000'], //显示遮罩
            area: ['350px', '150px'],
            bgcolor: '#fff',
            zIndex: 9999,
            border: [5, 0.5, '#666'],
            page: { html: strHtml },
            close: function (index) {
                if (document.getElementById("div_play_wrapper")) {
                    if (jwplayer().getState() == "PAUSED") {
                        jwplayer().play();
                    }
                } else {
                    $("#ifFile").show();
                    //debugger;
                    if ($scope.div3name == "" && $scope.setfiledata != null) {
                        if ($scope.setfiledata.IsTransfer == 1) {
                            int_id = setInterval(function () {
                                $scope.$apply(saveTime($scope.setfiledata));
                            }, 1000);
                        }
                    }

                    //play($scope.setfiledata);
                }
                GetPageTime();

            }
        });
    }

    $scope.GetAgert = function () {
        layer.close(Promptlayer);
        if (document.getElementById("div_play")) {
            if (jwplayer().getState() == "PAUSED") {
                jwplayer().play();
            }
        } else {
            $("#ifFile").show();
        }
        GetPageTime();
    }


     

    //获取章节列表
    var ChapterStudy_List = function () {
        var ocid = $scope.OCID;
        var url = MOOCPreviewProviderUrl + "/ChapterStudy_List";
        var param = { OCID: ocid };
        $scope.baseService.post(url, param, function (data) {
            $scope.chapterStudy_list = data.d;
        });
        $scope.$on('ngMoocChapter', function (ngRepeatFinishedEvent) {
            $('.wrap_item').hover(function () {
                $(this).find('.progress_tip').toggle();
                
                $(this).find('.column_btn').show();
                if (!$(this).parent().hasClass('active')) {
                    $(this).css('background', '#f2f2f2');
                } else {
                    $(this).css('background', '');
                }
            }, function () {
                $(this).find('.column_btn').hide();
                $(this).css('background', '');
            })
            var flag = 0;//标记是否有未完成的章节
            for (var i = 0; i < $scope.chapterStudy_list.length; i++) {
                if (parseInt($scope.chapterStudy_list[0].PopTime) > 0) {
                    $scope.PageTime = $scope.chapterStudy_list[0].PopTime;
                }
                for (var k = 0; k < $scope.chapterStudy_list[i].Children.length; k++) {
                    if ($scope.chapterStudy_list[i].Children[k].IsFinish == 0 && $scope.chapterStudy_list[i].Children[k].ChapterID!=-1) {
                        $scope.chapterStudy_list[i].Children[k].IsActive = true;
                        flag = 1;
                        OCMoocFile_List($scope.chapterStudy_list[i].Children[k].ChapterID);
                        $scope.ChapterLIClick($scope.chapterStudy_list[i].ChapterID);
                        $scope.ChapterzhangName ="第"+(i+1)+"章";
                        $scope.ChapterjieName = $scope.chapterStudy_list[i].Children[k].Title;
                        return;
                    }
                }
            }
            if (flag == 0) {
                for (var i = 0; i < $scope.chapterStudy_list.length; i++) {
                    for (var k = 0; k < $scope.chapterStudy_list[i].Children.length; k++) {
                        if ($scope.chapterStudy_list[i].Children[k].IsFinish == 1) {
                            $scope.chapterStudy_list[i].Children[k].IsActive = true;
                            flag = 1;
                            OCMoocFile_List($scope.chapterStudy_list[i].Children[k].ChapterID);
                            $scope.ChapterLIClick($scope.chapterStudy_list[i].ChapterID);
                            $scope.ChapterzhangName = "第" + (i + 1) + "章";
                            $scope.ChapterjieName = $scope.chapterStudy_list[i].Children[k].Title;
                            return;
                        }

                    }
                }
            }
        });
    }
   
    //获取章节下文件列表
    var OCMoocFile_List = function (chapterid) {
        ForumTopic_ChapterID_List(chapterid); //论坛
        var ocid = $scope.OCID;
       var url = MOOCPreviewProviderUrl + "/OCMoocFileStudy_List";
       var param = { ChapterID: chapterid, OCID: ocid,FileType:-1 };
       $scope.baseService.post(url, param, function (data) {
           if (data.d.length > 0) {
               $scope.moocfile_list = data.d;
           } else {
               $("#div_play_wrapper").html("");
           }
          
          
       });

       $scope.$on('ngMoocChapterFile', function (ngRepeatFinishedEvent) {
           var flag = 0;
           for (var i = 0; i < $scope.moocfile_list.length; i++) {
               if ($scope.moocfile_list[i].FinishRate < 100) {
                   $scope.moocfile_list[i].IsActive = true;
                   play($scope.moocfile_list[i]);
                   OCMoocVideoInsert_List($scope.moocfile_list[i].ChapterID, $scope.moocfile_list[i].FileID);
                   flag = 1;
                   break;
               }
           }
           if (flag == 0) {
               $scope.moocfile_list[0].IsActive = true;
               play($scope.moocfile_list[0]);
               OCMoocVideoInsert_List($scope.moocfile_list[0].ChapterID, $scope.moocfile_list[0].FileID);
               flag = 1;
           }
       });
   }
    //章节点击事件
    $scope.ChapterClick = function (thi) {
        ClearPieTime();
       for (var i = 0; i < $scope.chapterStudy_list.length; i++) {
           for (var k = 0; k < $scope.chapterStudy_list[i].Children.length; k++) {
               if ($scope.chapterStudy_list[i].Children[k].IsActive) {
                   $scope.chapterStudy_list[i].Children[k].IsActive = false;
               }
               if (thi.chapterStudy1.ChapterID == $scope.chapterStudy_list[i].Children[k].ChapterID) {
                   $scope.ChapterzhangName = "第" + (i + 1) + "章";
                   $scope.ChapterjieName = thi.chapterStudy1.Title;
               }
           }
       }
       thi.chapterStudy1.IsActive = true;
       OCMoocFile_List(thi.chapterStudy1.ChapterID);
     
       
   }

    //章节测试事件
    $scope.ChapterTestClick = function (thi) {
        //debugger;
        if (thi.IsAllowStudy == 1) {
            if (thi.BuildMode == 3) {
                window.open("../../CourseLive/Test/DoCardExercise?TestID=" + thi.TestID);
            } else {
                window.open("../../CourseLive/Test/DoHomeWork?TestID=" + thi.TestID);
            }
            $("#ifFile2").toggle();
            layer.confirm("测试是否完成?", function () {
                layer.closeAll();
                refreshChapterStudy_List();
            }, function () {
                $("#ifFile2").toggle();
            });
        } else if (thi.IsAllowStudy == 0) {
            alert("请先学习完前面的章节");
        }
        else if (thi.IsAllowStudy == 2) {
            alert('你的班级尚未开始');
        } else if (thi.IsAllowStudy == 3) {
            alert('请先学习完前面的章节');
        } else if (thi.IsAllowStudy == 4) {
            alert('请先完成上一章的测试');
        } else if (thi.IsAllowStudy == 5) {
            alert('请先学习完该章节');
        } else if (thi.IsAllowStudy == 6) {
            alert('请先完成所有章节及测试');
        }
           
      //  window.open("../../CourseLive/Test/DoHomeWork?TestID=" + thi.TestID);
      
   }

    //获取网站和负责人
   var OC_Get = function () {
       var ocid = $scope.OCID;
       var url = MOOCPreviewProviderUrl + "/OC_Get";
       var param = { OCID: ocid };
       $scope.baseService.post(url, param, function (data) {
           if (data.d != null) {
               $scope.Name = data.d[0].Name;
               $scope.ChargeUserName = data.d[0].ChargeUserName;
           }
       });
   }

    //文件点击事件
   $scope.ChapterFileClick = function (thi) {
       for (var i = 0; i < $scope.moocfile_list.length; i++) {
           if ($scope.moocfile_list[i].MoocFileID == thi.moocfile.MoocFileID) {
               $scope.moocfile_list[i].IsActive = true;
               OCMoocVideoInsert_List($scope.moocfile_list[i].ChapterID, $scope.moocfile_list[i].FileID);
               ClearPieTime();
               play($scope.moocfile_list[i]);
               //获取知识卡
              
           }
           if ($scope.moocfile_list[i].IsActive) {
               $scope.moocfile_list[i].IsActive = false;
           }
       }
       thi.moocfile.IsActive = true;
      
   }

    //获取知识卡
   var OCMoocVideoInsert_List = function (chapterid, fileid) {
       var ocid = $scope.OCID;
       var url = MOOCPreviewProviderUrl + "/OCMoocVideoInsert_List";
       var param = { ChapterID: chapterid, FileID: fileid };
       $scope.baseService.post(url, param, function (data) {
          // debugger;
           $scope.moocvideoinsert_list = data.d;
           $scope.moocvideoinsertlength = data.d.length;
       });
   }



    //章+号点击事件
   $scope.ChapterLIClick = function (id) {
       var thi = "#sp_" + id;
       if (!$(thi).hasClass('click')) {
           var len = $(thi).parents('.rate_box').next().length;
           if (len > 0) {
               $(thi).addClass('click');
               $(thi).text('-');
               $(thi).parents('.rate_box').next().slideDown();
           }
       } else {
           $(thi).removeClass('click');
           $(thi).text('+');
           $(thi).parents('.rate_box').next().slideUp();
       }
   }

    //论坛跳转
   $scope.forumClick = function (id) {
       window.open("../../CourseLive/Forum/topicdetail?TopicID="+id);
   }

    //新增论坛
   $scope.addforum = function () {
       window.open("../../CourseLive/Forum/topicadd?ChapterID=" + $scope.CHAPTERID + "&mooc=1&currentoc="+$scope.OCID);
   }
   
    //获取讨论
   var ForumTopic_ChapterID_List = function (chapterid) {

       $scope.CHAPTERID = $("#a_" + chapterid).attr("pid");
       var ocid = $scope.OCID;
       var pageindex = 1;
       var pagesize = 10;
       var url = MOOCPreviewProviderUrl + "/ForumTopic_ChapterID_List";
       var param = { ChapterID: chapterid, PageIndex: pageindex, PageSize: pagesize };
       $scope.baseService.post(url, param, function (data) {
           $scope.forumtopic_list = data.d;
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
    //视频/文件播放
   var play = function (filedata) {
       //debugger;
       $scope.setfiledata = filedata;
       ClearPieTime();
       var URL = filedata.ViewUrl;
       if (filedata.FileType!=1) {
         URL= filedata.FileViewURL;
       }
       if (filedata.IsAllowStudy == 0) {
           URL = "请先学习前面的章节";
       } else if (filedata.IsAllowStudy == 2) {
           URL = "你的班级尚未开始";
       } else if (filedata.IsAllowStudy == 3) {
           URL = "请先学习完前面的章节";
       } else if (filedata.IsAllowStudy == 4) {
           URL = "请先完成上一章的测试";
       } else if (filedata.IsAllowStudy == 5) {
           URL = "请先学习完该章节";
       } else if (filedata.IsAllowStudy == 6) {
           URL = "请先完成所有章节及测试";
       }
       var screenHeight = $(window).height() - 150;
       if (filedata.FileType == 1) {
           if (!document.getElementById("div_play")) {
               $("#div2").append('<div id="div_play" class="preview_shipin"  style="margin-top:10px;"></div>');
           }
           $("#div_play").show();
           $("#ifFile2").hide();
           $("#div3").hide();
           //$("#ifFile").remove();
           var strurl = window.location.href;
           var strsplit = strurl.split("/OC");
           var palyurl = strsplit[0];
           var data = {
               id: "div_play",
               flash: palyurl + "/Frameworks/jwplay/pl.swf",
               url: URL,
               width: "100%",
               height: screenHeight,
               autoplay: "false",
               autostart: true
           }
           $G2S.Play(data);
          // jwplayer(data.id).play();
           jwplayer(data.id).setMute(false);
           jwonTime(filedata);
       } else {
         
           if (filedata.IsTransfer == 1) {
               //window.parent.frames["ifFile"].location = filedata.FileViewURL;
              // parent.ifFile.location.href = filedata.FileViewURL;
               //window.frames["ifFile"].document.location.href = filedata.FileViewURL;
               $("#div_play").hide();
               $("#ifFile2").show();
               $("#div3").hide();
               $("#div_play_wrapper").remove();
               if (filedata.IsAllowStudy == 1) {
                   $('#ifFile').attr('src', URL);
                   int_id = setInterval(function () {
                       $scope.$apply(saveTime(filedata));
                   }, 1000);
               } else {
                   $("#div3").show();
                   $("#div_play").hide();
                   $("#ifFile2").hide();
                   $scope.div3name = URL;
               }
             
           } else {
               alert("文件尚未转换成功.请耐心等待.");
           }
          
       }

   }
   var IsShow = false;
   var int_id;
    //自动记录观看秒
   var jwonTime = function (filedata) {
       var maxTime = filedata.Seconds;
       var VideoTime = filedata.TimeLength;
       jwplayer().onReady(function (obj) {
           if (maxTime < VideoTime)
               jwplayer("div_play").seek(maxTime);
           else {
               jwplayer("div_play").seek(0);
           }
       });
       jwplayer().onTime(function (obj){
               var s = parseInt(obj.position);
               if (s % 10 == 0 && s != 0) {
                   OCMoocStuFile_StuVideoDesc_Add(filedata, s);
               }
               if (s <= parseInt(obj.duration)) {
                   if (s == maxTime + 1) {
                       maxTime = s;
                   }
                   if (s > maxTime + 1) {
                      // jwplayer("div_play").seek(maxTime);
                   }
               }
               if (IsShow == false ) {
                  // PopupOCMoocVideoInsert(s);  //取消弹出知识卡 后续改为弹出试题
               }
       });
       //记录视频播放
       jwplayer().onPlay(function () {
           if (jwplayer().getState() == "PLAYING") { //判断视频是否暂停
               int_id = setInterval(function () {
                   $scope.$apply(saveTime(filedata));
               }, 1000);
           } else {
               clearInterval(int_id);
           }
         
       });

       //进入加载
       jwplayer().onBuffer(function () {
               clearInterval(int_id);
       });
       //进入暂停
       jwplayer().onPause(function () {
           clearInterval(int_id);
       });

       //播放完成
       jwplayer("div_play").onComplete(function () {
           //视频时长入库;
           OCMoocStuFile_StuVideoDesc_Add(filedata, filedata.TimeLength);
           for (var i = 0; i < $scope.moocfile_list.length; i++) {
               if (filedata.FileID == $scope.moocfile_list[i].FileID && i != (($scope.moocfile_list.length)-1)) {
                   $scope.moocfile_list[i + 1].IsActive = true;
                   $scope.moocfile_list[i].IsActive = false;
                   $scope.moocfile_list[i].FinishRate = 100;
                   play($scope.moocfile_list[i+1]);
                 
               }
               if (filedata.IsReadFinish == 0) {
                   refreshChapterStudy_List();
               }
           }
       });
      
   }
   var flagcount = 0;
   var filecount = 0;
    //记录时间
   var saveTime = function (filedata) {
       flagcount++;
       filecount++;
       var rate=0;
       if (filedata.FileType == 1) {
           if (jwplayer().getState() == "PAUSED" || jwplayer().getState() == "IDLE") { //判断视频是否暂停
               clearInterval(int_id);
           }
           rate = (Math.round((1 / filedata.TimeLength) * 10000) / 10000) * 100;  //获取每一秒所占的百分比
       } else {
           rate = (Math.round((1 / filedata.Timelimit) * 10000) / 10000) * 100;
       }
       var zongrate = filedata.FinishRate + rate;
       zongrate = Math.round(zongrate * 100) / 100;
       if (zongrate >= 100) {
           zongrate = 100;
           if (filedata.IsReadFinish == 0 && filedata.IsTransfer == 1) {
               //学习资源时学习时长累计入库
               OCMoocStuFile_Add(filedata, 10);
               refreshChapterStudy_List();
           }
       }
       var clr = "#FF0000";
       var VideoNeedRate = parseInt(filedata.VideoNeedRate);
       if (zongrate >= VideoNeedRate) {
           clr = "#009900";
       }
       $G2S.PieNoCartoon("ddddd", zongrate, clr);
       if (flagcount%10==0) {
           OCMoocStuFile_Add(filedata, flagcount);
           flagcount == 0;
           
       }
       if (filecount % 60 == 0) {
           OCMoocStuFileDesc_Add(filedata.FileID,60);
           filecount = 0;
       }
       for (var i = 0; i < $scope.moocfile_list.length; i++) {
           if (filedata.FileID == $scope.moocfile_list[i].FileID) {
               $scope.moocfile_list[i].FinishRate = zongrate;
               break;
           }
       }
   }
    
   $scope.VideoSeek = function (time) {
       jwplayer().seek(time); 
   }

    //清除圆形图
   var ClearPieTime = function () {
       flagcount = 0;
       clearInterval(int_id);
       $("#ddddd").html("");
   }

    //清除弹窗隐藏效果
   var ClearIsShow = function (s) {
       for (var i = 0; i < $scope.moocvideoinsert_list.length; i++) {
           if ((s+1) == $scope.moocvideoinsert_list[i].Second) {
               IsShow = true;
           }
       }
   }

    //定时器让该知识卡重新弹出状态
   var savemoocVideoInsert = function () {
       IsShow = false;
   }


    
    //弹出知识卡
   var PopupOCMoocVideoInsert = function (s) {
       for (var i = 0; i < $scope.moocvideoinsert_list.length; i++) {
           if (s == $scope.moocvideoinsert_list[i].Second) {
               IsShow = true;
               $scope.txt_Conten = $scope.moocvideoinsert_list[i].Conten;
               if (jwplayer().getState() == "PLAYING") {
                   jwplayer().pause();
               }
               $('#myModal').modal('show');
               ClearIsShow(s);
              
           }
       }
   }

    //知识点关闭按钮
   $scope.OCMOOCVideoHide = function () {
       if (jwplayer().getState() == "PAUSED") {
           jwplayer().play();
       }
       setTimeout(function () {
           $scope.$apply(savemoocVideoInsert());
       }, 1000);
       $scope.txt_Conten = "";
   }

    //学习资源时视频点入库,且记录日志  
   var OCMoocStuFile_StuVideoDesc_Add = function (filedata, seconds) {
       //更新对象的秒
       for (var i = 0; i < $scope.moocfile_list.length; i++) {
           if (filedata.FileID == $scope.moocfile_list[i].FileID) {
               $scope.moocfile_list[i].Seconds = seconds;
               break;
           }
       }
       var chapterid = filedata.ChapterID;
       var fileid = filedata.FileID;
       var url = MOOCPreviewProviderUrl + "/OCMoocStuFile_StuVideoDesc_Add";
       var param = { ChapterID: chapterid, FileID: fileid, Seconds: seconds };
       $scope.baseService.post(url, param, function (data) {
       });
   }

    //学习非视频资源时记录学习日志
   var OCMoocStuFileDesc_Add = function (fileid, seconds) {
       var url = MOOCPreviewProviderUrl + "/OCMoocStuFileDesc_Add";
       var param = { OCID: $scope.OCID, FileID: fileid, StudyTimes: seconds };
       $scope.baseService.post(url, param, function (data) {
       });
   }



   var OCMoocStuFile_Add = function (filedata, seconds) {
       var chapterid = filedata.ChapterID;
       var fileid = filedata.FileID;
       var url = MOOCPreviewProviderUrl + "/OCMoocStuFile_Add";
       var param = { ChapterID: chapterid, FileID: fileid, Seconds: 10 };
       $scope.baseService.post(url, param, function (data) {
       });
   }

    //刷新章节
   var refreshChapterStudy_List = function () {
       var ocid = $scope.OCID;
       var url = MOOCPreviewProviderUrl + "/ChapterStudy_List";
       var param = { OCID: ocid };
       $scope.baseService.post(url, param, function (data) {
           $scope.chapterStudy_list = data.d;
       });
   }

    //样式控制
   var cssInit = function () {
       //章节列表
       $('.first_chapter').hover(function () {
           $(this).find('.operation_btn').show();
           $(this).css('background', '#f2f2f2');
       }, function () {
           $(this).find('.operation_btn').hide();
           $(this).css('background', '#fff');
       })
       //是否启用
       $('.open_btn').live('click', function () {
           if (!$(this).hasClass('click')) {
               $(this).addClass('click');
               $(this).css('background-position', '-32px -48px');
           } else {
               $(this).removeClass('click');
               $(this).css('background-position', '-32px -32px');
           }
       })

       //关闭提示文本框
       $('.tip_text span').click(function () {
           $(this).parent().hide();
       })

       $('.icon_zhankai').click(function () {
           $(this).parent().toggle();
           $(this).parent().siblings().toggle();
       })

       $('.exercise_list li').hover(function () {
           $(this).addClass('active').siblings().removeClass('active');
       }, function () {
           $(this).removeClass('active');
       })

       $('.way1').click(function () {
           $('.recruit_list').eq(0).show();
           $('.recruit_list').eq(1).hide();
       })
       $('.way2').click(function () {
           $('.recruit_list').eq(1).show();
           $('.recruit_list').eq(0).hide();
       })
       //教学计划
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

       //预览
       $('.note_list li').hover(function () {
           $(this).addClass('active').siblings().removeClass('active');
       }, function () {
           $(this).removeClass('active');
       })

       $('.item_list li').live('click', function () {
           var num = $(this).index();
           $(this).addClass('active').siblings().removeClass('active');
           $(this).parent().siblings('.detail_info').eq(num).show().siblings('.detail_info').hide();
       })

     

       var screenWidth = $(window).width();
       var screenHeight=$(window).height()-100;
       $('.video_tap').attr("width", (screenWidth - 340));
       //if (screenHeight <= 705) {
       //    screenHeight = 705;
       //}
       $("#ifFile2").css("height", screenHeight - 82);
       $("#div3").css("height", screenHeight - 82);
       $(".preview_box").css("min-height", screenHeight);

   }
   var Init = function () {
       GetPageTime();
       cssInit();
       ChapterStudy_List();
       OC_Get();
       $(".backto_top").hide();
   }
   Init();
  
}]);


MOOCPreviewModule.controller('MOOCChapterController', ['$scope', '$state', 'MOOCPreviewProviderUrl', function ($scope, $state, MOOCPreviewProviderUrl) {
    $scope.OCID = $G2S.request("OCID");
    $scope.chapterid = $G2S.request("ChapterID");
    $scope.mooctitle = decodeURI($G2S.request("Title"));
    //获取知识卡
    var OCMoocVideoInsert_List = function (chapterid, fileid) {
        var ocid = $scope.OCID;
        var url = MOOCPreviewProviderUrl + "/OCMoocVideoInsert_List";
        var param = { ChapterID: chapterid, FileID: fileid };
        $scope.baseService.post(url, param, function (data) {
            $scope.moocvideoinsert_list = data.d;
            $scope.moocvideoinsertlength = data.d.length;
        });
    }


    //获取章节我文件列表
    var OCMoocFile_List = function (chapterid) {
        //debugger;
        var ocid = $scope.OCID;
        var url = MOOCPreviewProviderUrl + "/OCMoocFileStudy_List";
        var param = { ChapterID: chapterid, OCID: ocid,FileType:1 };
        $scope.baseService.post(url, param, function (data) {
            //debugger;
            $scope.moocfile_list = data.d;
        });

        $scope.$on('ngMoocChapterFile', function (ngRepeatFinishedEvent) {
                $scope.moocfile_list[0].IsActive = true;
                play($scope.moocfile_list[0]);
                OCMoocVideoInsert_List($scope.moocfile_list[0].ChapterID, $scope.moocfile_list[0].FileID);
                $scope.ChapterID = $scope.moocfile_list[0].ChapterID;
                $scope.FileID = $scope.moocfile_list[0].FileID;
            
        });
    }

    //删除知识点
    $scope.OCMoocVideoInsert_Del = function (id) {
        if (confirm("您确认删除吗?")) {
            var url = MOOCPreviewProviderUrl + "/OCMoocVideoInsert_Del";
            var param = { InsertID: id };
            $scope.baseService.post(url, param, function (data) {
                var node = OCMoocVideoInsertCount(id);
                delete node.InsertID;
            });
        }

    }


    //添加知识点
    $scope.OCMoocVideoInsert_Edit = function (id) {
        if (jwplayer().getState() == "PLAYING") {
            jwplayer().pause();
        }
        if (id != "-1") {
            $('#myModal').modal('show');
            var node = OCMoocVideoInsertCount(id);
            $scope.noteSecond = node.Second;
            $scope.noteTime = $G2S.formatSeconds($scope.noteSecond);
            $scope.txt_Conten = node.Conten;
            $scope.InsertID = node.InsertID;
        } else {
            $scope.noteSecond = parseInt(jwplayer("div_play").getPosition());
            $scope.noteTime = $G2S.formatSeconds($scope.noteSecond);
            $scope.txt_Conten = "";
            $scope.InsertID = "-1";
        }
    }

    //知识点关闭按钮
    $scope.OCMOOCVideoHide = function () {
        if (jwplayer().getState() == "PAUSED") {
            jwplayer().play();
        }
        $(".video_pop").hide();
    }

    //保存知识点
    $scope.EditOCMoocVideoInsert = function () {
        var url = MOOCPreviewProviderUrl + "/OCMoocVideoInsert_Edit";
        var param = { InsertID: $scope.InsertID, ChapterID: $scope.ChapterID, FileID: $scope.FileID, Second: $scope.noteSecond, Conten: $scope.txt_Conten };
        $scope.baseService.post(url, param, function (data) {
            if (data.d != null) {
                $scope.OCMOOCVideoHide();
               // $("#myModal").hide();
                OCMoocVideoInsert_List($scope.ChapterID, $scope.FileID);
            }
        });
    }

    //获取知识卡详细
    var OCMoocVideoInsertCount = function (id) {
        for (var i = 0; i < $scope.moocvideoinsert_list.length; i++) {
            if (id == $scope.moocvideoinsert_list[i].InsertID) {
                return $scope.moocvideoinsert_list[i];
            }
        }
    }

    //点击视频时间跳转
    $scope.VideoSeek = function (time) {
        jwplayer().seek(time);
    }

    //关闭按钮
    $scope.winclose = function () {
        window.close();
    }
  
    

    //文件点击事件
    $scope.ChapterFileClick = function (thi) {
        for (var i = 0; i < $scope.moocfile_list.length; i++) {
            if ($scope.moocfile_list[i].MoocFileID == thi.moocfile.MoocFileID) {
                $scope.moocfile_list[i].IsActive = true;
                play($scope.moocfile_list[i]);
                OCMoocVideoInsert_List($scope.moocfile_list[i].ChapterID, $scope.moocfile_list[i].FileID);
                $scope.ChapterID = $scope.moocfile_list[i].ChapterID;
                $scope.FileID = $scope.moocfile_list[i].FileID;
            }
            if ($scope.moocfile_list[i].IsActive) {
                $scope.moocfile_list[i].IsActive = false;
            }
        }
        thi.moocfile.IsActive = true;
    }

    var flagplay = 0;
    //视频/文件播放
    var play = function (filedata) {
        var URL = filedata.ViewUrl;
        if (filedata.FileType == 1) {
            $("#div_play").show();
            var strurl = window.location.href;
            var strsplit = strurl.split("/OC");
            var palyurl = strsplit[0];
            var data = {
                id: "div_play",
                flash: palyurl + "/Frameworks/jwplay/pl.swf",
                url: URL,
                width: "100%",
                height: "630",
                autoplay: "false",
                autostart:true
            }
            $G2S.Play(data);
           
            jwplayer(data.id).setMute(false);
        } else {
            $("#div_play").hide();
            jwplayer("div_play").setMute(true);
        }

        jwplayer().onTime(function (obj) {
            if (jwplayer().getState() == "PLAY") { //判断视频是否暂停
                $(".video_pop").hide();
            }
            if (jwplayer().getState() == "PAUSE") { //判断视频是否暂停
                $(".video_pop").show();
            }
        });

       
        //jwplayer().onPlay(function () {
        //    alert(1);
        //    if (jwplayer().getState() == "PLAY") { //判断视频是否暂停
        //        $(".video_pop").hide();
        //    }
        //});
        jwplayer().onPause(function () {
            $(".video_pop").show();
        });
       
       
    }

    $scope.videoclose = function () {
        $(".video_pop").hide();
    }


 





    //样式控制
    var cssInit = function () {
        //章节列表
        $('.first_chapter').hover(function () {
            $(this).find('.operation_btn').show();
            $(this).css('background', '#f2f2f2');
        }, function () {
            $(this).find('.operation_btn').hide();
            $(this).css('background', '#fff');
        })
        //是否启用
        $('.open_btn').live('click', function () {
            if (!$(this).hasClass('click')) {
                $(this).addClass('click');
                $(this).css('background-position', '-32px -48px');
            } else {
                $(this).removeClass('click');
                $(this).css('background-position', '-32px -32px');
            }
        })

        //关闭提示文本框
        $('.tip_text span').click(function () {
            $(this).parent().hide();
        })

        $('.icon_zhankai').click(function () {
            $(this).parent().toggle();
            $(this).parent().siblings().toggle();
        })

        

        $('.way1').click(function () {
            $('.recruit_list').eq(0).show();
            $('.recruit_list').eq(1).hide();
        })
        $('.way2').click(function () {
            $('.recruit_list').eq(1).show();
            $('.recruit_list').eq(0).hide();
        })
        //教学计划
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

        //预览
        $('.note_list li').hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
        }, function () {
            $(this).removeClass('active');
        })

        $('.item_list li').live('click', function () {
            var num = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().siblings('.detail_info').eq(num).show().siblings('.detail_info').hide();
        })


        $(".wrap").css("background", "none");


       

    }
    var Init = function () {
        cssInit();
        OCMoocFile_List($scope.chapterid);
      

    }
    Init();

}]);

//获取章节详细加载完成后执行
MOOCPreviewModule.directive('onMoocChapter', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngMoocChapter');
                });
            }
        }
    };
});


//获取资料加载完成后 执行
MOOCPreviewModule.directive('onMoocChapterFile', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngMoocChapterFile');
                });
            }
        }
    };
});




                      



