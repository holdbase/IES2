using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 学生端翻转课堂--互相评价 
    /// </summary>
    [Serializable]
    public class OCFCSurvey
    {
        public int SourceID { get; set; }
        public string URL { get; set; }
        public string Title { get; set; }
        public int IsFinish { get; set; }
        public int Evaluation { get; set; }

        public int NotEvaluation { get; set; }
        public DateTime EndDate { get; set; }
        public string Brief { get; set; }
        public int Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CurrentDate { get; set; }
        public DateTime SubmitTime { get; set; }

    }
}
