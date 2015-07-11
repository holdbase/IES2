using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    /// <summary>
    /// 学生端翻转课堂--论坛 
    /// </summary>
    [Serializable]
    public class OCFCForumTopic
    {
        public int SourceID { get; set; }
        public string URL { get; set; }
        public string Brief { get; set; }
        public string Title { get; set; }
        public int IsFinish { get; set; }
        public int PublishNum { get; set; }
        /// <summary>
        /// 回复数
        /// </summary>
        public int ResponseNum { get; set; }
        /// <summary>
        /// 最后回复人
        /// </summary>
        public string LastUserName { get; set; }
        /// <summary>
        /// 最后回复时间
        /// </summary>
        public DateTime LastUpdateTime { get; set; }
        /// <summary>
        /// 点击量
        /// </summary>
        public int Clicks { get; set; }
    }
}
