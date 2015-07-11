using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{
    [Serializable]
    public partial class StudentOC
    {
        public string ImgFileUrl { get; set; }
        public int UserID { get; set; }
        public string RowNum { get; set; }
        public int OCID { get; set; }
        public string Name { get; set; }
        public string TeacherName { get; set; }
        public string TeachingClassName { get; set; }
        public double MyMoocRate { get; set; }
        public double PlanMoocRate { get; set; }
        public double MyFCRate { get; set; }
        public double MyGroupFCRate { get; set; }
        public double PlanFCRate { get; set; }
        public bool IsHasSite { get; set; }
        public int ShowFirst { get; set; }
        public bool IsShowMooc { get; set; }
        public bool IsShowFC { get; set; }
        public int IsHistory { get; set; }
        public int InFCCount { get; set; }
        public int FinishFCCount { get; set; }
        public int RowsCount { get; set; }



    }
}
