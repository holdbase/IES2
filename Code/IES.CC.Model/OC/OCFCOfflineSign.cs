using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{

    /// <summary>
    /// 翻转课堂出勤学生信息
    /// </summary>
    public class OCFCOfflineSign
    {
        #region

        public string UserNo { get; set; }
        public string UserName { get; set; }
        public string ClassName { get; set; }
        public int EntryDate { get; set; }


        #endregion
        public int ID { get; set; }
        public int FCID { get; set; }
        public int FCOfflineID { get; set; }
        public int UserID { get; set; }
        public int GroupID { get; set; }
        public int IsAttend { get; set; }
        public int rownum { get; set; }
    }
}
