using IES.CC.Model.Survey;
using IES.G2S.CourseLive.DAL.Survey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Survey
{
    public class SurveyAnswerBLL
    {
        #region 编辑
        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static SurveyAnswer SurveyAnswer_Edit(SurveyAnswer model)
        {
            return SurveyAnswerDAL.SurveyAnswer_Edit(model);
        }
        #endregion

        #region 删除

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="QuestionID"></param>
        /// <returns></returns>

        public static bool SurveyAnswer_Del(int QuestionID)
        {
            return SurveyAnswerDAL.SurveyAnswer_Del(QuestionID);
        }
        #endregion

        #region 详细信息
        /// <summary>
        /// 详细信息
        /// </summary>
        /// <returns></returns>
        public static SurveyAnswer SurveyAnswer_Get(SurveyAnswer model)
        {
            return SurveyAnswerDAL.SurveyAnswer_Get(model);
        }
        #endregion

        #region 列表
        /// <summary>
        /// 获取调查问卷指定问题的答案汇总信息 ，
        /// 针对无法统计的题型，只能列出所有答案
        /// </summary>
        /// <param name="SurveyID"></param>
        /// <param name="QuestionID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<SurveyAnswer> SurveyAnswer_List(int SurveyID, int QuestionID, int PageIndex, int PageSize)
        {
            return SurveyAnswerDAL.SurveyAnswer_List(SurveyID, QuestionID, PageIndex, PageSize);
        }
        #endregion
    }
}
