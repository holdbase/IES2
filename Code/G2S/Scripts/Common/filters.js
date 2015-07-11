'use strict';
var filtersModule = angular.module('app.filters', []);

filtersModule.filter('dateFormatDefined', [function (type) {
    return function (v, type) {

        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format(type);
        }
    }
}]);


filtersModule.filter('dateFormatAll', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format("yyyy-MM-dd hh:mm:ss");
        }
    }
}]);

//这个和上面那个貌似没有任何区别，已注释xw
//filtersModule.filter('dateFormatAll', [function () {
//    return function (v) {

//        if (v == null || v == undefined) { return ""; }
//        if (v.indexOf("Date") == -1) {
//            return v
//        } else {
//            var re = /-?\d+/;
//            var m = re.exec(v);
//            if (parseInt(m) < 0) { return ""; }
//            var d = new Date(parseInt(m[0]));
//            return d.Format("yyyy-MM-dd hh:mm:ss");
//        }
//    }
//}]);

filtersModule.filter('dateFormat', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format("yyyy-MM-dd");
        }
    }
}]);

filtersModule.filter('dateFormatHHMM', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format("hh:mm");
        }
    }
}]);
filtersModule.filter('dateFormatMMDD', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format("MM-dd");
        }
    }
}]);
//星期
filtersModule.filter('dateFormatEE', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            var week;
            if (d.getDay() == 0) week = "周日"
            if (d.getDay() == 1) week = "周一"
            if (d.getDay() == 2) week = "周二"
            if (d.getDay() == 3) week = "周三"
            if (d.getDay() == 4) week = "周四"
            if (d.getDay() == 5) week = "周五"
            if (d.getDay() == 6) week = "周六"
            return week;
        }
    }
}]);
filtersModule.filter('dateFormatEEE', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            var week;
            if (d.getDay() == 0) week = "星期天"
            if (d.getDay() == 1) week = "星期一"
            if (d.getDay() == 2) week = "星期二"
            if (d.getDay() == 3) week = "星期三"
            if (d.getDay() == 4) week = "星期四"
            if (d.getDay() == 5) week = "星期五"
            if (d.getDay() == 6) week = "星期六"
            return week;
        }
    }
}]);
//得到第几周   
filtersModule.filter('dateFormatE', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            // if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            var totalDays = 0;
            var years = d.getYear()
            if (years < 1000)
                years += 1900
            var days = new Array(12);
            days[0] = 31; days[2] = 31; days[3] = 30;
            days[4] = 31; days[5] = 30; days[6] = 31;
            days[7] = 31; days[8] = 30; days[9] = 31;
            days[10] = 30; days[11] = 31;           //判断是否为闰年，针对2月的天数进行计算     
            if (Math.round(d.getYear() / 4) == d.getYear() / 4)
            { days[1] = 29 }
            else { days[1] = 28 }
            if (d.getMonth() == 0) { totalDays = totalDays + d.getDate(); }
            else {
                var curMonth = d.getMonth();
                for (var count = 1; count <= curMonth; count++) {
                    totalDays = totalDays + days[count - 1];
                }
                totalDays = totalDays + d.getDate();
            }     //得到第几周     
            var week = Math.round(totalDays / 7);
            return week;
        }
    }
}]);




filtersModule.filter('dateFormatHHSS', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format("hh:mm");
        }
    }
}]);


filtersModule.filter('dateFormatYear', [function () {
    return function (v) {
        if (v == null || v == undefined) { return ""; }
        if (v.indexOf("Date") == -1) {
            return v
        } else {
            //if (v == undefined) { return ""; }
            var re = /-?\d+/;
            var m = re.exec(v);
            if (parseInt(m) < 0) { return ""; }
            var d = new Date(parseInt(m[0]));
            return d.Format("yyyy");
        }
    }
}]);

//时分秒转秒
filtersModule.filter('TimeFormatSecond', [function ($sce) {
    return function (value) {
        var strvalue = 0;
        if (value.indexOf(":") > -1) {
            var vrrstr = value.split(':');
            if (vrrstr.length == 3) {
                strvalue = parseInt(vrrstr[0]) * 3600 + parseInt(vrrstr[1]) * 60 + parseInt(vrrstr[2]);
            }
        }
        return strvalue;
    }
}]);

//秒转时分秒
filtersModule.filter('formatSeconds', [function () {
    return function (value) {
        var second = parseInt(value); // 秒 
        var minute = 0; // 分 
        var hour = 0; // 小时 
        if (second >= 60) {
            minute = parseInt(second / 60);
            second = parseInt(second % 60);
            if (minute >= 60) {
                hour = parseInt(minute / 60);
                minute = parseInt(minute % 60);
            }
        }
        var sec = "";
        var result = "";
        if (second == 0) {
            sec = "00";
            result += sec;
        } else {
            if (second >= 10) {
                result += second;
            } else {
                result = result + "0" + second;
            }
        }
        if (minute >= 0) {
            if (minute >= 10) {
                result = "" + parseInt(minute) + ":" + result;
            } else {
                result = "0" + parseInt(minute) + ":" + result;
            }
        }
        if (hour >= 0) {
            if (hour >= 10) {
                result = "" + parseInt(hour) + ":" + result;
            } else {
                result = "0" + parseInt(hour) + ":" + result;
            }
        }
        return result;
    }
}]
)

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//转html
filtersModule.filter('toHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]
)


//去掉html
filtersModule.filter('clearHtml', [function () {
    return function (text) {
        if (text == null || text == undefined) { return ""; }
        return text.replace(/<[^>]+>|&nbsp;/g, "");
    }
}]
)

//标签和知识点去掉  wshgkjqbwhfbxlfrh
filtersModule.filter('clearFG', [function () {
    return function (text) {
        if (text == null || text == undefined) { return ""; }
        return text.replace(/wshgkjqbwhfbxlfrh/g, "、");
    }
}]
)


//转换成时分秒
filtersModule.filter('FormatSeconds', function ($sce) {
    return function (seconds) {
        return $G2S.formatSeconds(seconds);
    }
});

//文件大小
filtersModule.filter('FileSizeFormat', function () {
    return function (size) {
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
        return fileSizeString;
    }
});

