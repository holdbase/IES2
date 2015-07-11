using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.G2S.CoursLive.IBLL.Score;
using IES.CC.Model.Score;
using IES.G2S.CourseLive.DAL.Score;


namespace IES.G2S.CourseLive.BLL.Score
{
    /// <summary>
    /// xuwei
    /// 2014年12月25日15:19:05
    /// </summary>
    public class ScoreAnalysisBLL : IScoreAnalysisBLL
    {
        #region  列表
        /// <summary>
        /// 成绩分析
        /// </summary>
        /// <param name="scoreType"></param>
        /// <returns></returns>
        public ScoreAnalysis ScoreAnalysis_List(int OCID, int OCClassID, string UserName, int PageIndex = 1, int PageSize = 20)
        {
            var item = ScoreAnalysisDAL.ScoreAnalysis_List(OCID, OCClassID, UserName, PageIndex, PageSize);

            return item;

        }
        #endregion

    }
}
