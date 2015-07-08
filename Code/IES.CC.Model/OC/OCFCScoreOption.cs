using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 翻转课堂模块分值
    /// </summary>

    [Serializable]
    public class OCFCScoreOption
    {
        #region
        public int TotalScore { get; set; }
        #endregion
        public int ID { get; set; }
        public int FCID { get; set; }
        public int FileScore { get; set; }
        public int TestScore { get; set; }
        public int ForumScore { get; set; }
        public int SigninScore { get; set; }
        public int OfflineScore { get; set; }
        public int EvaluationScore { get; set; }
      
        /// <summary>
        /// 最少发帖数量
        /// </summary>
        public int ForumMinNum { get; set; }

        /// <summary>
        /// 未完成发帖数扣分
        /// </summary>
        public int Condition { get; set; }

        /// <summary>
        /// 互相评价未完成的扣分
        /// </summary>
        public int SurverCondition { get; set; }

    }
}
