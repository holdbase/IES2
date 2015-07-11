/*获取iframe弹出子窗体的对象*/
function myhomeChildrenObject(iframeName) {
    return document.getElementById(iframeName).contentWindow;
}

/*获取iframe弹出父窗体的对象*/
function myhomeParentObject() {
    return window.parent;
}

/*刷新当前页*/
function myhomeRefresh() {
    window.location.href = window.location.href;
}

/*根据URL刷新页面*/
function myhomeRefreshByUrl(url) {
    window.location.href = url;
}

/*返回上一页*/
function myhomeHistoryBack(url) {
    window.history.back(-1);
}

/*随机产生ID*/
var random = 0;
/*随机生成随机数*/
function tmRandom() {
    random++;
    return new Date().getTime() + "" + random;
};

/*自定义定时器 args是自定义多少个的.参数写在timer的后面*/
function jxtvSetTimeout(funcName, timer) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return window.setTimeout(function() { funcName.apply(this, args); }, timer);
};


$(function() {
    $(".tm-search-keywords").focus(function() {
        var _title = $(this).attr("title");
        var _val = $(this).val();
        if (_val == _title) {
            $(this).val("");
        }
    }).blur(function() {
        if ($(this).val() == "") {
            $(this).val($(this).attr("title"));
        }
    });
})

function tmClearLoading() {
    $("body").exmayLoading("hide");
};

function tmInitLoading(msg) {
    $("body").exmayLoading({ msg: msg, show: true, timeout: 3000 });
    if (arguments != null && arguments != undefined && arguments[1] != undefined && arguments[1] != null && arguments[1] != "" && arguments.length > 0) {
        arguments[1].call(this);
    }
};

function tmWaitLoading(msg) {
    $("body").exmayLoading({ msg: msg, show: true });
};

function tmInitLoadingT(msg, timeout) {
    $("body").exmayLoading({ msg: msg, show: true, timeout: timeout });
}


/*文件大小转换为MB GB KB格式*/
function myhomeCountFileSize(size) {
    var fsize = parseFloat(size, 2);
    var fileSizeString;
    if (fsize < 1024) {
        fileSizeString = fsize.toFixed(2) + "B";
    } else if (fsize < 1048576) {
        fileSizeString = (fsize / 1024).toFixed(2) + "KB";
    } else if (fsize < 1073741824) {
        fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
    } else if (fsize < 1024 * 1024 * 1024) {
        fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
    } else {
        fileSizeString = "0B";
    }
    return {
        fileSize: fileSizeString
    };
};

/*获取文件后缀*/
function getExt(fileName) {
    if (fileName.lastIndexOf(".") == -1) return fileName;
    var pos = fileName.lastIndexOf(".") + 1;
    return fileName.substring(pos, fileName.length).toLowerCase();
}

function getFileName(fileName) {
    if (fileName.lastIndexOf(".") != -1) {
        return fileName.substring(0, fileName.lastIndexOf("."));
    } else {
        return fileName;
    }
}


function myhomeToJson(o, flag, replace) {
    var arr_start = "ARRAY_S";
    var arr_end = "ARRAY_E";
    if (flag == null) {
        flag = "\"";
    }
    if (replace == null) {
        replace = true;
    }
    var r = [];
    if (typeof o == "string" || o == null) {
        return o;
    }

    if (typeof o == "object") {
        if (!o.sort) {
            r[0] = "{";
            for (var i in o) {
                r[r.length] = flag;
                r[r.length] = i;
                r[r.length] = flag;
                r[r.length] = ":";
                r[r.length] = flag;
                r[r.length] = myhomeAarryToJson(o[i], flag, false);
                r[r.length] = flag;
                r[r.length] = ",";
            }
            r[r.length - 1] = "}";
        } else {
            r[0] = arr_start;
            for (var i = 0; i < o.length; i++) {
                r[r.length] = flag;
                r[r.length] = myhomeAarryToJson(o[i], flag, false);
                r[r.length] = flag;
                r[r.length] = ",";
            }
            r[r.length - 1] = arr_end;
        }

        var str = r.join("");

        if (str == "}") {
            str = "{}";
        }

        if (str == arr_end) {
            str = arr_start + arr_end;
        }

        if (replace) {

            var reg = new RegExp(flag + "{", "g");
            str = str.replace(reg, "{");

            reg = new RegExp("}" + flag, "g");
            str = str.replace(reg, "}");

            reg = new RegExp(flag + arr_start, "g");
            str = str.replace(reg, "[");

            reg = new RegExp(arr_end + flag, "g");
            str = str.replace(reg, "]");

            if (str.indexOf(arr_start + "{") > -1) {
                reg = new RegExp(arr_start + "{", "g");
                str = str.replace(reg, "[{");
            }
            if (str.indexOf("}" + arr_end) > -1) {
                reg = new RegExp("}" + arr_end, "g");
                str = str.replace(reg, "}]");
            }
        }
        return str;
    }
    return o.toString();
};

