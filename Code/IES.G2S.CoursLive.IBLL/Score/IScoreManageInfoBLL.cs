using IES.CC.Model.Score;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CoursLive.IBLL.Score
{
    /// <summary>
    /// 成绩管理
    /// 徐卫
    /// 2014年12月31日11:38:03
    /// </summary>
    public interface IScoreManageInfoBLL
    {
        #region 列表
        /// <summary>
        /// 成绩管理列表
        /// 徐卫
        /// 2014年12月31日11:46:42
        /// </summary>
        /// <param name="smi"></param>
        /// <param name="PageIndex">页数</param>
        /// <param name="PageSize">页大小</param>
        /// <returns></returns>
        List<ScoreManageInfo> ScoreManageInfo_List(ScoreManageInfo smi, int DateID, int PageIndex = 1, int PageSize = 20);
        #endregion

        #region  成绩管理操作
        bool ScoreManageInfo_Del(int testID, int userID);
        ScoreManageInfo ScoreManageInfo_Add(ScoreManageInfo model);
        bool ScoreManageInfo_Upd(ScoreManageInfo model);
        ScoreManageInfo ScoreManageInfo_Get(int testId, int userID);
        bool ScoreManageInfo_Score_Upd(int testID, string studentScores);
        bool ScoreManageInfo_Score_Send(int testID, int userID);
        #endregion
    }
}
