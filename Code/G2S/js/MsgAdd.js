var MsgProvider = window.appPatch + '/DataProvider/User/MsgProvider.aspx';
$(document).ready(function () {
    GetSelIDs();
});
var IsMore = true;
//接收选择
function GetSelIDs() {
    var SelIDs = $("#AddresseeID").val();
    var array = SelIDs.split(',');
    SelIDs = Dot(array);
    $("#AddresseeID").val(SelIDs);
    var url = MsgProvider + "/User_ByUserIDs_List";
    var para = "{UserIDS:'" + SelIDs + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != null) {
        var strHtml = "";
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserName = result[i].UserName;
            if (i == 10) {
                strHtml += "<div style='border:0;height:30px;width:50px;line-height:30px;color:#666;float:left'>";
                strHtml += "<a id='moreandmore' href='javascript:;'onclick='moreSendUser(this);' style='width:50px;text-align:center;display:block;float:left;color:#666'>" + (IsMore ? "更多∨" : "收起∧") + "</a>";
                strHtml += "</div>";
                strHtml += "<div style='border:0;height:30px;width:75px;line-height:30px;color:#666;float:left'>";
                strHtml += "<span style='width:65px;text-align:center;display:block;float:left;overflow:hidden;height:30px' title=" + UserName + ">" + UserName + "</span>";
                strHtml += "<a href='javascript:DelItem(" + UserID + ");' style='font-weight:bold;font-size:16px;display:block;width:10px;float:left;color:#666'>×</a>";
                strHtml += "</div>";
            }
            else {
                strHtml += "<div style='border:0;height:30px;width:75px;line-height:30px;color:#666;float:left'>";
                strHtml += "<span style='width:65px;text-align:center;display:block;float:left;overflow:hidden;height:30px' title=" + UserName + ">" + UserName + "</span>";
                strHtml += "<a href='javascript:DelItem(" + UserID + ");' style='font-weight:bold;font-size:16px;display:block;width:10px;float:left;color:#666'>×</a>";
                strHtml += "</div>";
            }
        }
    }
    $("#Addressee").html(strHtml);
}

//去掉数组中相同项
var Dot = function (array) {
    var o = {};
    for (var i = 0; i < array.length; i++) {
        o[array[i]] = array[i];
    }
    array = [];
    for (var el in o) {
        if (el == o[el]) {
            array.push(el - 0);
        }
    }
    var ss = array.join(",");
    return ss;
}

//判断是否发送短信
function Message() {
    if ($("#SMS").attr("checked") == "checked") {
        $("#Close").hide();
        $("#Open").show();
        $("#result").show();
    } else {
        $("#Close").show();
        $("#Open").hide();
        $("#result").hide();
    }
}

//删除选中的收件人
function DelItem(id) {
    var One = "";
    var SelIDs = $("#AddresseeID").val();
    var ary = SelIDs.split(',');
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] != id) {
            One += ary[i] + ",";
        }
    }
    if (SelIDs != "") {
        SelIDs = One.substring(0, One.length - 1);
    }
    else {
        SelIDs = One;
    }
    $("#AddresseeID").val(SelIDs);
    var more = $("#moreandmore");
    if (more != undefined) {
        if (more.val() == "更多∨") {
            IsMore = true;
        } else {
            IsMore = false;
        }
    }   
    GetSelIDs();
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

//发送信息
function SendInformation() {
    var Address = $("#AddresseeID").val();
    var theme = $("#Theme").val();
    if (Address == "" || Address==0) {
        alert("请添加收件人！")
        return;
    } else if (theme == "") {
        alert("请填写主题！")
        return;
    }
    var IsForSMS = false;
    var Conent = "";
    if ($('#SMS').attr('checked') || $('#SMS').attr('checked') == "checked") {
        IsForSMS = true;
        Conent = $("#oEditor1").val();
    } else {
        IsForSMS = false;
        Conent = document.getElementById('frmoEditor1').contentWindow.getHTML();
    }
    var IsForMail = $('#Closes').is(':checked');
    var ReceiveUserIDs = $("#AddresseeID").val();
    var url = MsgProvider + "/Message_Add";
    var para = "{MessageID:0,Title:'" + theme + "',Conten:'" + Conent + "',IsForMail:" + IsForMail + ",IsForSMS:" + IsForSMS + ",ReceiveUserIDs:'" + ReceiveUserIDs + "'}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != null) {
        $G2S.message("信息已发送！");
        window.location.href = 'Msg?Code=' + 2;
    } else {
        $G2S.message("发送失败,请重试!");
        return;
    }
}

//我的消息返回
function Return() {
    window.location.href = 'Msg';
}

var tname;
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

//计算输入的字数
$("#oEditor1").keyup(function () {
    debugger;
    var length = 67;
    var content_len = $("#oEditor1").val().length;
    var in_len = length-content_len;
        
    // 当用户输入的字数大于制定的数时，让提交按钮失效
    // 小于制定的字数，就可以提交
    if(in_len >=0){
        $("#result").html('您还可以输入'+in_len+'字');
        $("#button").attr("disabled",false);
        // 可以继续执行其他操作
    }else{
        $("#result").html('您还可以输入'+in_len+'字');
        $("#button").attr("disabled",true);
        return false;
    }        
});