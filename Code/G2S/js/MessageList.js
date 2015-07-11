//var og = new OmGrid();
var tname;
var MsgProvider = window.appPatch + '/DataProvider/User/MsgProvider.aspx';
var mUrl = window.appPatch;

$(document).ready(function () {
    var There=1;
    var r = location.search;
    if (r != "" || r != null) {
        There = $G2S.request("Code");
    }   
    if (There == undefined || There == "" || There == null) {
        GetMsgList();
    } else {
        shows(There);
    }
});

//发送消息
function SendNews() {
    window.location.href = 'MsgAdd';
}

//切换我的信息和发送信息
function shows(i) {
    var jbxx = document.getElementById("MessageList");
    var jzxx = document.getElementById("OutMessageList");
    var xx = document.getElementById("spaceitem1");
    var yy = document.getElementById("spaceitem2");
    if (i == 1) {
        jbxx.style.display = "block";
        jzxx.style.display = "none";
        xx.className = 'action';
        yy.className = '';
        $("#Count").val("1");
        PageIndex = 1;
    }
    if (i == 2) {
        jzxx.style.display = "block";
        jbxx.style.display = "none";
        xx.className = '';
        yy.className = 'action';
        $("#Count").val("2");
        PageIndex = 1;
    }
    GetMsgList();
}

var PageIndex = 1;//页数

var PageSize = 10;//页列表大小

//消息中心-我的消息
function GetMsgList() {
    $("#MessageList").html("");
    $("#OutMessageList").html("");
    var Digital = $("#Count").val();
    var Key = $("#tchName").val();
    var rowscount = "0";
    var strHtml = "";
    var url = MsgProvider + "/Message_List";
    var para1 = "{Key:'" + Key + "',Type:1,PageIndex:" + PageIndex + ",PageSize:10}";
    var para2 = "{Key:'" + Key + "',Type:2,PageIndex:" + PageIndex + ",PageSize:10}";
    var json1 = $G2S.GetAjaxAspx(para1, url);   
    var json2 = $G2S.GetAjaxAspx(para2, url);   
    try{
        $("#Shu").html("(" + json1[0].NoReadCount + ")");
    }
    catch (e) {
        $("#Shu").html("(0)");
    }
    if (Digital == "1") {      
        if (json1 != "") {
            strHtml += "<table>";
            strHtml += "    <tr>";
            strHtml += "    <th width='20'></th>";
            strHtml += "    <th width='30'></th>";
            strHtml += "    <th width='30'></th>";
            strHtml += "    <th style='text-align:left' width='500'>主题</th>";
            strHtml += "    <th width='120'>发送者</th>";
            strHtml += "    <th width='170'>发送时间</th>";
            strHtml += "    <th width='120'></th>";
            strHtml += "    </tr>";
            for (var i = 0; i < json1.length; i++) {
                var rows = json1[i];
                var ID = rows.MessageID;
                var title = rows.Title;
                var Username = rows.UserName;
                var Date = rows.CreateTime;
                var IsRead = rows.IsRead;
                rowscount = rows.RowsCount;
                strHtml += " <tr id='" + ID + "' style='height:42px;' onmouseover='$(\".Dan_" + ID + "\").show()' onmouseout='$(\".Dan_" + ID + "\").hide()'>";
                strHtml += " <td class='center'></td>";
                strHtml += " <td class='center'><input type='checkbox' onclick='IsselectAll()' name='chkItem' pid='" + ID + "'></td>";
                if (IsRead == "0") {
                    strHtml += " <td class='center' ><i style='background: url(" + mUrl + "/Images/u204.png) no-repeat; padding:0px 10px;'></i></td>";
                } else {
                    strHtml += " <td class='center'></td>";
                }
                strHtml += " <td class='left'><p class='user_id'><a href='javascript:GetMsgDetail(" + ID + ");'>" + title + "</a></p></td>";
                strHtml += " <td class='center' >" + (Username == null ? "" : Username) + "</td>";
                strHtml += " <td class='center' >" + Date + "</td>";
                strHtml += " <td class='center' ><span style='display:none;' class='Dan_" + ID + "'><i title='删除' style='cursor: pointer;background: url(" + mUrl + "/Images/icon_admin.png) no-repeat;background-position: -16px -48px;display: inline-block; width: 16px; height: 16px;margin-top:12px' onclick='MsgDel(this.id)'  id='" + ID + "' ></i></span></td>";
                strHtml += " </tr>";
            }
            strHtml += "    <tr>";
            strHtml += "    <td width='20'></td>";
            strHtml += "    <td class='center' width='30'><input type='checkbox' id='chkAll' name='chkAll' onclick='selectAll();'/></td>";
            strHtml += "    <td colspan='5'>选中以上所有</td>";
            strHtml += "    </tr>";
        } else {
            rowscount = "0";
        }
        $("#MessageList").html(strHtml);
        $Page.Paging({
            PageID: "#div_page_wrap",//容器ID
            PageIndex: PageIndex,//当前页
            PageSize: PageSize,//页面大小
            CountSize: 8,//分页按钮显示个数
            rowscount: rowscount,//总数
            method: function (index) { //触发分页后的回调
                PageIndex = index;
                GetMsgList();
            }
        });
        innt();
    } else {
        if (json2 != "") {
            strHtml += "<table>";
            strHtml += "    <tr>";
            strHtml += "    <th width='20'></th>";
            strHtml += "    <th width='30'></th>";
            strHtml += "    <th width='30'></th>";
            strHtml += "    <th style='text-align:left' width='500'>主题</th>";
            strHtml += "    <th width='160'>发送时间</th>";
            strHtml += "    <th width='160'>收件人数（未读/全部）</th>";
            strHtml += "    <th width='95'></th>";
            strHtml += "    </tr>";
            for (var i = 0; i < json2.length; i++) {
                var rows = json2[i];
                var ID = rows.MessageID;
                var title = rows.Title;
                var Date = rows.CreateTime;
                var NoReadUserCount = rows.NoReadUserCount;
                var UserCount = rows.UserCount;
                rowscount = rows.RowsCount;
                strHtml += " <tr id='" + ID + "' style='height:42px;' onmouseover='$(\".Tan_" + ID + "\").show()' onmouseout='$(\".Tan_" + ID + "\").hide()'>";
                strHtml += " <td class='center'></td>";
                strHtml += " <td class='center' ><input type='checkbox' onclick='IsselectAll()' name='chkItem' pid='" + ID + "'></td>";
                strHtml += " <td class='center' ></td>";
                strHtml += " <td class='left' ><p class='user_id'><a href='javascript:GetMsgSendDetail(" + ID + ");'>" + title + "</a></p></td>";
                strHtml += " <td class='center' >" + Date + "</td>";
                strHtml += " <td class='center' >" + NoReadUserCount + "" + '/' + "" + UserCount + "</td>";
                strHtml += " <td class='center'><span style='display:none;' class='Tan_" + ID + "'><i title='删除' onclick='MsgDel(this.id)' style='cursor: pointer;background: url(" + mUrl + "/Images/icon_admin.png) no-repeat;background-position: -16px -48px;display: inline-block; width: 16px; height: 16px; margin-top:12px'  id='" + ID + "'></i></span></td>";
                strHtml += " </tr>";
            }
            strHtml += "    <tr>";
            strHtml += "    <td width='20'></td>";
            strHtml += "    <td class='center' width='30'><input type='checkbox' id='chkAll' name='chkAll' onclick='selectAll();'/></td>";
            strHtml += "    <td colspan='5'>选中以上所有</td>";
            strHtml += "    </tr>";
            strHtml += "</table>";
        } else {
            rowscount = "0";
        }
        $("#OutMessageList").html(strHtml);
        $Page.Paging({
            PageID: "#div_page_wrap",//容器ID
            PageSize: PageSize,//页面大小
            CountSize: 8,//分页按钮显示个数
            rowscount: rowscount,//总数
            method: function (index) { //触发分页后的回调
                PageIndex = index;
                GetMsgList();
            }
        });
        innt();
    }
}

