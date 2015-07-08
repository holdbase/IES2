using System;

namespace IES.CC.Model.Analysis
{
    [Serializable]
    public partial class AnalysisStudent
    {
        public AnalysisStudent()
        { }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public int StudentCount { get; set; }
        public string Week { get; set; }
        public int AvgStudentCount { get; set; }
        public int FileReadCount { get; set; }
        public int? IsM { get; set; }
        public int ForumCount { get; set; }
        public int TestCount { get; set; }
        public int AllCount { get; set; }
        public int AvgDayLogins { get; set; }
        public int AvgWeekLogins { get; set; }
        public int AvgMonthLogins { get; set; }
        public int NoLogins { get; set; }
        public int DayAvgLogins { get; set; }
        public int WeekAvgLogins { get; set; }
        public int MonthAvgLogins { get; set; }
        public int AllLogins { get; set; }      
    }
    [Serializable]
    public partial class StudentOnlineExport
    {
        public string UserName { get; set; }
        public int DayAvgLogins { get; set; }
        public int WeekAvgLogins { get; set; }
        public int MonthAvgLogins { get; set; }
        public int AllLogins { get; set; }      
    }
    [Serializable]
    public partial class StudentActiveExport
    {
        public string UserName { get; set; }
        public int FileReadCount { get; set; }
        public int ForumCount { get; set; }
        public int TestCount { get; set; }
        public int AllCount { get; set; }
    }
}
