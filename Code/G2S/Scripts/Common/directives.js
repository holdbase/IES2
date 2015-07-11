
'use strict';

angular.module('app.directives', [])

.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}])
    //获取用户图片
.directive("userImg", ['userProviderUrl', function (userProviderUrl) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var url = userProviderUrl + "/UserIMGURL";
            var para = { UserID: attrs.userid };
            scope.baseService.post(url, para, function (data) {
                if (data.d == "/Images/default/User_M.jpg") {
                    data.d = window.appPatch + data.d;
                }
                $(element).attr("src", data.d);
            });
        }
    };
}])
//圆形统计图
.directive("drowpPieProgsess", [function () {
    return {
        restrict: 'A',
        scope: {
            id: '@',
            rale: '=',
            color: '@'
        },
        link: function (scope, element, attrs) {
            //$G2S.DirectivePieNoCartoon(attrs);
        } ,
        controller: function ($scope, $element) {
            $scope.$watch('rale', function (v) {
                //console.log($scope);
                $G2S.DirectivePieNoCartoon($scope);
            });
        }

    };
}])

//文件类型
.directive("fileExt", [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var arr = attrs.ext.split('.');
            var ext = arr[arr.length - 1].toLowerCase();
            if (ext == "文件夹") ext = "file";
            if (ext == "docx") ext = "doc";
            if (ext == "pptx" || ext == "pptm") ext = "ppt";
            if (ext == "xlsx" || ext == "xls") ext = "excel";
            if (ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png" || ext == "bmp" || ext == "ico") ext = "pic";
            $(element).addClass(ext);

        }
    };
}])

    //文件类型
.directive("keyUpCheck", [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var mul = attrs.mul;

            if (mul == 0 || mul == "undefined") {
                $(element).keyup(function () {
                     this.value = this.value.replace(/[^\d]/g, '');
                })
            }
            else if (mul == 1)
            {
                $(element).keypress(function () {                 
                    if (!this.value.match(/^[\+]?\d*?\.?\d{0,1}?$/)) this.value = ''
                }).keyup(function () {
                    if (!this.value.match(/^[\+]?\d*?\.?\d{0,1}?$/)) this.value = '';
                }).blur(function () {
                    if (!this.value.match(/^[\+]?\d*?\.?\d{0,1}?$/)) this.value = '';
                })
            }
            else if (mul == 2) {
                $(element).keypress(function () {
                    if (!this.value.match(/^[\+]?\d*?\.?\d{0,2}?$/)) this.value = ''
                }).keyup(function () {
                    if (!this.value.match(/^[\+]?\d*?\.?\d{0,2}?$/)) this.value = '';
                }).blur(function () {
                    if (!this.value.match(/^[\+]?\d*?\.?\d{0,2}?$/)) this.value = '';
                })
            }
        }
    };
}])

