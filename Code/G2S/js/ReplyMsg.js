var tname;
var MsgProvider = window.appPatch + '/DataProvider/User/MsgProvider.aspx';
$(document).ready(function () {
    GetReplyMsg();
    GetSelID();
});

//获取回复的详细信息
function GetReplyMsg() {
    Digital = getUrlParam('Msgid');
    if (Digital == "" || Digital == null) {
        Digital = $("#MsgID").val();
    }
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digital + ",NextOrLast:0,Type:0}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        $("#MsgID").val(json.MessageID);
        $("#AddresseeID").val(json.SendUserID);
        $("#Cont").val(json.Conten);
        $("#Theme").val("Re：" + json.Title);
        $("#Sender").text(json.SendUserName);
        $("#Time").text(json.CreateTime);
        $("#Content").html($("#Cont").val());
        $("#Text").val($("#Reply").html());
    }
}

//获取Url传递的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//页面加载接收选择
function GetSelID() {
    var SelIDs = getUrlParam('Msgid');
    var url = MsgProvider + "/Message_Gets";
    var para = "{MessageID:" + SelIDs + "}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != null) {
        var strHtml = "";
        for (var i = 0; i < result.length; i++) {
            var UserID = result[i].SendUserID;
            var UserName = result[i].SendUserName;
            if (i == 10) {
                strHtml += "<div style='border:0;height:30px;width:50px;line-height:30px;color:#666;float:left'>";
                strHtml += "<a href='javascript:;'onclick='moreSendUser(this);' style='width:50px;text-align:center;display:block;float:left;color:#666'>更多∨</a>";
                strHtml += "</div>";
                strHtml += "<div style='border:0;height:30px;width:75px;line-height:30px;color:#666;float:left'>";
                strHtml += "<span style='width:65px;text-align:center;display:block;float:left'>" + UserName + "</span>";
                strHtml += "<a href='javascript:DelItem(" + UserID + ");' style='font-weight:bold;font-size:16px;display:block;width:10px;float:left;color:#666'>×</a>";
                strHtml += "</div>";
            }
            else {
                strHtml += "<div style='border:0;height:30px;width:75px;line-height:30px;color:#666;float:left'>";
                strHtml += "<span style='width:65px;text-align:center;display:block;float:left'>" + UserName + "</span>";
                strHtml += "<a href='javascript:DelItem(" + UserID + ");' style='font-weight:bold;font-size:16px;display:block;width:10px;float:left;color:#666'>×</a>";
                strHtml += "</div>";
            }
        }
    }
    $("#Addressee").html(strHtml);
}

//判断收件人是否过多
function moreSendUser(obj) {
    var txt = $(obj).text();
    if (txt == "更多∨") {
        $(obj).text("收起∧");
        $("#Addressee").removeClass("Send_div");
        $("#Addressee").addClass("Send2_div");
    }
    else {
        $(obj).text("更多∨");
        $("#Addressee").removeClass("Send2_div");
        $("#Addressee").addClass("Send_div");
    }
}

//接收选择
function GetSelIDs() {
    var SelIDs = $("#AddresseeID").val();
    var url = MsgProvider + "/User_ByUserIDs_List";
    var para = "{UserIDS:'" + SelIDs + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != null) {
        var strHtml = "";
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserName = result[i].UserName;
            strHtml += "<div style='border:0;height:30px;width:75px;line-height:30px;color:#666;float:left'>";
            strHtml += "<span style='width:65px;text-align:center;display:block;float:left'>" + UserName + "</span>";
            strHtml += "<a href='javascript:DelItem(" + UserID + ");' style='font-weight:bold;font-size:16px;display:block;width:10px;float:left;color:#666'>×</a>";
            strHtml += "</div>";
        }
    }
    $("#Addressee").html(strHtml);
}

//删除收件人
function DelItem(id) {
    //debugger;
    var One = "";
    var SelIDs = $("#AddresseeID").val();
    var ary = SelIDs.split(',');
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] != id) {
            One += ary[i] + ",";
        }
    }
    SelIDs = One.substring(0, One.length - 1);
    $("#AddresseeID").val(SelIDs);
    GetSelIDs();
}

//回复消息
function LetterNews() {
    var Address = $("#AddresseeID").val();
    var theme = $("#Theme").val();
    if (Address == ""||Address=="0") {
        alert("请添加收件人！")
        return;
    } else if (theme == "") {
        alert("请填写主题！")
        return;
    }
    var IsForSMS = false;
    var Conent = document.getElementById('frmoEditor1').contentWindow.getHTML();
    var IsForMail = $('#Closes').is(':checked');
    var ReceiveUserIDs = $("#AddresseeID").val();
    debugger;
    var url = MsgProvider + "/Message_Add";
    var para = "{MessageID:0,Title:'" + theme + "',Conten:'" + Conent + "',IsForMail:" + IsForMail + ",IsForSMS:" + IsForSMS + ",ReceiveUserIDs:'" + ReceiveUserIDs + "'}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != null) {
        alert("信息已回复！")
        window.location.href = 'Msg?Code=' + 2;
    } else {
        alert("回复失败,请联系管理员!");
        return;
    }
}

//我的消息返回
function Return() {
    window.location.href = 'Msg';
}

//添加收件人
function AddRole() {
    tname = $.layer({
        type: 2,
        shadeClose: false,
        title: ['添加收件人', true],
        closeBtn: [0, true],
        shade: [0.7, '#000'],
        border: [0],
        offset: ['20px', ''],
        area: ['785px', '550px'],
        iframe: { src: 'AddContact' }
    });
}