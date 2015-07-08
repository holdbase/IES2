using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    [Serializable]
    public partial class ShortOCMoocClass
    {
        public int RecruitID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int OCID { get; set; }

        public int OCClassID { get; set; }
        public string TeachingClassName { get; set; }
        public bool IsSelected { get; set; }
        public int StudentCount { get; set; }
        public int UserID { get; set; }

    }
}
