using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.G2S.Views.CourseLive.Forum
{
    /// <summary>
    /// UploadFile 的摘要说明
    /// </summary>
    public class UploadFile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            bool rs = false;
            int sid = Convert.ToInt32(context.Request["sourceid"]);
            string s = context.Request["source"];
            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            for (int i = 0; i < list.Count; i++)
            {
                string guid = list[i].Guid;
                int sourceid = sid;
                string source = s.Trim();
                IES.Resource.Model.Attachment atmt = new IES.Resource.Model.Attachment { Guid = guid, Source = source, SourceID = sourceid };
                rs = IES.Service.FileService.AttachmentRelation(atmt);
            }
            if (rs)
            {
                context.Response.Write(true);
            }
            else
            {
                context.Response.Write(false);
            }
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