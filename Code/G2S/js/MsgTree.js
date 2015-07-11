var zTree;
var zNodes;
var streeNode;
var MsgProvider = window.appPatch + '/DataProvider/User/MsgProvider.aspx';
$(document).ready(function () {
    
    ResetTree();    
    ResetContactTree();
    $("#wName").html(zNodes[0].Name);
    CalculationNum();
});

//班级下拉框
function classdroplist() {
    var classlist = OCClass_UserID_tree();
    var classdrop = $("select[name=classdrop]");
    var strHtml = "<option value='0'>班级</option>";
    if (classlist != null) {
        for (var i = 0; i < classlist.length; i++) {
            ClassID = classlist[i].ID;
            ClassName = classlist[i].Name;
            strHtml += "<option value='" + ClassID + "'>" + ClassName + "</option>";
        }
    }
    classdrop.html(strHtml);
}

//计算我的联系人总人数
function CalculationNum() {
    var url = MsgProvider + "/ClassUser_List";
    var para = "{Key:'',OCClassID:0,UserType:0,GroupID:0,PageIndex:1,PageSize:10000}";
    var result = $G2S.GetAjaxAspx(para, url);
    var counts = "";
    for (var i = 0; i < result.length; i++) {
        var rows = result[i];
        var count = rows.UserID;
        counts += count + ',';
    }
    var Array = counts.split(",");
    var strArray = Dot(Array);
    var Num = strArray.split(",").length;
    $("#TNumber").text(Num);
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

//切换联系人,联系组
function Getlook(i) {
    var jbxx = document.getElementById("div_tea");
    var jzxx = document.getElementById("set");
    var xx = document.getElementById("People");
    var yy = document.getElementById("group");
    if (i == 1) {
        jbxx.style.display = "block";
        jzxx.style.display = "none";
        xx.className = 'Frame';
        yy.className = 'border';
        CalculationNum();
    }
    if (i == 2) {
        jzxx.style.display = "block";
        jbxx.style.display = "none";
        xx.className = 'border';
        yy.className = 'Frame';
    }
}

//关闭
function Close() {
    parent.layer.close(parent.tname);
}

//班级树
function ResetTree() {
    Hidden();
    zNodes = OCClass_UserID_tree();
    var treeObj = $("#treeDemo");
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    //zTree = $.fn.zTree.getZTreeObj("treeDemo");
    //curMenu = zTree.getNodes()[0].children[0].children[0];
    //zTree.selectNode(curMenu);
    treeObj.addClass("showIcon");
}
var OCClass_UserID_tree = function () {
    var strHtml = "";
    var url = MsgProvider + "/OCClass_UserID_Tree";
    var para = "{}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        return result;
    } else {
        return "";
    }
}
//对树形结构的一些设置
var setting = {
    view: {
        selectedMulti: false,
        showIcon: false,
        dblClickExpand: true,
        showLine: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "ID",
            pIdKey: "ParentID",
            rootPId: 0
        },
        key: {
            title: "Name",  //设置title
            name: "Name"
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        onMouseDown: onMouseDown,
        beforeCheck: zTreeBeforeCheck,
        onCheck: zTreeOnCheck
    },
    check: {
        enable: true
    }
};

function zTreeBeforeCheck(treeId, treeNode) {
    OCClassID = treeNode.ID;
    GetUserList();
    return true;
};

function zTreeOnCheck(event, treeId, treeNode) {
    if (treeNode.checked) {
        $("input[name='chkAll']").attr("checked", "checked");
    } else {
        $("input[name='chkAll']").attr("checked", false);
    }
    streeNode = treeNode;
    checkedAll();
};

function beforeDrag(treeId, treeNodes) {
    return false;
}

function onMouseDown(event, treeId, treeNode) {
    if (treeNode == null) {
        return;
    }
    $("#wName").html(treeNode.Name);
    OCClassID = treeNode.ID;
    $("#dropClassName").text(treeNode.Name);
    //console.log(OCClassID);
    flag = false;
    GetUserList();
    //GetTextUserLidt();
    //myfunction();
}

//隐藏
function Hidden() {
    var droplist = $("select[name=classdrop]");
    droplist.hide();
    var classdr = $("select[name=classdrop] option:selected").text();
    $("#dropClassName").text(classdr);
    if (classdr == "") {
        $("#dropClassName").text("班级");
    }
}

