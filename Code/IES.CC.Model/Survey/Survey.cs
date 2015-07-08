/**  版本信息模板在安装目录下，可自行修改。
* Survey.cs
*
* 功 能： N/A
* 类 名： Survey
*
* Ver    变更日期             负责人  变更内容
* ───────────────────────────────────
* V0.01  2015/2/12 11:17:25   N/A    初版
*
* Copyright (c) 2012 Maticsoft Corporation. All rights reserved.
*┌──────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．　│
*│　版权所有：动软卓越（北京）科技有限公司　　　　　　　　　　　　　　│
*└──────────────────────────────────┘
*/
using System;
namespace IES.CC.Model.Survey
{
	/// <summary>
	/// 问卷调查
	/// </summary>
	[Serializable]
	public partial class Survey
	{
		public Survey()
		{}


        #region 补充信息
        public int UserID { get; set; }
        public int VoteStatus { get; set; }
        public string JoinUsers { get; set; }
        public int QuestionID { get; set; }
        public int ObjectID { get; set; }
        //总数
        public int AllCount { get; set; }
        #endregion


        #region Model

      
        private int _surveyid;
		private int _ocid;
		private int _courseid;
		private string _title;
		private string _regnum= "0";
		private DateTime? _startdate;
		private DateTime? _enddate;
		private int _createuserid;
		private int _owneruserid;
		private DateTime? _updatetime= DateTime.Now;
		private string _brief;
		private int? _type=1;
		private int? _status=0;
		/// <summary>
		/// 
		/// </summary>
		public int SurveyID
		{
			set{ _surveyid=value;}
			get{return _surveyid;}
		}
		/// <summary>
		/// 在线课程编号
		/// </summary>
		public int OCID
		{
			set{ _ocid=value;}
			get{return _ocid;}
		}
		/// <summary>
		/// 适用课程编号
		/// </summary>
		public int CourseID
		{
			set{ _courseid=value;}
			get{return _courseid;}
		}
		/// <summary>
		/// 问卷名称
		/// </summary>
		public string Title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 手机端投票的课堂注册码
		/// </summary>
		public string RegNum
		{
			set{ _regnum=value;}
			get{return _regnum;}
		}
		/// <summary>
		/// 投票开始时间
		/// </summary>
		public DateTime? StartDate
		{
			set{ _startdate=value;}
			get{return _startdate;}
		}
		/// <summary>
		/// 结束时间
		/// </summary>
		public DateTime? EndDate
		{
			set{ _enddate=value;}
			get{return _enddate;}
		}
		/// <summary>
		/// 创建人
		/// </summary>
		public int CreateUserID
		{
			set{ _createuserid=value;}
			get{return _createuserid;}
		}
		/// <summary>
		/// 拥有人
		/// </summary>
		public int OwnerUserID
		{
			set{ _owneruserid=value;}
			get{return _owneruserid;}
		}
		/// <summary>
		/// 最后更新时间
		/// </summary>
		public DateTime? UpdateTime
		{
			set{ _updatetime=value;}
			get{return _updatetime;}
		}
		/// <summary>
		/// 详细描述
		/// </summary>
		public string Brief
		{
			set{ _brief=value;}
			get{return _brief;}
		}
		/// <summary>
		/// 1 普通问卷； 2 论坛中投票； 3 手机客户端投票；
		/// </summary>
		public int? Type
		{
			set{ _type=value;}
			get{return _type;}
		}

        /// <summary>
        /// 当前提交数量
        /// </summary>
        public int Submits { get; set; }

        /// <summary>
        /// 问题的数量
        /// </summary>
        public int QuestionCount { get; set; }
        
        
		/// <summary>
		/// 0 未开始 ， 1进行中 ；  2结束
		/// </summary>
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}

        /// <summary>
        /// 行总数
        /// </summary>
        public int RowsCount { get; set; }

        /// <summary>
        /// 调查结果是否公开
        /// </summary>
        public bool IsOpen { get; set; }

        /// <summary>
        /// 来源编号
        /// </summary>
        public int SourceID { get; set; }

        /// <summary>
        /// 来源属性
        /// </summary>
        public string Source { get; set; }

        public int EvaluationMode { get; set; }


        /// <summary>
        /// 是否保存为模板
        /// </summary>
        public bool IsTemplate { get; set; }

		#endregion Model



    }
}

