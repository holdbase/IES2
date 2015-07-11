using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Test
{

    /// <summary>
    /// 学生端已经提交的测试列表对象 ：  用于 Test_Sumbit_List 
    /// </summary>
    public class _TestSubmit
    {
        public int TestID { get; set; }
        public string  Name { get; set; }

        public int ScoreSource { get; set; }
        public int Type { get; set; }
        public int ScaleType { get; set; }
        public Decimal  ObjectiveScore { get; set; }
        public Decimal SubjectiveScore { get; set; }
        public string  FastScore { get; set; }
        public string UserName { get; set; }
        public string ChapterName { get; set; }
        public DateTime  EndDate { get; set; }
        public bool IsDelay { get; set; }

        public bool IsSample { get; set; }
        public int BuildMode { get; set; }
        public string LiveType { get; set; }
        public int SampleWorkCount { get; set; }  //范本作业个数
        /// <summary>
        /// 作业批阅状态
        /// </summary>
        public int CheckStatus { get; set; }
        public int Delay { get; set; }
        public int DelayScoreDiscount { get; set; }
        public DateTime  SubmitTime { get; set; }


    }
}
