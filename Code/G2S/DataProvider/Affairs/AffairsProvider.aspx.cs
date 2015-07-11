using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.G2S.OC.BLL;
using IES.CC.Affairs.Model;
using IES.JW.Model;
using IES.Service.Common;
using IES.Service;
namespace App.G2S.DataProvider
{
    public partial class AffairsProvider : System.Web.UI.Page
    {
        #region  列表
        [WebMethod]
        public static List<Dict> Dict_List(Dict model,int OCID)
        {
            //if (!UserService.OC_IsRole(OCID))
            //{
            //    return null;
            //}
            AffairsBLL affairsBLL = new AffairsBLL();
            return affairsBLL.Dict_List(model);
        }
        [WebMethod]
        public static List<OCAffairs> Affairs_List(OCAffairs model, int PageIndex, int PageSize)
        {
            //if (!UserService.OC_IsRole(model.OCID))
            //{
            //    return new List<OCAffairs>();
            //}

            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            model.UserID = user.UserID;
            AffairsBLL affairsBLL = new AffairsBLL();
            return affairsBLL.Affairs_List(model, PageIndex, PageSize);
        }
        #endregion


        #region 详细信息
        [WebMethod]
        public static string GetCUserSpace ()
        {
            return Browse.UserSpace;
        }
        #endregion


        #region  新增




        #endregion


        #region 对象更新

        [WebMethod]
        public static bool OCAffairs_Status_Upd(OCAffairs model)
        {
            AffairsBLL affairsBLL = new AffairsBLL();
            return affairsBLL.OCAffairs_Status_Upd(model);
        }

        #endregion


        #region 单个批量更新

        #endregion


        #region 属性批量操作


        [WebMethod]
        public static bool OCAffairs_Beach_Upd(OCAffairs model)
        {
            if (!UserService.OC_IsRole(model.OCID))
            {
                return false;
            }
            AffairsBLL affairsBLL = new AffairsBLL();
            return affairsBLL.OCAffairs_Beach_Upd(model);
        }
        #endregion




        #region 删除
        [WebMethod]
        public static bool Affairs_Del(OCAffairs model)
        {
            if (!UserService.OC_IsRole(model.OCID))
            {
                return false;
            }
            AffairsBLL affairsBLL = new AffairsBLL();
            return Affairs_Del(model);
        }
        #endregion
    }
}