//列表样式
function innt() {
    $('#MessageList').each(function () {
        $(this).find('tr:odd').css('background', '#F2F2F2');
        $(this).find('tr').css('border-bottom', '1px solid #cccccc');
        $(this).find('tr').css('line-height', '35px');
        $(this).find('tr:last-child').css('border-bottom', '0px');
        $(this).find('tr:last-child').css('background', '');
    })
    $('#OutMessageList').each(function () {
        $(this).find('tr:odd').css('background', '#F2F2F2');
        $(this).find('tr').css('border-bottom', '1px solid #cccccc');
        $(this).find('tr').css('line-height', '35px');
        $(this).find('tr:last-child').css('border-bottom', '0px');
        $(this).find('tr:last-child').css('background', '');
    })
}

//我的消息页面跳转
function GetMsgDetail(id) {
    window.location.href = 'MsgDetail?Msgid=' + id;
}

//已发送的消息页面跳转
function GetMsgSendDetail(id) {
    window.location.href = 'MsgSendDetail?Msgid=' + id;
}

//复选框点击
function Check(ids, id) {
    var sid = ids.split(",");
    if (ids != "") {
        for (var i = 0; i < sid.length; i++) {
            var name = $("input[pid='" + sid[i] + "']").attr("sname");
            if (selectIDs.indexOf(sid[i] + "," + name + "[@&_username_&@]") < 0) {
                selectIDs += sid[i] + "," + name + "[@&_username_&@]";
                checkedID += sid[i] + ",";
            }
        }
    }
    if (id != 0) {
        if (!$("input[pid=" + id + "]").attr("checked")) {
            var name = $("input[pid='" + id + "']").attr("sname");
            var n = selectIDs.indexOf(id + "," + name + "[@&_username_&@]");
            if (n > -1) {
                selectIDs = selectIDs.replace(id + "," + name + "[@&_username_&@]", "");
                checkedID = checkedID.replace(id + ",", "");
            }
        }
    }
    if (sid.length < $(".ckbcss").length) {
        $("#c" + wid).attr("class", "ckb_div ckb_part");
    }
    if (sid.length == $(".ckbcss").length) {
        $("#c" + wid).attr("class", "ckb_div ckb_all");
    }
    if (ids == "") {
        $(".ckbcss").each(function (i) {
            var pid = $(this).attr("pid");
            var sname = $(this).attr("sname");
            selectIDs = selectIDs.replace(pid + "," + sname + "[@&_username_&@]", "");
            checkedID = checkedID.replace(pid + ",", "");
        });
        $("#c" + wid).attr("class", "ckb_div");
    }
    if (id == 0 && ids != "") {
        $("#c" + wid).attr("class", "ckb_div ckb_all");
    }
    //alert(selectIDs);
}

