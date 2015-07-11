"use strict";
/*--调用方法
$Page.Paging({
    PageID: "#div_page_wrap",//容器ID
    PageIndex : PageIndex,//当前页
    PageSize: PageSize,//页面大小
    CountSize: 8,//分页按钮显示个数
    rowscount: RowsCount,//总数
    IsForeAft:false,//是否显示首尾页
    method: function (index) { //触发分页后的回调
        PageIndex = index;
        方法();
    }
});
--*/

/*--分页方法--start--*/
var $Page = {};
$Page.PageID = "";
$Page.PageIndex = 1;//页数
$Page.PageSize = 10;//页列表大小
$Page.flagcount = 0;//总页数
$Page.scopemin = 1;//最小页
$Page.CountSize = 8;//分页按钮个数
$Page.rowscount = 8;//总数
$Page.IsForeAft = true;//是否显示首尾页
$Page.method;//方法
var page;//最大页

$Page.Paging = function (Parm) {
    $Page.PageID = Parm.PageID;
    if (Parm.PageIndex != undefined && Parm.PageIndex != "" && Parm.PageIndex != null) {
        $Page.PageIndex = Parm.PageIndex;
    }
    $Page.PageSize = Parm.PageSize;
    $Page.CountSize = Parm.CountSize;
    $Page.rowscount = Parm.rowscount;
    if (Parm.IsForeAft == true || Parm.IsForeAft == false) {
        $Page.IsForeAft = Parm.IsForeAft;
    }
    $Page.method = Parm.method;
    $Page.Page();
}
$Page.Page = function () {
    var strHtml = '';
    if ($Page.rowscount <= $Page.PageSize) { return; };
    $Page.flagcount = Math.ceil($Page.rowscount / $Page.PageSize);
    if ($Page.flagcount > 1) {
        if ($Page.flagcount <= $Page.CountSize) {
            page = $Page.flagcount;
        }
        else {
            if ($Page.PageIndex == 1) {
                $Page.scopemin = $Page.PageIndex;
                page = $Page.scopemin + $Page.CountSize - 1;
            }
            else if ($Page.PageIndex == $Page.flagcount) {
                page = $Page.PageIndex;
                $Page.scopemin = page - $Page.CountSize + 1;
            }
            else if ($Page.PageIndex >= $Page.scopemin + $Page.CountSize - 1) {
                $Page.scopemin = $Page.PageIndex;
                page = $Page.scopemin + $Page.CountSize - 1;
                if (page > $Page.flagcount) {
                    $Page.scopemin = $Page.flagcount - $Page.CountSize + 1;
                    page = $Page.flagcount;
                }
            }
            else if ($Page.PageIndex <= $Page.scopemin) {
                $Page.scopemin = $Page.PageIndex - $Page.CountSize + 1;
                page = $Page.PageIndex;
                if ($Page.scopemin < 1) {
                    $Page.scopemin = 1;
                    page = $Page.scopemin + $Page.CountSize - 1;
                }
            }
        }
        strHtml += '<div class="page_box">';
        if ($Page.scopemin > 1 && $Page.IsForeAft == true) {
            strHtml += '<a class="foreaft" href="javascript:GetPageSize(1);" style="width:40px">首页</a>';
        }
        if ($Page.PageIndex != 1) {
            strHtml += '<a class="updown" href="javascript:GetPageSize(' + ($Page.PageIndex - 1) + ');" style="width:54px">前一页</a>';
        }
        for (var i = $Page.scopemin; i <= page; i++) {
            if (i == $Page.PageIndex) {
                strHtml += '<a class="acto">' + i + '</a>';
            }
            else {
                strHtml += '<a href="javascript:GetPageSize(' + i + ');">' + i + '</a>';
            }
        }
        if ($Page.PageIndex != $Page.flagcount) {
            strHtml += '<a class="updown"  href="javascript:GetPageSize(' + ($Page.PageIndex + 1) + ');" style="width:54px">后一页</a>';
        }
        if (page < $Page.flagcount && $Page.IsForeAft == true) {
            strHtml += '<a class="foreaft" href="javascript:GetPageSize(' + $Page.flagcount + ');" style="width:40px">尾页</a>';
        }
        strHtml += '<span>到第</span>';
        strHtml += '<select id="sel_pageindex" onchange="GetSizeChange()">';
        for (var n = 1; n <= $Page.flagcount; n++) {
            if (n == $Page.PageIndex) {
                strHtml += '<option selected value="' + n + '">' + n + '</option>';
            } else {
                strHtml += '<option value="' + n + '">' + n + '</option>';
            }

        }
        strHtml += '</select>';
        strHtml += '<span>页/共' + $Page.flagcount + '页</span>';
        strHtml += '</div>';
    }
    $($Page.PageID).html(strHtml);
    PageInit();
}
function PageInit() {
    //样式加载
    $($Page.PageID).css($Page.css.div_page_wrap);
    $(".page_box").css($Page.css.page_box);
    $(".page_box a").css($Page.css.page_box_a);
    $(".page_box a.acto").css($Page.css.page_box_a_acto);
    $(".page_box a.updown").css($Page.css.updown);
    $(".page_box a.foreaft").css($Page.css.foreaft);
    $(".page_box span").css($Page.css.page_box_span);
    $(".page_box select").css($Page.css.page_box_select);
    //分页居中   
    var oWidth = $($Page.PageID).width();
    var zWidth = $('.page_box').width();
    $('.page_box').css('margin-left', (oWidth - zWidth) / 2);
}
function GetPageSize(index) {
    if (index > 0 && index <= $Page.flagcount) {
        $Page.PageIndex = index;
        eval($Page.method(index));
    }
}
function GetSizeChange() {
    var index = parseInt($("#sel_pageindex option:selected").val());
    $Page.PageIndex = index;
    eval($Page.method(index));
}
/*--分页方法--end--*/

/*--分页样式--start--*/
$Page.css = {
    div_page_wrap: { 'float': 'left', 'height': ' 50px', 'width': '100%', 'font-size': '13px' },
    page_box: { 'float': 'left', 'height': '40px', 'margin-top': '11px' },
    page_box_a: { 'float': 'left', 'display': 'block', 'width': '23px', 'height': '25px', 'border': '1px solid #ccc', 'text-align': 'center', 'line-height': '25px', 'background': '#f2f2f2', 'cursor': 'pointer', 'margin-left': '5px', 'font-size': '14px', 'text-decoration': 'none', 'color': '#444', 'padding': '0' },
    page_box_a_acto: { 'background': '#374760', 'color': ' #fff' },
    updown: { 'width': '54px' },
    foreaft: { 'width': '40px' },
    page_box_span: { 'float': 'left', 'display': 'block', 'height': '25px', 'line-height': '25px', 'text-align': 'center', 'font-size': '15px', 'margin-left': '8px' },
    page_box_select: { 'float': 'left', 'display': 'block', 'height': '25px', 'width': '42px', 'text-align': 'left', 'margin-left': '8px' }
};
/*--分页样式--end--*/

