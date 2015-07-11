
var MsgProvider = window.appPatch + '/DataProvider/User/Certificate.aspx';

$(document).ready(function () {
    document.title = "证书预览";
    GetCertf();
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
        $("#UserName").text(json.UserName);
        $("#CourseName").text(json.Name);
        $("#Datetime").text(Todate(json.CreateDate).substring(0, 10));

        strHtml += '<img src="' + window.appPatch + '/Images/Certificateo.png" style="position:absolute;z-index:1;" width="1090" height="700" alt="">';

        strHtml += "<div style='position:absolute;z-index:2; width: 1090px;  height:50px;margin-top:200px; text-align: center; '>";
        strHtml += "    <span style='font-size:50px; margin-top:12px; text-align:center; letter-spacing:3px; color:purple;'>" + json.UserName + "</span>";
        strHtml += "</div>";

        strHtml += "<div style='position:absolute;z-index:2; width:1090px; height:60px;margin-top:280px; text-align:center;'>";
        strHtml += "    <span style='font-size:25px; margin-top:12px; text-align:center; letter-spacing:2px; color:#707070;'>顺利完成 <label style='font-size:30px; color:#202020;'>" + json.Name + "</label> 课程的学习,并获得通过.</span><br /><br />";
        strHtml += "    <span style=' margin-top:5px; font-size:25px; margin-top:12px; text-align:center; letter-spacing:2px; color:#707070;'>该课程由第二军医大学提供,授权酷客平台运营</span>";
        strHtml += "</div>";

        strHtml += "<div style='position:absolute;z-index:2; height:30px;margin-top:400px; margin-left:700px;'>";
        strHtml += "    <span style='font-size:14px; margin-top:12px; letter-spacing:2px; color:#707070;'>第二军医大学 <label style='font-size:15px;'>" + json.OrganizationName + "</label><label> " + (json.Ranks == null ? "" : json.Ranks) + " </label><label style='font-size:30px; color:purple;'>" + json.TeacherName + "</label></span>";
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

//禁止鼠标右键
function stop() {
    return false;
}
document.oncontextmenu = stop;