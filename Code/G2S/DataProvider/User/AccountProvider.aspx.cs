using IES.Common.Secret;
using IES.G2S.JW.BLL;
using IES.Security;
using IES.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.G2S.DataProvider.User
{
    public partial class AccountProvider : System.Web.UI.Page
    {
        #region 个人信息
        /// <summary>
        /// 保存个人信息
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static IES.JW.Model.User User_Part_Upd(string UserNo, string UserName, string UserNameEn, string Nickname, int Gender, string Email, string Tel, string Mobile, string Brief)
        {
            string userid = IESCookie.GetCookieValue("ies");           
            IES.JW.Model.User model = new IES.JW.Model.User {
                UserID = int.Parse(userid),
                UserNo = UserNo,
                UserName = UserName,
                UserNameEn = UserNameEn,
                Nickname = Nickname,
                Gender = Gender,
                Email = Email,
                Tel = Tel,
                Mobile = Mobile,
                Brief = HttpContext.Current.Server.UrlDecode(Brief)
            };
            return new UserBLL().User_Part_Upd(model);
        }
        #endregion
        #region 账号安全
        /// <summary>
        /// 手机是否已经被绑定验证
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Mobile_Validation(string Mobile)
        {
            IES.JW.Model.User model = new IES.JW.Model.User { Mobile = Mobile };
            return new UserBLL().Mobile_Validation(model);
        }
        /// <summary>
        /// 邮箱是否已经被绑定验证
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Email_Validation(string Email)
        {
            IES.JW.Model.User model = new IES.JW.Model.User { Email = Email };
            return new UserBLL().Mobile_Validation(model);
        }
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Pwd_Upd(string Pwd)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User model = new IES.JW.Model.User {UserID=int.Parse(userid), Pwd = Pwd };
            return new UserBLL().Pwd_Upd(model);
        }
        /// <summary>
        /// 密码是否一致验证
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Pwd_Validation(string Pwd)
        {
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = UserService.CurrentUser.UserID };
            IES.G2S.JW.BLL.UserBLL userbll = new IES.G2S.JW.BLL.UserBLL();
            IES.JW.Model.User _user = userbll.UserTS_Get(user);
            Pwd = Hash.GetMD5(Pwd);
            if (_user.Pwd == Pwd)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 修改邮箱
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Email_Upd(string Email)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User model = new IES.JW.Model.User { UserID = int.Parse(userid), Email = Email };
            return new UserBLL().Email_Upd(model);
        }
        /// <summary>
        /// 修改手机
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static bool Mobile_Upd(string Mobile)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User model = new IES.JW.Model.User { UserID = int.Parse(userid), Mobile = Mobile };
            return new UserBLL().Mobile_Upd(model);
        }
        #endregion

        #region 使用指南
        /// <summary>
        /// 使用指南
        /// </summary>
        /// <param name="context"></param>
        [WebMethod]
        public static IES.Portal.Model.Help Help_List(int HelpID)
        {
            IES.G2S.Portal.BLL.HelpBLL bll = new IES.G2S.Portal.BLL.HelpBLL();
            List<IES.Portal.Model.Help> helplist = bll.Help_List();
            IES.Portal.Model.Help help = new IES.Portal.Model.Help();
            if (helplist != null)
            {
                for (var i = 0; i < helplist.Count; i++)
                {
                    if (helplist[i].HelpID == HelpID)
                    {
                        help= helplist[i];
                    }
                }
            }
            return help;
        }
        [WebMethod]
        public static IES.Portal.Model.Help Help_Get(int HelpID)
        {
            IES.Portal.Model.Help model = new IES.Portal.Model.Help { HelpID = HelpID };
            IES.G2S.Portal.BLL.HelpBLL bll = new IES.G2S.Portal.BLL.HelpBLL();
            IES.Portal.Model.Help help = bll.Help_Get(model);       
            return help;
        }
        #endregion
    }
}