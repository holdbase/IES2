using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 获取待处理事项数
    /// </summary>
    [Serializable]
    public partial class WaitingProcess
    {
        public bool isShow { get; set; }
        public int UserType { get; set; }
        public int WaitingNum { get; set; }
        public WaitingProcess()
        {

        }

        public int T_HomeworkNum { get; set; }
        public int T_VoteNum { get; set; }
        public int T_ForumReplyNum { get; set; }
        public int T_ApplyNum { get; set; }
        public int T_ActivityNum { get; set; }

        #region 学生

        //新的作业数
        public int S_HomeworkNum { get; set; }
        //新的互评作业数
        public int S_EachHomeworkNum { get; set; }
        //新的作业成绩数
        public int S_HomeworkScoreNum { get; set; }
        //新的申请反馈数
        public int S_ApplyBackNum { get; set; }
        //新的投票数
        public int S_VoteNum { get; set; }
        //新的评价任务数
        public int S_AppraiseNum { get; set; }
        //参与您讨论的回复数
        public int S_ForumReplyNum { get; set; }
        //新的课程成绩数
        public int S_CourseScoreNum { get; set; }
        //新的培训活动数
        public int S_ActivityNum { get; set; }
        #endregion 学生
    }
}
