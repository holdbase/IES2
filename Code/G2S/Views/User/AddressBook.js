var OCClassID = 0;//班级编号
var PageIndex = 1;
var PageSize = 10;
var PageSize2 = 8;
var rowscount = "0";
var scopemin = 1;
var PageIndex2 = 1;
var rowscount2 = "0";
var selectIDS = ""; //已选ID
var flagcount = 0;
var pageii;
var AddressProvider = window.appPatch + '/DataProvider/User/AddressProvider.aspx';

$(document).ready(function () {
    resetTree();
    GetUserList();
});
var zTree;
var zNodes;

function resetTree() {
    zNodes = OCClass_UserID_Tree();
    var treeObj = $("#treeDemo");
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
    treeObj.addClass("showIcon");
}
//用户的在线课程及其下的班级树
var OCClass_UserID_Tree = function () {
    var url = AddressProvider + "/OCClass_UserID_Tree";
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
        showLine: false,
        addDiyDom: addDiyDom
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
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
        onCollapse: onCollapse,
        onMouseDown: onMouseDown,
        beforeClick: beforeClick
    }

};
function addDiyDom(treeId, treeNode) {
    var spaceWidth = 5;
    var switchObj = $("#" + treeNode.tId + "_switch"),
    icoObj = $("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);
    var spanObj = $("#" + treeNode.tId + "_span");
    var aObj = $("#" + treeNode.tId + "_a");

    if (treeNode.level > 0) {
        var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
        switchObj.before(spaceStr);
        spanObj.before("<span>-</span>");
        spanObj.after("<span>（" + treeNode.UserCount + "）</span>");
        aObj.after("<div id='" + treeNode.tId + "_er' class='u46_img'></div>");
    }
    else {
        aObj.after("<div id='" + treeNode.tId + "_er' class='u74_img'></div>");
    }
}
function beforeClick(treeId, treeNode) {
    if (treeNode.level == 0 || treeNode.level == 1) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
        return true;
    }
    return true;
}
function onCollapse(event, treeId, treeNode) {
    zTree.expandNode(treeNode, false, true, true);
}
function beforeDrag(treeId, treeNodes) {
    return false;
}
function onMouseDown(event, treeId, treeNode) {
    if (treeNode == null) {
        return;
    }
    var id = treeNode.tId + "_er";
    $("#" + treeNode.tId + "_er").show();
    var er1 = $(".u74_img");
    var er2 = $(".u46_img");
    for (var i = 0; i < er1.length; i++) {
        if (er1[i].id != id) {
            $("#" + er1[i].id).hide();
        }
    }
    for (var i = 0; i < er2.length; i++) {
        if (er2[i].id != id) {
            $("#" + er2[i].id).hide();
        }
    }
    OCClassID = treeNode.ID;
    GetUserList();
}
//分页大小修改
function SizeChange() {
    PageSize = $("select[name=pagesize]").val();
    PageIndex = 1;
    GetUserList();
}
var imgsrc = window.appPatch+"/Images/u62.png";
//班级下联系人
function GetUserList() {
    var strHtml = '';
    var key = $("#Key").val();
    $("#GroupList").html("");
    var url = AddressProvider + "/ClassUser_List";
    var para = "{Key:'" + key + "',OCClassID:" + OCClassID + ",UserType:0,GroupID:0,PageIndex:" + PageIndex + ",PageSize:" + PageSize + "}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserType = result[i].UserType;
            UserName = result[i].UserName;
            Mobile = result[i].Mobile;
            Email = result[i].Email;
            Img = result[i].ImgFileUrl;
            if (Img == null) {
                Img = imgsrc;
            }
            ClassName = result[i].ClassName;
            rowscount = result[i].RowsCount;
            if (UserType == 8) {
                strHtml += "<div id='" + UserID + "' class='leftviw rborder'>";
                strHtml += "<div style='width:108px;height:108px;float:left'>";
                strHtml += "<img src='" + Img + "' style='width:70px;height:70px;margin:19px' />";
                strHtml += "</div>";
                strHtml += "<div style='float: left; width: 238px; height: 108px;'>";
                strHtml += "<div style='width:100%;height:25px;float:left;margin-top:10px'>";
                strHtml += "<span style='line-height:25px;font-size:16px;font-weight:bold;float:left'>" + UserName + "</span>";
                strHtml += "<div class='u40_img'></div>";
                strHtml += "<div class='u38_img'>教师</div>";
                strHtml += "<a class='u204_btn' href='javascript:sendUserIDS(" + UserID + ")'></a>";
                strHtml += "</div>";
                strHtml += "<div style='width:100%;height:25px;float:left;'>";
                strHtml += "<span style='float:left;width:35px;line-height:27px'>手机:</span>";
                strHtml += "<span style='float:left;line-height:27px'>" + Mobile + "</span>";
                strHtml += "</div>";
                strHtml += "<div style='width:100%;height:25px;float:left;'>";
                strHtml += "<span style='float: left; width: 35px; line-height: 25px'>邮箱:</span>";
                strHtml += "<span style='float: left;  line-height: 25px'>" + Email + "</span>";
                strHtml += "</div>";
                strHtml += "</div>";
                strHtml += "</div>";
            }
            else if (UserType == 4) {
            }
        }
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserType = result[i].UserType;
            UserName = result[i].UserName;
            Mobile = result[i].Mobile;
            Email = result[i].Email;
            Img = result[i].ImgFileUrl;
            if (Img == null) {
                Img = imgsrc;
            }
            ClassName = result[i].ClassName;
            rowscount = result[i].RowsCount;
            if (UserType == 8) {
            }
            else if (UserType == 4) {
                strHtml += "<div id='" + UserID + "' class='leftviw rborder'>";
                strHtml += "<div style='width:108px;height:108px;float:left'>";
                strHtml += "<img src='" + Img + "' style='width:70px;height:70px;margin:19px' />";
                strHtml += "</div>";
                strHtml += "<div style='float: left; width: 238px; height: 108px;'>";
                strHtml += "<div style='width:100%;height:25px;float:left;margin-top:10px'>";
                strHtml += "<span style='line-height:25px;font-size:16px;font-weight:bold;float:left'>" + UserName + "</span>";
                strHtml += "<div class='u142_img'></div>";
                strHtml += "<div class='u140_img'>学生</div>";
                strHtml += "<a class='u204_btn' href='javascript:sendUserIDS(" + UserID + ")'></a>";
                strHtml += "</div>";
                strHtml += "<div style='width:100%;height:20px;float:left;'>";
                strHtml += "<span style='float:left;width:35px;'>手机:</span>";
                strHtml += "<span style='float:left;'>" + Mobile + "</span>";
                strHtml += "</div>";
                strHtml += "<div style='width:100%;height:20px;float:left;'>";
                strHtml += "<span style='float: left; width: 35px;'>邮箱:</span>";
                strHtml += "<span style='float: left;'>" + Email + "</span>";
                strHtml += "</div>";
                strHtml += "<div style='width:100%;height:20px;float:left;'>";
                strHtml += "<span style='float:left;width:35px;'>班级:</span>";
                strHtml += "<span style='float:left;'>" + ClassName + "</span>";
                strHtml += "</div>";
                strHtml += "</div>";
                strHtml += "</div>";
            }
        }
    }
    else {
        rowscount = "0";
    }
    $("#GroupList").html(strHtml);
    Page(PageIndex, rowscount);
    init();
    inst();
}
//加载样式
function init() {
    $('.leftviw').click(function () {
        var cls = $(this).attr("class");
        if (cls == "leftviw rborder") {
            $(this).removeClass("rborder");
            $(this).addClass("gborder");
        }
        else {
            $(this).removeClass("gborder");
            $(this).addClass("rborder");
        }
    })
}
function inst() {
    $('.rborder').hover(function () {
        $(this).find('.u204_btn').toggle();
    })
    $('.gborder').hover(function () {
        $(this).find('.u204_btn').toggle();
    })
}
//分组弹出层
function PageFenzu() {
    $("#chkAll").removeAttr("checked");
    SelUser();
    classdroplist();
    PageUserList();
    pageii = $.layer({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [0], //去掉默认边框
        shade: [0.5, '#000'], //去掉遮罩
        closeBtn: [0, false], //去掉默认关闭按钮
        shift: 'top', //从左动画弹出
        page: { dom: '#NewFenzu' }
    });
}
function ClosePage() {
    layer.close(pageii);
    PageIndex2 = 1;
}
//分页
function Page(count, rowscount) {
    if ($("select[name=pagesize]").val() != "") {
        PageSize = $("select[name=pagesize]").val();
    }
    var strHtml = "";
    $("#div_page_wrap").html("");
    if (rowscount < PageSize) {
        return;
    }
    flagcount = Math.ceil(rowscount / PageSize);
    strHtml += "<div class='page_box'>";
    if (flagcount > 8) {
        if (count > 1) {
            strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + 1 + ")' >" + "首页" + "</a>";
        }
        strHtml += " <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount(" + (count - 1) + ")'>前一页</a>";
        var no1 = 0;
        for (var i = 1; i <= 4; i++) {
            if (count == 1) {
                scopemin = 1;
                if (i == count) {
                    strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount(" + count + ")' >" + count + "</a>";
                }
                else {
                    strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + i + ")' >" + i + "</a>";
                }
            }
            else if (count == flagcount) {
                if (no1 == 0) {
                    no1++;
                    i = 0;
                }
                scopemin = count - 4;
                if (i == 4) {
                    strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount(" + count + ")' >" + count + "</a>";
                }
                else {
                    strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (count - 4 + i) + ")' >" + (count - 4 + i) + "</a>";
                }
            }
            else if (count > scopemin && count < scopemin + 3) {
                if (count - scopemin == i) {
                    strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount(" + count + ")' >" + count + "</a>";
                }
                else if (scopemin + i > flagcount - 1) {
                }
                else {
                    strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (scopemin + i) + ")' >" + (scopemin + i) + "</a>";
                }
            }
            else if (count <= scopemin) {
                scopemin = count - 1;
                if (count - scopemin == i) {
                    strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount(" + count + ")' >" + count + "</a>";
                }
                else if (scopemin + i > flagcount - 1) {
                }
                else {
                    strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (scopemin + i) + ")' >" + (scopemin + i) + "</a>";
                }
            }
            else if (count >= scopemin + 3) {
                if (scopemin + 5 >= flagcount) {
                    scopemin = flagcount - 5;
                }
                else {
                    scopemin = count - 3;
                }
                if (count - scopemin == i) {
                    strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount(" + count + ")' >" + count + "</a>";
                }
                else if (scopemin + i > flagcount - 1) {
                }
                else {
                    strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (scopemin + i) + ")' >" + (scopemin + i) + "</a>";
                }
            }
        }
        if (scopemin + 5 < flagcount) {
            var s = flagcount - count;
            if (s > 7) {
                strHtml += "    <span class='more'>...</span>";
                strHtml += "     <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (parseInt(count) + 7) + ")' >" + (parseInt(count) + 7) + "</a>";
            }
            else {
                strHtml += "    <span class='more'>...</span>";
                strHtml += "     <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (parseInt(count) + s) + ")' >" + (parseInt(count) + s) + "</a>";
            }
        }
        else if (count != flagcount) {
            strHtml += "     <a href='javascript:void(0);' onclick='GetPageSizeCount(" + (parseInt(flagcount)) + ")' >" + (parseInt(flagcount)) + "</a>";
        }
        strHtml += "     <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount(" + (count + 1) + ")'>后一页</a>";
        strHtml += "     <span>共" + rowscount + "条，到第<input onkeyup=\"this.value=this.value.replace(/\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\D/g,'')\" id='txt_pageindex' type='text'>页</span>";
        strHtml += "     <a class='confirm' href='javascript:void(0);' onclick='GetPageSize()' >确认</a>";
    } else {
        strHtml += " <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount(" + (count - 1) + ")'>前一页</a>";
        for (var i = 1; i <= flagcount; i++) {
            if (i == count) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff;border:1px solid #2A3950' onclick='GetPageSizeCount(" + i + ")' >" + i + "</a>";
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount(" + i + ")' >" + i + "</a>";
            }
        }
        strHtml += "   <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount(" + (count + 1) + ")'>后一页</a>";
        strHtml += "   <span>共" + rowscount + "条，到第<input onkeyup=\"this.value=this.value.replace(/\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\D/g,'')\" id='txt_pageindex' type='text'/>页</span>";
        strHtml += "   <a class='confirm' href='javascript:void(0);' onclick='GetPageSize()' >确认</a>";
    }
    strHtml += "</div>";
    $("#div_page_wrap").html(strHtml);
}
//分页按钮方法
function GetPageSizeCount(index) {
    if (index > 0 && index <= flagcount) {
        PageIndex = index;
        GetUserList();
    }   
}
function GetPageSize() {
    var index = parseInt($("#txt_pageindex").val());
    GetPageSizeCount(index);
}
//获取已选中联系人
function SelUser() {
    selectIDS = "";  //选中的ID
    var seleds = $(".gborder");
    for (var i = 0; i < seleds.length; i++) {
        if (i == 0) {
            id = seleds[i].id;
            selectIDS = id;
        }
        else {
            id = seleds[i].id;
            selectIDS += "," + id;
        }
    }
    if (selectIDS != "") {
        var array = selectIDS.split(',');
        selectIDS = Dot(array);
    }
    seledUserList(selectIDS);
}
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
//隐藏判断
function changeSh(obj, n) {

    var end = setTimeout(function () { obj.style.display = 'none'; }, 1000);
    if (n == 1) {
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++) {
            clearTimeout(i);
        }
    }
}
//弹出层列表
function PageUserList() {
    var droplist = $("select[name=classdrop]");
    droplist.hide();
    var classdr = $("select[name=classdrop] option:selected").text();
    $("#dropClassName").text(classdr);
    if (classdr == "") {
        $("#dropClassName").text("班级");
    }
    $("#chkAll").removeAttr("checked");
    $("#pageUserList").html("");
    var role = 0;
    var key = $("#tabKey").val();
    var strHtml = "";
    var classid = 0;
    if ($("select[name=classdrop]").val() != null) {
        classid = $("select[name=classdrop]").val();
    }
    if ($("select[name=role2]").val() != null)
    { role = $("select[name=role2]").val(); }
    var url = AddressProvider + "/ClassUser_List";
    var para = "{Key:'" + key + "',OCClassID:" + classid + ",UserType:" + role + ",GroupID:0,PageIndex:" + PageIndex2 + ",PageSize:8}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserType = result[i].UserType;
            UserName = result[i].UserName;
            ClassName = result[i].ClassName;
            rowscount2 = result[i].RowsCount;
            strHtml += "<tr style='text-align: left; height: 30px; border-bottom: 1px solid #ccc'>";
            strHtml += "<td style='width:30px;'>";
            strHtml += "<div style='height:13px;width:13px;margin-left:7px;margin-bottom:6px'><input id='" + UserID + "' onclick='IsselectAll()' type='checkbox' name='chkItem' /></div>";
            strHtml += "</td>";
            if (UserType == 4) {
                strHtml += "<td style='width:90px;'>学生</td>";
                strHtml += "<td style='width:90px;'>" + UserName + "</td>";
                strHtml += "<td style='width:280px;'>" + ClassName + "</td>";
            }
            else {
                strHtml += "<td style='width:90px;'>教师</td>";
                strHtml += "<td style='width:90px;'>" + UserName + "</td>";
                strHtml += "<td style='width:280px;'>——</td>";
            }
            strHtml += "</tr>";
        }
    }
    else {
        rowscount2 = "0";
    }
    $("#pageUserList").html(strHtml);
    Page2(PageIndex2, rowscount2);
    $('#pageUserList').each(function () {
        $(this).find('tr:even').css('background', '#F2F2F2');
    })
}
//弹出层分页
function Page2(count, rowscount) {
    var strHtml = "";
    $("#div_page2").html("");
    flagcount = Math.ceil(rowscount / PageSize2);
    strHtml += "<div class='page_box'>";
    if (flagcount > 8) {
    if (count > 1) {
        strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + 1 + ")' >" + "首页" + "</a>";
    }
    strHtml += " <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount2(" + (count - 1) + ")'>前一页</a>";
    var no1 = 0;
    for (var i = 1; i <= 4; i++) {
        if (count == 1) {
            scopemin = 1;
            if (i == count) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount2(" + count + ")' >" + count + "</a>";
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + i + ")' >" + i + "</a>";
            }
        }
        else if (count == flagcount) {
            if (no1 == 0) {
                no1++;
                i = 0;
            }
            scopemin = count - 4;
            if (i == 4) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount2(" + count + ")' >" + count + "</a>";
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (count - 4 + i) + ")' >" + (count - 4 + i) + "</a>";
            }
        }
        else if (count > scopemin && count < scopemin + 3) {
            if (count - scopemin == i) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount2(" + count + ")' >" + count + "</a>";
            }
            else if (scopemin + i > flagcount - 1) {
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (scopemin + i) + ")' >" + (scopemin + i) + "</a>";
            }
        }
        else if (count <= scopemin) {
            scopemin = count - 1;
            if (count - scopemin == i) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount2(" + count + ")' >" + count + "</a>";
            }
            else if (scopemin + i > flagcount - 1) {
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (scopemin + i) + ")' >" + (scopemin + i) + "</a>";
            }
        }
        else if (count >= scopemin + 3) {
            if (scopemin + 5 >= flagcount) {
                scopemin = flagcount - 5;
            }
            else {
                scopemin = count - 3;
            }
            if (count - scopemin == i) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff' onclick='GetPageSizeCount2(" + count + ")' >" + count + "</a>";
            }
            else if (scopemin + i > flagcount - 1) {
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (scopemin + i) + ")' >" + (scopemin + i) + "</a>";
            }
        }
    }
    if (scopemin + 5 < flagcount) {
        var s = flagcount - count;
        if (s > 7) {
            strHtml += "    <span class='more'>...</span>";
            strHtml += "     <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (parseInt(count) + 7) + ")' >" + (parseInt(count) + 7) + "</a>";
        }
        else {
            strHtml += "    <span class='more'>...</span>";
            strHtml += "     <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (parseInt(count) + s) + ")' >" + (parseInt(count) + s) + "</a>";
        }
    }
    else if (count != flagcount) {
        strHtml += "     <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + (parseInt(flagcount)) + ")' >" + (parseInt(flagcount)) + "</a>";
    }
    strHtml += "     <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount2(" + (count + 1) + ")'>后一页</a>";
    strHtml += "     <span>共" + rowscount + "条，到第<input onkeyup=\"this.value=this.value.replace(/\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\D/g,'')\" id='txt_pageindex' type='text'>页</span>";
    strHtml += "     <a class='confirm' href='javascript:void(0);' onclick='GetPageSize2()' >确认</a>";
    }
    else {
        strHtml += " <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount2(" + (count - 1) + ")'>前一页</a>";
        for (var i = 1; i <= flagcount; i++) {
            if (i == count) {
                strHtml += "  <a href='javascript:void(0);' style='background:#374760;color:#fff;border:1px solid #2A3950' onclick='GetPageSizeCount2(" + i + ")' >" + i + "</a>";
            }
            else {
                strHtml += "  <a href='javascript:void(0);' onclick='GetPageSizeCount2(" + i + ")' >" + i + "</a>";
            }
        }
        strHtml += "   <a class='prev' href='javascript:void(0);' onclick='GetPageSizeCount2(" + (count + 1) + ")'>后一页</a>";
        strHtml += "   <span>共" + rowscount + "条，到第<input onkeyup=\"this.value=this.value.replace(/\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\D/g,'')\" id='txt_pageindex' type='text'/>页</span>";
        strHtml += "   <a class='confirm' href='javascript:void(0);' onclick='GetPageSize2()' >确认</a>";
    }
    strHtml += "</div>";

    $("#div_page2").html(strHtml);
}
//弹出层分页按钮方法
function GetPageSizeCount2(index) {    
    if (index > 0 && index <= flagcount) {
        $("#chkAll").removeAttr("checked");
        PageIndex2 = index;
        PageUserList();
    }   
}
function GetPageSize2() {
    var index = parseInt($("#txt_pageindex2").val());
    GetPageSizeCount2(index);
}
//班级下拉框
function classdroplist() {
    var classlist = OCClass_UserID_Tree();
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
//已选名单
function seledUserList(ids) {
    selectIDS = ids;
    var ary = ids.split(',');
    var ns = ary.length;
    if (ids == "") {
        ns = 0;
    }
    $("#readyUser").text("已选择名单(" + ns + ")");
    $("#seledUserList").html("");
    var url = AddressProvider + "/User_ByUserIDs_List";
    var para = "{UserIDS:'" + ids + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        var strHtml = "";
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserType = result[i].UserType;
            UserName = result[i].UserName;
            strHtml += "<tr  style='border-bottom:1px solid #ccc'>";
            if (UserType == 4) {
                strHtml += "<td style='width:160px;height:30px'><span style='margin-left:10px'>[学生]" + UserName + "</span></td>";
            }
            else {
                strHtml += "<td style='width:160px;height:30px'><span style='margin-left:10px'>[教师]" + UserName + "</span></td>";

            }
            strHtml += "<td style='width: 30px;height: 30px;'>";
            strHtml += "<p class='operation_box'>";
            strHtml += "<i class='u251_btn' id='" + UserID + "' onclick='delUser(this.id)'></i>";
            strHtml += "</p>";
            strHtml += "</td>";
            strHtml += "</tr>";
        }
    }
    $("#seledUserList").html(strHtml);
    innt();
}
function innt() {
    $('#seledUserList tr').hover(function () {
        $(this).find('.operation_box').toggle();
    })
    $('#seledUserList').each(function () {
        $(this).find('tr:odd').css('background', '#F2F2F2');
    })
}
//搜索
function searchKey() {
    GetUserList();
}
function searchKey2() {
    PageUserList();
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

//新增分组选中用户
function chkUser() {
    var One = "";
    var chks = $("input[name=chkItem]");
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked == true) {
            One += chks[i].id + ",";
        }
    }
    if (selectIDS != "") {
        selectIDS = One + selectIDS;
    }
    else {
        selectIDS = One.substring(0, One.length - 1);
    }
    var array = selectIDS.split(',');
    selectIDS = Dot(array);
    seledUserList(selectIDS);
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
//删除选中用户
function delUser(id) {
    var One = "";
    var ary = selectIDS.split(',');
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] != id) {
            One += ary[i] + ",";
        }
    }
    selectIDS = One.substring(0, One.length - 1);
    seledUserList(selectIDS);
}
var IsNull = false;
//新增分组
function AddGroup() {
    var name = $("input[name=GroupName]").val();
    if (IsNull == false) {
        $("#nameYz").show();
        return;
    }
    var url = AddressProvider + "/MyGroup_Edit";
    var para = "{GroupID:0,Name:'" + name + "',Users:'" + selectIDS + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        if (result == 1) {
            layer.msg('新增联系人分组成功', 1, -1);
            layer.close(pageii);
            GetUserList();
        }
        else {
            return;
        }
    }
    else {
        return;
    }
    $("input[name=GroupName]").val("");
    PageIndex2 = 1;
}
//分组名是否为空验证
function GroupIsNull() {
    var name = $("input[name=GroupName]").val();
    if (name == "") {
        IsNull = false;
        $("#nameYz").show();
    }
    else {
        IsNull = true;
        $("#nameYz").hide();
    }
}
//传发送人ID
function sendUserIDS(o) {
    var sendIDs = o;
    if (o == 0) {
        var seleds = $(".gborder");
        for (var i = 0; i < seleds.length; i++) {
            if (i == 0) {
                id = seleds[i].id;
                sendIDs = id;
            }
            else {
                id = seleds[i].id;
                sendIDs += "," + id;
            }
        }
    }
    var url = AddressProvider + "/SendUserIDS";
    var para = "{UserIDS:'" + sendIDs + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        window.open("MsgAdd");
    }
}
