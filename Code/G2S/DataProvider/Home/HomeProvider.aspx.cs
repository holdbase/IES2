using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.Cache;
using IES.CC.OC.Model;
using IES.G2S.JW.BLL;
using IES.G2S.Portal.BLL;
using IES.G2S.Resource.BLL;
using IES.G2S.Resource.IBLL;
using IES.JW.Model;
using IES.Portal.Model;
using IES.Resource.Model;
using IES.Service;
using IES.Service.Common;

namespace App.G2S.DataProvider
{
    public partial class HomeProvider : System.Web.UI.Page
    {
        #region  列表

        /// <summary>
        /// 获取教学团队信息列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.CC.OC.Model.OC> OC_List()
        {
            
            IES.G2S.OC.BLL.OC.OCBLL ocbll = new IES.G2S.OC.BLL.OC.OCBLL();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;

            WebCache.SetExpire(user.UserID.ToString(), "_" + user.Role.ToString() + "OC_List");
            return ocbll.OC_List(user.UserID, user.Role);
        }

        //获取通知列表
        [WebMethod]
        public static List<Notice> GetNoticeList(Notice notice, int PageSize, int PageIndex)
        {
            NoticeBLL noticeBLL = new NoticeBLL();
            //IES.JW.Model.Notice notice = new IES.JW.Model.Notice();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            notice.UserID = user.UserID;
            return noticeBLL.Notice_List(notice, PageIndex, PageSize);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="PageSize"></param>
        /// <param name="PageIndex"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<Help> Help_Rand_List(Help model)
        {
            IES.G2S.Portal.BLL.HelpBLL helpbll = new IES.G2S.Portal.BLL.HelpBLL();
            model.UserType = Convert.ToInt32(Browse.UserSpace);
            return helpbll.Help_Rand_List(model);
        }
        [WebMethod]
        public static int GetUserSpace()
        {
            return Convert.ToInt32(Browse.UserSpace);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="PageSize"></param>
        /// <param name="PageIndex"></param>
        /// <returns></returns>
        [WebMethod]
        public static Help Help_Get(Help model)
        {
            IES.G2S.Portal.BLL.HelpBLL helpbll = new IES.G2S.Portal.BLL.HelpBLL();
            return helpbll.Help_Get(model);
        }

        /// <summary>
        /// 删除资源
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [WebMethod]
        public static int OC_Del(int OCID)
        {
            IES.G2S.OC.BLL.OC.OCBLL ocbll = new IES.G2S.OC.BLL.OC.OCBLL();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            return ocbll.OC_Del(OCID, user.UserID, user.Role);
        }
        /// <summary>
        /// 获取待处理事项
        /// </summary>
        /// <param name="file"></param>
        /// <param name="PageSize"></param>
        /// <param name="PageIndex"></param>
        /// <returns></returns>
        [WebMethod]
        public static IES.CC.OC.Model.WaitingProcess WaitingProcess_Get(bool isCache)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            IES.G2S.OC.BLL.OC.OCBLL ocbll = new IES.G2S.OC.BLL.OC.OCBLL();
            return ocbll.WaitingProcess_Get(user.UserID, Convert.ToInt32(Browse.UserSpace), isCache);
        }
        #endregion
    }
}