//下拉列表班级下的联系人
function GetTextUserLidt() {
    var droplist = $("select[name=classdrop]");
    droplist.hide();
    var classdr = $("select[name=classdrop] option:selected").text();
    $("#dropClassName").text(classdr);
    if (classdr == "") {
        $("#dropClassName").text("班级");
    }
    if ($("select[name=classdrop]").val() != null) {
        OCClassID = $("select[name=classdrop]").val();
    }
    if ($("select[name=role2]").val() != null)
    {
        role = $("select[name=role2]").val();
    }
    var strHtml = "";
    var key = $("#txtKey").val();
    $("#grou").html("");
    var url = MsgProvider + "/ClassUser_List";
    var para = "{Key:'" + key + "',OCClassID:" + OCClassID + ",UserType:" + role + ",GroupID:0,PageIndex:1,PageSize:1000}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            var rows = result[i];
            var UserID = rows.UserID;
            var UserName = rows.UserName;
            var UserNo = rows.UserNo;
            var Type;
            if (rows.UserType == '4') {
                Type = "学生";
            } else if (rows.UserType == '8') {
                Type = "教师";
            }
            var ClassName = rows.ClassName;
            var RowsCount = rows.RowsCount;
            strHtml += " <tr style='height:31px; border-bottom: 1px solid #ccc;' id='" + UserID + "'>";
            strHtml += " <td class='center' style='width:35px;'><input style='padding-left:-2px;' id='tigger' type='checkbox' name='ckbItem' pid='" + UserID + "' sname='" + UserName + "'class='ckbcss' onclick='Calculation();'></td>";
            strHtml += " <td style='text-indent:1em; width:95px;' class='center'>" + UserName + "</td>";
            strHtml += " <td style='text-indent:1em; width:85px;' class='center'>" + UserNo + "</td>";
            strHtml += " <td style='text-indent:1em; width:95px;' class='center'>" + Type + "</td>";
            strHtml += " <td style='text-indent:1em; width:120px;' class='center'>" + ClassName + "</td>";
            strHtml += " </tr>";
        }
        $("#wName").html(result[0].ClassName + "(" + result[0].RowsCount + ")");
    }
    strHtml += "</table>";

    $("#grou").html(strHtml);
    innt();
    //$("#TNumber").text(RowsCount);
}

//显示名称
function GetName() {

    var item = $("#selroom option:selected").text();
    $("#IdentityName").val(item);
    GetUserList();
}

//班级下联系人
function GetUserList() {
    var role = 0;
    var SelectID = $("select[name=role2]").val();
    if (SelectID != null) {
        role = SelectID;
    }
    var strHtml = "";
    var key = $("#txtKey").val();
    $("#GroupList").html("");
    var url = MsgProvider + "/ClassUser_List";
    var para = "{Key:'" + key + "',OCClassID:" + OCClassID + ",UserType:" + role + ",GroupID:0,PageIndex:1,PageSize:1000}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        strHtml += "<table border='0' cellpadding='0' cellspacing='0' width='490px'>";
        strHtml += "      <colgroup>"
        strHtml += "        <col width='30px' height='30px' /><col width='75px' height='30px' /><col width='75px' height='30px' /><col width='75px' height='30px' /><col width='75px' height='30px' />";
        strHtml += "      </colgroup>";
        strHtml += "    <tr  class='item_title' style='background:#ccc;color:#000;line-height:30px'>";
        strHtml += "    <th style='border-right:1px solid #fff;border-left:1px solid #E4E4E4;' width='30'><input type='checkbox' name='chkAll' onclick='checkedAll()'></th>";
        strHtml += "    <th style='border-right:1px solid #fff;text-indent:1em' width='100'>姓名</th>";
        strHtml += "    <th style='border-right:1px solid #fff;text-indent:1em' width='100'>教工号/学号</th>";
        strHtml += "    <th style='border-right:1px solid #fff;text-indent:1em' width='100'>";
        strHtml += "    <select id='selroom' name='role2' onchange='GetUserList()' style='width:75px;height:24px;'>";
        strHtml += "    <option value='0'>身份</option>";
        strHtml += "    <option value='8'>教师</option>";
        strHtml += "    <option value='4'>学生</option>";
        strHtml += "    </th>";
        strHtml += "    <th style='border-right:1px solid #E4E4E4;text-indent:1em' width='100'>所在班级</th>";
        strHtml += "    </tr>";
        
        for (var i = 0; i < result.length; i++) {
            var rows = result[i];
            var UserID = rows.UserID;
            var UserName = rows.UserName;
            var UserNo = rows.UserNo;
            var Type;
            if (rows.UserType == '4') {
                Type = "学生";
            } else if (rows.UserType == '8') {
                Type = "教师";
            }
            var ClassName = rows.ClassName;
            var RowsCount = rows.RowsCount;
            strHtml += " <tr style='height:31px' id='" + UserID + "'>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;border-left:1px solid #E4E4E4;' class='center'  width='30'><input id='tigger' type='checkbox' name='ckbItem' pid='" + UserID + "' sname='" + UserName + "'class='ckbcss' onclick='Calculation();'></td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center'  width='100'>" + UserName + "</td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center' width='100'>" + UserNo + "</td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center'  width='100'>" + Type + "</td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center'  width='100'>" + ClassName + "</td>";
            strHtml += " </tr>";
        }
        $("#wName").html(result[0].ClassName + "(" + result[0].RowsCount + ")");
    }
    strHtml += "</table>";

    $("#GroupList").html(strHtml);
    $("#selroom").val(SelectID);
    innt();
    //$("#TNumber").text(RowsCount);
}

