﻿/**  版本信息模板在安装目录下，可自行修改。
* OCMoocLive.cs
*
* 功 能： N/A
* 类 名： OCMoocLive
*
* Ver    变更日期             负责人  变更内容
* ───────────────────────────────────
* V0.01  2014/12/2 20:19:26   N/A    初版
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
    /// Mooc互动
    /// </summary>
    [Serializable]
    public partial class OCMoocLive
    {

        #region 补充属性
        /// <summary>
        /// 论坛主键ID
        /// </summary>
        public int TopicID { get; set; }
        /// <summary>
        /// 论题名称
        /// </summary>
        public string ForumTitle { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public int UserID { set; get; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { set; get; }

        //测试编号
        public int TestID { set; get; }

        //测试名
        public string TestTitle { set; get; }

        //已提交人数
        public int SubmitStudentCount { get; set; }

        //章节名称
        public string Title { set; get; }
        #endregion

        public OCMoocLive()
        { }
        #region Model
        private int _moocliveid;
        private int _ocid;
        private int _chapterid;
        private int _sourceid = 0;
        private string _source;
        private int _orde = 1;
        private bool _ismust = false;
        private bool _isdiscuss = false;
        /// <summary>
        /// 
        /// </summary>
        public int MoocLiveID
        {
            set { _moocliveid = value; }
            get { return _moocliveid; }
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
        /// 0 表示结业测试
        /// </summary>
        public int ChapterID
        {
            set { _chapterid = value; }
            get { return _chapterid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int SourceID
        {
            set { _sourceid = value; }
            get { return _sourceid; }
        }
        /// <summary>
        /// ForumTopic 表示论题 ； Test 表示作业或考试。。。

        /// </summary>
        public string Source
        {
            set { _source = value; }
            get { return _source; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int Orde
        {
            set { _orde = value; }
            get { return _orde; }
        }

        /// <summary>
        /// 是否必须
        /// </summary>
        public bool IsMust
        {
            set { _ismust = value; }
            get { return _ismust; }
        }

        /// <summary>
        /// 是否章讨论
        /// </summary>
        public bool IsDiscuss
        {
            set { _isdiscuss = value; }
            get { return _isdiscuss; }
        }
        #endregion Model

    }
}

