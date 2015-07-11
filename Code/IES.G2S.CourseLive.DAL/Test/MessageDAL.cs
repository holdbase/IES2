using Dapper;
using IES.CC.Model.Test;
using IES.DataBase;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CourseLive.DAL.Test
{
    public class MessageDAL
    {
        #region  列表
        //获取消息列表 
        public static List<Message> Message_List(Message model, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@Key", model.Key);
                    p.Add("@UserID", model.UserID);
                    p.Add("@Type", model.Type);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<Message>("Message_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {
                return new List<Message>();
            }
        }

        public static List<Message> Message_Gets(Message model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@MessageID", model.MessageID);
                    p.Add("@UserID", model.UserID);
                    return conn.Query<Message>("Message_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region  详细信息
        public static Message Message_Get(Message model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@MessageID", model.MessageID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@NextOrLast", model.NextOrLast);
                    p.Add("@Type", model.Type);
                    return conn.Query<Message>("Message_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 删除信息
        public static bool Message_Del(Message message)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", message.UserID);
                    p.Add("@Type", message.Type);
                    p.Add("@MessageIDs", message.MessageIDs);
                    conn.Execute("Message_Del", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region 发送信息
        public static Message Message_Add(Message message)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@MessageID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    p.Add("@Title", message.Title);
                    p.Add("@Conten", message.Conten);
                    p.Add("@SendUserID", message.SendUserID);
                    p.Add("@IsForMail", message.IsForMail);
                    p.Add("@IsForSMS", message.IsForSMS);
                    p.Add("@ReceiveUserIDs", message.ReceiveUserIDs);                   
                    conn.Execute("Message_Add", p, commandType: CommandType.StoredProcedure);
                    message.MessageID = p.Get<int>("MessageID");
                    return message;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region 移动端
        public static int App_UnReadMessageCount_get(int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", UserID);
                    var model = conn.Query<string>("App_UnReadMessageCount_get", p, commandType: CommandType.StoredProcedure).Single();
                    return int.Parse(model);
                }
            }
            catch (Exception e)
            {
                return 0;
            }
        }
        public static List<Message> App_Message_List(string key, int UserID, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@key", key);
                    p.Add("@UserID", UserID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<Message>("App_Message_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public static List<Message> App_Message_Get(int UserID, int MyUserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@MyUserID", MyUserID);
                    p.Add("@UserID", UserID);
                    return conn.Query<Message>("App_Message_Get", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public static bool App_Message_Add(int UserID, string Title, string Conten, string ReceiveUserIDs)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SendUserID", UserID);
                    p.Add("@Title", Title);
                    p.Add("@Conten", Conten);
                    p.Add("@ReceiveUserIDs", ReceiveUserIDs);
                    conn.Execute("App_Message_Add", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion
    }
}
