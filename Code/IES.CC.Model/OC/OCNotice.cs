﻿/**  版本信息模板在安装目录下，可自行修改。
* OCNotice.cs
*
* 功 能： N/A
* 类 名： OCNotice
*
* Ver    变更日期             负责人  变更内容
* ───────────────────────────────────
* V0.01  2014/12/2 20:19:28   N/A    初版
*
* Copyright (c) 2012 Maticsoft Corporation. All rights reserved.
*┌──────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．　│
*│　版权所有：动软卓越（北京）科技有限公司　　　　　　　　　　　　　　│
*└──────────────────────────────────┘
*/
using System;
using System.Collections.Generic;
namespace IES.CC.OC.Model
{
    /// <summary>
    /// MOOC招生
    /// </summary>
    [Serializable]
    public partial class OCNotice
    {


        #region  补充信息
        public string Key { get; set; }
        public string OCIDS { get; set; }
        public string Source { get; set; }
        public string SourceIDs { get; set; }
        public string Source2 { get; set; }
        public string SourceIDs2 { get; set; }
        public string EntryDates { get; set; }
        public int IsCanSendMsg { get; set; }
        public bool IsCanDel { get; set; }
        public string RConten { get; set; }
        public string OCName { get; set; }
        /// <summary>
        /// 列表总数
        /// </summary>
        public int rowscount { get; set; }
        public List<OCNoticeResponse> NoticeResponse { get; set; }
        public bool ShowPage { get; set; }
        public bool ShowMore { get; set; }
        /// <summary>
        /// 子系统编号
        /// </summary>
        public int SysID { get; set; }


        /// <summary>
        /// 通知对应的模块编号
        /// </summary>
        public int ModuleID { get; set; }

        #endregion
        public OCNotice()
        {
            this.IsShow = 1;
        }
        #region Model
        private int _noticeid;
        private int _ocid;
        private int _userid;
        private string _title;
        private string _conten;
        private DateTime _updatetime = DateTime.Now;
        private bool _istop = false;
        private DateTime? _enddate;
        /// <summary>
        /// 
        /// </summary>
        public int NoticeID
        {
            set { _noticeid = value; }
            get { return _noticeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int OCID
        {
            set { _ocid = value; }
            get { return _ocid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Title
        {
            set { _title = value; }
            get { return _title; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Conten
        {
            set { _conten = value; }
            get { return _conten; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime UpdateTime
        {
            set { _updatetime = value; }
            get { return _updatetime; }
        }
        /// <summary>
        /// 是否置顶 或重要通知
        /// </summary>
        public bool IsTop
        {
            set { _istop = value; }
            get { return _istop; }
        }


        public bool IsSms { get; set; }

        public bool IsEmail { get; set; }

        /// <summary>
        /// 适用所有学生

        /// </summary>
        public bool IsAll { get; set; }

        /// <summary>
        /// 置顶截至时间
        /// </summary>
        public DateTime? EndDate
        {
            set { _enddate = value; }
            get { return _enddate; }
        }

        /// <summary>
        /// 最后回复人
        /// </summary>
        public string LastUser { get; set; }

        /// <summary>
        /// 最后回复时间

        /// </summary>
        public DateTime LastResponseTime { get; set; }

        /// <summary>
        /// 回复总数
        /// </summary>
        public int ResponseCount { get; set; }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 是否可以被删除
        /// </summary>
        public int CanDelete
        {
            get;
            set;
        }
        /// <summary>
        /// 是否显示
        /// </summary>
        public int IsShow
        {
            get;
            set;
        }

        #endregion Model

    }
}

