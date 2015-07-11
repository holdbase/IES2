using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.Service;

namespace App.G2S.DataProvider.User
{
    public partial class UserImgFile : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.File1.Attributes.Add("onchange", "urlchange()");
        }
        //上传图片
        public void shangchuan()
        {            
            int id = UserService.CurrentUser.UserID;
            bool rs = false;
            List<IES.Resource.Model.Attachment> list = IES.Service.FileService.AttachmentUpload();
            if (list.Count == 1)
            {
                string guid = list[0].Guid;
                int sourceid = id;
                string source = "User";
                IES.Resource.Model.Attachment atmt = new IES.Resource.Model.Attachment { Guid = guid, Source = source, SourceID = sourceid };
                rs = IES.Service.FileService.AttachmentRelation(atmt);
                if (rs == true)
                {
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "js", "successMsg();", true);
                }
                else
                {
                    Response.Write("<script>alert('上传失败');</script>");
                }
            }
            else
            {
                Response.Write("<script>alert('没有找到图片');</script>");
            }
        }

        protected void Unnamed_ServerClick(object sender, EventArgs e)
        {
            shangchuan();
        }
      
    }
}