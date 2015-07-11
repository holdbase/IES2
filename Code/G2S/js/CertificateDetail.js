﻿
var MsgProvider = window.appPatch + '/DataProvider/User/Certificate.aspx';

$(document).ready(function () {
    document.title = "证书预览";
    var IsPrint = getUrlParam('IsPrint');
    if (IsPrint == "" || IsPrint == null) {
        GetCertf();
    } else {
        GetCertf();
        PrintCertificate();
    }
    
});

//获取URL参数的值
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//获取证书的详细信息
function GetCertf() {
    var strHtml = "";
    $("#Detailed").html("");
    var Digital = getUrlParam('Cerid');
    var url = MsgProvider + "/MyCertificate_Get";
    var para = "{CertificateID:" + Digital + "}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        strHtml += '<img src="' + window.appPatch + '/Images/certificate1.jpg" style="position:absolute;z-index:1;" width="688" height="985" alt="">';
        strHtml += "<div style='position:absolute;z-index: 2; width:195px; height:100px;margin-left:250px;margin-top:65px; background-color:#FFFFFF;'>";
        strHtml += "    <p style='font-size:40px;margin-top:17px;text-align:center;letter-spacing:4px;'>学习证书</p>";
        strHtml += "    <p style='margin-top: 25px; font-size:25px; text-align:center; color:#717171;'>" + Todate(json.CreateDate).substring(0, 10) + "</p>";
        strHtml += "</div>";
        strHtml += "<div style='position:absolute;z-index:2; width:270px; height:90px;margin-top:246px; margin-left:210px;background-color:#FFFFFF;'>";
        strHtml += "    <p style='font-size:50px; margin-top:12px; text-align:center; letter-spacing:3px;'>" + json.UserName + "</p>";
        strHtml += "    <p style='width:100px; font-size:21px; margin:30px 0 0 9px; color: #999999; letter-spacing:1px;'>" + json.OrganizationName + "</p>";
        strHtml += "    <label style=' float:right ; width: 155px;  font-size:21px; margin-top:-21px; color: #999999; letter-spacing:1px;'>" + json.UserNo + "</label>";
        strHtml += "</div>";
        strHtml += "<div style='position:absolute;z-index:2; width:420px; height:220px; margin-top:410px; margin-left: 130px;background-color:#FFFFFF;'>";
        strHtml += "    <p style='margin-top:10px; text-align:center; font-size:35px;letter-spacing:1px;'>" + json.Name + "</p>";
        strHtml += "    <p style='margin-top:35px; text-align: center; font-size:50px;'>" + json.Score + "</p>";
        strHtml += "    <p style='margin-top:28px;text-align:center; font-size: 22px; color: #606060;'>授课教师：" + json.TeacherName + "</p>";
        strHtml += "    <p style='margin-top:15px;text-align:center; font-size: 22px; color: #606060;'>学分/学时：" + json.Credit + "/" + json.Hours + "</p>";
        strHtml += "    <p style='margin-top:15px;text-align:center; font-size: 22px; color: #606060;'>授课时段：" + json.TeachingTime + "</p>";
        strHtml += "</div>";
        strHtml += "<div style='position:absolute;z-index:2; width:510px; height:80px; margin-top:853px;margin-left: 85px; background-color:#FFFFFF;'>";
        strHtml += "    <p style='margin-top:6px; text-align: center; font-size: 30px; letter-spacing: 5px; color:#333333;'>第二军医大学</p>";
        strHtml += "    <p style='margin-top: 15px; text-align: center; font-size: 23px; color:#999999;'>The Second Military Medical University</p>";
        strHtml += "</div>";
    }
    $("#Detailed").html(strHtml);
}

//处理时间
var Todate = function (data) {
    var date = new Date(parseInt(data.replace("/Date(", "").replace(")/", ""), 10));
    var result = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    return result;
}

//打印证书
function PrintCertificate() {
    var bdhtml = window.document.body.innerHTML;//获取当前页的html代码 
    var startStr = "<!--startprint-->";//设置打印开始区域 
    var endStr = "<!--endprint-->";//设置打印结束区域 
    var printHtml = bdhtml.substring(bdhtml.indexOf(startStr) + startStr.length, bdhtml.indexOf(endStr));//从标记里获取需要打印的页面 

    window.document.body.innerHTML = printHtml;//需要打印的页面 
    window.print();
    //wb.ExecWB(7, 1)//打印预览
    window.document.body.innerHTML = bdhtml;//还原界面 
}