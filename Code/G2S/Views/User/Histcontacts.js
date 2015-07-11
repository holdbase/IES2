var PageIndex = 1;
var PageSize = 20;
var flagcount = 0;
var AddressProvider = window.appPatch + '/DataProvider/User/AddressProvider.aspx';
$(document).ready(function () {
    GetTermList();
    GetTeachClassList();
    GetUserList();
});
//学期下拉列表
function GetTermList() {
    $("select[name=term]").html("");
    var strHtml = "";
    var url = AddressProvider + "/Term_List";
    var para = "{}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            TermID = result[i].TermID;
            TermTypeName = result[i].TermTypeName;
            TermYear = result[i].TermYear;
            if (i == 0) {
                strHtml += "<option value='" + TermID + "' selected>" + TermYear + TermTypeName + "</option>";
            }
            else {
                strHtml += "<option value='" + TermID + "'>" + TermYear + TermTypeName + "</option>";
            }
        }
    }
    $("select[name=term]").html(strHtml);
}
//教学班下拉列表
function GetTeachClassList() {
    var TermID = $("select[name=term]").val();
    $("select[name=teachingclass]").html("");
    var strHtml = "";
    var url = AddressProvider + "/TeachingClass_ByTermID_List";
    var para = "{TermID:" + TermID + "}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {        
        for (var i = 0; i < result.length; i++) {
            TeachingClassID = result[i].TeachingClassID;
            ClassName = result[i].ClassName;
            if (i == 0) {
                strHtml += "<option value='" + TeachingClassID + "' selected>" + ClassName + "</option>";
            }
            else {
                strHtml += "<option value='" + TeachingClassID + "'>" + ClassName + "</option>";
            }
            
        }
    }
    $("select[name=teachingclass]").html(strHtml);
}
//历史联系人
function GetUserList() {
    var strHtml = "";
    var TeachingClassID = $("select[name=teachingclass]").val();
    $("#Contacts").html("");
    var Key=$("#Key").val();
    var rowscount = "0";
    var url = AddressProvider + "/ClassUserHistory_List";
    var para = "{Key:'" + Key + "',TeachingClassID:" + (TeachingClassID==null?0:TeachingClassID) + ",PageIndex:" + PageIndex + ",PageSize:" + PageSize + "}";
    var result = $G2S.GetAjaxAspx(para, url);
    if (result != "") {
        for (var i = 0; i < result.length; i++) {
            UserID = result[i].UserID;
            UserName = result[i].UserName;
            Mobile = result[i].Mobile;
            Email = result[i].Email;
            ClassName = result[i].ClassName;
            EndDate = result[i].EndDate.substring(0, 10);
            rowscount = result[i].RowsCount;
            strHtml += "<div class='cont_box'>";
            strHtml += "<div class='cont_div'><span>"+UserName+"</span></div>";
            strHtml += "<div class='cons_div'><span>手机:&nbsp;&nbsp;</span>"+Mobile+"</div>";
            strHtml += "<div class='cons_div'><span>邮箱:&nbsp;&nbsp;</span>"+Email+"</div>";
            strHtml += "<div class='cons_div'><span>班级:&nbsp;&nbsp;</span>"+ClassName+"</div>";
            strHtml += "<div class='cons_div'><span>结业:&nbsp;&nbsp;</span>" + EndDate + "</div>";
            strHtml += "</div>";          
        }
    }
    $("#Contacts").html(strHtml);
    Page(PageIndex, rowscount);
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
                scopemin = count - 3;
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
                scopemin = count - 3;
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
    if (index < 1 || index > flagcount) {
        return;
    }
    PageIndex = index;
    GetUserList();
}
function GetPageSize() {
    var index = parseInt($("#txt_pageindex").val());
    GetPageSizeCount(index);
}
//分页大小修改
function SizeChange() {
    PageSize = $("select[name=pagesize]").val();
    GetUserList();
}
//学期修改
function TermChange() {
    GetTeachClassList();
    GetUserList();
}
//教学班修改
function TeachClassChange() {
    GetUserList();
}
//搜索
function searchKey() {
    GetUserList();
}