using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 翻转课堂小组
    /// </summary>
    [Serializable]
    public partial class OCFCGroup
    {
        #region 补充属性
        /// <summary>
        /// 总小组数
        /// </summary>
        public int GroupCount { get; set; }
        /// <summary>
        /// 小组总进度
        /// </summary>
        public double Progress { get; set; }
        /// <summary>
        /// 小组排名
        /// </summary>
        public string RanKInfo { get; set; }

        /// <summary>
        /// 距前一名小组差距
        /// </summary>
        public string FProgress { get; set; }


        /// <summary>
        /// 组长名称
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 组长组员数
        /// </summary>
        public string MemberNum { get; set; }
        /// <summary>
        /// 指导老师数
        /// </summary>
        public string TeacherNum { get; set; }

        #endregion

        public int GroupID { get; set; }
        public int OCID { get; set; }
        public string Name { get; set; }

        public int UserCount { get; set; }

        //public int UserID { get; set; }
        public int Version { get; set; }

    }
}
