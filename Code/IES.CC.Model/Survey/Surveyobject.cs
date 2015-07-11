/**  版本信息模板在安装目录下，可自行修改。
* Surveyobject.cs
*
* 功 能： N/A
* 类 名： Surveyobject
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
	/// 问卷发放对象
	/// </summary>
	[Serializable]
	public partial class Surveyobject
	{
		public Surveyobject()
		{}

        #region 补充信息
        public string SourceIDs { get; set; }  //教学班IDS 
        #endregion

		#region Model
		private int _surveyobjectid;
		private int _surveyid;
		private string _source;
		private int? _sourceid;
		private bool _isall= true;
		private string _ids= "1";
		/// <summary>
		/// 
		/// </summary>
		public int SurveyobjectID
		{
			set{ _surveyobjectid=value;}
			get{return _surveyobjectid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int SurveyID
		{
			set{ _surveyid=value;}
			get{return _surveyid;}
		}
		/// <summary>
		/// TechingClass ;  Class ;  User ; Orgnization;Student;Teacher;ALL
		/// </summary>
		public string Source
		{
			set{ _source=value;}
			get{return _source;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SourceID
		{
			set{ _sourceid=value;}
			get{return _sourceid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public bool IsALL
		{
			set{ _isall=value;}
			get{return _isall;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string IDS
		{
			set{ _ids=value;}
			get{return _ids;}
		}
		#endregion Model

	}
}

