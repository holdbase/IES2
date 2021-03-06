﻿using IES.CC.Model.Score;
using IES.G2S.CourseLive.DAL.Score;
using IES.G2S.CoursLive.IBLL.Score;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Score
{
    /// <summary>
    /// 徐卫
    /// 2014年12月27日15:34:00
    /// 成绩类别加权
    /// </summary>
    public class ScoreWeightBLL : IScoreWeightBLL
    {
        #region 列表
        /// <summary>
        /// 成绩权重类别列表
        /// </summary>
        /// <param name="teachingClassID"></param>
        /// <returns></returns>
        public List<CC.Model.Score.ScoreWeight> ScoreWeight_List(int OCID, int WeightID)
        {
            return ScoreWeightDAL.ScoreWeight_List(OCID, WeightID);
        }
        #endregion

        #region 属性更新
        /// <summary>
        /// 更改成绩类别的权重
        /// </summary>
        /// <param name="weightID"></param>
        /// <returns></returns>
        public bool ScoreWeightDetail_Upd(ScoreWeight sw)
        {
            return ScoreWeightDAL.ScoreWeightDetail_Upd(sw);
        }

        public ScoreWeight ScoreWeight_Add(ScoreWeight sw)
        {
            return ScoreWeightDAL.ScoreWeight_Add(sw);
        }
        public bool Score_Result_Auto(int OCClassID, int UserID, int OCID)
        {
            return ScoreWeightDAL.Score_Result_Auto(OCClassID, UserID, OCID);
        }
        #endregion

    }
}
