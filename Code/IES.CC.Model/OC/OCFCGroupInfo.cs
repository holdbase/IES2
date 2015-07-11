using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 翻转课堂小组信息
    /// </summary>
    [Serializable]
    public partial class OCFCGroupInfo
    {
        public List<OCFCGroup> MyOCFCGroup { get; set; }
        public List<GroupMember> GroupMemberList { get; set; }
    }

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
        public int Progress { get; set; }
        /// <summary>
        /// 小组排名
        /// </summary>
        public string RanKInfo { get; set; }

        /// <summary>
        /// 距前一名小组差距
        /// </summary>
        public string FProgress { get; set; }

        #endregion

        public int GroupID { get; set; }
        public int OCID { get; set; }
        public string Name { get; set; }

        public int UserCount { get; set; }

        //public int UserID { get; set; }
        public int Version { get; set; }

    }

    /// <summary>
    /// 翻转课堂小组成员信息
    /// </summary>
    [Serializable]
    public partial class GroupMember
    {
        #region 补充属性
        /// <summary>
        /// 小组成员名称
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 小组成员进度
        /// </summary>
        public int Progress { get; set; }

        #endregion
        public int GroupID { get; set; }
        public int FCID { get; set; }
        public int UserID { get; set; }

        public int IsStudent { get; set; }

        public int Role { get; set; }



    }
}
