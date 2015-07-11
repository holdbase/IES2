using System;

namespace IES.CC.Model.Analysis
{
    [Serializable]
    public partial class Analysis
    {
        public Analysis()
        { }
        public int OCID { get; set; }
        public int UserID { get; set; }      
        public int Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }           
        public int TopCount { get; set; }
  
    }
}
