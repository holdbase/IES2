using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace IES.CC.OC.Model
{
    /// <summary>
    /// 翻转课堂统计信息
    /// </summary>
    [Serializable]
    public class OCFCGroupProgressInfo
    {
        public List<GroupProgress> GroupProgress { get; set; }
        public List<FileProgress> FileProgress { get; set; }
        public List<TestProgress> TestProgress { get; set; }
        public LiveProgress LiveProgress { get; set; }
        public FileProgress_TJ FileProgress_TJ { get; set; }
        public GroupProgress_MaxMin GroupProgress_MaxMin { get; set; }
        public TestProgress_View TestProgress_View { get; set; }
    }

    [Serializable]
    public class GroupProgress
    {
        public int GroupID { get; set; }
        public string Name { get; set; }
        public double Progress { get; set; }
        private string _css;
        public string Css {
            get { 
                if(_css == null || _css == "")
                {
                    return "bar_green";
                }else
                {
                    return _css;
                }
            }
            set { _css = value; }
        }
    }

    [Serializable]
    public class FileProgress
    {
        public int UserID { get; set; }
        public double FilesPer { get; set; }
    }

    [Serializable]
    public class TestProgress
    {
        /// <summary>
        /// 状态
        /// </summary>
        public int Status { get; set; } 
        /// <summary>
        /// 此状态的学生数
        /// </summary>
        public int TestStatus { get; set; }  
    }

    [Serializable]
    public class LiveProgress
    {
        /// <summary>
        /// 以参与评论学生数
        /// </summary>
        public int UserCount { get; set; }
        /// <summary>
        /// 未参与评论学生数
        /// </summary>
        public int UserCount_un { get; set; }
    }

    [Serializable]
    public class FileProgress_TJ
    {
        public FileProgress_TJ()
        {
            Temp1 = 0;
            Temp2 = 0;
            Temp3 = 0;
            Temp4 = 0;
        }
        public int Temp1 { get; set; }
        public int Temp2 { get; set; }
        public int Temp3 { get; set; }
        public int Temp4 { get; set; }
    }

    [Serializable]
    public class GroupProgress_MaxMin
    {
        public GroupProgress_MaxMin()
        {
            MaxName = "";
            MinName = "";
        }
        public string MaxName { get; set; }
        public string MinName { get; set; }
    }

    [Serializable]
    public class TestProgress_View
    {
        public TestProgress_View()
        {
            Temp1 = 0;
            Temp2 = 0;
            Temp3 = 0;
        }
        public int Temp1 { get; set; }
        public int Temp2 { get; set; }
        public int Temp3 { get; set; }
    }

    /// <summary>
    /// 线下课堂的成绩列表
    /// </summary>
    //[Serializable]
    //public class OCFCOfflineStudentScore
    //{
    //    public string UserNo { get; set; }
    //    public string UserName { get; set; }
    //    public string SpecialtyName { get; set; }
    //    public string ClassName { get; set; }
    //    public int EntryDate { get; set; } 
    //    public OCFCOfflineStudentScore()
    //    { }
    //    public int ID { get; set; }
    //    public int FCID { get; set; }
    //    public int OCFCOfflineScoreID { get; set; }
    //    public int UserID { get; set; }
    //    public double Score { get; set; }
    //}
}
