using IES.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.G2S.DataProvider.User
{
    /// <summary>
    /// UserImgFile1 的摘要说明
    /// </summary>
    public class UserImgFile1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            int id = UserService.CurrentUser.UserID;
            bool rs = false;
            HttpPostedFile hpf = HttpContext.Current.Request.Files["imgfile"];
            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            if (list.Count == 1)
            {
                string guid = list[0].Guid;
                int sourceid = id;
                string source = "User";
                IES.Resource.Model.Attachment atmt = new IES.Resource.Model.Attachment { Guid = guid, Source = source, SourceID = sourceid };
                rs = IES.Service.FileService.AttachmentRelation(atmt);
            }
            if (rs == true)
            {
                context.Response.Write("修改成功");
            }
            else
            {
                context.Response.Write(hpf.FileName);
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