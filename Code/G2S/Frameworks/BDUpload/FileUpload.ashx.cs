using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Mvc;

namespace App.G2S.Views.Home
{
    /// <summary>
    /// FileUpload 的摘要说明
    /// </summary>
    public class FileUpload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
             List< IES.Resource.Model.Attachment> attachlist =      IES.Service.FileService.AttachmentUpload();

             
            
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