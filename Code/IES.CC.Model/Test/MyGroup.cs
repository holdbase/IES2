using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Test
{
    public class MyGroup
    {

        #region  补充信息

        public string Key { get; set; }

        public int UserType { get; set; }
        /// <summary>
        /// 教师人数
        /// </summary>
        public int TeacherCount { get; set; }
        public int StudentCount { get; set; }
        public int RowsCount { get; set; }

        #endregion 

        public MyGroup() { }

        #region Model
        private int _GroupID;
        private string _GroupName;
        private int _UserID;
        private DateTime _CreateTime;

        /// <summary>
        /// ID
        /// </summary>
        public int GroupID
        {
            set { _GroupID = value; }
            get { return _GroupID; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string GroupName
        {
            set { _GroupName = value; }
            get { return _GroupName; }
        }

        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserID
        {
            set { _UserID = value; }
            get { return _UserID; }
        }

        /// <summary>
        /// 主题
        /// </summary>
        public DateTime CreateTime
        {
            set { _CreateTime = value; }
            get { return _CreateTime; }
        }
        #endregion
    }
}
