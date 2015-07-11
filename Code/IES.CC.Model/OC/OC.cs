/**  版本信息模板在安装目录下，可自行修改。
* OC.cs
*
* 功 能： N/A
* 类 名： OC
*
* Ver    变更日期             负责人  变更内容
* ───────────────────────────────────
* V0.01  2014/12/2 20:19:21   N/A    初版
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
    /// 我建设的在线课程
    /// </summary>
    [Serializable]
    public partial class OC
    {

        #region 补充信息
        public int SurveyCount { get; set; }
        public int TestCount { get; set; }
        public int FourmCount { get; set; }
        public int FileCount { get; set; }
        public int FcCount { get; set; }
        public int JieCount { get; set; }
        public int ZhangCount { get; set; }
        public int SiteColumnCount { get; set; }
        public DateTime? LastUpdateTime { get; set; }
        public int OrgID { get; set; }
        public int ID { get; set; }
        public string CourseNo { get; set; }
        public int TeacherID { get; set; }
        public string TeacherName { get; set; }
        public string OperatName { get; set; }
        public DateTime UpdateTime { get; set; }
        public string CourseContent { get; set; }
        public int UserID { get; set; }
        public string OrgIDs { get; set; }
        public int Lvl { get; set; }
        public string TeacherImgUrl { get; set; }
        public string CourseImgUrl { get; set; }
        public string Ranks { get; set; }
        public int RowsCount { get; set; }
        public int Type { get; set; }
        public string UserName { get; set; }
        public string URL { get; set; }
        public int IsShow { get; set; }
        public int IsNewImg { get; set; }
        public string Key { get; set; }
        public int OrderType { get; set; }
        public string OrganizationName { get; set; }
        public string ChargeUserName { get; set; }
        public int RowNum { get; set; }
        public string ImgFileUrl { get; set; }
        public int IsHasSite { get; set; }
        public int ShowFirst { get; set; }
        /// <summary>
        /// 用户是否有权限删除课程网站
        /// </summary>
        public int Role { get; set; }
        public int RegStatus { get; set; }
        /// <summary>
        /// 是否有课程负责人
        /// </summary>
        public int IsHasMainTeacher { get; set; }
        /// <summary>
        /// 是否有同名课程
        /// </summary>
        public int IsHasCourse { get; set; }
        public int StudentCount { get; set; }
        public int SpecialtyTypeID { get; set; }

        #endregion

        public OC()
        { }
        #region Model
        private int _ocid;
        private int _courseid;
        private string _name;
        private int _subjectid;
        private string _tags;
        private string _brief;
        private int _clicks = 0;
        private int? _language = 1;
        private bool _isportalcourse = false;
        private DateTime? _createtime = DateTime.Now;
        private DateTime? _updatetime = DateTime.Now;
        private bool _isdeleted = false;
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
        public string Name
        {
            set { _name = value; }
            get { return _name; }
        }

        public int CourseID
        {
            set { _courseid = value; }
            get { return _courseid; }
        }

        /// <summary>
        /// 是否微课程
        /// </summary>
        public int IsMicro
        {
            get;
            set;
        }


        /// <summary>
        /// 
        /// </summary>
        public int SubjectID
        {
            set { _subjectid = value; }
            get { return _subjectid; }
        }

        /// <summary>
        /// 网站模板编号
        /// </summary>
        public int TemplateID { get; set; }

        /// <summary>
        /// 在线课程网站适用课程分类名称
        /// </summary>
        public string SubjectName { get; set; }


        /// <summary>
        /// 课程标签 多个之间用空格分隔

        /// </summary>
        public string Tags
        {
            set { _tags = value; }
            get { return _tags; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Brief
        {
            set { _brief = value; }
            get { return _brief; }
        }
        /// <summary>
        /// 访问量

        /// </summary>
        public int Clicks
        {
            set { _clicks = value; }
            get { return _clicks; }
        }
        /// <summary>
        /// 1：中文 2：英文

        /// </summary>
        public int? Language
        {
            set { _language = value; }
            get { return _language; }
        }
        /// <summary>
        /// 是否是官方课程

        /// </summary>
        public bool IsPortalCourse
        {
            set { _isportalcourse = value; }
            get { return _isportalcourse; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? UpdateTIme
        {
            set { _updatetime = value; }
            get { return _updatetime; }
        }
        /// <summary>
        /// 删除状态

        /// </summary>
        public bool IsDeleted
        {
            set { _isdeleted = value; }
            get { return _isdeleted; }
        }
        #endregion Model

    }
}

