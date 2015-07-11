/**  版本信息模板在安装目录下，可自行修改。
* SurveyAnswer.cs
*
* 功 能： N/A
* 类 名： SurveyAnswer
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
	public partial class SurveyAnswer
	{
		public SurveyAnswer()
		{}
        #region
        public int Status { get; set; }  //0暂存中, 1 提交
        public int ObjectID { get; set; }
        public bool IsFinish { get; set; }
        #endregion
        #region Model
        private int _answerid;
		private int _surveyid;
		private int _questionid;
		private int _userid;
		private string _conten;
		private int _questionitemid;
		private int _score=0;
		/// <summary>
		/// 
		/// </summary>
		public int AnswerID
		{
			set{ _answerid=value;}
			get{return _answerid;}
		}
		/// <summary>
		/// 问卷编号
		/// </summary>
		public int SurveyID
		{
			set{ _surveyid=value;}
			get{return _surveyid;}
		}
		/// <summary>
		/// 问题编号
		/// </summary>
		public int QuestionID
		{
			set{ _questionid=value;}
			get{return _questionid;}
		}
		/// <summary>
		/// 答题人编号
		/// </summary>
		public int UserID
		{
			set{ _userid=value;}
			get{return _userid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Conten
		{
			set{ _conten=value;}
			get{return _conten;}
		}
		/// <summary>
		/// 问题的选项编号
		/// </summary>
		public int QuestionItemID
		{
			set{ _questionitemid=value;}
			get{return _questionitemid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int Score
		{
			set{ _score=value;}
			get{return _score;}
		}

        /// <summary>
        /// 被评对象的编号，一般的问卷调查不需要，只有在互评中有
        /// </summary>
        public int SourceID { get; set; }

        /// <summary>
        /// 被评对象所在的表名称，一般的问卷调查不需要，只有在互评中有
        /// </summary>
        public int Source { get; set; }

        /// <summary>
        /// 统计数量
        /// </summary>
        public int SelectCount { get; set; }

		#endregion Model

	}
}

