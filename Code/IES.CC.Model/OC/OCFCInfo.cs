using IES.CC.OC.Model;
using IES.JW.Model;
using IES.CC.Model.OC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    public class OCFCInfo
    {
        
        /// <summary>
        /// 翻转课堂基本信息
        /// </summary>
        public OCFC ocfc { get; set; }

        /// <summary>
        /// 翻转课堂学生信息
        /// </summary>
        public List<IES.JW.Model.User > fcUserList { get; set; }

        /// <summary>
        /// 翻转课堂小组信息
        /// </summary>
        public List<IES.CC.Model.PBL.Group> GroupList { get; set; }

        /// <summary>
        /// 论题互动列表
        /// </summary>
        public List<OCFCLive> FCLiveList { get; set; }

        /// <summary>
        /// 线下课堂
        /// </summary>
        public List<OCFCOffline> FCOfflineList { get; set; }
    }

    ///// <summary>
    ///// 翻转课堂出勤学生信息
    ///// </summary>
    //public class OCFCOfflineSign
    //{
    //    public int UserID { get; set; }
    //    public string UserNo { get; set; }
    //    public string UserName { get; set; }
    //    public string ClassName { get; set; }
    //    public int EntryDate { get; set; }
    //    public bool IsAttend { get; set; }
    //    public int FCOfflineID { get; set; }
   // }
}
