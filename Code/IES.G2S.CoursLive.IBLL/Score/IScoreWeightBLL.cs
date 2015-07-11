using IES.CC.Model.Score;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CoursLive.IBLL.Score
{
    /// <summary>
    /// 成绩加权接口
    /// 徐卫
    /// 2014年12月27日15:28:26
    /// </summary>
    public interface IScoreWeightBLL
    {
        #region 列表
        /// <summary>
        /// 成绩权重类别列表
        /// </summary>
        /// <param name="teachingClassID"></param>
        /// <returns></returns>
        List<ScoreWeight> ScoreWeight_List(int OCID, int WeightID);
        #endregion

        #region 属性更新
        /// <summary>
        /// 更改成绩类别的权重
        /// </summary>
        /// <param name="weightID"></param>
        /// <returns></returns>
        bool ScoreWeightDetail_Upd(ScoreWeight sw);

        /// <summary>
        /// 新增加权表
        /// </summary>
        /// <param name="sw"></param>
        /// <returns></returns>
        ScoreWeight ScoreWeight_Add(ScoreWeight sw);
        /// <summary>
        /// 更新成绩
        /// </summary>
        /// <param name="OCClassID"></param>
        /// <param name="UserID"></param>
        /// <param name="OCID"></param>
        /// <returns></returns>
        bool Score_Result_Auto(int OCClassID, int UserID, int OCID);
        #endregion
    }
}
