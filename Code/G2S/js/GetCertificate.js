var tname;
var MsgProvider = window.appPatch + '/DataProvider/User/Certificate.aspx';
var mUrl = window.appPatch;
var box = "";

$(document).ready(function () {
    //GetCertificateList();
    //GetRealName();
    shows(1)
});

//切换已获得证书和未获得证书
function shows(i) {
    var jbxx = document.getElementById("CertificateList");
    var jzxx = document.getElementById("NoCertificateList");
    var xx = document.getElementById("spaceitem1");
    var yy = document.getElementById("spaceitem2");
    if (i == 1) {
        jbxx.style.display = "block";
        jzxx.style.display = "none";
        xx.className = 'action';
        yy.className = '';
        GetCertificateList();
    }
    if (i == 2) {
        jzxx.style.display = "block";
        jbxx.style.display = "none";
        xx.className = '';
        yy.className = 'action';
        GetNoCertificateList();
    }   
}

//获取我已获得的证书列表
function GetCertificateList() {
    var strHtml = "";
    var NoHtml = "";
    $("#CertificateList").html("");
    $("#NoCertificate").html("");
    var url = MsgProvider + "/Certificate_List";
    var para = "";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "") {
        for (var i = 0; i < json.length; i++) {
            var rows = json[i];
            var OCID = rows.OCID;
            var Name = rows.Name;
            var CertificateID = rows.CertificateID;
            var CreateDate = rows.CreateDate;
            var UserName = rows.UserName;
            var OrganizationName = rows.OrganizationName;
            var UserNo = rows.UserNo;
            var Score = rows.Score;
            var TeacherName = rows.TeacherName;
            var Credit = rows.Credit;
            var Hours = rows.Hours;
            var TeachingTime = rows.TeachingTime;
            var StudyRate = rows.StudyRate;

            if (StudyRate == "100.0") {
                strHtml += "<li id='" + CertificateID + "'>";
                strHtml += "<div class='img_box'>";
                strHtml += '<iframe src="../Views/Certificate/DetailCertificate.cshtml?Cerid=' + CertificateID + '" scrolling="no" style="border:0;width: 1200px; height: 765px; position: absolute; margin-top: -293px; margin-left: -455px; transform: scale(0.26, 0.26);-webkit-transform:scale(0.26,0.26);-ms-transform:scale(0.26,0.26);"></iframe>';
                strHtml += "<div class='mask_wrap'>";
                strHtml += "<div class='mask_box'><a href='../Views/Certificate/DetailCertificate?Cerid=" + CertificateID + "'  target='_Blank' style='color:#FFFFFF;'>";
                strHtml += "<span>" + StudyRate.split(".")[0] + "%</span>";
                strHtml += "<p>学习进度</p>";
                strHtml += "</a></div>";
                strHtml += "</div>";
                strHtml += "</div>";
                strHtml += "<div class='certificate_info'>";
                strHtml += "<span><a href='DetailCertificate?Cerid=" + CertificateID + "'; target='_Blank' style='color:#333333;'>" + Name + "</a></span>";
                strHtml += "<p><a class='icon_p' href='../Views/Certificate/DetailCertificate?Cerid=" + CertificateID + "&IsPrint=1'; target='_Blank' title='打印'></a></p>";
                strHtml += "</div>";
                strHtml += "</li>";
                } 
            //else {
            //    stHtml += "<li id='" + CertificateID + "'>";
            //    stHtml += "<div class='img_box'>";
            //    stHtml += "<img src='../Images/Certificateo.png' width='290' height='185' alt=''>";
            //    stHtml += "<div class='mask_wrap'>";
            //    stHtml += "<div class='mask_box'>";
            //    stHtml += "<span>" + StudyRate.split(".")[0] + "%</span>";
            //    stHtml += "<p>学习进度</p>";
            //    stHtml += "</div>";
            //    stHtml += "</div>";
            //    stHtml += "</div>";
            //    stHtml += "<div class='certificate_info'>";
            //    stHtml += "<span>" + Name + "</span>";
            //    stHtml += "</div>";
            //    stHtml += "</li>";
            //}
        }
        //strHtml += "</ul>";
        $("#CertificateList").html(strHtml);
        CaPattern();
    } else {
        NoHtml += "<img src='../Images/no-content.png' width='141' height='91' alt=''>";
        NoHtml += "<p>您尚未学习有证书的课程，<br>可以选择进阶式课程或微课程来学习。</p>";
        $("#NoCertificate").html(NoHtml);
    }
}

