var PageIndex = 1;
var PageSize = 5;
var PageSize2 = 8;
var PageIndex2 = 1;
var rowscount2 = "0";
var rowscount = "0";
var flagcount = 0;
var scopemin = 1;
var selectIDS = ""; //已选ID
var gid = 0;
var pageii;
var AddressProvider = window.appPatch + '/DataProvider/User/AddressProvider.aspx';

$(document).ready(function () {
    MyGroup_List();
});
//获取我的联系组列表
function MyGroup_List() {
    $("#div_page_wrap").html("");
    $("#GroupFenzu").html("");
    var key = $("#Key").val();   
    var url = AddressProvider + "/MyGroup_List";
    var para = "{Key:'" + key + "',PageIndex:" + PageIndex + ",PageSize:" + PageSize + "}";
    var result = $G2S.GetAjaxAspx(para, url);
    var strHtml = "";
    if (result != "") {       
        for (var i = 0; i < result.length; i++) {
            Row = result[i];
            GroupID = Row.GroupID;
            var GroupName = Row.GroupName;
            TeacherCount = Row.TeacherCount;
            StudentCount = Row.StudentCount;
            rowscount = result[i].RowsCount;
            strHtml += "<div id='" + GroupID + "' class='leftviw Group_div'>";
            strHtml += "<div class='head_div'>";
            strHtml += "<span style='float:left;margin-left:20px;font-size:16px;font-weight:bold;margin-right:20px'>" + GroupName + "</span>";
            strHtml += "<span style='float:left;color:#666'>教师:&nbsp;" + TeacherCount + "&nbsp;丨</span>";
            strHtml += "<span style='float: left; color: #666'>学生:&nbsp;" + StudentCount + "&nbsp;</span>";
            strHtml += "<div class='zhangkai_div'>";
            strHtml += "<div style='float:right;width:70px'><a class='u251_btn' style='float:right;margin-right:10px;margin-top:12px;' href='javascript:;' onclick='MyGroupDel(" + GroupID + ")'></a>";
            strHtml += "<a class='edit_btn'  name='" + GroupName + "' style='float:right;margin-right:10px;margin-top:12px;' href='javascript:;' onclick='PageFenzu(" + GroupID + ",this)'></a></div>";
            strHtml += "<div style='float:right;margin-top:11px;line-height:18px'><a class='u77_btn' href='javascript:;' onclick='GroupHide(" + GroupID + ",this)'><span id='more" + GroupID + "' style='width:67px;line-height:18px;display:block;float:right;text-align:center;padding-right:8px;color: #475C7C;'>展开更多</span></a></div>";
            strHtml += "</div>";
            strHtml += "</div>";
            strHtml += "<div id='l" + GroupID + "' class='listhid_div'>";
            strHtml += MyGroupUser_List(GroupID);
            strHtml += "</div>";
            strHtml += "</div>";
        }
    }
    else {
        rowscount = "0";
    }
    $("#GroupFenzu").html(strHtml);
    Page(PageIndex, rowscount);
    init();
    inst();
}
//加载样式
function init() {
    $('.leftviw').click(function () {
        var cls = $(this).attr("class");
        if (cls == "leftviw Group_div") {
            $(this).removeClass("Group_div");
            $(this).addClass("rGroup_div");
        }
        else {
            $(this).removeClass("rGroup_div");
            $(this).addClass("Group_div");
        }
    })
}
function inst() {
    $('.Group_div').hover(function () {
        $(this).find('.zhangkai_div').toggle();
    })
    $('.rGroup_div').hover(function () {
        $(this).find('.zhangkai_div').toggle();
    })
}
var imgsrc = window.appPatch + "/Images/u62.png";
//获得我的联系组下的联系人
var MyGroupUser_List = function (id) {
    var url = AddressProvider + "/MyGroupUser_List";
    var para = "{GroupID:" + id + ",UserType:0}";
    var result = $G2S.GetAjaxAspx(para, url);
    var strHtml = "";
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            Row = result[i];
            UserID = Row.UserID;
            UserName = Row.UserName;
            UserType = Row.UserType;
            ImgUrl = Row.ImgFileUrl;
            if (ImgUrl == null) {
                ImgUrl = imgsrc;
            }
            if (UserType != 4) {
                strHtml += "<div style='height:110px;width:70px;margin-left:10px;float:left'>";
                strHtml += "<div style='width:70px;height:70px;float:left'>";
                strHtml += "<div class='u49_img'>师</div>";
                strHtml += "<img src='" + ImgUrl + "' style='width:70px;height:70px;' />";              
                strHtml += "</div>";
                strHtml += "<div style='float: left; width: 70px; height: 30px; text-align: center;color:#666 '>";
                strHtml += "<span title='"+UserName+"' style='display:block;word-break: break-all;overflow:hidden;height:20px'>" + UserName + "</span>";
                strHtml += "</div>";
                strHtml += "</div>";
            }
            else { }
        }
        for (var i = 0; i < result.length; i++) {
            Row = result[i];
            UserID = Row.UserID;
            UserName = Row.UserName;
            UserType = Row.UserType;
            ImgUrl = Row.ImgFileUrl;
            if (ImgUrl == null) {
                ImgUrl = imgsrc;
            }
            if (UserType == 4) {
                strHtml += "<div style='height:110px;width:70px;margin-left:10px;float:left'>";
                strHtml += "<div style='width:70px;height:70px;float:left'>";
                strHtml += "<div class='u63_img'>生</div>";
                strHtml += "<img src='" + ImgUrl + "' style='width:70px;height:70px;' />";
                strHtml += "</div>";
                strHtml += "<div style='float: left; width: 70px; height: 30px; text-align: center;color:#666 '>";
                strHtml += "<span title='" + UserName + "' style='display:block;word-break: break-all;overflow:hidden;height:20px'>" + UserName + "</span>";
                strHtml += "</div>";
                strHtml += "</div>";
            }
            else { }
        }
    }
    return strHtml;
}
//分页
function Page(count, rowscount) {
    if ($("select[name=pagesize]").val() != "") {
        PageSize = $("select[name=pagesize]").val();
    }
    var strHtml = "";
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
    }
    else {
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
        MyGroup_List();
    }    
}
function GetPageSize() {
    var index = parseInt($("#txt_pageindex").val());
    GetPageSizeCount(index);
}
//分页大小修改
function SizeChange() {
    PageSize = $("select[name=pagesize]").val();
    MyGroup_List();
}
//搜索
function searchKey() {
    MyGroup_List();
}
function searchKey2() {
    PageUserList();
}
//联系组联系人展开与隐藏
function GroupHide(id, obj) {
    var div = $("#l" + id);
    if (div.attr('class') == 'listhid_div') {
        div.removeClass("listhid_div");
        div.addClass("listsho_div");
        $("#more" + id).text("收起");
        $(obj).removeClass("u77_btn");
        $(obj).addClass("shouqi_btn");
    }
    else {
        div.removeClass("listsho_div");
        div.addClass("listhid_div");
        $("#more" + id).text("展开更多");
        $(obj).removeClass("shouqi_btn");
        $(obj).addClass("u77_btn");
    }
}
//分组弹出层
function PageFenzu(id, obj) {
    $("#chkAll").removeAttr("checked");
    $("#seledUserList").html("");
    $("input[name=GroupName]").val("");
    if (id != 0) {
        var sld = UserIDsByGroupID(id);
        seledUserList(sld);
        var name = $(obj).attr("name");
        $("input[name=GroupName]").val(name);
        gid = id;
    } 
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
    PageIndex2 = 1;
    layer.close(pageii);  
}
//新增或编辑分组
function AddGroup() {
    var name = $("input[name=GroupName]").val();
    if (name=="") {
        $("#nameYz").show();
        return;
    }
    var url = AddressProvider + "/MyGroup_Edit";
    var para = "{GroupID:" + gid + ",Name:'" + name + "',Users:'" + selectIDS + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        if (result == 1) {
            if (gid == 0) {
                layer.msg('新增联系人分组成功', 1, -1);
            }
            else {
                layer.msg('修改联系人分组成功', 1, -1);
            }
            layer.close(pageii);
            MyGroup_List();
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
//用户的在线课程及其下的班级树
var GetMyGroup_Tree = function () {
    var url = AddressProvider + "/OCClass_UserID_Tree";
    var para = "{}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        return result;
    } else {
        return "";
    }
}
//删除我的联系组
function MyGroupDel(id) {
    layer.confirm('是否确定删除', function (index) {
        var url = AddressProvider + "/MyGroup_Del";
        var para = "{GroupID:"+id+"}";
        var result = $G2S.GetAjaxAspx(para, url);
        if (result != "") {
            if (result == 1) {
                layer.msg('删除成功', 1, -1);
                MyGroup_List();
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    });
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
    var strHtml = "";
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
    var classlist = GetMyGroup_Tree();
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
    var ary = selectIDS.split(',');
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked == true) {
            if (ary.indexOf(chks[i].id) == -1) {
                One += chks[i].id + ",";
            }
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
//传发送人ID
function sendUserIDS() {
    var SelIds = "";
    var seleds = $(".rGroup_div");
    for (var i = 0; i < seleds.length; i++) {
        id = seleds[i].id;
        var ids = UserIDsByGroupID(id);
        if (ids != null && ids!="") {
            SelIds += ids + ",";
        }
    }
    if (SelIds != "") {
        SelIds = SelIds.substring(0, SelIds.length - 1);
    }
    var array = SelIds.split(',');
    if (array != "") {
        SelIds = Dot(array);
    }    
    var url = AddressProvider + "/SendUserIDS";
    var para = "{UserIDS:'" + SelIds + "'}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        window.open("MsgAdd");
    }
}
var UserIDsByGroupID = function (id) {
    var bids = "";
    var url = AddressProvider + "/MyGroupUser_List";
    var para = "{GroupID:" + id + ",UserType:0}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            bids += UserID + ",";
        }
    }
    if (bids != "") {
        bids = bids.substring(0, bids.length - 1);
    }
    return bids;
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
