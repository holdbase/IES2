using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{
    public class AppOCFCGroup
    {
        public int GroupID { get; set; }
        public string Name { get; set; }
        public int UserCount { get; set; }
        public int RanKInfo { get; set; }
        public int GroupCount { get; set; }
        public double GroupProgress { get; set; }
    }
    public class AppFCGroupUser
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int IsStudent { get; set; }
        public int Role { get; set; }
        public double Progress { get; set; }
        public string UserImgUrl { get; set; }
    }
    public class AppFCScoreInfo
    {
        public AppOCFCScore myrank { get; set; }
        public AppOCFCGourpScore grouprank { get; set; }
    }
    public class AppOCFCScore
    {
        public double FileScore { get; set; }
        public double TestScore { get; set; }
        public double ForumScore { get; set; }
        public double SigninScore { get; set; }
        public double OfflineScore { get; set; }
        public double EvaluationScore { get; set; }
        public double AllScore { get; set; }
        public int MyRank { get; set; }
    }
    public class AppOCFCGourpScore
    {
        public double FileScore { get; set; }
        public double TestScore { get; set; }
        public double ForumScore { get; set; }
        public double SigninScore { get; set; }
        public double OfflineScore { get; set; }
        public double EvaluationScore { get; set; }
        public double AllScore { get; set; }
        public int MyGroupRank { get; set; }
    }
    public class AppOCFCGroupList
    {
        public int Sort { get; set; }
        public int GroupID { get; set; }
        public string Name { get; set; }
        public double FileScore { get; set; }
        public double TestScore { get; set; }
        public double ForumScore { get; set; }
        public double SigninScore { get; set; }
        public double OfflineScore { get; set; }
        public double EvaluationScore { get; set; }
        public double AllScore { get; set; }
    }
}
