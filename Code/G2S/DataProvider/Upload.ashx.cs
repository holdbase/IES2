using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.SessionState;
using IES.JW.Model;
using IES.Service;

namespace App.G2S.DataProvider
{
    /// <summary>
    /// Upload 的摘要说明
    /// </summary>
    public class Upload : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/x-www-form-urlencoded";
            context.Response.AddHeader("Cache-Control", "no-cache,must-revalidate");
            string action = context.Request["action"];
            if (!string.IsNullOrEmpty(action)) this.GetType().GetMethod(action).Invoke(this, new object[] { context });
            context.Response.End();


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
                    file.SaveAs(path);
                }
                catch
                {
                    fileUrl = "上传错误";
                }

                // context.Response.Write(path);
            }
            else
            {
                context.Response.Write("上传错误");
            }
            context.Response.Write(fileUrl);
            context.Response.End();
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