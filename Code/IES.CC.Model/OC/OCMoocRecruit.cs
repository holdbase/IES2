/**  版本信息模板在安装目录下，可自行修改。
* OCMoocRecruit.cs
*
* 功 能： N/A
* 类 名： OCMoocRecruit
*
* Ver    变更日期             负责人  变更内容
* ───────────────────────────────────
* V0.01  2014/12/2 20:19:27   N/A    初版
*
* Copyright (c) 2012 Maticsoft Corporation. All rights reserved.
*┌──────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．　│
*│　版权所有：动软卓越（北京）科技有限公司　　　　　　　　　　　　　　│
*└──────────────────────────────────┘
*/
using System;
namespace IES.CC.OC.Model
{
    /// <summary>
    /// MOOC招生
    /// </summary>
    [Serializable]
    public partial class OCMoocRecruit
    {
        #region 补充信息
        /// <summary>
        /// -在读学生数
        /// </summary>
        public string InReadStudentNum { get; set; }
        /// <summary>
        /// 结业学生数
        /// </summary>
        public string CompleteStudentNum { get; set; }

        public int StuCount { get; set; }
        public string Name { get; set; }
        public int IsJoin { get; set; }
        public int IsFull { get; set; }
        public int MoocIsOpen { get; set; }
        public int IsCanRead { get; set; }
        public string OCClassIDs { get; set; }
        public int RowsCount { get; set; }
        #endregion
        //public OCMoocRecruit()
        //{ }
        #region Model
        //private int _recruitid;
        //private int _ocid;
        //private int _jointype = 2;
        //private DateTime _recruitstartdate = DateTime.Now;
        //private DateTime _recruitenddate = DateTime.Now;
        //private int _userlimit = 0;
        //private string _regnum;
        //private bool _regstatus = false;
        //public DateTime _startdate;
        //public DateTime _enddate;
        //private bool _recruitstatus = false;
        //public DateTime _createtime;
        /// <summary>
        /// 
        /// </summary>
        public int RecruitID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int OCID { set; get; }
        /// <summary>
        /// 1 随时加入 ； 2 统一开课 
        /// </summary>
        public int JoinType { get; set; }

        /// <summary>
        /// 招生开始日期

        /// </summary>
        public DateTime RecruitStartDate { get; set; }
        /// <summary>
        /// 招生截止日期
        /// </summary>
        public DateTime RecruitEndDate { get; set; }
        /// <summary>
        /// 用户限制,0表示不限制

        /// </summary>
        public int UserLimit { get; set; }
        /// <summary>
        /// 注册码

        /// </summary>
        public string RegNum { get; set; }
        /// <summary>
        /// 是否启用注册码

        /// </summary>
        public bool RegStatus { get; set; }


        /// <summary>
        /// 运行开始时间
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// 运行结束时间
        /// </summary>
        public DateTime EndDate { get; set; }

        /// <summary>
        /// 招生是否暂停
        /// </summary>//
        public bool RecruitStatus { get; set; }

        /// <summary>
        /// 招生是否暂停
        /// </summary>//
        public DateTime CreateTime { get; set; }

        public int IsHistroy { get; set; }

        public int IsCanUpdate { get; set; }
        #endregion Model


    }  
}

