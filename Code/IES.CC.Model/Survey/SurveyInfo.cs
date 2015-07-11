using System;
using System.Collections.Generic;

namespace IES.CC.Model.Survey
{
    /// <summary>
    /// 问卷调查详细信息
    /// </summary>
    [Serializable]
    public partial class SurveyInfo
    {
        public SurveyInfo()
		{ }
        #region Model
        public Survey survey { get; set; }
        public List<Surveyobject> sobject { get; set; }
        public List<SurveyQuestion> question{get;set;}
        public List<SurveyQuestionitem> questionitem { get; set; }
        public List<SurveyQuestion> answersta { get; set; }
        public List<SurveyAnswer> answerget { get; set; }

        #endregion
    }
}
