using IES.CC.Model.PBL;
using IES.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.G2S.DataProvider.User
{
    public partial class MsgProvider : System.Web.UI.Page
    {
        #region 消息中心
        /// <summary>
        /// 获取我的消息列表
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.CC.Model.Test.Message> Message_List(string Key, int Type,int PageIndex,int PageSize)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.Model.Test.Message model = new IES.CC.Model.Test.Message { Key = Key, UserID = int.Parse(userid), Type = Type };
            return new IES.G2S.CourseLive.BLL.Test.MessageBLL().Message_List(model,PageIndex, PageSize);
        }
        /// <summary>
        /// 删除信息
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Message_Del(int Type, string MessageIDs)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.Model.Test.Message model = new IES.CC.Model.Test.Message { UserID = int.Parse(userid), Type = Type, MessageIDs = MessageIDs };
            return new IES.G2S.CourseLive.BLL.Test.MessageBLL().Message_Del(model);
        }
        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static IES.CC.Model.Test.Message Message_Add(int MessageID, string Title, string Conten, bool IsForMail, bool IsForSMS, string ReceiveUserIDs)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.Model.Test.Message model = new IES.CC.Model.Test.Message { MessageID = MessageID, Title = Title, Conten = Conten, SendUserID = int.Parse(userid), IsForMail = IsForMail, IsForSMS = IsForSMS, ReceiveUserIDs = ReceiveUserIDs };
            return new IES.G2S.CourseLive.BLL.Test.MessageBLL().Message_Add(model);
        }
        /// <summary>
        /// 根据用户编号集合获取用户信息
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.JW.Model.User> User_ByUserIDs_List(string UserIDS)
        {
            IES.JW.Model.User model = new IES.JW.Model.User { UserIDS = UserIDS };
            return new IES.G2S.JW.BLL.UserBLL().User_ByUserIDs_List(model);
        }
        /// <summary>
        /// 班级树
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.CC.OC.Model.OCTeamClass> OCClass_UserID_Tree()
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.OC.Model.OCTeamClass model = new IES.CC.OC.Model.OCTeamClass { UserID=int.Parse(userid) };
            return new IES.G2S.CourseLive.BLL.Test.MyGroupBLL().OCClass_UserID_Tree(model);
        }
        /// <summary>
        /// 获取用户或班级下的教师或学生
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.JW.Model.User> ClassUser_List(string Key, int OCClassID, int UserType, int GroupID, int PageIndex, int PageSize)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.OC.Model.OCTeamClass model = new IES.CC.OC.Model.OCTeamClass { UserID = int.Parse(userid), Key = Key, OCClassID = OCClassID, UserType = UserType, GroupID = GroupID };
            return new IES.G2S.CourseLive.BLL.Test.MyGroupBLL().ClassUser_List(model, PageIndex, PageSize);
        }
        /// <summary>
        /// 获取我的联系组列表
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.CC.Model.Test.MyGroup> MyGroup_List(string Key, int PageIndex, int PageSize)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.Model.Test.MyGroup model = new IES.CC.Model.Test.MyGroup { UserID = int.Parse(userid), Key = Key };
            return new IES.G2S.CourseLive.BLL.Test.MyGroupBLL().MyGroup_List(model, PageIndex, PageSize);
        }
        /// <summary>
        /// 根据信息ID获取姓名,ID
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.CC.Model.Test.Message> Message_Gets(int MessageID)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.Model.Test.Message model = new IES.CC.Model.Test.Message { UserID = int.Parse(userid), MessageID = MessageID };
            return new IES.G2S.CourseLive.BLL.Test.MessageBLL().Message_Gets(model);
        }
        /// <summary>
        /// 获得我的联系组下的联系人
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<MyGroupUser> MyGroupUser_List(int GroupID, int UserType)
        {
            MyGroupUser model = new MyGroupUser { GroupID = GroupID, UserType = UserType };
            return new IES.G2S.CourseLive.BLL.Test.MyGroupBLL().MyGroupUser_List(model);
        }
        /// <summary>
        /// 获取上一封或下一封的ID
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static IES.CC.Model.Test.Message Message_Get(int MessageID, int NextOrLast, int Type)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.CC.Model.Test.Message model = new IES.CC.Model.Test.Message { MessageID = MessageID, UserID = int.Parse(userid), NextOrLast = NextOrLast, Type = Type };
            return new IES.G2S.CourseLive.BLL.Test.MessageBLL().Message_Get(model);
        }
        #endregion
    }
}