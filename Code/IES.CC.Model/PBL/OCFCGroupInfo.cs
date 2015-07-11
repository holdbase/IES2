using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.Model.PBL;

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

   

    ///// <summary>
    ///// 翻转课堂小组成员信息
    ///// </summary>
    //[Serializable]
    //public partial class GroupMember
    //{
    //    #region 补充属性
    //    /// <summary>
    //    /// 小组成员名称
    //    /// </summary>
    //    public string UserName { get; set; }
    //    /// <summary>
    //    /// 小组成员进度
    //    /// </summary>
    //    public int Progress { get; set; }

    //    #endregion
    //    public int GroupID { get; set; }
    //    public int FCID { get; set; }
    //    public int UserID { get; set; }

    //    public int IsStudent { get; set; }

    //    public int Role { get; set; }



    //}
}
