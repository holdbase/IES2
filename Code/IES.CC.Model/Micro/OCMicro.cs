using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Micro
{
    [Serializable]
    public class OCMicro
    {
        public int OCID { get; set; }
        public string Name { get; set; }
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
        public string TrailerUrl { get; set; }
        public string Brief { get; set; }
        public string Tags { get; set; }
        public int LearnDays { get; set; }
        public int VideoNum { get; set; }
        public int FileNum { get; set; }
        public int TopicNum { get; set; }
    }

    [Serializable]
    public class OCTeamTeacher
    {
        public int TeamID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Brief { get; set; }
        public string HeadPicUrl { get; set; }
    }

    [Serializable]
    public class OCTeamChapter
    {
        public int ChapterID { get; set; }
        public string Title { get; set; }
        public string Brief { get; set; }
        public string DownUrl { get; set; }
        public string ViewUrl { get; set; }
        public int Orde { get; set; }
    }

    [Serializable]
    public class OCTeamFile
    {
        public int MoocFileID { get; set; }
        public int OCID { get; set; }
        public int ChapterID { get; set; }
        public int FileID { get; set; }
        public string FileTitle { get; set; }
        public string DownUrl { get; set; }
        public string ViewUrl { get; set; }
        public int FileType { get; set; }
        public string Ext { get; set; }
        public DateTime UploadTime { get; set; }
        public string CreateUserName { get; set; }
        public int Orde { get; set; }
    }

    [Serializable]
    public class MicroPaper
    {
        public int PaperID { get; set; }
        public int OCID { get; set; }
        public int CourseID { get; set; }
        public int OwnerUserID { get; set; }
        public int CreateUserID { get; set; }
        public string Papername { get; set; }
        public int Type { get; set; }
        public int Scope { get; set; }
        public int ShareScope { get; set; }
        public int TimeLimit { get; set; }
        public string Brief { get; set; }
        public float Score { get; set; }
        public int Num { get; set; }
    }

    public class PaperGroup
    {
        public int GroupID { get; set; }
        public int PaperID { get; set; }
        public string GroupName { get; set; }
        public int Orde { get; set; }
        public string Brief { get; set; }
        public int Timelimit { get; set; }
    }

    public class MicroTest
    {
        public int TestID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int OCID { get; set; }
        public int CourseID { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ChapterID { get; set; }
        public string ChapterName { get; set; }
        public int Type { get; set; }
        public int ScaleType { get; set; }
        public int BuildMode { get; set; }
        public int LessTimes { get; set; }
        public int MoreTimes { get; set; }
        public int PassScore { get; set; }
        public int ScoreMode { get; set; }
        public int ScoreSource { get; set; }
        public int ShowResult { get; set; }
        public int ShowExercise { get; set; }
        public int ExerciseShowMode { get; set; }
        public int Delay { get; set; }
        public int DelayScoreDiscount { get; set; }
        public int StudentCheckNum { get; set; }
        public int LostScoreDiscount { get; set; }
        public DateTime EndCheckTime { get; set; }
        public int TimeOption { get; set; }
        public string Brief { get; set; }
    }

    public class ExerciseInfo
    {
        public int ExerciseID { get; set; }
        public int OCID { get; set; }
        public int CourseID { get; set; }
        public int OwnerUserID { get; set; }
        public int CreateUserID { get; set; }
        public string CreateUserName { get; set; }
        public int ExerciseType { get; set; }
        public string ExerciseTypeName { get; set; }
        public int ParentID { get; set; }
        public int Scope { get; set; }
        public int Diffcult { get; set; }
        public int ShareRange { get; set; }
        public string Keys { get; set; }
        public string Kens { get; set; }
        public string Conten { get; set; }
        public string Analysis { get; set; }
        public int Chapter { get; set; }
    }

    public class ExerciseWrittingInfo
    {
        public int ExerciseID { get; set; }
        public int OCID { get; set; }
        public int CourseID { get; set; }
        public int OwnerUserID { get; set; }
        public int CreateUserID { get; set; }
        public string CreateUserName { get; set; }
        public int ExerciseType { get; set; }
        public string ExerciseTypeName { get; set; }
        public int Scope { get; set; }
        public int Diffcult { get; set; }
        public int ShareRange { get; set; }
        public string Keys { get; set; }
        public string Kens { get; set; }
        public string Conten { get; set; }
        public string Analysis { get; set; }
        public string Answer { get; set; }
        public string ScorePoint { get; set; }
        public int ParentID { get; set; }
        public int Chapter { get; set; }
    }

    public class PageBase
    {
        public int Searchkey { get; set; }  //--查询关键字                          
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
    }

    public class ExerciseCondition : PageBase
    {
        public int OCID { get; set; } // -- 在线课程编号                             
        public int UserID { get; set; }// -- 当前用户身份编号                          
        public int ExerciseType { get; set; } // -- 习题题型                          
        public int Diffcult { get; set; } // -- 难度系统                          
        public int Scope { get; set; } // -- 适用范围                              
        public string Kens { get; set; } // -- 知识点名称                         
        public string Keys { get; set; } // -- 标签名称                        
        public string ExerciseTypes { get; set; } // --题型集合(逗号分隔) 例如微课选习题时:'2,3,10'
    }

    public class ExerciseSummary
    {
        public int ExerciseID { get; set; }
        public int OCID { get; set; }
        public int CourseID { get; set; }
        public int OwnerUserID { get; set; }
        public int CreateUserID { get; set; }
        public int ParentID { get; set; }
        public int ExerciseType { get; set; }
        public string ExerciseTypeName { get; set; }
        public int Diffcult { get; set; }
        public int Scope { get; set; }
        public int ShareRange { get; set; }
        public string keys { get; set; }
        public string Kens { get; set; }
        public string Conten { get; set; }
        public DateTime UpdateTime { get; set; }
        public int rowscount { get; set; }
    }

    public class MicroTestPaper
    {
        public int TestID {get; set;}
        public int PaperID { get; set; }
        public int TimeLength { get; set; }
    }
}
