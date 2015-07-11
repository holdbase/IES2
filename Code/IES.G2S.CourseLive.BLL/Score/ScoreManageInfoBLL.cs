using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.G2S.CoursLive.IBLL.Score;
using IES.G2S.CourseLive.DAL.Score;

namespace IES.G2S.CourseLive.BLL.Score
{
    /// <summary>
    /// 徐卫
    /// 成绩管理
    /// 2014年12月31日11:43:26
    /// </summary>
    public class ScoreManageInfoBLL : IScoreManageInfoBLL
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
        public List<CC.Model.Score.ScoreManageInfo> ScoreManageInfo_List(CC.Model.Score.ScoreManageInfo smi, int DateID, int PageIndex = 1, int PageSize = 20)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_List(smi, DateID, PageIndex, PageSize);
        }
        #endregion



        public bool ScoreManageInfo_Del(int testID, int userID)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_Del(testID, userID);
        }

        public CC.Model.Score.ScoreManageInfo ScoreManageInfo_Add(CC.Model.Score.ScoreManageInfo model)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_Add(model);
        }

        public bool ScoreManageInfo_Upd(CC.Model.Score.ScoreManageInfo model)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_Upd(model);
        }

        public CC.Model.Score.ScoreManageInfo ScoreManageInfo_Get(int testID, int userID)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_Get(testID, userID);
        }
        public bool ScoreManageInfo_Score_Upd(int testID, string studentScores)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_Score_Upd(testID, studentScores);
        }

        public bool ScoreManageInfo_Score_Send(int testID, int userID)
        {
            return ScoreManageInfoDAL.ScoreManageInfo_Score_Send(testID, userID);
        }
    }
}
