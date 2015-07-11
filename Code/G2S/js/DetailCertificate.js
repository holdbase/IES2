
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
        strHtml += '<img src="' + window.appPatch + '/Images/Certificateo.png" style="position:absolute;z-index:1;" width="1090" height="700" alt="">';

        strHtml += "<div style='position:absolute;z-index:2; width: 1090px;  height:50px;margin-top:200px; text-align: center; '>";
        //if (json.RealName!="") {
        //    strHtml += "    <span style='font-size:50px; margin-top:12px; text-align:center; letter-spacing:3px; color:purple;'>" + json.RealName + "</span>";
        //} else {
        //    strHtml += "    <span style='font-size:50px; margin-top:12px; text-align:center; letter-spacing:3px; color:purple;'>" + json.UserName + "</span>";
        //}
        strHtml += "    <span style='font-size:50px; margin-top:12px; text-align:center; letter-spacing:3px; color:purple;'>" + json.UserName + "</span>";
        //strHtml += "    <input style='background:transparent;border:0; font-size:45px; text-align:center; letter-spacing:3px; color:purple;' value='" + json.UserName + "'>";
        strHtml += "</div>";

        strHtml += "<div style='position:absolute;z-index:2; width:1090px; height:60px;margin-top:280px; text-align:center;'>";
        strHtml += "    <span style='font-size:25px; margin-top:12px; text-align:center; letter-spacing:2px; color:#707070;'>顺利完成 <label style='font-size:30px; color:#202020;'>" + json.Name + "</label> 课程的学习,并获得通过.</span><br /><br />";
        strHtml += "    <span style=' margin-top:5px; font-size:25px; margin-top:12px; text-align:center; letter-spacing:2px; color:#707070;'>该课程由第二军医大学提供,授权酷客平台运营</span>";
        strHtml += "</div>";

        strHtml += "<div style='position:absolute;z-index:2; height:30px;margin-top:400px; margin-left:690px;'>";
        //strHtml += "    <span style='font-size:14px; margin-top:12px; letter-spacing:2px; color:#707070;'>第二军医大学 <label style='font-size:15px;'>" + json.OrganizationName + "</label><label> " + (json.Ranks == null ? "" : json.Ranks) + " </label><label style='font-size:30px; color:purple;'>" + json.TeacherName + "</label></span>";
        strHtml += "    <span style='font-size:14px; margin-top:12px; letter-spacing:2px; color:#707070;'><label>第二军医大学</label><br/> <label style='font-size:15px;'>" + json.OrganizationName + "</label><label> " + (json.Ranks == null ? "" : json.Ranks) + " </label></span>";
        strHtml += "    <label style='font-size:30px; color:purple;'>" + json.TeacherName + "</label>";
        strHtml += "</div>";

        strHtml += "<div id='qrcode' style='position:absolute;z-index:2; height:30px;margin-top:510px; margin-left:120px; '>";
        strHtml += "</div>";

        strHtml += "<div style='position:absolute;z-index:2; height:30px;margin-top:565px; margin-left:575px; '>";
        strHtml += "    <span style='font-size:14px; margin-top:12px; color:#707070;'><label style='font-size:14px;'>" + (json.CertificateNo == null ? "" : json.CertificateNo) + "</label></span>";
        strHtml += "</div>";

        strHtml += "<div style='position:absolute;z-index:2; height:30px;margin-top:564px; margin-left:840px; '>";
        strHtml += "    <span style='font-size:14px; margin-top:12px; letter-spacing:2px; color:#707070;'><label style='font-size:14px;'>" + Todate(json.CreateDate).substring(0, 10) + "</label></span>";
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

//生成二维码
window.onload = function () {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 96,//设置宽高
        height: 96
    });

    var Url = window.location.host;
    //alert(Url + "/G2S/Certificate/PreviewCertificate?Cerid=" + getUrlParam('Cerid'));
    //qrcode.makeCode(encodeURI(Url + "/G2S/Certificate/PreviewCertificate?Cerid=" + getUrlParam('Cerid')));
    qrcode.makeCode("http://" + Url + "/G2S/Certificate/PreviewCertificate?Cerid=" + getUrlParam('Cerid'));
}

//禁止鼠标右键
function stop() {
    return false;
}
document.oncontextmenu = stop;
