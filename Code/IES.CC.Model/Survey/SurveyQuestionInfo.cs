using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Survey
{
   public class SurveyQuestionInfo
    {
       /// <summary>
       /// 问题列表
       /// </summary>
       public List<SurveyQuestion> surveyQuestionlist { get; set; }

       /// <summary>
       /// 问题选项列表
       /// </summary>
       public List<SurveyQuestionitem> surveyQuestionitemlist { get; set; }   

    }
}
