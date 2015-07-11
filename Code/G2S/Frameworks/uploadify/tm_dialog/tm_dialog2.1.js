/***
* @author 徐成飞
* @date : 2012-12-12 09:53:12
* TmDialog参数说明:
* 
* 基础参数有:
* title :标题
* content ：内容
* value, 只适合用于prompt弹出框
* callback 回调函数
* 
* options参数包括有:
* width：宽度
* height：高度
* arrow：显示位置，十二个方位
* timeout：是否定时关闭，写数字就行
* overlay：是否显示阴影层，默认为:show 不显示:hide
* icon:图标显示：之适用于alert,sure弹出框,它有:warm(警告)tip(提示)question(疑问)success(成功)error(错误)
* drag:"true",是否可以拖动 在message弹出框中,drag是为"false".
* animate:"true", 是否用特效关闭弹出层 是："true" 否："false"
* msg icon timer 只适用于tipSuccess
*/
(function($) {
    var dialogTimerInterval2 = null;
    var dialogTimerInterval = null;
    $.fn.tmDialog = function(options) {
        return this.each(function() {
            var opts = null;
            var cache = $(this).data("tmDialog");
            if (cache) {
                opts = $.extend(cache.options, options);
                cache.options = opts;
            } else {
                opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.parseOptions($(this)), $.fn.tmDialog.methods, options);
                $(this).data("tmDialog", { options: opts });
                tmDialogInit($(this));
            }
        });
    }

    /*方法初始化*/
    var zindex = 100;
    function tmDialogInit($this) {
        var opts = $this.data("tmDialog").options;
        $this.live("click", function() {
            zindex++;
            var $dialog = opts.data(opts);
            $dialog.click(function() {
                zindex++;
                $(this).css("zIndex", zindex);
            });
            /*参数控制*/
            if (opts.drag) opts._drag($dialog);
            opts._overlay(opts.overlay); //阴影层
            opts.showType($dialog, $this); //图标控制
            //是否采用特效
            if (opts.animate) {
                $dialog.hide();
                opts._positionTarget($dialog, $this);
            }
            if (opts.appendBtn != "") opts._appendBtn($dialog, $this);
            if (opts.appendTitle != "") opts._appendTitle($dialog, $this);
            if (opts.timeout != "" && opts.timeout != 0) opts._timer($dialog, $this);
            opts._btnArrow($dialog, $this);
            opts._position("true", $dialog, $this);
            opts._resizePosition(true, $dialog, $this);
            opts.before($dialog, $this, opts);
        });
    }

    /*事件方法定义*/
    $.fn.tmDialog.methods = {
        data: function(opts) {
            clearInterval(dialogTimerInterval);
            clearInterval(dialogTimerInterval2);
            if (opts.single) $(".wrap_popboxes").remove();
            var rid = tmRandom();
            var $popbox = $('<div id="tm_dialog_' + opts.opid + "_" + rid + '" class="wrap_popboxes  ' + opts.appendClass + '" style="position:' + opts.pos + ';z-index:' + zindex + ';width:' + opts.width + 'px;">' +
				'<h4 class="popboxes_tit" style="' + opts.titleBorder + '"><strong id="popbox_title">' + opts.title + '</strong></h4>' +
				'<div class="box_popboxes">' +
					'<div class="popboxes_main">' +
						'<span class="tm_box_icon ico_' + opts.icon + ' txt_hidd"></span>' +
						'<div class="popboxes_con">' +
							'<p>' + opts.content + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="popboxes_btn">' +
						'<a href="javascript:void(0)" class="popbtn_yes"><span>' + opts.sureButton + '</span></a>' +
						'<a href="javascript:void(0)" class="popbtn_cancel"><span>' + opts.cancleButton + '</span></a>' +
					'</div>' +
				'</div>' +
				'<div style="position:absolute;top:5px;right:0px;"><a href="javascript:void(0);" class="popboxes_close txt_hidd" title="关闭">关闭</a></div>' +
			'</div>');
            $("body").append($popbox);
            /*事件绑定*/
            return $popbox;
        },
        _setTitle: function($dialog, $this, titleHtml) {
            $dialog.find("#popbox_title").html(titleHtml);
        },
        _appendTitle: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            $dialog.find("#popbox_title").css("position", "absolute");
            $dialog.find("#popbox_title").html(opts.appendTitle);
            $dialog.find(".tm_apptit").click(function() {
                $(this).siblings().removeClass("popbox_apptit_selected");
                $(this).addClass("popbox_apptit_selected");
            });
        },
        _appendBtn: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            $dialog.find(".popboxes_btn").append(opts.appendBtn);
        },
        _btnArrow: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            $dialog.find(".popboxes_btn").css("textAlign", opts.btnArrow);
        },
        showType: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            switch (opts.type) {
                case "alert":
                    $dialog.find(".popbtn_cancel").remove();
                    this._sure($dialog, $this);
                    this._close($dialog, $this);
                    break;
                case "confirm":
                    this._sure($dialog, $this);
                    this._cancle($dialog, $this);
                    this._close($dialog, $this);
                    break;
                case "sure":
                    $dialog.find(".popbtn_cancel").remove();
                    $dialog.find(".popboxes_close").remove();
                    this._sure($dialog, $this);
                    break;
                case "html":
                    $dialog.find(".popboxes_btn").remove();
                    $dialog.find(".popboxes_main").css({ padding: 8, overflow: "hidden" });
                    $dialog.find(".popboxes_main").html(opts.content);
                    this._close($dialog, $this);
                    //					$dialog.find(".popboxes_main").load(opts.content);
                    break;
                case "iframe":
                    $dialog.find(".popboxes_main").height(opts.height);
                    $dialog.find(".popboxes_main").html("<div id='tmDialog_loading' style='position:absolute;top:50%;left:40%;'><img src='../web/images/loading.gif'><label style='font-size:12px;'>数据马上就来...</label></div>");
                    var iframe = document.createElement("iframe");
                    iframe.id = "tmDialog_iframe";
                    iframe.width = "100%";
                    iframe.height = (opts.height);
                    iframe.scrolling = "auto";
                    iframe.frameborder = "0";
                    if (opts.url.indexOf("?") == -1) {
                        opts.url += "?dialog=true";
                    } else {
                        opts.url += "&dialog=true";
                    }
                    if ($this.attr("opid") != undefined) {
                        opts.url = opts.url.replace(/#opid/, $this.attr("opid"));
                    }
                    if ($this.attr("to") != undefined) {
                        opts.url = opts.url.replace(/#to/, $this.attr("to"));
                    }
                    iframe.src = opts.url;
                    iframe.style.display = "none";
                    $(iframe).attr("frameborder", "0");
                    $dialog.find(".popboxes_main").append(iframe);
                    $(iframe).load(function() {
                        iframe.style.display = "block";
                        $("#tmDialog_loading").hide();
                    });

                    $dialog.find(".popboxes_main").css({ padding: 5, overflow: "hidden" });
                    $dialog.find(".popbtn_yes").click(function() {
                        $.fn.tmDialog.methods._remove($dialog, $this);
                        if (opts.callback) opts.callback($.fn.tmDialog.methods._dialogIframeObject("tmDialog_iframe"), $dialog, $.fn.tmDialog.methods._parentIframe());
                        $.fn.tmDialog.methods._remove($dialog, $this);
                    });
                    $dialog.find(".popbtn_cancel").click(function() {
                        $.fn.tmDialog.methods._remove($dialog, $this);
                        if (opts.callback) opts.callback(null, null, null);
                    });
                    $dialog.find(".popboxes_close").click(function() {
                        $.fn.tmDialog.methods._remove($dialog, $this);
                        if (opts.callback) opts.callback(null, null, null);
                    });
                    break;
                case "prompt":
                    $dialog.find(".popboxes_con").append("<input type='text' style='width:100%' value='" + opts.value + "' class='popbox_input'/>");
                    $dialog.find(".popboxes_con").css("padding", 20);
                    $dialog.find(".popbox_input").focus();
                    $dialog.find(".popbtn_yes").click(function() {
                        var promptVal = $dialog.find(".popbox_input").val();
                        if (promptVal == "") {
                            $dialog.find(".popbox_input").focus();
                            return;
                        }
                        $.fn.tmDialog.methods._remove($dialog, $this);
                        if (opts.callback) opts.callback(promptVal);
                    });
                    $dialog.find(".popbtn_cancel").click(function() {
                        $.fn.tmDialog.methods._remove($dialog, $this);
                        if (opts.callback) opts.callback(null);
                    });
                    $dialog.find(".popboxes_close").click(function() {
                        $.fn.tmDialog.methods._remove($dialog, $this);
                        if (opts.callback) opts.callback(null);
                    });
                    $dialog.find(".tm_box_icon").remove();
                    break;
            }
        },
        _dialogIframeObject: function(iframeId) {
            return document.getElementById(iframeId).contentWindow;
        },
        _parentIframe: function() {
            return $(parent.document);
        },
        _cancle: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            $dialog.find(".popbtn_cancel").click(function() {
                $.fn.tmDialog.methods._remove($dialog, $this);
                if (opts.callback) {
                    opts.callback(false);
                }
            });
        },

        _sure: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            $dialog.find(".popbtn_yes").click(function() {
                $.fn.tmDialog.methods._remove($dialog, $this);
                if (opts.callback) {
                    opts.callback(true);
                }
            });
        },

        _close: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            $dialog.find(".popboxes_close").click(function() {
                $.fn.tmDialog.methods._remove($dialog, $this);
                if (opts.callback) {
                    opts.callback(false);
                }
            });
        },

        _drag: function($dialog) {
            $dialog.find(".popboxes_tit").tmDrag({ to: $dialog, ghsot: true, callback: function(dragFix) {
                $dialog.next(".tm_resizable").css({ left: dragFix.left, top: dragFix.top });
            } 
            });
        },

        _overlay: function(status) {
            switch (status) {
                case "show":
                    $("#popbox_overlay").remove();
                    var height = $("body").outerHeight(true);
                    var overLayObj = $('<div id="popbox_overlay" style="width:100%; height:' + height + 'px; background-color:#000; position:absolute; top:0; left:0; z-index:99;"></div>');
                    $("body").append(overLayObj);
                    overLayObj.css("opacity", "0.42");
                    break;
                case "hide":
                    $("#popbox_overlay").remove();
                    break;
            }
        },

        _resizePosition: function(status, $dialog, $this) {
            var opts = $this.data("tmDialog").options;
            switch (status) {
                case true:
                    $(window).bind('resize', function() {
                        $.fn.tmDialog.methods._position(status, $dialog, $this);
                    });
                    break;
                case false:
                    $(window).unbind('resize', function() {
                        $.fn.tmDialog.methods._position(status, $dialog, $this);
                    });
                    break;
            }
        },
        _position: function(status, $dialog, $this) {
            var opts = $this.data("tmDialog").options;
            if (status) {
                var top = this._fix($dialog).top - opts.offsetTop;
                var left = this._fix($dialog).left;
                $dialog.css({ left: left, top: top });
                $dialog.next(".tm_resizable").css({ left: left, top: top });
            }
        },

        _fix: function($dialog) {
            var bodyHeight = getClientHeight();
            var bodyWidth = getClientWidth();
            var dialogWidth = $dialog.width();
            var dialogHeight = $dialog.height();
            var top = (bodyHeight - dialogHeight) / 2;
            var left = (bodyWidth - dialogWidth) / 2;
            return { left: left, top: top };
        },
        _positionTarget: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            zindex++;
            var $resizeProxy = $("<div class='tm_resizable' style='position:absolute;z-index:" + zindex + ";border:2px dotted #4684b2;'></div>");
            var $thisPos = $this.position();
            var width = $dialog.width();
            var height = $dialog.height();
            var $bodyPos = this._fix($dialog);
            $dialog.after($resizeProxy);
            $dialog.next(".tm_resizable").css({ left: ($thisPos.left + $this.width() / 2), top: ($thisPos.top + $this.height() / 2) }).show();
            $dialog.next(".tm_resizable").animate({ opacity: 1, width: width + "px", height: height + "px", top: ($bodyPos.top + windowPosition.scrollTop() - opts.offsetTop) + "px", left: $bodyPos.left + "px" }, 300, function() {
                $(this).hide();
                $.fn.tmDialog.methods._show($dialog);
            });
        },
        _remove: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            this._overlay("hide");
            clearInterval(dialogTimerInterval);
            if (opts.animate) {
                var t = $this.position().top;
                var l = $this.position().left;
                var width = $this.width();
                var height = $this.height();
                var left = $dialog.position().left;
                var top = $dialog.position().top;
                this._hide($dialog);
                $dialog.next(".tm_resizable").show();
                $dialog.next(".tm_resizable").animate({ left: l + "px", top: t + "px", width: width + "px", height: height + "px", opacity: 0 }, 400, function() {
                    $(this).remove();
                    $dialog.remove();
                });
            } else {
                this._fadeout($dialog, $this);

            }


        },
        _fadeout: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            clearInterval(dialogTimerInterval);
            if (opts.fadeout) {
                $dialog.fadeOut('fast', function() {
                    $(this).remove();
                });
            } else {
                $dialog.remove();
            }
        },
        _timer: function($dialog, $this) {
            var opts = $this.data("tmDialog").options;
            var count = opts.timeout * 1;
            var title = $dialog.find("#popbox_title").text();
            dialogTimerInterval = setInterval(function() {
                $dialog.find("#popbox_title").text(title + "(" + count + ")");
                count--;
                if (count < 0) {
                    $.fn.tmDialog.methods._remove($dialog, $this);
                    clearInterval(dialogTimerInterval);
                }
            }, 900);
        },
        _hide: function($dialog) {
            clearInterval(dialogTimerInterval);
            $dialog.hide();
            this._overlay("hide");
        },
        _show: function($dialog) {
            $dialog.show();
        }
    }

    $.fn.tmDialog.parseOptions = function(target) {
        var $target = $(target);
        return {
            opid: $target.attr("id"),
            icon: $target.attr("icon"),
            title: $target.attr("title"),
            drag: $target.attr("drag"),
            animate: $target.attr("animate"),
            type: $target.attr("type"),
            offsetLeft: $target.attr("offsetLeft"),
            offsetTop: $target.attr("offsetTop"),
            sureButton: $target.attr("sureButton"),
            cancleButton: $target.attr("cancleButton")
        }
    };

    /*默认参数设置*/
    $.fn.tmDialog.defaults = {
        pos: "fixed",
        appendClass: "wrap_popchapter",
        url: "http://www.baidu.com",
        opid: "win",
        title: "提示",
        icon: "success",
        msg: "保存成功",
        content: "请输入",
        sureButton: "确定",
        cancleButton: "取消",
        width: 360,
        height: 0,
        offsetLeft: 0,
        offsetTop: 40,
        overlay: "show",
        drag: false,
        timeout: 0,
        type: "alert",
        value: "",
        animate: true,
        fadeout: false,

        btnArrow: "right",
        appendBtn: "",
        appendTitle: "",
        time: 1,
        target: "",
        showBtn: true,
        titleHeight: "",
        titleBackground: "",
        titleBorder: "",
        showTimerText: false,
        single: false,
        validator: function(ok) { },
        finish: function() { },
        success: function() { },
        before: function() { },
        callback: function(ok) {

        }
    }


    /*单列模式*/
    $.tmDialog = {
        tipSuccess: function(options) {
            clearInterval(dialogTimerInterval2);
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            $(".box_savetip").remove();
            if (opts.icon == 'success') opts.icon = "succ";
            $("body").append('<strong class="box_savetip"><span class="savetip_' + opts.icon + '">' + opts.msg + '<span style="display:none;" id="popbox_title"></span></span></strong>');
            $(".box_savetip").css({ position: "fixed", zIndex: 999999 });
            var self = $(".box_savetip");
            var pos = opts._fix(self);
            opts._overlay("show");
            $(".box_savetip").css({ position: "fixed", top: pos.top, left: pos.left });
            $("#popbox_overlay").click(function() {
                $(".box_savetip").fadeOut('slow', function() {
                    $(this).remove();
                    opts._overlay("hide");
                    clearInterval(dialogTimerInterval2);
                });
            });
            if (isNotEmpty(opts.time)) {
                this._tipTimer(opts);
            }
        },

        _tipTimer: function(opts) {
            var count = opts.time * 1;
            var title = $("#popbox_title").text();
            dialogTimerInterval2 = setInterval(function() {
                $("#popbox_title").text(title + "(" + count + ")");
                count--;
                if (count <= 0) {
                    $(".box_savetip").remove();
                    opts._overlay("hide");
                    opts.success();
                    count == 0;
                    clearInterval(dialogTimerInterval2);
                }
            }, 500);
        },
        alert: function(options) {
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (!opts.showBtn) this._showBtn($dialog, opts);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            if (opts.timeout != "" && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            $dialog.find(".popbtn_cancel").remove();
            this._sure($dialog, opts);
            this._close($dialog, opts);
        },
        _showBtn: function($dialog, opts) {
            $dialog.find(".popboxes_btn").remove();
        },
        _positionProxy: function($dialog, opts) {
            if (opts.animate && isNotEmpty(opts.target)) {
                var $this = opts.target;
                zindex++;
                var $resizeProxy = $("<div class='tm_resizable' style='position:absolute;z-index:" + zindex + ";border:2px dotted #4684b2;'></div>");
                var $thisPos = $this.position();
                var width = $dialog.width();
                var height = $dialog.height();
                var $bodyPos = this._fix($dialog);
                $dialog.after($resizeProxy);
                $dialog.next(".tm_resizable").css({ left: ($thisPos.left + $this.width() / 2), top: ($thisPos.top + $this.height() / 2) }).show();
                $dialog.next(".tm_resizable").animate({ opacity: 1, width: width + "px", height: height + "px", top: ($bodyPos.top + windowPosition.scrollTop() - opts.offsetTop) + "px", left: $bodyPos.left + "px" }, 300, function() {
                    $(this).hide();
                    $dialog.show();
                });
            }
        },
        confirm: function(options) {
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            if (opts.timeout != "" && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            if (!opts.showBtn) this._showBtn($dialog, opts);
            this._sure($dialog, opts);
            this._close($dialog, opts);
            this._cancle($dialog, opts);
        },

        prompt: function(options) {
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }

            if (!opts.showBtn) this._showBtn($dialog, opts);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (opts.timeout != "" && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            $dialog.find(".popboxes_con").append("<input type='text' style='width:100%' value='" + opts.value + "' class='popbox_input'/>");
            $dialog.find(".popboxes_con").css("padding", 20);
            $dialog.find(".popbox_input").focus();
            $dialog.find(".popbtn_yes").click(function() {
                var promptVal = $dialog.find(".popbox_input").val();
                if (promptVal == "") {
                    $dialog.find(".popbox_input").focus();
                    return;
                }

                if (!opts.validator($dialog.find(".popbox_input"))) {
                    return;
                }
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) opts.callback(promptVal);
            });
            $dialog.find(".popbtn_cancel").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) opts.callback(null);
            });
            $dialog.find(".popboxes_close").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) opts.callback(null);
            });
            $dialog.find(".tm_box_icon").remove();
        },

        sure: function(options) {
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }
            if (!opts.showBtn) this._showBtn($dialog, opts);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (opts.timeout != "" && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            $dialog.find(".popbtn_cancel").remove();
            $dialog.find(".popboxes_close").remove();
            this._sure($dialog, opts);
        },
        message: function(options) {
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }
            if (!opts.showBtn) this._showBtn($dialog, opts);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (opts.timeout != "" && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            $dialog.find(".popbtn_yes").hide();
            $dialog.find(".popboxes_main").height(opts.height | 85);
            $dialog.find(".popboxes_btn").hide();
            $dialog.find(".popbtn_cancel").hide();
            this._close($dialog, opts);
        },


        html: function(options) {
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }
            if (!opts.showBtn) this._showBtn($dialog, opts);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (opts.timeout != "" && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            $dialog.find(".popboxes_btn").remove();
            $dialog.find(".popboxes_main").css({ padding: 8, overflow: "hidden" });
            $dialog.find(".popboxes_main").html(opts.content);
            this._close($dialog, opts);
        },
        iframe: function(options) {
            clearInterval(dialogTimerInterval);
            clearInterval(dialogTimerInterval2);
            var opts = $.extend({}, $.fn.tmDialog.defaults, $.fn.tmDialog.methods, options);
            var $dialog = opts.data(opts);
            this._overlay(opts.overlay);
            if (opts.drag) opts._drag($dialog);
            if (isNotEmpty(opts.titleHeight)) $dialog.find(".popboxes_tit").height(opts.titleHeight);
            if (isNotEmpty(opts.titleBackground)) $dialog.find(".popboxes_tit").css("background", opts.titleBackground);
            if (isNotEmpty(opts.timeout) && opts.timeout != 0) $.tmDialog._timer($dialog, opts);
            $dialog.find(".popboxes_main").height(opts.height);
            $dialog.find(".popboxes_main").html("<div id='tmDialog_loading' class='tm-dialog-loading' style='position:absolute;top:50%;left:40%;'><img src='../web/images/loading.gif'><label style='font-size:12px;'>数据马上就来...</label></div>");
            this._position("true", $dialog, opts);
            this._resizePosition(true, $dialog, opts);
            if (opts.animate && isNotEmpty(opts.target)) {
                $dialog.hide();
                this._positionProxy($dialog, opts);
            }
            if (!opts.showBtn) this._showBtn($dialog, opts);
            var iframe = document.createElement("iframe");
            iframe.id = "tmDialog_iframe";
            iframe.width = "100%";
            iframe.height = (opts.height);
            iframe.scrolling = "no";
            iframe.frameborder = "0";
            if (opts.url.indexOf("?") == -1) {
                opts.url += "?dialog=true";
            } else {
                opts.url += "&dialog=true";
            }
            iframe.src = opts.url;
            iframe.style.display = "none";
            $(iframe).attr("frameborder", "0");
            $dialog.find(".popboxes_main").append(iframe);
            $(iframe).load(function() {
                iframe.style.display = "block";
                $dialog.find("#tmDialog_loading").remove();
            });

            $dialog.find(".popboxes_main").css({ padding: 5, overflow: "hidden" });
            $dialog.find(".popbtn_yes").click(function() {
                if (opts.callback) opts.callback($.tmDialog._dialogIframeObject("tmDialog_iframe"), $dialog, $.tmDialog._parentIframe(), opts);
            });
            $dialog.find(".popbtn_cancel").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) opts.callback(null, null, null, null);
            });
            $dialog.find(".popboxes_close").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) opts.callback(null, null, null, null);
            });

        },
        _dialogIframeObject: function(iframeId) {
            return document.getElementById(iframeId).contentWindow;
        },
        _parentIframe: function() {
            return $(parent.document);
        },
        _sure: function($dialog, opts) {
            $dialog.find(".popbtn_yes").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) {
                    opts.callback(true);
                }
            });
        },

        _cancle: function($dialog, opts) {
            $dialog.find(".popbtn_cancel").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) {
                    opts.callback(false);
                }
            });
        },

        _close: function($dialog, opts) {
            $dialog.find(".popboxes_close").click(function() {
                $.tmDialog._remove($dialog, opts);
                if (opts.callback) {
                    opts.callback(false);
                }
            });
        },

        _position: function(status, $dialog, opts) {
            if (status) {
                var top = this._fix($dialog).top - opts.offsetTop;
                var left = this._fix($dialog).left - opts.offsetLeft;
                $dialog.css({ left: left, top: top });
                $dialog.next(".tm_resizable").css({ left: left, top: top });
            }
        },

        _fix: function($dialog) {
            var bodyHeight = getClientHeight();
            var bodyWidth = getClientWidth();
            var dialogWidth = $dialog.width();
            var dialogHeight = $dialog.height();
            var top = (bodyHeight - dialogHeight) / 2;
            var left = (bodyWidth - dialogWidth) / 2;
            return { left: left, top: top };
        },

        _resizePosition: function(status, $dialog, opts) {
            switch (status) {
                case true:
                    $(window).bind('resize', function() {
                        $.tmDialog._position(status, $dialog, opts);
                    });
                    break;
                case false:
                    $(window).unbind('resize', function() {
                        $.tmDialog._position(status, $dialog, opts);
                    });
                    break;
            }
        },

        _remove: function($dialog, opts) {
            clearInterval(dialogTimerInterval);
            if (opts.animate && isNotEmpty(opts.target)) {
                var $this = opts.target;
                $this.show();
                var t = $this.position().top;
                var l = $this.position().left;
                var width = $this.width();
                var height = $this.height();
                var left = $dialog.position().left;
                var top = $dialog.position().top;
                this._hide($dialog);
                $dialog.next(".tm_resizable").show();
                $dialog.next(".tm_resizable").animate({ left: l + "px", top: t + "px", width: width + "px", height: height + "px", opacity: 0 }, 400, function() {
                    $(this).remove();
                    $dialog.remove();
                    $.tmDialog._overlay("hide");
                });
            } else {
                if (opts.fadeout) {
                    $dialog.fadeOut(400, function() {
                        $(this).remove();
                        $.tmDialog._overlay("hide");
                    })
                } else {
                    $dialog.remove();
                    $.tmDialog._overlay("hide");
                }
            }
        },
        _hide: function($dialog) {
            clearInterval(dialogTimerInterval);
            $dialog.hide();
            $.tmDialog._overlay("hide");
        },
        _timer: function($dialog, opts) {
            var count = opts.timeout * 1;
            var title = $dialog.find("#popbox_title").text();
            dialogTimerInterval = setInterval(function() {
                if (opts.showTimerText) {
                    $dialog.find("#popbox_title").text(title + "(" + count + ")");
                }
                count--;
                if (count <= 0) {
                    $.tmDialog._remove($dialog, opts);
                    opts.finish();
                    clearInterval(dialogTimerInterval);
                }
            }, 700);
        },
        _overlay: function(status) {
            switch (status) {
                case "show":
                    $("#popbox_overlay").remove();
                    var height = $("body").outerHeight(true);
                    var overLayObj = $('<div id="popbox_overlay" style="width:100%; height:' + height + 'px; background-color:#000; position:absolute; top:0; left:0; z-index:99;"></div>');
                    $("body").append(overLayObj);
                    overLayObj.css("opacity", "0.42");
                    break;
                case "hide":
                    $("#popbox_overlay").remove();
                    break;
            }
        }
    }
})(jQuery)