//文件上传
.directive('iesFileUploader', ['FileUploader', function (FileUploader) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        fileuptype: '=',  // 1:资料上传,2:附件上传
        ocid: '=',
        courseId: '=',
        folderObj: '=',
        filesize: "=",
        filecount: "=",
        filesuffix: "="
    }

    directive.templateUrl = window.appPatch + "/Template/iesFileUploader.html";

    directive.link = function (scope, elem, iAttrs) {
       
    }

    directive.controller = function ($scope, $element) {
        var UpLoadUrl = '';
        if (window.appPatch != '') {
            //本地调试
            if ($scope.fileuptype == 1) {
                UpLoadUrl = window.appPatch + "/DataProvider/FileUpload.ashx?action=ResourceFileUpload";
            } else if ($scope.fileuptype == 2) {
                UpLoadUrl = window.appPatch + "/DataProvider/FileUpload.ashx?action=AttachmentUpload";
            }
        } else {
            //网站部署后
            if ($scope.fileuptype == 1) {
                UpLoadUrl = "/FileService/FileUpload.ashx?action=ResourceFileUpload";
            } else if ($scope.fileuptype == 2) {
                UpLoadUrl = "/FileService/FileUpload.ashx?action=AttachmentUpload";
            }

        }

        var angularFileUploader = $scope.iesUploader = new FileUploader({
            url: UpLoadUrl
        });
        //angularFileUploader.formData.push({ OCID: $scope.ocid });
        //angularFileUploader.formData.push({ CourseID: $scope.courseId});
        //if ($scope.folderObj) {
        //    angularFileUploader.formData.push({ FolderID: $scope.folderObj.Id });
        //} else {
        //    angularFileUploader.formData.push({ FolderID: 0 }); 
        //}
        //angularFileUploader.formData.push({ ShareRange: 2 });

        $scope.$watch('ocid', function (v) {
            angularFileUploader.formData.length = 0;
            angularFileUploader.formData.push({ OCID: v });
            angularFileUploader.formData.push({ CourseID: $scope.courseId });
            if ($scope.folderObj) {
                angularFileUploader.formData.push({ FolderID: $scope.folderObj.Id });
            } else {
                angularFileUploader.formData.push({ FolderID: 0 });
            }
            angularFileUploader.formData.push({ ShareRange: 2 });
        });

        $scope.$watch('courseId', function (v) {
            angularFileUploader.formData.length = 0;
            angularFileUploader.formData.push({ OCID: $scope.ocid });
            angularFileUploader.formData.push({ CourseID: v });
            if ($scope.folderObj) {
                angularFileUploader.formData.push({ FolderID: $scope.folderObj.Id });
            } else {
                angularFileUploader.formData.push({ FolderID: 0 });
            }
            angularFileUploader.formData.push({ ShareRange: 2 });
        });

        $scope.$watch('folderObj', function (v) {
            if (v) {
                angularFileUploader.formData.length = 0;
                angularFileUploader.formData.push({ OCID: $scope.ocid });
                angularFileUploader.formData.push({ CourseID: $scope.courseId });
                angularFileUploader.formData.push({ FolderID: v.Id });
                angularFileUploader.formData.push({ ShareRange: 2 });
            }
        });


        // FILTERS
        angularFileUploader.filters.push({
            name: 'customFilter',  //限制文件个数
            fn: function (item /*{File|FileLikeObject}*/, options) {
                if (!(this.queue.length < $scope.filecount)) {
                    layer.msg("所选文件不能超过" + $scope.filecount + "个!");
                }
                return this.queue.length < $scope.filecount;
            }
        });

        angularFileUploader.filters.push({
            name: 'fileSuffix',//过滤器名称 过滤文件类型
            fn: function (item, options) {
                if ($scope.filesuffix.length > 0 && $scope.filesuffix[0] == "*.*") {
                    return true;
                }

                var fileName = item.name;
                var suffix = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                var flag = false;

                for (var i = 0; i < $scope.filesuffix.length; i++) {
                    if (suffix.toLowerCase() == $scope.filesuffix[i].toLowerCase()) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    layer.msg("文件格式必须属于" + $scope.filesuffix + "其中之一!");
                }
                return flag;
            }
        });

        angularFileUploader.filters.push({
            name: 'fileSize',//限制文件大小
            fn: function (item, options) {
                var fileSize = item.size;
                if (fileSize <= $scope.filesize * 1024 * 1024) {
                    return true;
                } else {
                    layer.msg("文件大小必须小于" + $scope.filesize + "M!");
                    return false;
                }
            }
        });
        $scope.iesUploader.progressie8 = 0;
        // CALLBACKS 
        angularFileUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            $scope.$emit('onWhenAddingFileFailed', item, filter, options);
        };
        angularFileUploader.onAfterAddingFile = function (fileItem) {
            $scope.$emit('onAfterAddingFile', fileItem);
        };
        angularFileUploader.onAfterAddingAll = function (addedFileItems) {
            $scope.$emit('onAfterAddingAll', addedFileItems);
        };
        angularFileUploader.onBeforeUploadItem = function (item) {
            $scope.iesUploader.progressie8 = 1;
            console.log("onBeforeUploadItem");
            $scope.$emit('onBeforeUploadItem', item);
        };
        angularFileUploader.onProgressItem = function (fileItem, progress) {
        };
        angularFileUploader.onProgressAll = function (progress) {
            $scope.$emit('onProgressAll', progress);
        };
        angularFileUploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.$emit('onSuccessItem', fileItem, response, status, headers);
        };
        angularFileUploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.$emit('onErrorItem', fileItem, response, status, headers);
        };
        angularFileUploader.onCancelItem = function (fileItem, response, status, headers) {
            $scope.$emit('onCancelItem', fileItem, response, status, headers);
        };
        angularFileUploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.$emit('onCompleteItem', fileItem, response, status, headers);
        };
        angularFileUploader.onCompleteAll = function () {
            $scope.iesUploader.progressie8 = 0;
            angularFileUploader.clearQueue();
            $(".xubox_min").click();
            $scope.$emit('onCompleteAll');
        };
    }

    return directive;
}])

