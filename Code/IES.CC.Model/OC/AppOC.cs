using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{
    public class AppOC
    {
        public int OCID { get; set; }
        public string Name { get; set; }
        public int TeacherID { get; set; }
        public string TeacherName { get; set; }
        public string OrganizationName { get; set; }
        public string Ranks { get; set; }
        public string TeachingClassName { get; set; }
        public string TeacherImgUrl { get; set; }
        public string CourseImgUrl { get; set; }
        public string LastStudyChapter { get; set; }
        public int IsShowMooc { get; set; }
        public double MyMoocRate { get; set; }
        public double PlanMoocRate { get; set; }
        public int IsShowFC { get; set; }
        public double MyFCRate { get; set; }
        public int MyGroupFCRate { get; set; }
        public int PlanFCRate { get; set; }
        public int StudentCount { get; set; }

        public int Clicks { get; set; }
        public DateTime UpdateTIme { get; set; }
             
    }
}
