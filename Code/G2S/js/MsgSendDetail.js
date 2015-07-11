var Digital;
var MsgID;
var MsgProvider = window.appPatch + '/DataProvider/User/MsgProvider.aspx';
$(document).ready(function () {
    Judgment();
});

//获取数据并判断是否还有上一封或下一封邮件
function Judgment() {
    Digital = getUrlParam('Msgid');
    if (Digital == "" || Digital == null) {
        Digital = $("#MsgID").val();
    }
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digital + ",NextOrLast:0,Type:2}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        $("#MsgID").val(json.MessageID);
        $("#Temporary").val(json.SendUserID);
        $("#Cont").val(json.Conten);
        $("#Title").text(json.Title);
        $("#Name").text(json.SendUserName);
        $("#Time").text(json.CreateTime);
        var RNstr = DoReceie(json.ReceiveUserNames);
        $("#Recipients").html(RNstr);
        $("#Content").html($("#Cont").val());
        if (json.IsHaveLast == 0) {
            $("#last").css('color', '#808080');
            $("#last").removeAttr("href");
        }
        if (json.IsHaveNext == 0) {
            $("#next").css('color', '#808080');
            $("#next").removeAttr("href");
        }
    }
}
//处理收件人
function DoReceie(names) {
    var str = '';
    if (names != '' && names != undefined) {
        var zf = names.split(',');
        for (var i = 0; i < zf.length; i++) {
            if (i == zf.length - 1) {
                str += '<span style="display:block;float:left;height:20px" title="' + zf[i] + '">' + zf[i] + '</span>';
            }
            else {
                str += '<span style="display:block;float:left;height:20px" title="' + zf[i] + '">' + zf[i] + '、</span>';
            }
        }
    }
    return str;
}
//已发送消息返回
function GetReturn() {
    window.location.href = 'Msg?Code=' + 2;
}

//查看发送消息时删除
function OutMsgDel() {
    var MsgId = $("#MsgID").val();
    if (confirm("是否确定删除?删除后你将不能查看该消息!") == true) {
        var Digital = $("#Count").val();
        var url = MsgProvider + "/Message_Del";
        var para = "{Type:2,MessageIDs:'" + MsgId + "'}";
        var json = $G2S.GetAjaxAspx(para, url);
        if (json == true) {
            window.location.href = 'Msg?Code=' + 2;
        } else {
            alert("删除失败,请联系管理员!");
            return;
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
    var MsgId = $("#MsgID").val();
    window.location.href = 'ReplyMsg?Msgid=' + MsgId;
}

//转发
function Forward() {
    var MsgId = $("#MsgID").val();
    window.location.href = 'ForwardMsg?Msgid=' + MsgId;
}

//上一封
function GetUpper() {
    var MsgId = $("#MsgID").val();
    var Digital = MsgId;
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digital + ",NextOrLast:-1,Type:2}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        window.location.href = 'MsgSendDetail?Msgid=' + json.MessageID;
    }
}

//下一封
function GetNext() {
    var MsgId = $("#MsgID").val();
    var Digital = MsgId;
    var url = MsgProvider + "/Message_Get";
    var para = "{MessageID:" + Digital + ",NextOrLast:1,Type:2}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != "" || json != null) {
        window.location.href = 'MsgSendDetail?Msgid=' + json.MessageID;
    }
}
