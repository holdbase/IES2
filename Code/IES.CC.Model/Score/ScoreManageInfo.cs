using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Score
{
    /// <summary>
    /// 成绩管理
    /// 徐卫
    /// 2014年12月31日10:58:01
    /// </summary>
    [Serializable]
    public class ScoreManageInfo
    {
        public int OCID { get; set; }  //课程编号
        public int UserID { set; get; } //用户编号
        public string UserName { set; get; } //用户名称
        public int CourseID { set; get; } //课程编号
        public int TeachingClassID { get; set; }  //教学班编号
        public int TestID { get; set; }  //成绩编号
        public string Name { get; set; }  //成绩名称
        public DateTime StartDate { set; get; }
        public DateTime EndDate { set; get; }
        public int ScoreTypeID { get; set; }  //成绩类别编号
        public string ScoreTypeName { get; set; }  //成绩类别名称
        public int NoPartUserNum { get; set; }  //未参与学生总数
        public int Scoreless50 { get; set; }  //50分以下学生人数
        public int Score50to59 { get; set; }  //50~59分学生人数
        public int Score60to69 { get; set; }  //60~69分学生人数
        public int Score70to79 { get; set; }  //70~79分学生人数
        public int Score80to89 { get; set; }  //80~89分学生人数
        public int Scoremore90 { get; set; }  //90分以上学生人数
        public int RowsCount { get; set; }   //行数
        public int IsInPutScore { set; get; } //是否是录入成绩
        public List<ScoreStudent> Students { set; get; }
    }

    public class TestStudent
    {
        public int TestID { set; get; } //成绩编号
        public string SocreSection { get; set; }  //学生成绩
        public int UserNum { set; get; } //学生数量
    }

    public class ScoreStudent
    {
        public int UserID { set; get; } //成绩编号
        public float FastScore { set; get; } //学生成绩
    }
}
