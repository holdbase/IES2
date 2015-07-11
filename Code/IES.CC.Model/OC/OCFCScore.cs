using System;
namespace IES.CC.OC.Model
{
    [Serializable]
	public class OCFCScore
    {
        public string Name { get; set; }
        public double TotalScore { get; set; }
        public int rownum { get; set; }
        public OCFCScore()
		{}
        public int ID { get; set; }
        public int FCID { get; set; }
        public int UserID { get; set; }
        public int GroupID { get; set; }
        public double FileScore { get; set; }
        public double TestScore { get; set; }
        public double ForumScore { get; set; }
        public double SigninScore { get; set; }
        public double OfflineScore { get; set; }
        public double EvaluationScore { get; set; }
        public bool IsLeader { get; set; }
    }
}
