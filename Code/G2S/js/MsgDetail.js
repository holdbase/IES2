var Digital;
var MsgID;
var MsgProvider = window.appPatch + '/DataProvider/User/MsgProvider.aspx';
$(document).ready(function () {
    //$("#Content").html($("#Cont").val());
    Judgment();
});

//获取数据并判断是否还有上一封或下一封邮件
function Judgment() {
    Digital = getUrlParam('Msgid');
    if (Digital==""||Digital==null) {
        Digital = $("#MsgID").val();
    }
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digital + ",NextOrLast:0,Type:1}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        $("#MsgID").val(json.MessageID);
        $("#Temporary").val(json.SendUserID);
        $("#Cont").val(json.Conten);
        $("#Title").text(json.Title);
        $("#Name").text(json.SendUserName);
        $("#Time").text(json.CreateTime);
        $("#Content").html($("#Cont").val());
        if (json.IsHaveLast == 0) {
            $("#last").css('color', '#808080');
            $("#last").removeAttr("href");
        }
        if (json.IsHaveNext==0) {
            $("#next").css('color', '#808080');
            $("#next").removeAttr("href");
        }
    }
    
}

//获取URL参数的值
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//回复
function replyInformation() {
    MsgID = $("#MsgID").val();
    window.location.href = 'ReplyMsg?Msgid=' + MsgID;
}

//转发
function Forward() {
    MsgID = $("#MsgID").val();
    window.location.href = 'ForwardMsg?Msgid=' + MsgID;
}

//我的消息返回
function Return() {
    window.location.href = 'Msg';
}

//查看我的消息时删除
function LookMsgDel() {
    if (confirm("是否确定删除?删除后你将不能查看该消息!") == true) {
        var Digital = $("#Count").val();
        var ID = $("#MsgID").val();
        var url = MsgProvider + "/Message_Del";
        var para = "{Type:1,MessageIDs:'" + ID + "'}";
        var json = $G2S.GetAjaxAspx(para, url);
        if (json == true) {
            window.location.href = 'Msg';
        } else {
            alert("删除失败,请联系管理员!");
            return;
        }
    }
}

//快速发送
function QuickReply() {
    var Address = $("#Name").text();
    var theme = $("#Title").text();
    var IsForMail = false;
    var IsForSMS = false;
    var Conent = $("#blank").val();
    var Ids = $("#Temporary").val();
    var url = MsgProvider + "/Message_Add";
    var para = "{MessageID:0,Title:'" + theme + "',Conten:'" + Conent + "',IsForMail:" + IsForMail + ",IsForSMS:" + IsForSMS + ",ReceiveUserIDs:'" + Ids + "'}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null ||json != undefined) {
        //alert("发送成功！")
        layer.msg("发送成功!", 2, 1);
        //window.location.href = 'Msg?Code=' + 2;
        Empty();
    } else {
        alert("发送失败,请联系管理员!");
        return;
    }
}

//取消快速回复
function Empty() {
    $("#blank").val("");
}

//上一封
function GetUpper() {
    var Digita = $("#MsgID").val();
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digita + ",NextOrLast:-1,Type:1}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        window.location.href = 'MsgDetail?Msgid=' + json.MessageID;
    }
}

//下一封
function GetNext() {
    var Digita = $("#MsgID").val();
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digita + ",NextOrLast:1,Type:1}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        window.location.href = 'MsgDetail?Msgid=' + json.MessageID;
    }
}