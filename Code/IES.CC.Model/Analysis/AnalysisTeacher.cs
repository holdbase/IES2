using System;

namespace IES.CC.Model.Analysis
{
    [Serializable]
    public partial class AnalysisTeacher
    {
        public AnalysisTeacher()
        { }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int Role { get; set; }
        public int OCSiteColumns { get; set; }
        public int MoocChapters { get; set; }
        public int OCFCCount { get; set; }
        public int OCFiles { get; set; }
        public int OCExercises { get; set; }
        public int OCKens { get; set; }
        public int OCForums { get; set; }
        public int OCTests { get; set; }
        public int OCSurveys { get; set; }
        public int Liveness { get; set; }
        public int CourseBuild { get; set; }
        public int ResourceBuild { get; set; }
        public int Interaction { get; set; }
    }
}