//获取我未获得的证书列表
function GetNoCertificateList() {
    var stHtml = "";
    var NoHtml = "";
    $("#NoCertificateList").html("");
    $("#NoCertificate").html("");
    var url = MsgProvider + "/Certificate_List";
    var para = "";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "") {
        //strHtml += "<ul class='certificate_list'>";
        for (var i = 0; i < json.length; i++) {
            var rows = json[i];
            var OCID = rows.OCID;
            var Name = rows.Name;
            var CertificateID = rows.CertificateID;
            var CreateDate = rows.CreateDate;
            var UserName = rows.UserName;
            var OrganizationName = rows.OrganizationName;
            var UserNo = rows.UserNo;
            var Score = rows.Score;
            var TeacherName = rows.TeacherName;
            var Credit = rows.Credit;
            var Hours = rows.Hours;
            var TeachingTime = rows.TeachingTime;
            var StudyRate = rows.StudyRate;

            if (StudyRate != "100.0") {                
                stHtml += "<li id='" + CertificateID + "'>";
                stHtml += "<div class='img_box'>";
                stHtml += "<img src='../Images/Certificateo.png' width='290' height='185' alt=''>";
                stHtml += "<div class='mask_wrap'>";
                stHtml += "<div class='mask_box'>";
                stHtml += "<span>" + StudyRate.split(".")[0] + "%</span>";
                stHtml += "<p>学习进度</p>";
                stHtml += "</div>";
                stHtml += "</div>";
                stHtml += "</div>";
                stHtml += "<div class='certificate_info'>";
                stHtml += "<span>" + Name + "</span>";
                stHtml += "</div>";
                stHtml += "</li>";
            }
        }
        $("#NoCertificateList").html(stHtml);
        CaPattern();
    } else {
        NoHtml += "<img src='../Images/no-content.png' width='141' height='91' alt=''>";
        NoHtml += "<p>您尚未学习有证书的课程，<br>可以选择进阶式课程或微课程来学习。</p>";
        $("#NoCertificate").html(NoHtml);
    }
}

//获取真实姓名
function GetRealName() {
    var url = MsgProvider + "/RealName_Get";
    var para = "";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json.RealName != "" && json.RealName != null) {
        //document.getElementById('Edit').style.display = "none";
        document.getElementById('sName').style.display = "none";
        document.getElementById('RName').style.display = "block";
        $("#RName").text(json.RealName);
    }
}

