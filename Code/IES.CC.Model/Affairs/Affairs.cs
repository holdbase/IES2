﻿using System;
namespace IES.CC.Affairs.Model
{
    [Serializable]
    public partial class OCAffairs
    {
        #region  补充信息
        public string AffairIDs { get; set; }
        //
        public int rowscount { get; set; }
        /// 姓名
        public string UserName { get; set; }
        public int UserType { get; set; }
        //所属机构
        public string OrganizationName { get; set; }
        public string ClassName { get; set; }
        public string RespondentUserName { get; set; }
        public int Type { get; set; }

        public bool IsSelected { get; set; }
        /// <summary>
        /// 0 我审核的 1 我申请的
        /// </summary>
        public int IsMe { get; set; }
        public int? IsHistory { get; set; }
        #endregion
        public OCAffairs()
        { }
        public int AffairID { get; set; }
        public int UserID { get; set; }
        public int OCID { get; set; }
        public int DictID { get; set; }//事物类型编号
        public int TestID { get; set; }

        //事物类型
        public string AffairType { get; set; }
        //申请原因
        public string Reson { get; set; }
        //事物详细
        public string AffairDesc { get; set; }
        //申请时间
        public DateTime CreateDate { get; set; }
        public int Status { get; set; }

    }

    [Serializable]
    public partial class AffairsType
    {
        public AffairsType()
        { }
        public int AffairsTypeID { get; set; }
        public string AffairsTypeName { get; set; }
    }
}
