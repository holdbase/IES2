using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 学生端翻转课堂--作业
    /// </summary>
    [Serializable]
    public class OCFCTest
    {
        public int SourceID { get; set; }
        public string URL { get; set; }
        public string Title { get; set; }
        /// <summary>
        /// 是否完成测试
        /// </summary>
        public int IsFinish { get; set; }
        /// <summary>
        /// 测试次数
        /// </summary>
        public int Clicks { get; set; }
        /// <summary>
        /// 总分
        /// </summary>
        public decimal Score { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// 提交时间
        /// </summary>
        public DateTime SubmitTime { get; set; }
        /// <summary>
        /// 评价（0差评,60中评,100好评）
        /// </summary>

        public int Evaluate { get; set; }
        /// <summary>
        /// 得分
        /// </summary>
        public decimal FastScore { get; set; }
        /// <summary>
        /// 评语
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// 通过分
        /// </summary>
        public decimal PassScore { get; set; }

        /// <summary>
        /// 测试类型 
        /// </summary>
        public int BuildMode { get; set; }





    }
}
