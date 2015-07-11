using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Test
{
    [Serializable]
    public partial class TestTacticExercise
    {
        
        public TestTacticExercise()
		{}
		#region Model
        private int _TestTacticExerciseID;
		private int _testid;
		private int _paperid;
		private int _exerciseid;
		private int? _orde;
		private decimal? _score;
		private string _objectivescore;
		private string _subjectivescore;
		/// <summary>
		/// 
		/// </summary>
        public int TestTacticExerciseID
		{
            set { _TestTacticExerciseID = value; }
            get { return _TestTacticExerciseID; }
		}

        public int PaperExerciseID
        {
            get;
            set;
        }
		/// <summary>
		/// 
		/// </summary>
		public int TestID
		{
			set{ _testid=value;}
			get{return _testid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int PaperID
		{
			set{ _paperid=value;}
			get{return _paperid;}
		}

        /// <summary>
        /// 试卷分组编号
        /// </summary>
        public int GroupID { get; set; }

        public int PaperGroupID { get; set; }


		/// <summary>
		/// 
		/// </summary>
		public int ExerciseID
		{
			set{ _exerciseid=value;}
			get{return _exerciseid;}
		}

        /// <summary>
        /// 习题对应的学生编号
        /// </summary>
        public int UserID { get; set; }

		/// <summary>
		/// 
		/// </summary>
		public int? Orde
		{
			set{ _orde=value;}
			get{return _orde;}
		}
		/// <summary>
		/// 分值
		/// </summary>
		public decimal? Score
		{
			set{ _score=value;}
			get{return _score;}
		}
		/// <summary>
		///  '客观题分值（答题卡）多个分值之间用逗号分隔
		/// </summary>
		public string ObjectiveScore
		{
			set{ _objectivescore=value;}
			get{return _objectivescore;}
		}
		/// <summary>
		/// 主观题分值（答题卡）多个分值之间用逗号分隔
		/// </summary>
		public string SubjectiveScore
		{
			set{ _subjectivescore=value;}
			get{return _subjectivescore;}
		}
		#endregion Model
    }
}