.directive('iesExcelUploader', ['FileUploader', function (FileUploader) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        step: '@',
        fileuptype: '=',  // 1:资料上传,2:附件上传 3 excel 上传web服务器
        ocid: '=',
        courseId: '=',
        folderObj: '=',
        filesize: "=",
        filecount: "=",
        filesuffix: "="
    }
    //debugger;
    //alert(directive.scope.step);
    directive.templateUrl = window.appPatch + "/Template/iesExcelUploader.html";


    directive.link = function (scope, elem, iAttrs) {
    }

    directive.controller = function ($scope, $element) {
        //----------上传文件start--------
        var UpLoadUrl = '';
        if (window.appPatch != '') {
            //本地调试
            if ($scope.fileuptype == 1) {
                UpLoadUrl = window.appPatch + "/DataProvider/FileUpload.ashx?action=ResourceFileUpload";
            } else if ($scope.fileuptype == 2) {
                UpLoadUrl = window.appPatch + "/DataProvider/FileUpload.ashx?action=AttachmentUpload";
            }
            else if ($scope.fileuptype == 3) {
                UpLoadUrl = window.appPatch + "/DataProvider/FileUpload.ashx?action=ExcelFileUpload";
            }
        } else {

            //网站部署后
            if ($scope.fileuptype == 1) {
                UpLoadUrl = "/FileService/FileUpload.ashx?action=ResourceFileUpload";
            } else if ($scope.fileuptype == 2) {
                UpLoadUrl = "/FileService/FileUpload.ashx?action=AttachmentUpload";
            }
            else if ($scope.fileuptype == 3) {
                UpLoadUrl = "/FileService/FileUpload.ashx?action=ExcelFileUpload";
            }
        }
        var angularFileUploader = $scope.iesUploader = new FileUploader({
            url: UpLoadUrl
        });

        // FILTERS
        angularFileUploader.filters.push({
            name: 'customFilter',  //限制文件个数
            fn: function (item /*{File|FileLikeObject}*/, options) {
                if (!(this.queue.length < $scope.filecount)) {
                    layer.msg("所选文件不能超过" + $scope.filecount + "个!");
                }
                return this.queue.length < $scope.filecount;
            }
        });

        angularFileUploader.filters.push({
            name: 'fileSuffix',//过滤器名称 过滤文件类型
            fn: function (item, options) {
                if ($scope.filesuffix.length > 0 && $scope.filesuffix[0] == "*.*") {
                    return true;
                }

                var fileName = item.name;
                var suffix = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                var flag = false;

                for (var i = 0; i < $scope.filesuffix.length; i++) {
                    if (suffix.toLowerCase() == $scope.filesuffix[i].toLowerCase()) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    layer.msg("文件必须是以下类型：" + $scope.filesuffix);
                }
                return flag;
            }
        });

        angularFileUploader.filters.push({
            name: 'fileSize',//限制文件大小
            fn: function (item, options) {
                var fileSize = item.size;
                if (fileSize <= $scope.filesize * 1024 * 1024) {
                    return true;
                } else {
                    layer.msg("文件大小必须小于" + $scope.filesize + "M!");
                    return false;
                }
            }
        });
       
        // CALLBACKS 
        angularFileUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            $scope.$emit('onWhenAddingFileFailed', item, filter, options);
        };
        angularFileUploader.onAfterAddingFile = function (fileItem) {
            //angularFileUploader.url = '/DataProvider/FileUpload.ashx/?FROM=1';
            $scope.$emit('onAfterAddingFile', fileItem);
        };
        angularFileUploader.onAfterAddingAll = function (addedFileItems) {
            $scope.$emit('onAfterAddingAll', addedFileItems);
        };
        angularFileUploader.onBeforeUploadItem = function (item) {
            $scope.$emit('onBeforeUploadItem', item);
        };
        angularFileUploader.onProgressItem = function (fileItem, progress) {
            $scope.$emit('onProgressItem', fileItem, progress);
        };
        angularFileUploader.onProgressAll = function (progress) {
            $scope.$emit('onProgressAll', progress);
        };
        angularFileUploader.onSuccessItem = function (fileItem, response, status, headers) {
            angularFileUploader.clearQueue();
            $scope.$emit('onSuccessItem', fileItem, response, status, headers);
        };
        angularFileUploader.onErrorItem = function (fileItem, response, status, headers) {
            angularFileUploader.clearQueue();
            $scope.$emit('onErrorItem', fileItem, response, status, headers);
        };
        angularFileUploader.onCancelItem = function (fileItem, response, status, headers) {
            angularFileUploader.clearQueue();
            $scope.$emit('onCancelItem', fileItem, response, status, headers);
        };
        angularFileUploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.$emit('onCompleteItem', fileItem, response, status, headers);
        };
        angularFileUploader.onCompleteAll = function () {
            angularFileUploader.clearQueue();
            $scope.$emit('onCompleteAll');
            //$element.hide();
        };
    }

    return directive;
}])

