
using IES.CC.Model.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.G2S.CourseLive.DAL.Test;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class MessageBLL
    {
        #region 列表

        public List<Message> Message_List(Message model, int PageIndex, int PageSize)
        {
            return MessageDAL.Message_List(model, PageIndex, PageSize);
        }

        public List<Message> Message_Gets(Message model)
        {
            return MessageDAL.Message_Gets(model);
        }
            
        #endregion        

        #region  详细信息

        public Message Message_Get(Message model)
        {
            return MessageDAL.Message_Get(model);
        }

        #endregion

        #region 删除信息
        public bool Message_Del(Message message)
        {
            return MessageDAL.Message_Del(message);
        }
        #endregion

        #region 发送信息
        public Message Message_Add(Message message)
        {
            return MessageDAL.Message_Add(message);
        }
        #endregion

        #region 移动端
        public int App_UnReadMessageCount_get(int UserID)
        {
            return MessageDAL.App_UnReadMessageCount_get(UserID);
        }
        public List<Message> App_Message_List(string key,int UserID,int PageIndex,int PageSize)
        {
            return MessageDAL.App_Message_List(key, UserID, PageIndex, PageSize);
        }
        public List<Message> App_Message_Get(int UserID, int MyUserID)
        {
            return MessageDAL.App_Message_Get(UserID, MyUserID);
        }
        public bool App_Message_Add(int UserID, string Title, string Conten, string ReceiveUserIDs)
        {
            return MessageDAL.App_Message_Add(UserID, Title, Conten, ReceiveUserIDs);
        }
        #endregion
    }
}
