using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{
    public class Resource
    {

        public int ResourceID { get; set; }

        //1 文件夹 0文件
        public int ResourceType { get; set; }

        //上传到服务器的文件名
        public string ResourceName { get; set; }

        //原文件名
        public string ResourceTitle { get; set; }
        public string Ext { get; set; }

        public long FileSize { get; set; }

        public DateTime CreateTime { get; set; }

        //文件下载地址
        public string DownUrl { get; set; }

        //文件浏览地址
        public string ViewUrl { get; set; }
    }
}
