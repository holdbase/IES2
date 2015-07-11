using System;
using System.Collections.Generic;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 教学班学生信息
    /// </summary>
    [Serializable]
    public partial class OCClassStudent
    {
        #region 补充信息
        public string Key { get; set; }
        public int rownum { get; set; }
        public int RowsCount { get; set; }

        public bool IsSelected { get; set; }
        public string StudentIDs { get; set; }//  包含教师ID
        public string TeachingClassName { get; set; }
        public int Status { get; set; }
        public DateTime? RegDate { get; set; }
        #endregion
        public OCClassStudent()
        { }
        public int TeachingClassID { get; set; }
        public int UserID { get; set; }
        public string UserNo { get; set; }
        public string UserName { get; set; }
        public int UserRole { get; set; }
        public string OrganizationName { get; set; }
        /// <summary>
        /// 专业名称
        /// </summary>
        public string SpecialtyName { get; set; }
        /// <summary>
        /// 行政班
        /// </summary>
        public string ClassName { get; set; }
        /// <summary>
        /// 年级 Ies_JW.User
        /// </summary>
        public int EntryDate { get; set; }
        public string Source { get; set; }

        public string MOOCLearningPace { get; set; }


    }


    [Serializable]
    public partial class ShortSearchModel
    {
        public int RecruitID { get; set; }
        public int OCID { get; set; }
        public int OCClassID { get; set; }
        public string key { get; set; }
        public int IsFinish { get; set; }

    }

    [Serializable]
    public partial class ExportOCClassStudent
    {
        public List<OCClassStudent> ClassStudent { get; set; }
    }
}
