using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace App.G2S.Views.CourseLive.Forum
{
    /// <summary>
    /// Test 的摘要说明
    /// </summary>
    public class Test : IHttpHandler
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

            if (!File.Exists(HttpContext.Current.Server.MapPath("~/Log/ExceptionLog.txt")))
            {
                FileStream fs = File.Create(HttpContext.Current.Server.MapPath("~/Log/ExceptionLog.txt"));
                fs.Close();
            }
            StreamWriter sw = new StreamWriter(HttpContext.Current.Server.MapPath("~/Log/ExceptionLog.txt"));
            sw.WriteLine(string.Format("Time:{0:G}  {1}  MSG:{2}", DateTime.Now, context.Request.Files.Count, context.Request.Form["OCID"]));
            sw.Close();

            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));

            //context.Response.Write("abc" + context.Request.Files.Count + "-");
            //context.Response.Write("abc" + context.Request["OCID"] + "-");
            //context.Response.Write("abc" + context.Request.Form["OCID"] + "-");
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