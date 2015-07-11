using IES.CC.Model.Survey;
using IES.G2S.CourseLive.DAL.Survey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.BLL.Survey
{
    public class SurveyobjectBLL
    {
        #region 编辑
        /// <summary>
        /// 编辑调查对象
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool Surveyobject_Edit(Surveyobject model)
        {
            return SurveyobjectDAL.Surveyobject_Edit(model);
        }
        #endregion

        /// <summary>
        /// 获取调查对象
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<Surveyobject> Surveyobject_Get(int SurveyID, string Source)
        {
            return SurveyobjectDAL.Surveyobject_Get(SurveyID, Source);
        }

    }
}