//$(function(){
////	$("#alert").live("click",function(){
////		$.tmDialog.alert({target:$(this),title:"你好",content:"圣达菲圣达菲圣达菲",callback:function(ok){
////			if(ok){
////			}else{
////			}
////		}});
////	});
//	
////	$.tmDialog.confirm({title:"删除",content:"你确定删除吗?",callback:function(ok){
////			if(ok){
////				alert("success");
////			}else{
////				alert("fail");
////			}
////		
////	}});
//	
////	$.tmDialog.sure({title:"删除",icon:"warm",content:"你确定删除吗?",callback:function(ok){
////			if(ok){
////				alert("success");
////			}else{
////				alert("fail");
////			}
////		
////	}});
//	
////	$.tmDialog.prompt({title:"删除",content:"请输入：",value:"11111",callback:function(ok){
////			if(ok){
////				alert(ok);
////			}else{
////				alert("fail");
////			}
////		
////	}});
//	
////	$.tmDialog.html({title:"删除",content:"请输入：",callback:function(ok){
////			if(ok){
////				alert(ok);
////			}else{
////				alert("fail");
////			}
////		
////	}});
////	$("#alert").live("click",function(){
////		$.tmDialog.iframe({title:"删除",target:$(this),url:"http://www.xunlei.com",width:640,height:480,timeout:0,callback:function($iframe,$dialog,$parent){
////				if($iframe && $dialog && $parent){
////					alert($dialog);
////				}
////		}});
////	});
//	
//})
