using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Score
{
    [Serializable]
    public class ScoreTypeInfo
    {
        /// <summary>
        /// MOOC基本信息
        /// </summary>
        public ScoreDetail ScoreDetail { get; set; }

        /// <summary>
        /// 学生加权成绩列表
        /// </summary>
        public List<ScoreType> ScoreTypeList { get; set; }
    }


    [Serializable]
    public partial class ScoreDetail
    {
        public int ScoreRank { get; set; }
    
    }
}
