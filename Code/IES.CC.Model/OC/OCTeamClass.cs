﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.OC.Model
{
    public class OCTeamClass
    {
        #region 补充信息

        public string ClassName { get; set; }

        public int StudentCount { get; set; }

        public string Name { get; set; }

        public int ParentID { get; set; }

        public int UserCount { get; set; }

        public int UserType { get; set; }

        public int GroupID { get; set; }

        public string Key { get; set; }

        public int RowsCount { get; set; }

        #endregion
        #region Model
        public int ID { get; set; }

        /// <summary>
        /// 在线课程编号
        /// </summary>
        public int OCID { get; set; }

        /// <summary>
        /// 用户编号
        /// </summary>
        public int UserID { get; set; }

        /// <summary>
        /// 教学班编号

        /// </summary>
        public int OCClassID { get; set; }
        #endregion
    }
}
