using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.SessionState;
using System.IO;

namespace App.G2S.DataProvider
{
    /// <summary>
    /// FileUpload 的摘要说明
    /// 公用上传文件处理程序
    /// </summary>
    public class FileUpload : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/x-www-form-urlencoded";
            context.Response.AddHeader("Cache-Control", "no-cache,must-revalidate");
            if (IES.Service.UserService.CurrentUser.UserID <= 0)
            {
                return;
            }
            if (!FilePlace(context))
            {
                return;
            }
            string action = context.Request["action"];
            if (!string.IsNullOrEmpty(action)) this.GetType().GetMethod(action).Invoke(this, new object[] { context });
            context.Response.End();
        }

        /// <summary>
        /// 资料上传
        /// </summary>
        /// <param name="context"></param>
        public void ResourceFileUpload(HttpContext context)
        {
            int OCID = Convert.ToInt32(context.Request["OCID"]);
            IES.Resource.Model.File model = new IES.Resource.Model.File();
            model.OCID = OCID;
            List<IES.Resource.Model.File> list = IES.Service.FileService.ResourceFileUpload(model);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
        }


        /// <summary>
        /// 附件上传
        /// </summary>
        /// <param name="context"></param>
        public void AttachmentUpload(HttpContext context)
        {
            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
        }

        /// <summary>
        /// 上传excl
        /// </summary>
        /// <param name="context"></param>
        public void ExcelFileUpload(HttpContext context)
        {
            string fileUrl = "";
            if (context.Request.Files.Count > 0)
            {
                HttpPostedFile file = context.Request.Files[0];
                string ext = System.IO.Path.GetExtension(file.FileName);
                Random ran = new Random();
                string fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + ran.Next(100, 1000) + ext;
                string path = AppDomain.CurrentDomain.BaseDirectory + "Temp";
                fileUrl = path + "\\" + fileName;
                try
                {
                    file.SaveAs(fileUrl);
                }
                catch
                {
                    fileUrl = "上传错误";
                }
            }
            else
            {
                context.Response.Write("上传错误");
            }
            context.Response.Write(fileUrl);
        }

        /// <summary>
        /// 用户头像上传
        /// </summary>
        /// <param name="context"></param>
        public void UserImgUpload(HttpContext context)
        {
            int id = IES.Service.UserService.CurrentUser.UserID;
            bool rs = false;
            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            if (list.Count == 1)
            {
                string guid = list[0].Guid;
                int sourceid = id;
                string source = "User";
                IES.Resource.Model.Attachment atmt = new IES.Resource.Model.Attachment { Guid = guid, Source = source, SourceID = sourceid };
                rs = IES.Service.FileService.AttachmentRelation(atmt);
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));

        }


        /// <summary>
        /// 文件上传格式限制
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public bool FilePlace(HttpContext context)
        {
            bool flag = true;
            List<string> reg = new List<string>();
            //reg.Add("htm");
            //reg.Add("html");
            //reg.Add("chm");
            //reg.Add("jsp");
            //reg.Add("js");
            //reg.Add("php");
            //reg.Add("asp");
            //reg.Add("aspx");
            //reg.Add("exe");
            //reg.Add("vbs");
            //reg.Add("vbe");
            //reg.Add("dll");
            //reg.Add("msi");
            //reg.Add("bat");
            //reg.Add("com");
            //reg.Add("scr");
            //reg.Add("reg");
            //reg.Add("ini");
            //reg.Add("inf");
            //reg.Add("jar");
            //reg.Add("class");
            reg.Add("rar"); reg.Add("zip"); reg.Add("txt"); reg.Add("pdf"); reg.Add("chm"); reg.Add("hlp"); reg.Add("swf");
            reg.Add("doc");reg.Add("docx");reg.Add("xls");reg.Add("xlsx");reg.Add("ppt");reg.Add("pptx");reg.Add("pptm");
            reg.Add("gif");reg.Add("jpg");reg.Add("jpeg");reg.Add("bmp");reg.Add("png");
            reg.Add("mp4");reg.Add("rm");reg.Add("flv");reg.Add("wmv");reg.Add("asf");reg.Add("mov");reg.Add("mpg");
            reg.Add("mpeg");reg.Add("mp3");reg.Add("wav");reg.Add("mid");reg.Add("midi");reg.Add("ra");reg.Add("wma");

            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                string Ext = files[i].FileName.Substring(files[i].FileName.LastIndexOf('.') + 1);
                if (!reg.Contains(Ext))
                {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}