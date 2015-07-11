using IES.CC.Model.PBL;
using IES.CC.Model.Test;
using IES.CC.OC.Model;
using IES.G2S.CourseLive.BLL.Test;
using IES.JW.Model;
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
    public partial class AddressProvider : System.Web.UI.Page
    {
        #region 我的联系人
        /// <summary>
        /// 获取用户的在线课程及其下的班级树
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<OCTeamClass> OCClass_UserID_Tree()
        {
            string userid = IESCookie.GetCookieValue("ies");
            OCTeamClass model = new OCTeamClass { UserID = int.Parse(userid) };
            return new MyGroupBLL().OCClass_UserID_Tree(model);
        }
        /// <summary>
        /// 获取用户或班级下的教师或学生
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.JW.Model.User> ClassUser_List(string Key, int OCClassID, int UserType, int GroupID, int PageIndex, int PageSize)
        {
            string userid = IESCookie.GetCookieValue("ies");
            OCTeamClass model = new OCTeamClass { UserID = int.Parse(userid), Key = Key,OCClassID=OCClassID, UserType = UserType, GroupID=GroupID };
            return new MyGroupBLL().ClassUser_List(model,PageIndex,PageSize);
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
        /// 新增或修改我的联系组
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool MyGroup_Edit(int GroupID,string Name,string Users)
        {
            string userid = IESCookie.GetCookieValue("ies");
            Group model = new Group { GroupID = GroupID, Name = Name, User = int.Parse(userid), Users = Users };
            return new MyGroupBLL().MyGroup_Edit(model);
        }
        #endregion

        #region 我的联系组
        /// <summary>
        /// 获取我的联系组列表
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<MyGroup> MyGroup_List(string Key, int PageIndex, int PageSize)
        {
            string userid = IESCookie.GetCookieValue("ies");
            MyGroup model = new MyGroup {UserID = int.Parse(userid), Key = Key };
            return new MyGroupBLL().MyGroup_List(model,PageIndex,PageSize);
        }
        /// <summary>
        /// 获得我的联系组下的联系人
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<MyGroupUser> MyGroupUser_List(int GroupID, int UserType)
        {
            MyGroupUser model = new MyGroupUser { GroupID = GroupID, UserType = UserType };
            return new MyGroupBLL().MyGroupUser_List(model);
        }
        /// <summary>
        /// 删除我的联系组
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool MyGroup_Del(int GroupID)
        {
            Group model = new Group { GroupID = GroupID };
            return new MyGroupBLL().MyGroup_Del(model);
        }
        #endregion
        #region 历史联系人
        /// <summary>
        /// 获取历史班级下的学生
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.JW.Model.User> ClassUserHistory_List(int TeachingClassID, string Key, int PageIndex, int PageSize)
        {
            TeachingClass model = new TeachingClass { TeachingClassID = TeachingClassID, Key = Key };
            return new MyGroupBLL().ClassUserHistory_List(model, PageIndex, PageSize);
        }
        /// <summary>
        /// 学期列表
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.JW.Model.Term> Term_List()
        {
            Term model = new Term { Key="" };
            return new IES.G2S.JW.BLL.TermBLL().Term_List(model);
        }
        /// <summary>
        /// 通过学期ID获得教学班列表
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static List<IES.JW.Model.TeachingClass> TeachingClass_ByTermID_List(int TermID)
        {
            Term model = new Term { TermID = TermID };
            return new IES.G2S.JW.BLL.TeachingClassBLL().TeachingClass_ByTermID_List(model);
        }
        /// <summary>
        ///  传发送人集合 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool SendUserIDS(string UserIDS)
        {
            HttpContext.Current.Session["SendUserIDs"] = UserIDS;
            return true;
        }
        #endregion
    }
}