//班级事件
function dropShow() {
    var droplist = $("select[name=classdrop]");
    var ishide = droplist.is(":hidden")
    if (ishide == true) {
        droplist.show();
    }
    else {
        droplist.hide();
    }
}

//列表样式
function innt() {
    $('#GroupList').each(function () {        
        $(this).find('tr:even').css('background', '#F2F2F2');
        $(this).find('tr:first').css('background', '#CCCCCC');
    })
    $('#ContactList').each(function () {
        $(this).find('tr:even').css('background', '#F2F2F2');
        $(this).find('tr:first').css('background', '#CCCCCC');
        //$(this).find('tr:odd').css('background', '#F2F2F2');
        //$(this).find('tr').css('border-bottom', '1px solid #cccccc');
        //$(this).find('tr').css('line-height', '35px');
        //$(this).find('tr:last-child').css('border-bottom', '0px');
        //$(this).find('tr:last-child').css('background', '');
    })
}

//联系组树
function ResetContactTree() {
    zNodes = Contact_tree();
    var treeObj = $("#grouptreeDemo");
    $.fn.zTree.init($("#grouptreeDemo"), settsing, zNodes);
    //zTree = $.fn.zTree.getZTreeObj("treeDemo");
    //curMenu = zTree.getNodes()[0].children[0].children[0];
    //zTree.selectNode(curMenu);
    treeObj.addClass("showIcon");
}
var Contact_tree = function () {
    $(".ContactzTree_list").html("");
    var strHtml = "";
    var url = MsgProvider + "/MyGroup_List";
    var para = "{Key:'',PageIndex:1,PageSize:10000}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "" || result != "暂无数据") {
        for (var i = 0; i < result.length; i++) {
            result[i].ParentID = 0;
        }
        result.splice(0, 0, { GroupID: 0, GroupName: "全部", ParentID: -1 })
        return result;
    } else {
        return "";
    }
}
var settsing = {
    view: {
        selectedMulti: false,
        showIcon: false,
        dblClickExpand: true,
        showLine: false
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "GroupID",
            pIdKey: "ParentID",
            rootPId: 0
        },
        key: {
            title: "GroupName",  //设置title
            name: "GroupName"
        }
    },
    callback: {
        beforeDrag: beforeDrags,
        onMouseDown: onMouseDowns,
        beforeCheck: zTreeBeforeChecks,
        onCheck: zTreeOnChecks

    },
    check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: { "Y": "ps", "N": "ps" }
    }

};

function zTreeBeforeChecks(treeId, treeNode) {
    OCClassID = treeNode.GroupID;
    GetConterUserList();
    return true;
};

function zTreeOnChecks(event, treeId, treeNode) {
    if (treeNode.checked) {
        $("input[name='chkAll']").attr("checked", "checked");
    } else {
        $("input[name='chkAll']").attr("checked", false);
    }
    streeNode = treeNode;
    checkedAll();
};

function beforeDrags(treeId, treeNodes) {
    return false;
}

function onMouseDowns(event, treeId, treeNode) {
    if (treeNode == null) {
        return;
    }
    OCClassID = treeNode.GroupID;
    flag = false;
    GetConterUserList();
}

