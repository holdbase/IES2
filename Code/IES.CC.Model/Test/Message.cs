using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.CC.Model.Test
{
    public partial class Message
    {

        #region  补充信息
        public string output { get; set; }

        public int Type { get; set; }

        public string UserName { get; set; }

        /// <summary>
        /// 总数
        /// </summary>
        public int RowsCount { get; set; }

        /// <summary>
        /// 是否读邮件
        /// </summary>
        public int IsRead { get; set; }

        /// <summary>
        /// 未读消息人数
        /// </summary>
        public int NoReadCount { get; set; }
        public int? UnReadCount { get; set; }
        public int? SendOrReceive { get; set; }
        public string UserImgUrl { get; set; }

        /// <summary>
        /// 搜索消息主题
        /// </summary>
        public string Key { get; set; }
        
        /// <summary>
        /// 未读人数
        /// </summary>
        public int NoReadUserCount { get; set; }
        
        /// <summary>
        /// 全部人数
        /// </summary>
        public int UserCount { get; set; }

        /// <summary>
        /// 发件人ID
        /// </summary>
        public int SendUserID { get; set; }

        /// <summary>
        /// 发件人姓名
        /// </summary>
        public string SendUserName { get; set; }

        /// <summary>
        /// 收件人
        /// </summary>
        public string ReceiveUserNames { get; set; }

        /// <summary>
        /// 消息编号集合
        /// </summary>
        public string MessageIDs { get; set; }

        /// <summary>
        /// 接收者用户编号集合
        /// </summary>
        public string ReceiveUserIDs { get; set; }

        /// <summary>
        /// 是否还有下一封
        /// </summary>
        public int IsHaveNext { get; set; }

        /// <summary>
        /// 是否还有上一封
        /// </summary>
        public int IsHaveLast { get; set; }

        /// <summary>
        /// 0当前消息，-1上一封，1下一封
        /// </summary>
        public int NextOrLast { get; set; }

        #endregion 

        public Message() { }

        #region Model
        private int _MessageID;
        private string _Title;
        private string _Conten;
        private int _UserID;
        private bool _IsForMail;
        private bool _IsForSMS;
        private string _CreateTime;
        private bool _IsDeleted;

        /// <summary>
        /// ID
        /// </summary>
        public int MessageID
        {
            set { _MessageID = value; }
            get { return _MessageID; }
        }

        /// <summary>
        /// 主题
        /// </summary>
        public string Title
        {
            set { _Title = value; }
            get { return _Title; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Conten
        {
            set { _Conten = value; }
            get { return _Conten; }
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
        /// 
        /// </summary>
        public bool IsForMail
        {
            set { _IsForMail = value; }
            get { return _IsForMail; }
        }

        /// <summary>
        /// 
        /// </summary>
        public bool IsForSMS
        {
            set { _IsForSMS = value; }
            get { return _IsForSMS; }
        }

        /// <summary>
        /// 时间
        /// </summary>
        public string CreateTime
        {
            set { _CreateTime = value; }
            get { return _CreateTime; }
        }

        /// <summary>
        /// 
        /// </summary>
        public bool IsDeleted
        {
            set { _IsDeleted = value; }
            get { return _IsDeleted; }
        }

        #endregion

    }
}
