/**  版本信息模板在安装目录下，可自行修改。
* Group.cs
*
* 功 能： N/A
* 类 名： Group
*
* Ver    变更日期             负责人  变更内容
* ───────────────────────────────────
* V0.01  2014/12/14 17:44:56   N/A    初版
*
* Copyright (c) 2012 Maticsoft Corporation. All rights reserved.
*┌──────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．　│
*│　版权所有：动软卓越（北京）科技有限公司　　　　　　　　　　　　　　│
*└──────────────────────────────────┘
*/
using System;
namespace IES.CC.Model.PBL
{
    /// <summary>
    /// 小组表
    /// </summary>
    [Serializable]
    public partial class Group
    {

        #region 补充信息

        /// <summary>
        /// 小组长及小组教师信息
        /// </summary>
        public string LeaderName { get; set; }
        public string TeacherName { get; set; }
        /// <summary>
        /// 小组长及小组教师信息
        /// </summary>
        public string LeaderAndTeacherName { get; set; }
        public int LeaderUserID { get; set; }
        /// <summary>
        /// 登录用户编号
        /// </summary>
        public int User { get; set; }
        /// <summary>
        /// 我的联系人编号集合
        /// </summary>
        public string Users { get; set; }



        #endregion

        public Group()
        { }
        #region Model
        private int _groupid;
        private int _groupmodeid;
        private string _name;
        private bool _ishistory = false;
        /// <summary>
        /// 
        /// </summary>
        public int GroupID
        {
            set { _groupid = value; }
            get { return _groupid; }
        }

        public int OCID { get; set; }


        /// <summary>
        /// 分组模式编号
        /// </summary>
        public int GroupModeID
        {
            set { _groupmodeid = value; }
            get { return _groupmodeid; }
        }


        public int OCClassID { get; set; }


        /// <summary>
        /// 小组名称
        /// </summary>
        public string Name
        {
            set { _name = value; }
            get { return _name; }
        }

        /// <summary>
        /// 小组成员数量
        /// </summary>
        public int UserCount { get; set; }



        /// <summary>
        /// 历史小组
        /// </summary>
        public bool IsHistory
        {
            set { _ishistory = value; }
            get { return _ishistory; }
        }


        public bool IsStudentLeadRand { get; set; }


        public int SourceID { get; set; }

        public string Source { get; set; }

        /// <summary>
        ///同一策略下，生成小组的版本号
        /// </summary>
        public int Version { get; set; }

        #endregion Model

    }
}

