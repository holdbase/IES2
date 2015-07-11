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
using IES.G2S.JW.IBLL;
using IES.G2S.OC.BLL.OC;
using IES.Resource.Model;
using IES.G2S.Resource.BLL;
using IES.Service.Common;
namespace App.G2S.DataProvider.OC
{
    public partial class CourseIndexProvider : System.Web.UI.Page
    {

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
        /// <summary>
        /// 课程列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<Course> Course_List(Course course, int pageindex, int pagesize)
        {
            CourseBLL coursebll = new CourseBLL();
            return coursebll.Course_List(course, pageindex, pagesize);
        }

        /// <summary>
        /// 获取同名课程列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<Course> Course_CourseName_List(string coursename)
        {
            CourseBLL coursebll = new CourseBLL();
            return coursebll.Course_CourseName_List(coursename);
        }



        /// <summary>
        /// 课程分类列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<SpecialtyType> SpecialtyType_Tree_List()
        {
            SpecialtyTypeBLL specialtytypebll = new SpecialtyTypeBLL();
            return specialtytypebll.SpecialtyType_Tree_List();
        }
        #region 详细信息


        [WebMethod]
        public static OCTeamRole OCTeamRole_Get(int OCID)
        {
            OCTeamRole octeamrole = new OCTeamRole();
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            octeamrole = oCTeamBLL.OCTeamRole_Get(user.UserID, OCID);
            octeamrole.UserID = user.UserID;
            octeamrole.OCID = OCID;
            return octeamrole;
        }
        [WebMethod]
        public static int GetUserSpace()
        {
            return Convert.ToInt32(Browse.UserSpace);
        }
        //获取教师信息
        [WebMethod]
        public static OCTeamInfo TeacherInfo(int UserID)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            if (UserID == -1)
            {
                UserID = user.UserID;
            }
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            OCTeamInfo octeaminfo = new OCTeamInfo();
            octeaminfo = oCTeamBLL.TeacherInfo_Get(UserID);
            octeaminfo.OcTeam.UserImgUrl = IES.Service.FileService.UserIMGURL(UserID);
            return octeaminfo;
        }
        //获取课程信息
        [WebMethod]
        public static Course Course_Get(int CourseID)
        {
            CourseBLL coursebll = new CourseBLL();
            return coursebll.Course_Get(CourseID);
        }

        //获取课程信息
        [WebMethod]
        public static IES.CC.OC.Model.OC OC_Get(int OCID)
        {
            CourseBLL coursebll = new CourseBLL();
            return coursebll.OC_Get(OCID);
        }
        /// <summary>
        /// 获取教学团队课程负责人信息列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCTeam> OCTeam_List(int OCID)
        {
            OCTeamBLL oCTeamBLL = new OCTeamBLL();
            List<OCTeam> octeamlist = oCTeamBLL.OCTeam_List(OCID, 1);
            return octeamlist;
        }

        #endregion

        #region  新建课程
        [WebMethod]
        public static IES.CC.OC.Model.OC OCCourse_ADD(IES.CC.OC.Model.OC OC, OCTeam octeam)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            OC.RowNum = user.UserID;
            OC.TemplateID = Int32.Parse(user.CurrentUserSpace);
            //新建课程的时候自己已经作为创建者添加到教学团队 不需要再作为主讲教师了
            if (user.UserID == octeam.UserID)
            {
                octeam.UserID = -1;
            }
            IES.G2S.OC.BLL.OC.OCBLL ocBLL = new IES.G2S.OC.BLL.OC.OCBLL();
            return ocBLL.OCCourse_ADD(OC, octeam);
        }

        /// <summary>
        /// 上传课程附件
        /// </summary>
        /// <param name="FileID"></param>
        /// <returns></returns>
        [WebMethod]
        public static Attachment Attachment_Get(string FileID)
        {
            AttachmentBLL attachmentbll = new AttachmentBLL();
            return attachmentbll.Attachment_Get(FileID);
        }

        [WebMethod]
        public static IES.CC.OC.Model.OC OCCourse_ADD(IES.CC.OC.Model.OC OC, List<OCTeam> octeamlist)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            OC.RowNum = user.UserID;
            OC.TemplateID = Int32.Parse(user.CurrentUserSpace);
            OC.Role = user.Role;
            IES.G2S.OC.BLL.OC.OCBLL ocBLL = new IES.G2S.OC.BLL.OC.OCBLL();
            return ocBLL.OCCourse_ADD(OC, octeamlist);
        }

        #endregion

        #region 对象更新
      
        [WebMethod]
        
        public static bool OC_CourseID_Upd(int ocid, int courseID)
        {
            IES.G2S.OC.BLL.OC.OCBLL ocBLL = new IES.G2S.OC.BLL.OC.OCBLL();
            return ocBLL.OC_CourseID_Upd(ocid, courseID);
        }
        /// <summary>
        /// 获取上传课程附件图片
        /// </summary>
        /// <param name="ocid"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool Attachment_SourceID_Upd(Attachment model)
        {
            model.Source = "OC";
            return AttachmentBLL.Attachment_SourceID_Upd(model);
        }
        /// <summary>
        /// 获取上传课程附件图片
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<Attachment> Attachment_NoCache_List(int SourceID)
        {
            Attachment model = new Attachment();
            model.Source = "OC";
            model.SourceID = SourceID;
            AttachmentBLL attachmentbll = new AttachmentBLL();
            return attachmentbll.Attachment_NoCache_List(model);
        }
        #endregion

        #region 删除

        #endregion
    }
}