//获取我的证书列表(备用)
function GetCertificateListby() {
    var strHtml = "";
    var NoHtml = "";
    $("#CertificateList").html("");
    $("#NoCertificate").html("");
    var url = MsgProvider + "/Certificate_List";
    var para = "";
    var json = $G2S.GetAjaxAspx(para,url);
    if (json != "") {
        //strHtml += "<ul class='certificate_list'>";
        for (var i = 0; i < json.length; i++) {
            var rows = json[i];
            var OCID = rows.OCID;
            var Name = rows.Name;
            var CertificateID = rows.CertificateID;
            var CreateDate = rows.CreateDate;
            var UserName = rows.UserName;
            var OrganizationName = rows.OrganizationName;
            var UserNo = rows.UserNo;
            var Score = rows.Score;
            var TeacherName = rows.TeacherName;
            var Credit = rows.Credit;
            var Hours = rows.Hours;
            var TeachingTime = rows.TeachingTime;
            var StudyRate = rows.StudyRate;

            if (StudyRate == "100.0") {
                strHtml += "<li id='" + CertificateID + "'>";
                strHtml += "<div class='img_box'>";
                //strHtml += "<img src='http://placehold.it/186x262/cccccc' width='186' height='262' alt=''>";
                //strHtml += "<img src='" + OCIMGURL(OCID) + "' width='186' height='262' alt=''>";
                strHtml += '<iframe src="../Views/Certificate/CertificateDetail.cshtml?Cerid=' + CertificateID + '" scrolling="no" style="border:0;width: 752px; height: 1052px; position: absolute; margin-top: -400px; margin-left: -283px; transform: scale(0.26, 0.26);-webkit-transform:scale(0.26,0.26);-ms-transform:scale(0.26,0.26);"></iframe>';
                strHtml += "<div class='mask_wrap'>";
                strHtml += "<div class='mask_box'><a href='../Views/Certificate/DetailCertificate?Cerid=" + CertificateID + "'  target='_Blank' style='color:#FFFFFF;'>";
                strHtml += "<span>" + StudyRate.split(".")[0] + "%</span>";
                strHtml += "<p>学习进度</p>";
                strHtml += "</a></div>";
                strHtml += "</div>";
                strHtml += "</div>";
                strHtml += "<div class='certificate_info'>";
                strHtml += "<span><a href='DetailCertificate?Cerid=" + CertificateID + "'; target='_Blank' style='color:#333333;'>" + Name + "</a></span>";
                //strHtml += "<p><a class='icon_p' href='CertificateDetail?Cerid=" + CertificateID + "&IsPrint=1'; target='_Blank' title='打印'></a><a class='icon_d' href='javascript:;' title='下载'></a></p>";
                strHtml += "<p><a class='icon_p' href='../Views/Certificate/DetailCertificate?Cerid=" + CertificateID + "&IsPrint=1'; target='_Blank' title='打印'></a></p>";
                strHtml += "</div>";
                strHtml += "</li>";
            } else {
                strHtml += "<li id='" + CertificateID + "'>";
                strHtml += "<div class='img_box'>";
                //strHtml += "<img src='http://placehold.it/186x262/cccccc' width='186' height='262' alt=''>";
                strHtml += "<img src='../Images/certificate1.jpg' width='186' height='262' alt=''>";
                strHtml += "<div class='mask_wrap'>";
                strHtml += "<div class='mask_box'>";
                strHtml += "<span>" + StudyRate.split(".")[0] + "%</span>";
                strHtml += "<p>学习进度</p>";
                strHtml += "</div>";
                strHtml += "</div>";
                strHtml += "</div>";
                strHtml += "<div class='certificate_info'>";
                strHtml += "<span>" + Name + "</span>";
                strHtml += "</div>";
                strHtml += "</li>";
            }            
        }
        //strHtml += "</ul>";
        $("#CertificateList").html(strHtml);
        CaPattern();
    } else {        
        NoHtml += "<img src='../Images/no-content.png' width='141' height='91' alt=''>";
        NoHtml += "<p>您尚未学习有证书的课程，<br>可以选择进阶式课程或微课程来学习。</p>";
        $("#NoCertificate").html(NoHtml);
    }
}

//证书样式
function CaPattern() {
    $('.img_box').hover(function () {
        $(this).find('.mask_wrap').stop(true).animate({ top: '-7px' }, 500);
    }, function () {
        $(this).find('.mask_wrap').stop(true).animate({ top: '-283px' }, 500);
    })

    $('.certificate_list li').hover(function () {
        $(this).find('.certificate_info p').toggle();
    })
}

//获取证书图片
function OCIMGURL(OCID) {
    var url = MsgProvider + "/OCIMGURL";
    var para = "{OCID:'" + OCID + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        if (result == "/Images/default/User_M.jpg") {
            return "http://placehold.it/186x262/cccccc";
        } else {
            return result;
        }
    }
}

//查看证书的详细信息
function GetDetailed(CertificateID)
{
    window.location.href = 'CertificateDetail?Cerid=' + CertificateID;
}

//编辑姓名
function UpdName() {
    var url = MsgProvider + "/Certificate_Upd";
    var RealName = $("#sName").val();
    var para = "{RealName:'" + RealName + "'}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json == true) {
        layer.msg("设置成功！", 1, 1);        
        document.getElementById('Edit').style.display = "none";
        document.getElementById('sName').style.display = "none";
        document.getElementById('RName').style.display = "block";
        $("#RName").text(RealName);
    } else {
        alert("设置失败,请联系管理员!");
        return;
    }
}

//取消编辑姓名
function Cancelck() {
    document.getElementById('Edit').style.display = "none";
    $("#sName").val("");
    //layer.close(box);
}

//确定or取消
function According() {
    
    document.getElementById('Edit').style.display = "block";
    //box=layer.tips('姓名只能设置一次,请认真对待', '#Edit', {
    //    tips: [1, '#0FA6D8'],//还可配置颜色
    //});
}