function GetConterUserList() {
    var strHtml = "";
    var key = $("#txtKey").val();
    $("#ContactList").html("");
    var url = MsgProvider + "/MyGroupUser_List";
    var para = "{GroupID:" + OCClassID + ",UserType:0}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        strHtml += "<table border='0' cellpadding='0' cellspacing='0' width='490px'>";
        strHtml += "      <colgroup>"
        strHtml += "        <col width='30px' height='30px' /><col width='75px' height='30px' /><col width='75px' height='30px' /><col width='75px' height='30px' /><col width='75px' height='30px' />";
        strHtml += "      </colgroup>";
        strHtml += "    <tr  class='item_title' style='background:#ccc;color:#000;line-height:30px'>";
        strHtml += "    <th style='border-right:1px solid #fff;border-left:1px solid #E4E4E4;' width='30'><input type='checkbox' name='chkAll' onclick='checkedAll()'></th>";
        strHtml += "    <th style='border-right:1px solid #fff;text-indent:1em' width='100'>姓名</th>";
        strHtml += "    <th style='border-right:1px solid #fff;text-indent:1em' width='100'>教工号/学号</th>";
        strHtml += "    <th style='border-right:1px solid #fff;text-indent:1em' width='100'>身份</th>";
        strHtml += "    <th style='border-right:1px solid #E4E4E4;text-indent:1em' width='100'>所在班级</th>";
        strHtml += "    </tr>";
        for (var i = 0; i < result.length; i++) {
            var rows = result[i];
            var UserID = rows.UserID;
            var UserName = rows.UserName;
            var UserNo = rows.UserNo;
            var Type;
            if (rows.UserType == '4') {
                Type = "学生";
            } else if (rows.UserType == '8') {
                Type = "教师";
            }
            var ClassName = rows.ClassName;
            //strHtml += " <tr id='" + UserID + "'>";
            //strHtml += " <td width='20'></td>";
            //strHtml += " <td class='center'  width='30'><input id='tigger' type='checkbox' name='ckbItem' pid='" + UserID + "' sname='" + UserName + "'class='ckbcss' onclick='Calculation();'></td>";
            //strHtml += " <td class='center'  width='100'>" + UserName + "</td>";
            //strHtml += " <td class='center' width='100'>" + UserNo + "</td>";
            //strHtml += " <td class='center'  width='100'>" + Type + "</td>";
            //strHtml += " <td class='center'  width='100'>" + ClassName + "</td>";
            //strHtml += " </tr>";
            strHtml += " <tr style='height:31px' id='" + UserID + "'>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;border-left:1px solid #E4E4E4;' class='center'  width='30'><input id='tigger' type='checkbox' name='ckbItem' pid='" + UserID + "' sname='" + UserName + "'class='ckbcss' onclick='Calculation();'></td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center'  width='100'>" + UserName + "</td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center' width='100'>" + UserNo + "</td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center'  width='100'>" + Type + "</td>";
            strHtml += " <td style='border-bottom:1px solid #E4E4E4;border-right:1px solid #E4E4E4;text-indent:1em' class='center'  width='100'>" + ClassName + "</td>";
            strHtml += " </tr>";
           
        }
    }
    strHtml += "</table>";
    $("#ContactList").html(strHtml);
    innt();
}

function Calculation() {
    var obj = $(".ckbcss");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            var Num = $("#Number").val();
            Num += 1;
        }
    }
    //if ($("#tigger").attr("checked") == "checked") {
    //    var Num = $("#Number").title();
    //    Num += 1;
    //} else {
    //    var Num = $("#Number").title();
    //    Num -= 1;
    //}
}

var SelIDs = "";
//添加收件人
function SurdAdd() {
    var obj = $(".ckbcss");
    var ids = "";
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            var id = $(obj[i]).attr("pid");
            ids += id + ',';
        }
    }
    if (ids != "") {
        ids = ids.substring(0, ids.length - 1);
        var ary = ids.split(',');
        var Object = window.parent;
        SelIDs = Object.AddresseeID.value;
        if (SelIDs == "") {
            SelIDs = ids;
            Object.AddresseeID.value = SelIDs;
            Object.GetSelIDs();
            parent.layer.close(parent.tname);
        }
        else {
            if (ids != "") {
                var one = "";
                var ass = SelIDs.split(',');
                for (var i = 0; i < ary.length; i++) {
                    if (ass.indexOf(ary[i]) == -1) {
                        one += ary[i] + ",";
                    }
                }
                if (one != "") {
                    SelIDs =  one+SelIDs;
                }
                Object.AddresseeID.value = SelIDs;
                Object.GetSelIDs();
                parent.layer.close(parent.tname);
            }
            else {
                Object.AddresseeID.value = SelIDs;
                Object.GetSelIDs();
                parent.layer.close(parent.tname);
            }
        }
    }
    else {
        Object.GetSelIDs();
        parent.layer.close(parent.tname);
    }
}

//选中/取消全部
function checkedAll() {
    $("input[name='ckbItem']").each(function () {
        if ($("input[name='chkAll']").attr("checked") == "checked") {
            $(this).attr("checked", "checked");
        }
        else {
            $(this).attr("checked", false);
        }
    });
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