//批量删除
function DelInfo() {
    var obj = document.getElementsByName('chkItem');
    var ids = null;
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            var id = obj[i].parentNode.parentNode.id;
            if (ids == null) {
                ids = id;
            }
            else {
                ids = id + "," + ids;
            }
        }
    }
    if (ids != null) {
        MsgDel(ids);
    }
    else {
        //alert("请选择要删除的项!")
        layer.msg("请选择要删除的项!", 2, 3);
    }
}

//删除消息
function MsgDel(id) {
    if (confirm("是否确定删除!") == true) {
        var Digital = $("#Count").val();
        var url = MsgProvider + "/Message_Del";
        var para = "{Type:"+Digital+",MessageIDs:'"+id+"'}";
        var json = $G2S.GetAjaxAspx(para, url);
        if (json == true) {
            $G2S.message("删除成功");
            shows(Digital);
        } else {
            alert("删除失败,请联系管理员!");
            return;
        }
    }
}

//查看我的消息时删除
function LookMsgDel(ID) {
    if (confirm("是否确定删除?删除后你将不能查看该消息!") == true) {
        var Digital = $("#Count").val();
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

//查看发送消息时删除
function OutMsgDel(ID) {
    if (confirm("是否确定删除?删除后你将不能查看该消息!") == true) {
        var Digital = $("#Count").val();
        var url = MsgProvider + "/Message_Del";
        var para = "{Type:2,MessageIDs:'" + ID + "'}";
        var json = $G2S.GetAjaxAspx(para, url);
        if (json == true) {
            window.location.href = 'Msg?Code=' + 2;
        } else {
            alert("删除失败,请联系管理员!");
            return;
        }
    }
}

//我的消息返回
function Return() {
    window.location.href = 'Msg';
}

//已发送消息返回
function GetReturn() {
    window.location.href = 'Msg?Code=' + 2;
}

//发送信息
function SendInformation() {
    var Address = $("#Addressee").val();
    var theme = $("#Theme").val();
    if (Address=="") {
        alert("请添加收件人！")
        return;
    } else if (theme=="") {
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
        Conent = $("#Text").val();
    }
    var IsForMail = $('#Closes').is(':checked');
    var ReceiveUserIDs = $("#AddresseeID").val();
    var url = MsgProvider + "/Message_Add";
    var para = "{MessageID:0,Title:'" + theme + "',Conten:'" + Conent + "',IsForMail:" + IsForMail + ",IsForSMS:" + IsForSMS + ",ReceiveUserIDs:'" + ReceiveUserIDs + "'}";
    var json = $G2S.GetAjaxAspx(para, url);
    if (json != null) {
        //alert("信息已发送！")
        layer.msg("信息已发送!", 2, 1);
        window.location.href = 'Msg?Code=' + 2;
    } else {
        alert("发送失败,请联系管理员!");
        return;
    }
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
        iframe: { src: 'AddContact'  }
    });
}

//全选
function selectAll() {
    var obj = $("input[name=chkAll]");
    var cks = $("input[name=chkItem]");
    var ckslen = cks.length;
    for (var i = 0; i < ckslen; i++) {
        if (obj[0].checked == true) {
            cks[i].checked = true;
        }
        else {
            cks[i].checked = false;
        }
    }
}

//判断是否全选
function IsselectAll() {
    var obj = $("#chkAll");
    var cks = $("input[name=chkItem]");
    var ckslen = cks.length;
    var n = 0;
    for (var i = 0; i < ckslen; i++) {
        var ck = cks[i];
        if (ck.checked == true) {
            n++;
        }
    }
    if (n == ckslen) {
        obj.attr("checked", true);
    }
    else {
        obj.removeAttr("checked");
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
    if (json != null) {
        //alert("发送成功！");
        layer.msg("发送成功!", 2, 1);
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



