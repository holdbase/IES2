<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserImgFile.aspx.cs" Inherits="App.G2S.DataProvider.User.UserImgFile" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script type="text/javascript">
        var IsImg = false;
        function successMsg() {
            window.parent.CloseImg_Upd();
        }
        function CloseDialog() {
            if (window.parent) {
                var index = window.parent.GetImport;
                parent.layer.close(index);
            }
        }

        function CancelClick() {
            if (window.parent) {
                this.CloseDialog();
            }
        }
        function Upload() {           
            document.getElementById("<%=File1.ClientID%>").click();      
        }
        function Confirm() {
            return IsImg;
        }
        function urlchange() {
            var imgsrc = document.getElementById("<%=File1.ClientID%>").value;        
            var point = imgsrc.lastIndexOf(".");
            var hzm = imgsrc.substr(point);
            if (hzm != ".jpg" && hzm != ".bmp" && hzm!=".png" && hzm!=".gif") {
                alert("请选择jpg、bmp、png、gif格式的文件！");
                IsImg = false;
            }
            else {
                document.getElementById("xlsUrl").value = imgsrc;
                IsImg = true;
            }
            
        }
    </script>
    <style>
        .cont_box {width: 330px; height: 120px;margin: 0 auto;}
        .top_box { width: 100%;height: 40px;float: left;}
        .top_box span {line-height: 40px;margin-left:20px;font-weight:bold;font-size:16px;}
        .main_box {width: 100%;height: 40px;float: left;}
        .foot_box {width: 100%;height: 40px;float: left;line-height:40px;}
        .upload_box{width:100%;height:30px;line-height:20px;float:left;}
        .upload_box input[type=text]{width:200px;height:20px;line-height:20px;float:left;margin-left:20px;}
        .upload_box a{float:left;font-size: 13px; margin-left:10px; width: 50px; height: 20px;display:block;text-align:center; background: #284a51; color: #fff; padding: 2px 15px 2px 15px;text-decoration:none}
        .determine_a {margin-left:20px;padding: 5px 10px 5px 10px;height: 20px;width: 60px;background: #284a51;line-height: 20px;color: #fff;text-align: center;border: 1px solid #ccc;text-decoration:none}
        .determine_btn {margin-left:20px;padding: 0;margin-top:5px;height: 30px;width: 60px;background: #284a51;line-height: 20px;color: #fff;text-align: center;border: 1px solid #ccc;text-decoration:none;float:left}
        .determine_btn:hover {background: #233f45;}
        .cancel_btn {margin-left:10px;padding: 5px 10px 5px 10px;height: 20px;width: 60px;background: #f2f2f2;line-height: 20px;color: #333;text-align: center;border: 1px solid #ccc;text-decoration:none}
        .cancel_btn:hover {background: #f8f8f8;}

    </style>
</head>
<body>
    <form id="form1" runat="server" method="post" enctype="multipart/form-data">
    <div class="cont_box">
            <div class="top_box">
                <span>上传照片</span>
            </div>
            <div class="main_box">
                <div class="upload_box">
                    <input type="text" id="xlsUrl" readonly="readonly" />
                    <a runat="server" href="javascript:Upload();">浏览</a>
                </div>  
                <div class="foot_box">
                    <a runat="server" class="determine_a" onclick="return Confirm()" onserverclick="Unnamed_ServerClick">确定</a>                 
                    <a class="cancel_btn" href="javascript:CancelClick();">取消</a>
                </div>       
                <div style="display: none">       
                    <asp:FileUpload ID="File1" runat="server" />                                                
                </div>
            </div>
        </div>
    </form>
</body>
</html>

