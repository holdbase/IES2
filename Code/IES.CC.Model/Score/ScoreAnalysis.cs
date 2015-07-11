using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Score
{
    [Serializable]
    public class ScoreAnalysis
    {
        public List<ScoreTypeWeight> ScoreTypeWeight { set; get; }
        public List<StudentScoreDetail> StudentScoreDetail { set; get; }
        
        public int ColumnCount { set; get; }
    }

    public class ScoreTypeWeight 
    {
        public int ScoreTypeID { set; get; }
        public string Name { set; get; }
        public int ParentID { set; get; }
        public int Power { set; get; }
        public int Colspan { set; get; }
        public float Orde { set; get; }
        public int Rowspan 
        {
            get 
            {
                if (Colspan > 0)
                    return 1;
                else
                    return 2;
            }
        }
    }

    public class ScoreWeightStudent
    {
        public int UserID { set; get; }
        public string UserName { set; get; }
        public string UserNo { set; get; }
        public int ScoreTypeID { set; get; }
        public float Score { set; get; }
    }

    public class StudentScoreDetail
    {
        public int UserID { set; get; }
        public string UserName { set; get; }
        public string UserNo { set; get; }
        public float[] ScoreList { set; get; }
        public float SumScore 
        { 
            get 
            {
                return ScoreList.Sum();
            } 
        }
    }
}
