using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.Model.OC;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 学生翻转课堂导航信息
    /// </summary>
    [Serializable]
    public class OCFCLearnInfo
    {
        /// <summary>
        /// 翻转课堂基本信息
        /// </summary>
        public OCFC ocfc { get; set; }

        /// <summary>
        /// 翻转课堂资料学习
        /// </summary>
        public List<OCFCFile> OCFCFileList { get; set; }

        /// <summary>
        /// 翻转课堂作业测试
        /// </summary>
        public List<OCFCTest> OCFCTestList { get; set; }


        /// <summary>
        /// 论坛 
        /// </summary>
        public List<OCFCForumTopic> OCFCForumTopicList { get; set; }
        /// <summary>
        /// 线下课堂
        /// </summary>
        public List<OCFCOffline> FCOfflineList { get; set; }

        /// <summary>
        /// 线下成绩
        /// </summary>
        public List<OCFCOfflineScore> OCFCOfflineScoreList { get; set; }
        /// <summary>
        /// 互相评价
        /// </summary>
        public List<OCFCSurvey> OCFCSurveyList { get; set; }
        /// <summary>
        /// zonfen
        /// </summary>
        public OCFCScoreOption OcFcScoreOption { get; set; }
        /// <summary>
        /// 得分
        /// </summary>
        public OCFCScore OcFcScore { get; set; }


    }
    /// <summary>
    /// 学生端翻转课堂--作业
    /// </summary>
    //[Serializable]
    //public class OCFCTest
    //{
    //    public int SourceID { get; set; }
    //    public string URL { get; set; }
    //    public string Title { get; set; }
    //    /// <summary>
    //    /// 是否完成测试
    //    /// </summary>
    //    public int IsFinish { get; set; }
    //    /// <summary>
    //    /// 测试次数
    //    /// </summary>
    //    public int Clicks { get; set; }
    //    /// <summary>
    //    /// 总分
    //    /// </summary>
    //    public decimal Score { get; set; }
    //    /// <summary>
    //    /// 结束时间
    //    /// </summary>
    //    public DateTime EndDate { get; set; }
    //    /// <summary>
    //    /// 提交时间
    //    /// </summary>
    //    public DateTime SubmitTime { get; set; }
    //    /// <summary>
    //    /// 评价（0差评,60中评,100好评）
    //    /// </summary>

    //    public int Evaluate { get; set; }
    //    /// <summary>
    //    /// 得分
    //    /// </summary>
    //    public decimal FastScore { get; set; }
    //    /// <summary>
    //    /// 评语
    //    /// </summary>
    //    public string Comment { get; set; }
    //    /// <summary>
    //    /// 通过分
    //    /// </summary>
    //    public decimal PassScore { get; set; }

    //    /// <summary>
    //    /// 测试类型 
    //    /// </summary>
    //    public int BuildMode { get; set; }





    //}

    /// <summary>
    /// 学生端翻转课堂--线下成绩 
    /// </summary>
    //[Serializable]
    //public class OCFCOfflineScore
    //{
    //    public int OCFCOfflineScoreID { get; set; }
    //    public int FCID { get; set; }
    //    public int Power { get; set; }
    //    public int InputNum { get; set; }
    //    public DateTime CreateDate { get; set; }
    //    public string Title { get; set; }
    //    public decimal Score { get; set; }
    //    public int GroupRanking { get; set; }
    //    public int ClassRanking { get; set; }
    //}

    /// <summary>
    /// 学生端翻转课堂--互相评价 
    /// </summary>
    //[Serializable]
    //public class OCFCSurvey
    //{
    //    public int SourceID { get; set; }
    //    public string URL { get; set; }
    //    public string Title { get; set; }
    //    public int IsFinish { get; set; }
    //    public int Evaluation { get; set; }

    //    public int NotEvaluation { get; set; }
    //    public DateTime EndDate { get; set; }
    //    public string Brief { get; set; }
    //    public int Status { get; set; }
    //    public DateTime StartDate { get; set; }
    //    public DateTime CurrentDate { get; set; }
    //    public DateTime SubmitTime { get; set; }

    //}

    /// <summary>
    /// 学生端翻转课堂--论坛 
    /// </summary>
    //[Serializable]
    //public class OCFCForumTopic
    //{
    //    public int SourceID { get; set; }
    //    public string URL { get; set; }
    //    public string Brief { get; set; }
    //    public string Title { get; set; }
    //    public int IsFinish { get; set; }
    //    public int PublishNum { get; set; }
    //    /// <summary>
    //    /// 回复数
    //    /// </summary>
    //    public int ResponseNum { get; set; }
    //    /// <summary>
    //    /// 最后回复人
    //    /// </summary>
    //    public string LastUserName { get; set; }
    //    /// <summary>
    //    /// 最后回复时间
    //    /// </summary>
    //    public DateTime LastUpdateTime { get; set; }
    //    /// <summary>
    //    /// 点击量
    //    /// </summary>
    //    public int Clicks { get; set; }
    //}

    ///// <summary>
    ///// 完成度
    ///// </summary>
    //[Serializable]
    //public class OCFCComplated
    //{
    //    public int SourceID { get; set; }
    //    public string URL { get; set; }
    //    public string Brief { get; set; }
    //    public string Title { get; set; }
    //    public int IsFinish { get; set; }
    //    public int PublishNum { get; set; }
    //    public int ResponseNum { get; set; }
    //}


}
