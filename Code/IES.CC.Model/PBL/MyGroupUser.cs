using System;

namespace IES.CC.Model.PBL
{
    [Serializable]
    public partial class MyGroupUser
    {
        public MyGroupUser()
        { }
        #region 补充信息
        public string GroupIDs { get; set; }

        public string UserNo { get; set; }

        public string UserName { get; set; }

        public string ClassName { get; set; }
        public string ImgFileUrl { get; set; }
        #endregion
        #region Model
        private int _ID;
        private int _GroupID;
        private int _UserID;
        private int _UserType;

        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _ID = value; }
            get { return _ID; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int GroupID
        {
            set { _GroupID = value; }
            get { return _GroupID; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int UserID
        {
            set { _UserID = value; }
            get { return _UserID; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int UserType
        {
            set { _UserType = value; }
            get { return _UserType; }
        }

        #endregion

    }
}
