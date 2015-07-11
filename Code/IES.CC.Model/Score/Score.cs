using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Score
{
    [Serializable]
    public class Score
    {
        public int UserID { set; get; } //用户编号
        public string UserName { set; get; } //学生名称
        public string HomeWorkScore { set; get; } //作业成绩字符串
        public string ExamScore { set; get; } //考试成绩字符串
        public string StandardTrainScore { set; get; } //达标训练成绩字符串
        public string EnteringScore { set; get; } //录入成绩字符串
        public int ResponseCount { set; get; } //答疑数量
        public int SurveyCount { set; get; } //问卷调查参与次数  

    }
}
