using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.OC
{

    /// <summary>
    /// 学习人数统计
    /// </summary>
    [Serializable]
    public partial class OCMoocStudyStudent
    {
        public OCMoocStudyStudent()
        { }

        #region Model
        /// <summary>
        /// 序号
        /// </summary>
        public int RowNum{set;get;}

        /// <summary>
        /// 日期 2014-12-13
        /// </summary>
        public string Date { set; get; }
        
        /// <summary>
        /// 日期 12-13
        /// </summary>
        public string Day { set; get; }

        /// <summary>
        /// 时间段内学生学习人数
        /// </summary>
        public int StudentCount { set; get; }

        #endregion Model
    }
}
