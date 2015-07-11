using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{
  public   class OCFCOfflineScore
    {
      public int OCFCOfflineScoreID { get; set; }
      public int FCID { get; set; }
      public int Power { get; set; }
      public int InputNum { get; set; }
      public DateTime? CreateDate { get; set; }
      public string Title { get; set; }
      public decimal Score { get; set; }
      public int GroupRanking { get; set; }
      public int ClassRanking { get; set; }
    }
}
