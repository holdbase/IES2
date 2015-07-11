using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{
   public   class OCFCOfflineStudentScore
   {
       #region 补充字段

       public string UserNo { get; set; }
       public string UserName { get; set; }
       public string SpecialtyName { get; set; }
       public string ClassName { get; set; }
       public int EntryDate { get; set; }
       #endregion
       public int ID { get; set; }
       public int FCID { get; set; }
       public int OCFCOfflineScoreID { get; set; }
       public int UserID { get; set; }
       public int GroupID { get; set; }
       public decimal  Score { get; set; }


    }
}
