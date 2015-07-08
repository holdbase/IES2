using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Test
{
    public class TestStudentCheck
    {
        #region 补充字段

        public decimal ObjectiveScore { get; set; }

        public decimal SubjectiveScore { get; set; }
        public string UserName { get; set; }

        #endregion
        public int ID { get; set; }
        public int TestID { get; set; }
        public int UserID { get; set; }
        public int ToUserID { get; set; }
        public decimal Score { get; set; }

        /// <summary>
        /// 0 差评，60中评 ，100好评
        /// </summary>
        public int Evaluate { get; set; }

        public string Comment { get; set; }

        public DateTime FinishDate { get; set; }

        public bool IsFinish { get; set; }

    }
}