//文件预览
.directive('iesFilePreview', function () {
    var directive = {};
    directive.restrict = 'EA';
    directive.scope = {
        fileid: "=",
        flash: "@",
        viewurl: '=',
        width: '=',
        height: '=',
        autoplay: '=',
        setMute: "=",
        pageurl: "=",
        filetype: "="
    }

    directive.templateUrl = window.appPatch + "/Template/iesFilePreview.html";

    directive.link = function (scope, elem, iAttrs) {
        //elem.bind('click', function () {
        //    alert(123456);
        //});
    }
    directive.controller = function ($scope, $element) {

        $scope.$watch('viewurl', function (v) {
            if (v) {
                if ($scope.viewurl == "") {
                    $("#div_play_wrapper").remove();
                }
                if ($scope.filetype != 1) {
                    $("#ifFile").show();
                    $("#ifFile").css("width", $scope.width);
                    $("#ifFile").css("height", $scope.height);
                    $("#div_play").hide();
                    // parent.ifFile.location.href = $scope.viewurl;
                    $('#ifFile').attr('src', $scope.viewurl);
                } else {
                    $("#div_play").show();
                    $("#div_play").css("width", $scope.width);
                    $("#div_play").css("height", $scope.height);
                    $("#ifFile").hide();
                    var thePlayer = jwplayer("div_play");
                    thePlayer.setup({
                        flashplayer: window.appPatch + $scope.flash,
                        file: $scope.viewurl,
                        width: $scope.width,
                        height: $scope.height,
                        hide: true,
                        title: 'Able',
                        startparam: 'start',
                        provider: 'http'
                    });
                    if ($scope.autoplay) {
                        thePlayer.play();
                    }
                    if ($scope.setMute) {
                        thePlayer.setMute(true);
                    }
                }
                // $("#ifFile").show();
                //parent.ifFile.location.href = "";

            }
        });

    }

    return directive;

})

//文件预览
.directive('teachingPlan', function () {
    var directive = {};
    directive.restrict = 'EA';
    directive.scope = {
        ocid: "="

    }

    directive.templateUrl = window.appPatch + "/Template/teachingPlan.html";

    directive.link = function (scope, elem, iAttrs) {

    }
    directive.controller = function ($scope, $element, sitepreviewProviderUrl) {



    }
    return directive;
});



