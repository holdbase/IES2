using IES.CC.OC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.G2S.OC.BLL.Team;
using IES.G2S.JW.BLL;
using IES.JW.Model;
using IES.Common;
using IES.Service;
namespace App.G2S.DataProvider
{
    public partial class TeamProvider : System.Web.UI.Page
    {
        #region  列表
        /// <summary>
        /// 获取教学团队信息列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCTeam> OCTeam_List(int OCID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return new List<OCTeam>();
            }

            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            List<OCTeam> octeamlist = oCTeamBLL.OCTeam_List(OCID, -1);
            //for (int i = 0; i < octeamlist.Count; i++)
            //{
            //    octeamlist[i].UserImgUrl = FileService.UserIMGURL(octeamlist[i].UserID);
            //}
            return octeamlist;
        }

        /// <summary>
        /// 获取教师列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.JW.Model.Teacher> Teacher_List(Teacher teacher, int pageindex, int pagesize)
        {
            UserBLL userbll = new UserBLL();
            return userbll.Teacher_List(teacher, pageindex, pagesize);
        }
        #endregion

        #region 详细信息

        [WebMethod]
        public static OCTeamRole OCTeamRole_Get(int OCID)
        {
            OCTeamRole octeamrole = new OCTeamRole();
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            try
            {
                octeamrole = oCTeamBLL.OCTeamRole_Get(user.UserID, OCID);
            }
            catch {
                octeamrole.Role = 0;
            }
            octeamrole.UserID = user.UserID;
            return octeamrole;
        }


        [WebMethod]
        public static OCTeamInfo TeacherInfo(int UserID)
        {
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            OCTeamInfo octeaminfo = new OCTeamInfo();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            if (UserID == -1)
            {
                UserID = user.UserID;
            }
            octeaminfo = oCTeamBLL.TeacherInfo_Get(UserID);
            if (octeaminfo.OcTeam != null)
            {
                octeaminfo.OcTeam.UserImgUrl = FileService.UserIMGURL(UserID);
            }
            return octeaminfo;
        }

        [WebMethod]
        public static OcTeamFunctionInfo GetOcTeamFunctionInfo(int OCID, int UserID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return new OcTeamFunctionInfo();
            }
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            return oCTeamBLL.OCTeam_Class_Function_Get(OCID, UserID);
        }

        #endregion

        #region  新增
        /// <summary>
        /// 添加教学团队成员信息
        /// </summary>
        /// <param name="motal"></param>
        /// <returns></returns>
        [WebMethod]
        public static OCTeam OCTeam_ADD(OCTeam octeam)
        {
            if (!UserService.OC_IsRole(octeam.OCID))
            {
                return null;
            }

            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            return oCTeamBLL.OCTeam_ADD(octeam);
        }
        [WebMethod]
        public static OCTeam OCTeam_Class_Function_Save(OcTeamFunctionInfo octeamfunctioninfo)
        {
            if (!UserService.OC_IsRole(octeamfunctioninfo.OCTeam.OCID))
            {
                return null;
            }

            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            return oCTeamBLL.OCTeam_Class_Function_Save(octeamfunctioninfo);
        }
        #endregion

        #region 对象更新
        [WebMethod]
        public static bool OCTeam_Brief_Upd(OCTeam octeam)
        {
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            return oCTeamBLL.OCTeam_Brief_Upd(octeam);
            //return true;

        }
        [WebMethod]
        public static bool OCTeam_IsLocked_Upd(OCTeam octeam)
        {
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            return oCTeamBLL.OCTeam_IsLocked_Upd(octeam);

        }

        #endregion

        #region 删除

        /// <summary>
        /// 删除教学团队成员by TeamID
        /// </summary>
        /// <param name="motal"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool OCTeam_Del(OCTeam motal)
        {
            if (!UserService.OC_IsRole(motal.OCID))
            {
                return false;
            }
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            return oCTeamBLL.OCTeam_Del(motal);
            //return true;

        }
        #endregion


    }
}