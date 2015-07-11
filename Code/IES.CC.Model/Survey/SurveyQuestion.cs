/**  版本信息模板在安装目录下，可自行修改。
* SurveyQuestion.cs
*
* 功 能： N/A
* 类 名： SurveyQuestion
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
using System.Collections.Generic;
namespace IES.CC.Model.Survey
{
	/// <summary>
	/// 问卷发放对象
	/// </summary>
	[Serializable]
	public partial class SurveyQuestion
	{
		public SurveyQuestion()
		{}
        #region 补充信息
        public int SelectCount { get; set; }
        public int QuestionItemID { get; set; }
        public int ObjectID { get; set; }
        public int Score { get; set; }

        public object ChoiceItems { get; set; }  //选项

        public object ChildQuestions { get; set; }  //子题

        public string ChoiceItems_a { get; set; }  //选项

        public string ChildQuestions_a { get; set; }  //子题
        public List<SurveyQuestionitem> Items { get; set; }
        #endregion
        #region Model
        private int _questionid;
		private int _surveyid;
		private int _type=1;
		private string _conten;
		private bool _ismust= true;
		private bool _israndom= false;
		private int? _minsel=0;
		private int? _maxsel=0;
		private int? _userid;
		private bool _issample= false;
		private int? _parentid=0;
		private int _orde=1;
		/// <summary>
		/// 
		/// </summary>
		public int QuestionID
		{
			set{ _questionid=value;}
			get{return _questionid;}
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
		/// 1.单选题；  2多选题 ；  3 填空题\n4.打分题；  5排序题 ；  6  简答题   7 矩阵单选题 ； 8.矩阵多选题  ；9矩阵填空题   n10 矩阵打分题
		/// </summary>
		public int Type
		{
			set{ _type=value;}
			get{return _type;}
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
		/// 该问题是否必须作答
		/// </summary>
		public bool IsMust
		{
			set{ _ismust=value;}
			get{return _ismust;}
		}
		/// <summary>
		/// 选项是否随机 1表示随机
		/// </summary>
		public bool IsRandom
		{
			set{ _israndom=value;}
			get{return _israndom;}
		}
		/// <summary>
		/// 最小选择数量
		/// </summary>
		public int? MinSel
		{
			set{ _minsel=value;}
			get{return _minsel;}
		}
		/// <summary>
		/// 最多选择数量
		/// </summary>
		public int? MaxSel
		{
			set{ _maxsel=value;}
			get{return _maxsel;}
		}
		/// <summary>
		/// 创建人编号
		/// </summary>
		public int? UserID
		{
			set{ _userid=value;}
			get{return _userid;}
		}
		/// <summary>
		/// 是否是样本问题
		/// </summary>
		public bool IsSample
		{
			set{ _issample=value;}
			get{return _issample;}
		}
		/// <summary>
		/// 矩阵题中使用，指向父题的编号
		/// </summary>
		public int? ParentID
		{
			set{ _parentid=value;}
			get{return _parentid;}
		}
		/// <summary>
		/// 问题的显示顺序
		/// </summary>
		public int Orde
		{
			set{ _orde=value;}
			get{return _orde;}
		}
		#endregion Model

	}
}