function myhomeToJson(o) {
    var r = [];
    if (typeof o == "string")
        return "\""
				+ o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n")
						.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o)
                r.push("\"" + i + "\":" + myhomeToJson(o[i]));
            if (!!document.all
					&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
							.test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}"
        } else {
            for (var i = 0; i < o.length; i++)
                r.push(myhomeToJson(o[i]))
            r = "[" + r.join() + "]"
        }
        return r;
    }
    return o.toString();
};

/*转成json为对象*/
function ExmayEval(json) {
    return eval("(" + json + ")");
};

function isEmpty(val) {
    var $val = $.trim(val);
    if (val == null) return true;
    if (val == undefined || val == 'undefined')
        return true;
    if (val == "")
        return true;
    if (val.length == 0)
        return true;
    if (!/[^(^\s*)|(\s*$)]/.test(val))
        return true;
    return false;
}

function isNotEmpty(val) {
    return !isEmpty(val);
}

/*获取鼠标的坐标*/
function tm_posXY(event) {
    event = event || window.event;
    var posX = event.pageX
			|| (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var posY = event.pageY
			|| (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    return {
        x: posX,
        y: posY
    };
}

Array.prototype.removeItem = function(item) {
    for (var i = 0; i < this.length; i++) {
        if (item == this[i])
            break;
    }
    if (i == this.length)
        return;
    for (var j = i; j < this.length - 1; j++) {
        this[j] = this[j + 1];
    }
    this.length--;
};

/*找到元素的位置*/
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val)
            return i;
    }
    return -1;
};

/*根据元素删除*/
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
/*如果数组中存在多个相同的元素都删除*/
Array.prototype.removeElement = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            this.splice(i, 1);
        }
    }
};
/**
* 删除json格式的数组
* @param {Object} element
* @memberOf {TypeName} 
*/
Array.prototype.removeObject = function(element) {
    for (var i = 0; i < this.length; i++) {
        var jsonData = this[i];
        for (var key in jsonData) {
            if (jsonData[key] == element) {
                this.splice(i, 1);
            }
        }
    }
};

/*数组唯一*/
Array.prototype.unique = function() {
    var o = new Object();
    for (var i = 0, j = 0; i < this.length; i++) {
        if (typeof o[this[i]] == 'undefined') {
            o[this[i]] = j++;
        }
    }
    this.length = 0;
    for (var key in o) {
        this[o[key]] = key;
    }
    return this;
};

Array.prototype.unique2 = function() {
    for (var i = 0; i < this.length; i++) {
        for (var j = i + 1; j < this.length; ) {
            if (this[j] == this[i]) {
                this.splice(j, 1);
            } else {
                j++;
            }
        }
    }
    return this;
}

Array.prototype.orderBy = function(sortFlag) {
    if (sortFlag == 'asc') {
        this.sort(NumAscSort);
    } else if (sortFlag == 'desc') {
        this.sort(NumDescSort);
    } else {
        this.sort(NumAscSort);
    }
    return this;
}

function NumAscSort(a, b) {
    return a - b;
}
function NumDescSort(a, b) {
    return b - a;
}

function myhomeToJsonStringify(obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        if (t == "string")
            obj = '"' + obj + '"';
        return String(obj);
    } else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n];
            t = typeof (v);
            if (t == "string")
                v = '"' + v + '"';
            else if (t == "object" && v !== null)
                v = myhomeToJsonStringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

function myhomeBooleanToString(booleanString) {
    if (booleanString == undefined || booleanString == 'undefined')
        return eval(booleanString);
    return booleanString.toString();
};

function myhomeBooleanToStr(booleanString) {
    if (booleanString == undefined || booleanString == 'undefined')
        return eval(booleanString);
    return String(booleanString);
};

function myhomeStringToBooleanEval(string) {
    if (string == undefined || string == 'undefined')
        return eval(string);
    return eval(string);
};

