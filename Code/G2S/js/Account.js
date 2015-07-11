/// <reference path="../DataProvider/User/UserImgFile.aspx" />
var timerc1 = 60; //全局时间变量（秒数）
var timerc2 = 60;
var timerc3 = 60;
var timerc4 = 60;
var pageii;
var AccountProvider = window.appPatch + '/DataProvider/User/AccountProvider.aspx';
function timedown1(i) { //加时函数
    $("#send1").css("background", "#ccc");
    $("#send1").removeAttr('href');
    if (timerc1 > 0) { //如果不到60秒
        --timerc1; //时间变量自增1
        $("#send1").html("重新发送(" + Number(parseInt(timerc1 % 60 / 10)).toString() + (timerc1 % 10) + ")"); //写入秒数（两位）
        setTimeout("timedown1()", 1000); //设置1000毫秒以后执行一次本函数
    }
    else {
        $("#send1").css("background", "#374760");
        $("#send1").html("发送验证码");
        $("#send1").attr("href", "javascript:timedown1()");
        timerc1 = 60;
    };
};
function timedown2(i) { //加时函数
    $("#send2").css("background", "#ccc");
    $("#send2").removeAttr('href');
    if (timerc2 > 0) { //如果不到60秒
        --timerc2; //时间变量自增1
        $("#send2").html("重新发送(" + Number(parseInt(timerc2 % 60 / 10)).toString() + (timerc2 % 10) + ")"); //写入秒数（两位）
        setTimeout("timedown2()", 1000); //设置1000毫秒以后执行一次本函数
    }
    else {
        $("#send2").css("background", "#374760");
        $("#send2").html("发送验证码");
        $("#send2").attr("href", "javascript:timedown2()");
        timerc2 = 60;
    };
};
function timedown3(i) { //加时函数
    $("#send3").css("background", "#ccc");
    $("#send3").removeAttr('href');
    if (timerc3 > 0) { //如果不到60秒
        --timerc3; //时间变量自增1
        $("#send3").html("重新发送(" + Number(parseInt(timerc3 % 60 / 10)).toString() + (timerc3 % 10) + ")"); //写入秒数（两位）
        setTimeout("timedown3()", 1000); //设置1000毫秒以后执行一次本函数
    }
    else {
        $("#send3").css("background", "#374760");
        $("#send3").html("发送验证码");
        $("#send3").attr("href", "javascript:timedown3()");
        timerc3 = 60;
    };
};
function timedown4(i) { //加时函数
    $("#send4").css("background", "#ccc");
    $("#send4").removeAttr('href');
    if (timerc4 > 0) { //如果不到60秒
        --timerc4; //时间变量自增1
        $("#send4").html("重新发送(" + Number(parseInt(timerc4 % 60 / 10)).toString() + (timerc4 % 10) + ")"); //写入秒数（两位）
        setTimeout("timedown4()", 1000); //设置1000毫秒以后执行一次本函数
    }
    else {
        $("#send4").css("background", "#374760");
        $("#send4").html("发送验证码");
        $("#send4").attr("href", "javascript:timedown4()");
        timerc4 = 60;
    };
};
//隐藏提示信息
function Hidets() {
    var o = $(".notes");
    o.hide(1000);
}
//密码强度验证
function checkRank() {
    var val = $("input[name=Pwd]").val();
    var ls = 0;
    if (val.match(/[a-z]/g)) { ls++; }
    if (val.match(/[A-Z]/g)) { ls++; }
    if (val.match(/[0-9]/g)) { ls++; }
    if (val.match(/[^a-zA-Z0-9]/g)) { ls++; }
    if (val.length < 6 && ls > 1) { ls = 1; }
    if (ls > 3) { ls = 3; };
    qdyanz(ls);
}
$(document).ready(function () {
    onRank();
    JMMobile();
    JMEmail();
});
function JMMobile() {
    var str = $("#mobileyc").text();
    var n = str.length;
    var str1 = str.substring(0, 3);
    var str2 = str.substring(n - 2, n);
    var str3 = "";
    for (var i = 0; i < n - 5; i++) {
        str3 += "*";
    }
    var mobile = str1 + str3 + str2;
    $("#mobilejm").text(mobile);
}
function JMEmail() {
    var str = $("#emailyc").text();
    var n = str.length;
    var str1 = str.substring(0, 3);
    var s = str.indexOf("@");
    var str2 = str.substring(s, n);
    var str3 = "";
    for (var i = 0; i < s - 3; i++) {
        str3 += "*";
    }
    var email = str1 + str3 + str2;
    $("#emailjm").text(email);
}
function onRank() {
    var val = $("#mmqd").text();
    var ls = 0;
    if (val.match(/[a-z]/g)) { ls++; }
    if (val.match(/[A-Z]/g)) { ls++; }
    if (val.match(/[0-9]/g)) { ls++; }
    if (val.match(/[^a-zA-Z0-9]/g)) { ls++; }
    if (val.length < 6 && ls > 1) { ls = 1; }
    if (ls > 3) { ls = 3; };
    var qd1 = $("#qiangdu4");
    var qd2 = $("#qiangdu5");
    var qd3 = $("#qiangdu6");
    if (ls == 1) {
        qd1.css("background", " #FF0000");
        qd2.css("background", " #F2F2F2");
        qd3.css("background", " #F2F2F2");
    }
    else if (ls == 2) {
        qd1.css("background", " #FFCC33");
        qd2.css("background", " #FFCC33");
        qd3.css("background", " #F2F2F2");
    }
    else if (ls == 3) {
        qd1.css("background", " #33FF99");
        qd2.css("background", " #33FF99");
        qd3.css("background", " #33FF99");
    }
    else {
        qd1.css("background", " #F2F2F2");
        qd2.css("background", " #F2F2F2");
        qd3.css("background", " #F2F2F2");
    }
}
function qdyanz(i) {
    var qd1 = $("#qiangdu1");
    var qd2 = $("#qiangdu2");
    var qd3 = $("#qiangdu3");
    if (i == 1) {
        qd1.css("background", " #FF0000");
        qd2.css("background", " #F2F2F2");
        qd3.css("background", " #F2F2F2");
    }
    else if (i == 2) {
        qd1.css("background", " #FFCC33");
        qd2.css("background", " #FFCC33");
        qd3.css("background", " #F2F2F2");
    }
    else if (i == 3) {
        qd1.css("background", " #33FF99");
        qd2.css("background", " #33FF99");
        qd3.css("background", " #33FF99");
    }
    else {
        qd1.css("background", " #F2F2F2");
        qd2.css("background", " #F2F2F2");
        qd3.css("background", " #F2F2F2");
    }
}
//验证错误警告样式
var Jinred = {
    color: 'red',
    border: '1px solid red'
}
//正常样式
var Jingray = {
    color: '#000',
    border: '1px solid #ccc'
}
var IsNull = false;
var IsBind = false;
//密码非空与一致、长度验证
function pwdIsNull(obj) {
    var pwd1 = $("input[name=Pwd]").val();
    var pwd2 = $(obj).val();
    if (pwd2 == "" || pwd1 != pwd2) {
        $("#repwd1").show();
        $(obj).css(Jinred);
        IsNull = false;
    }
    else {
        if (pwd1.length > 5 && pwd1.length < 16)
        {
            $("#repwd1").hide();
            reshuru(obj);
            IsNull = true;           
        }
        else {
            $("#repwd1").show();
            $(obj).css(Jinred);
            IsNull = false;
        }
    }
}
function reshuru(obj) {
    $(obj).css(Jingray);
}
//密码、手机、邮箱修改密码切换
function RePwd(i) {
    var s = i + 1;
    var pp1 = $("#repwdare1");
    var pp2 = $("#repwdare" + s);
    pp1.hide();
    pp2.show();
}
//手机、邮箱验证码验证与切换
function yzPhEm(i, rea) {
    var yzm = $("#yznum" + i).val();
    var pp = $("#repwdare" + i);
    var rname = $("#repwdare5");
    if (yzm != rea) {
        alert("验证码错误")
    }
    else {
        pp.hide();
        rname.show();
    }
}
//手机、邮箱认证
function RenZheng(i) {
    if (i == 1) {
        var phone1 = $("#repwdare6");
        var phone2 = $("#repwdare8");
        phone1.hide();
        phone2.show();
    }
    else if (i == 2) {
        var email1 = $("#repwdare9");
        var email2 = $("#repwdare11");
        email1.hide();
        email2.show();
    }
}
//修改手机邮箱绑定切换
function ReEmPh(i) {
    var s = i + 1;
    var pp1 = $("#repwdare" + i);
    var pp2 = $("#repwdare" + s);
    pp1.hide();
    pp2.show();
}
//手机、邮箱验证码绑定切换
function yzReEmPh(i) {
    var n = i + 1;
    var are = $("#parm" + i);
    var yzm = $("#parm" + n);
    if (yzm.val() == are.text()) {
        $("#repwdare" + i).hide();
        $("#repwdare" + n).show();
    }
    else {
        yzm.css(Jinred);
        $("#rarm" + i).show();
    }
}
//手机是否已被绑定
function MobileIsBind() {
    var Mobile = $("input[name=Mobile]").val();
    var b1 = $("#bind1");
    var url = AccountProvider + "/Mobile_Validation";
    var para = "{Mobile:'" + Mobile + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != undefined) {
        if (result == true) {
            b1.hide();
            IsBind = true;
        }
        else if (result == false) {
            b1.show();
            IsBind = false;
        }
    }
    else {
        b1.show();
        IsBind = false;
    }
}
//邮箱是否已被绑定
function EmailIsBind() {
    var Email = $("input[name=Email]").val();
    var b2 = $("#bind2");
    var url = AccountProvider + "/Email_Validation";
    var para = "{Email:'" + Email + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != undefined) {
        if (result == true) {
            b2.hide();
            IsBind = true;
        }
        else if (result == false) {
            b2.show();
            IsBind = false;
        }
    }
    else {
        b2.show();
        IsBind = false;
    }
}
//手机、邮箱绑定验证码验证
function BindYzm() {
    var byzm = $("#bindyzm" + i);
}
//个人信息保存
function User_Part_Upd() {
    var UserNo = $("#UserNo").text();
    var UserName = $("#UserName").text();
    var UserNameEn = $("input[name='UserNameEn']").val();
    var Nickname = $("input[name=Nickname]").val();
    var Gender = $("input[name='sex']:checked").val();
    var Email = $("input[name='Email']").val();
    var Tel = $("input[name='Tel']").val();
    var Mobile = $("input[name='Mobile']").val();
    var Brief = document.getElementById('frmoEditor1').contentWindow.getHTML();
    var url = AccountProvider + "/User_Part_Upd";
    var para = "{UserNo:'" + UserNo + "',UserName:'" + UserName + "',UserNameEn:'" + UserNameEn + "',Nickname:'" + Nickname + "',Gender:" + Gender + ",Email:'" + Email + "',Tel:'" + Tel + "',Mobile:'" + Mobile + "',Brief:'" + escape(Brief) + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "" && result!=null) {
        if (result.output == '教工号或学号已经存在，请重新设置教工号或学号') {
            $G2S.alert(result.output);
            return;
        }
        else{           
            layer.msg('个人信息修改成功', 2, -1);
            location.replace(location);
        }
    } else {
        $G2S.alert("发生未知错误!")
        return;
    }
}
//用户图像上传
var GetImport;
function Img_Upd() {
    var url = '/Admin/FileUpload.aspx';
    GetImport = $.layer({
        type: 2,
        shade: [0.5, '#000'],
        fix: false,
        title: false,
        area: ['310px', '165px'],
        iframe: {
            src: url,
            scrolling: 'no'
        },
        end: function () {
            window.location.reload(true);
        }
    });
}
//账号安全
function Mobile_Upd() {
    var Mobile = $("input[name='Mobile']").val();

    if (IsBind == false) {
        return;
    }

    var url = AccountProvider + "/Mobile_Upd";
    var para = "{Mobile:'" + Mobile + "'}";
    var result = $G2S.GetAjaxAspx(para, url);   
    if (result != "" && result!=null) {
        if (result == true) {
            layer.msg('绑定手机修改成功', 2, -1);
            layer.close(pageii);
            location.replace(location);
        }
    } else {
        alert("发生未知错误!")
        return;
    }
}
function Email_Upd() {
    var Email = $("input[name='Email']").val();

    if (IsBind == false) {
        return;
    }

    var url = AccountProvider + "/Email_Upd";
    var para = "{Email:'" + Email + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        if (result == true) {
            layer.msg('绑定邮箱修改成功', 2, -1);
            layer.close(pageii);
            location.replace(location);
        }
    } else {
        alert("发生未知错误!")
        return;
    }
}
function Pwd_Upd() {
    var Pwd = $("input[name='Pwd']").val();
    Pwd = hex_md5(Pwd);

    if (IsNull == false) {
        return;
    }
    var Dpwd = $("#dqpwd").val();
    var url = AccountProvider + "/Pwd_Validation";
    var para = "{Pwd:'" + Dpwd + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        if (result == true) {
        }
        else {
            $G2S.alert("原密码错误!");
            return;
        }
    }
    else {
        $G2S.alert("原密码错误!");
        return;
    }

    var url = AccountProvider + "/Pwd_Upd";
    var para = "{Pwd:'" + Pwd + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        if (result == true) {
            layer.msg('密码修改成功', 2, -1);
            layer.close(pageii);
            location.replace(location);
        }
    } else {
        $G2S.alert("发生未知错误!")
        return;
    }
}
//密码
function PagePwd() {
    $("#dqpwd").val("");
    $("input[name='Pwd']").val("");
    $("input[name='repwd']").val("");
    $("#qiangdu1").css("background", " #fff");
    $("#qiangdu2").css("background", " #fff");
    $("#qiangdu3").css("background", " #fff");
    $("#repwd1").hide();
    $("input[name='repwd']").css(Jingray);
    pageii = $.layer({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [0], //去掉默认边框
        shade: [0.5, '#000'], //去掉遮罩
        closeBtn: [0, true], //去掉默认关闭按钮
        shift: 'top', //从左动画弹出
        page: { dom: '#Pwdarea' }
    });
}
//手机
function PageMobile() {
    $("input[name='Mobile']").val("");
    pageii = $.layer({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [0], //去掉默认边框
        shade: [0.5, '#000'], //去掉遮罩
        closeBtn: [0, true], //去掉默认关闭按钮
        shift: 'top', //从左动画弹出
        page: { dom: '#Mobilearea' }
    });
}
//邮箱
function PageEmail() {            
    $("input[name='Email']").val("");
    pageii = $.layer({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [0], //去掉默认边框
        shade: [0.5, '#000'], //去掉遮罩
        closeBtn: [0, true], //去掉默认关闭按钮
        shift: 'top', //从左动画弹出
        page: { dom: '#Emailarea' }
    });
}
function ClosePage() {
    layer.close(pageii);
}