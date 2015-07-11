using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.G2S.DataProvider
{
    public partial class FileUpload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            bool rs = false;
            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            for (int i = 0; i < list.Count; i++)
            {
                string guid = list[i].Guid;
                int sourceid = 1;
                string source = "ForumTopic";
                IES.Resource.Model.Attachment atmt = new IES.Resource.Model.Attachment { Guid = guid, Source = source, SourceID = sourceid };
                rs = IES.Service.FileService.AttachmentRelation(atmt);
                if (rs)
                {
                    Response.Write(true);
                }
                else
                {
                    Response.Write(false);
                }
            }
        }

        ///// <summary>
        ///// 上传文件
        ///// </summary>
        //[WebMethod]
        //public static bool UploadFile()
        //{
        //    bool rs = false;
        //    List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
        //    for (int i = 0; i < list.Count; i++)
        //    {
        //        string guid = list[i].Guid;
        //        int sourceid = 1;
        //        string source = "ForumTopic";
        //        IES.Resource.Model.Attachment atmt = new IES.Resource.Model.Attachment { Guid = guid, Source = source, SourceID = sourceid };
        //        rs = IES.Service.FileService.AttachmentRelation(atmt);
        //    }
        //    return rs;
        //}
    }
}