using IES.CC.Model.Survey;
using IES.G2S.CourseLive.DAL.Survey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Survey
{
    public class SurveyQuestionBLL
    {

        #region 编辑
        public SurveyQuestion SurveyQuestion_Edit(SurveyQuestion model)
        {
            return SurveyQuestionDAL.SurveyQuestion_Edit(model);
        }

        #endregion


        #region 删除
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="SurveyID"></param>
        /// <returns></returns>
        public bool SurveyQuestion_Del(int SurveyID)
        {
            return SurveyQuestionDAL.SurveyQuestion_Del(SurveyID);
        }
        #endregion
    }
}