function tm_forbiddenSelect() {
    $(document).bind("selectstart", function() {
        return false;
    });
    document.onselectstart = new Function("event.returnValue=false;");
    $("*").css({ "-moz-user-select": "none" });
}

function tm_autoSelect() {
    $(document).bind("selectstart", function() {
        return true;
    });
    document.onselectstart = new Function("event.returnValue=true;");
    $("*").css({ "-moz-user-select": "" });
}

function myhomeBooleanParse(string) {
    if (string == undefined || string == 'undefined')
        return eval(string);
    switch (string.toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
};

/*获取剪切板中的内容*/
function myhomeGetClipboard() {
    if (window.clipboardData) {
        return (window.clipboardData.getData('text'));
    } else {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager
						.enablePrivilege("UniversalXPConnect");
                var clip = Components.classes["@mozilla.org/widget/clipboard;1"]
						.createInstance(Components.interfaces.nsIClipboard);
                if (!clip) {
                    return;
                }
                var trans = Components.classes["@mozilla.org/widget/transferable;1"]
						.createInstance(Components.interfaces.nsITransferable);
                if (!trans) {
                    return;
                }
                trans.addDataFlavor("text/unicode");
                clip.getData(trans, clip.kGlobalClipboard);
                var str = new Object();
                var len = new Object();
                trans.getTransferData("text/unicode", str, len);
            } catch (e) {
                alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
                return null;
            }
            if (str) {
                if (Components.interfaces.nsISupportsWString) {
                    str = str.value
							.QueryInterface(Components.interfaces.nsISupportsWString);
                } else {
                    if (Components.interfaces.nsISupportsString) {
                        str = str.value
								.QueryInterface(Components.interfaces.nsISupportsString);
                    } else {
                        str = null;
                    }
                }
            }
            if (str) {
                return (str.data.substring(0, len.value / 2));
            }
        }
    }
    return null;
};

function myhomeSetClipboard(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
            return false;
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				.createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1']
				.createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
    }
};

$(function() {
    var miunsInterval = null;
    var plusInterval = null;
    $(".tm-ui-minus").mousedown(function() {
        var to = $(this).attr("to");
        var min = $(this).attr("min");
        var targetVal = $("#" + to).val();
        if (isNotEmpty(targetVal)) {
            miunsInterval = setInterval(function() {
                if (targetVal <= min) {
                    clearInterval(miunsInterval);
                } else {
                    targetVal--;
                }
                $("#" + to).val(targetVal);
            }, 80);
        }
    }).mouseup(function() {
        clearInterval(miunsInterval);
    }).mouseout(function() {
        clearInterval(miunsInterval);
    });

    $(".tm-ui-plus").mousedown(function() {
        var to = $(this).attr("to");
        var max = $(this).attr("max");
        var targetVal = $("#" + to).val();
        if (isNotEmpty(targetVal)) {
            plusInterval = setInterval(function() {
                if (targetVal >= max) {
                    clearInterval(plusInterval);
                } else {
                    targetVal++;
                }
                $("#" + to).val(targetVal);
            }, 80);
        }
    }).mouseup(function() {
        clearInterval(plusInterval);
    }).mouseout(function() {
        clearInterval(plusInterval);
    });


    $(".tm-number").attr({ "style": "ime-mode:disabled" }).keydown(function(e) {
        if (!e) e = window.event;
        var code = e.keyCode | e.which | e.charCode;
        if (code >= 48 && code <= 57 || code >= 96 && code <= 105) return true; // 数字
        switch (code) {
            case 8: // 退格
            case 37: case 38: case 39: case 40: // 方向键
            case 13: // 回车
            case 46: // 删除
            case 45:
            case 110:
                return true;
        }
        return false;
    });

});

var windowPosition = {
    scrollTop: function() {
        return window.pageYOffset || document.documentElement.scrollTop
				|| document.body.scrollTop;
    },
    top: function() {
        return window.pageYOffset || document.documentElement
				&& document.documentElement.scrollTop
				|| document.body.scrollTop;
    },
    height: function() {
        return window.innerHeight || document.documentElement
				&& document.documentElement.clientHeight
				|| document.body.clientHeight;
    },
    left: function() {
        return window.pageXOffset || document.documentElement
				&& document.documentElement.scrollLeft
				|| document.body.scrollLeft;
    },
    width: function() {
        return window.innerWidth || document.documentElement
				&& document.documentElement.clientWidth
				|| document.body.clientWidth;
    },
    right: function() {
        return windowPosition.left() + windowPosition.width();
    },
    bottom: function() {
        return windowPosition.top() + windowPosition.height();
    }
};

