using IES.CC.Model.Score;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CoursLive.IBLL.Score
{
    /// <summary>
    /// xuwei 
    /// 2014年12月25日
    /// </summary>
    public interface IScoreAnalysisBLL
    {
        #region  列表
        /// <summary>
        /// 成绩分析
        /// </summary>
        /// <param name="scoreType"></param>
        /// <returns></returns>
        ScoreAnalysis ScoreAnalysis_List(int OCID, int OCClassID, string UserName, int PageIndex = 1, int PageSize = 20);
        #endregion
    }
}
