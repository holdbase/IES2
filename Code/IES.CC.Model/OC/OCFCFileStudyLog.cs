using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    public class OCFCFileStudyLog
    {
        public OCFCFileStudyLog() { }

        public int ID { get; set; }
        public int FCID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }

        public int GroupID { get; set; } 
        public int FCFileID { get; set; }
        public int FileID { get; set; }
        public int LearnTimLength { get; set; }
        public int Clicks { get; set; }
        public DateTime LastTime { get; set; }
        public int IsMust { get; set; }
        public string FileTitle { get; set; }
    }
}
