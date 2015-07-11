using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Survey
{
    /// <summary>
    /// 问卷被调查对象
    /// </summary>
    public class SurveyToObject
    {
        public int ID { get; set; }
        public int SurveyID { get; set; }
        public int UserID { get; set; }
        public int ObjectID { get; set; }
        public string  ObjectName { get; set; }
        public bool IsFinish { get; set; }

    }
}