function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
    } else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
    }
    return clientHeight;
}

function getClientWidth() {
    var clientWidth = 0;
    if (document.body.clientWidth && document.documentElement.clientWidth) {
        var clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
    } else {
        var clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
    }
    return clientWidth;
}

$(function() {
    var ovalue;
    $(".tm-inputs").live("focus", function() {
        var tip = $(this).attr("tip");
        var value = $(this).val();
        ovalue = $(this).val();
        if (tip == value) {
            $(this).val("");
            $(this).css("border", "1px solid red");
        }
    }).live("blur", function() {
        var tip = $(this).attr("tip");
        var value = $(this).val();
        $(this).css("border", "1px solid #ccc");
        if (isEmpty(value)) {
            $(this).val(ovalue);
            ovalue = "";
        }
    });

});


/**      
* 对Date的扩展，将 Date 转化为指定格式的String      
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
* eg:      
* (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
* 将数字转换成对应的中文
* @param {Object} num 
*  比如:1对应一
*       11：十一
* 		 101:一百零一 
* @return {TypeName} 
*/
function tmNumberToChinese(num)  //将阿拉伯数字翻译成中文的大写数字
{
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");

    var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";

    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0: re = BB[7] + re; break;
            case 4: if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re; break;
            case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++;
    }

    if (a.length > 1) //加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if (re == '一十') re = "十";
    if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
    return re;
}

function getEditHtml(id) {
    var $iframe = myhomeChildrenObject(id);
    var $ciframe = $iframe.document.getElementById("eWebEditor").contentWindow;
    return $($ciframe.document).find("body").html();
}

function getEditText(id) {
    var $iframe = myhomeChildrenObject(id);
    var $ciframe = $iframe.document.getElementById("eWebEditor").contentWindow;
    return $($ciframe.document).find("body").text();
}

function getCursortPosition(ctrl) {
    var CaretPos = 0; // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

//function setCaretPosition(ctrl, pos){
//	if(ctrl.setSelectionRange)
//	{
//		ctrl.focus();
//		ctrl.setSelectionRange(pos,pos);
//	}
//	else if (ctrl.createTextRange) {
//		var range = ctrl.createTextRange();
//		range.collapse(true);
//		range.moveEnd('character', pos);
//		range.moveStart('character', pos);
//		range.select();
//	}
//}

function setCaretPosition(inputDom, startIndex, endIndex) {
    if (inputDom.setSelectionRange) {
        inputDom.setSelectionRange(startIndex, endIndex);
    }
    else if (inputDom.createTextRange) //IE 
    {
        var range = inputDom.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex);
        range.moveEnd('character', endIndex - startIndex - 1);
        range.select();
    }
    inputDom.focus();
}

//获取选中文本
function getSelectedText(inputDom) {
    if (document.selection) //IE
    {
        return document.selection.createRange().text;
    }
    else {
        return inputDom.value.substring(inputDom.selectionStart,
                inputDom.selectionEnd);
    }
}


function getSecond(hms) {
    if (isNotEmpty(hms)) {
        if (isEmpty(hms) || hms == 0) return "0";
        var times = hms.split(":");
        if (times != null && times.length == 3) {
            return times[0] * 60 * 60 + times[1] * 60 + times[2] * 1;
        } else {
            return "0";
        }
    } else {
        return "0";
    }
}

/**
*将秒转换为 hh:mm:ss
*
*/
function tm_hhmmss(seconds) {
    var hh;
    var mm;
    var ss;
    //传入的时间为空或小于0
    if (seconds == null || seconds < 0) {
        return;
    }
    //得到小时
    hh = seconds / 3600 | 0;
    seconds = parseInt(seconds) - hh * 3600;
    if (parseInt(hh) < 10) {
        hh = "0" + hh;
    }
    //得到分
    mm = seconds / 60 | 0;
    //得到秒
    ss = parseInt(seconds) - mm * 60;
    if (parseInt(mm) < 10) {
        mm = "0" + mm;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }
    return hh + ":" + mm + ":" + ss;

}


function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器 
    if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法 
        e.stopPropagation();
    else
    //否则，我们需要使用IE的方式来取消事件冒泡 
        window.event.cancelBubble = true;
}