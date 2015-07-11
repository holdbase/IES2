using IES.CC.Model.OC;
using IES.CC.OC.Model;
using IES.G2S.OC.BLL.OC;
using IES.G2S.OC.BLL.Site;
using IES.G2S.OC.BLL.Team;
using IES.G2S.OC.IBLL.OC;
using IES.G2S.OC.IBLL.Site;
using IES.G2S.OC.IBLL.Team;
using IES.Security;
using IES.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace App.AngularMvc.DataProvider.OC.Site
{
    public partial class SiteProvider : System.Web.UI.Page
    {
        /// <summary>
        /// 新增主栏目
        /// </summary>
        /// <param name="column"></param>
        /// <returns></returns>
        [WebMethod]
        public static int OCSiteColumn_Edit(string columnsname, int type, int OCID, int ColumnID, int ParentID)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            OCSiteColumn column = new OCSiteColumn();
            column.ColumnID = ColumnID;
            column.OCID = OCID;
            column.Title = columnsname;
            column.UserID = user.UserID;
            column.ParentID = ParentID;
            column.ContentType = type;
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OCSiteColumn_Edit(column);
        }

        /// <summary>
        /// 新增列表栏目
        /// </summary>
        /// <param name="columnsname"></param>
        /// <param name="Conten"></param>
        /// <param name="type"></param>
        /// <param name="OCID"></param>
        /// <param name="ColumnID"></param>
        /// <param name="ParentID"></param>
        /// <returns></returns>
        [WebMethod]
        public static int OCSiteColumn_Content_Edit(string columnsname, string Conten, int type, int OCID, int ColumnID, int ParentID)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            OCSiteColumn column = new OCSiteColumn();
            column.ColumnID = ColumnID;
            column.OCID = OCID;
            column.Title = columnsname;
            column.UserID = user.UserID;
            column.ParentID = ParentID;
            column.ContentType = type;
            column.Conten = Conten;
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OCSiteColumn_Content_Edit(column);
        }
        /// <summary>
        /// 获取网站列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.CC.OC.Model.OC> OC_List()
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OC_List(user.UserID, user.UserType);
        }
        /// <summary>
        /// 获取网站栏目
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCSite> OCSite_Get(int OCID)
        {
            ISiteBLL ocbll = new SiteBLL();
            string userid = IESCookie.GetCookieValue("ies");
            if (userid != "-1")
            {
                IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
                user = UserService.User_Get(user);
                return ocbll.OCSite_Get(OCID, user.UserID);
            }
            else
            {
                return ocbll.OCSite_Get(OCID, -1);
            }

        }
        /// <summary>
        /// 获取网站的所有栏目列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCSiteColumn> OCSiteColumn_Tree(int OCID)
        {
            ISiteBLL ocbll = new SiteBLL();
            string userid = IESCookie.GetCookieValue("ies");

            if (userid != "-1")
            {
                IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
                user = UserService.User_Get(user);
                List<OCSite> ocsitelist = ocbll.OCSite_Get(OCID, user.UserID);
                OCSite ocsite = null;
                if (ocsitelist != null && ocsitelist.Count > 0)
                {
                    ocsite = ocsitelist[0];
                }
                OCSiteColumn ocsitecolumn = new OCSiteColumn();
                List<OCSiteColumn> listcolumn = ocbll.OCSiteColumn_Tree(OCID, user.UserID);
                ForeachPropertyNode(listcolumn, ocsitecolumn, 0, ocsite);
                return ocsitecolumn.Children;
            }
            else
            {

                List<OCSite> ocsitelist = ocbll.OCSite_Get(OCID, -1);
                OCSite ocsite = null;
                if (ocsitelist != null && ocsitelist.Count > 0)
                {
                    ocsite = ocsitelist[0];
                }
                OCSiteColumn ocsitecolumn = new OCSiteColumn();
                List<OCSiteColumn> listcolumn = ocbll.OCSiteColumn_Tree(OCID, -1);
                ForeachPropertyNode(listcolumn, ocsitecolumn, 0, ocsite);
                return ocsitecolumn.Children;
            }




        }


        /// <summary>
        /// 网站显示风格更新
        /// </summary>
        /// <param name="SiteID"></param>
        /// <param name="DisplayStyle"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool OCSite_DisplayStyle_Upd(int SiteID, int DisplayStyle)
        {
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OCSite_DisplayStyle_Upd(SiteID, DisplayStyle);
        }
        /// <summary>
        /// 网站显示语言更新
        /// </summary>
        /// <param name="SiteID"></param>
        /// <param name="Language"></param>
        [WebMethod]
        public static void OCSite_Language_Upd(int SiteID, int Language)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSite_Language_Upd(SiteID, Language);
        }
        /// <summary>
        /// 更新课程网站的建设模式
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="BuildMode"></param>
        /// <param name="OutSiteLink"></param>
        [WebMethod]
        public static void OCSite_BuildMode_Upd(int OCID, int BuildMode, string OutSiteLink)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSite_BuildMode_Upd(OCID, BuildMode, OutSiteLink);
        }
        /// <summary>
        /// 网站栏目的启用
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="FileldType"></param>
        [WebMethod]
        public static void OCSite_Field_Upd(int OCID, int ContentType)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSite_Field_Upd(OCID, ContentType);
        }
        /// <summary>
        /// 网站栏目内容更新
        /// </summary>
        /// <param name="ColumnID"></param>
        /// <param name="Conten"></param>
        [WebMethod]
        public static void OCSiteColumn_Conten_Upd(int ColumnID, string Conten)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSiteColumn_Conten_Upd(ColumnID, Conten);
        }
        /// <summary>
        /// 删除栏目
        /// </summary>
        /// <param name="ColumnID"></param>
        [WebMethod]
        public static void OCSiteColumn_Del(int ColumnID)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSiteColumn_Del(ColumnID);
        }
        /// <summary>
        /// 获取网站的栏目下子栏目列表
        /// </summary>
        /// <param name="ColumnID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCSiteColumn> OCSiteColumn_List(int ColumnID)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OCSiteColumn_List(ColumnID, user.UserID);
        }
        /// <summary>
        /// 更新栏目
        /// </summary>
        /// <param name="ColumnID"></param>
        /// <param name="Title"></param>
        /// <param name="ContentType"></param>
        [WebMethod]
        public static void OCSiteColumn_Upd(int ColumnID, string Title, int ContentType)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSiteColumn_Upd(ColumnID, Title, ContentType);
        }
        /// <summary>
        /// 更新父栏目
        /// </summary>
        /// <param name="ColumnID"></param>
        /// <param name="ParentID"></param>
        [WebMethod]
        public static void OCSiteColumn_ParentID_Upd(int ColumnID, int ParentID)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSiteColumn_ParentID_Upd(ColumnID, ParentID);
        }
        /// <summary>
        /// 网站模板更新
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="TemplateID"></param>
        [WebMethod]
        public static void OCSite_TemplateID_Upd(int OCID, int TemplateID)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSite_TemplateID_Upd(OCID, TemplateID);
        }

        /// <summary>
        /// 更新网站栏目的顺序 (Direction: orderup ,  orderdown , levelup , leveldown)
        /// </summary>
        /// <param name="ColumnID"></param>
        /// <param name="Direction"></param>
        [WebMethod]
        public static void OCSiteColumn_Move(int ColumnID, string Direction)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCSiteColumn_Move(ColumnID, Direction);
        }
        /// <summary>
        /// 获取网站栏目详细列表
        /// </summary>
        /// <param name="ColumnID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCSiteColumn> OCSiteColumn_Get(int ColumnID)
        {
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OCSiteColumn_Get(ColumnID);
        }
        /// <summary>
        /// 获取在线课程教学团队列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="Role"></param>
        /// <returns></returns>
        [WebMethod]

        public static List<OCTeam> OCTeam_List(int OCID, int Role)
        {
            OCTeamBLL octeambll = new OCTeamBLL();
            List<OCTeam> octeam = octeambll.OCTeam_List(OCID, Role);
            return octeam;

        }
        /// <summary>s
        /// 获取模板列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<OCTemplate> OCTemplate_List()
        {
            IOCTemplateBLL octemplatebll = new OCTemplateBLL();
            return octemplatebll.OCTemplate_List();
        }
        /// <summary>
        /// 获取在线课程的基本信息
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.CC.OC.Model.OC> OC_Get(int OCID)
        {
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.OC_Get(OCID);
        }
        /// <summary>
        /// 获取课程通知列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCNotice> OCNotice_List(int OCID, int PageIndex, int PageSize)
        {

            ISiteBLL ocbll = new SiteBLL();
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            return ocbll.OCNotice_List(OCID, user.UserID, PageIndex, PageSize);
        }
        /// <summary>
        /// 获取网站下视频的预览
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.Resource.Model.File> File_OCPreviewMP4_List(int OCID)
        {
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.File_OCPreviewMP4_List(OCID);
        }
        /// <summary>
        /// 课程网站推荐词
        /// </summary>
        /// <param name="SiteID"></param>
        /// <param name="Brief"></param>
        [WebMethod]
        public static void OC_Brief_Upd(int OCID, string Brief)
        {
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OC_Brief_Upd(OCID, Brief);
        }

        [WebMethod]
        public static List<OCSiteColumn> OCSiteColumn_Nav_Tree(int ColumnID, int OCID)
        {
            ISiteBLL ocbll = new SiteBLL();
            List<OCSiteColumn> ocsitecolumn = ocbll.OCSiteColumn_Nav_Tree(ColumnID, OCID);
            ocsitecolumn.Reverse();
            return ocsitecolumn;
        }
        /// <summary>
        /// 获取网站模板列表
        /// </summary>
        /// <param name="Subject"></param>
        /// <param name="Color"></param>
        /// <param name="DateSpan"></param>
        /// <param name="CourseID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.JW.Model.OCTheme> OCTheme_List(string Subject, string Color, int DateSpan, int CourseID, int PageIndex, int PageSize)
        {
            ISiteBLL ocbll = new SiteBLL();
            List<IES.JW.Model.OCTheme> octheme = ocbll.OCTheme_List(Subject, Color, DateSpan, CourseID, PageIndex, PageSize);
            return octheme;
        }

        /// <summary>
        /// 获取模板类型
        /// </summary>
        /// <param name="Subject"></param>
        /// <param name="Color"></param>
        /// <param name="DateSpan"></param>
        /// <param name="CourseID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.JW.Model.OCTheme> OCTheme_ListBysubject(string Subject, string Color, int DateSpan, int CourseID, int PageIndex, int PageSize)
        {
            ISiteBLL ocbll = new SiteBLL();
            List<IES.JW.Model.OCTheme> octheme = ocbll.OCTheme_ListBysubject(Subject, Color, DateSpan, CourseID, PageIndex, PageSize);
            return octheme;
        }
        /// <summary>
        /// 获取模板颜色
        /// </summary>
        /// <param name="Subject"></param>
        /// <param name="Color"></param>
        /// <param name="DateSpan"></param>
        /// <param name="CourseID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.JW.Model.OCTheme> OCTheme_ListBycolor(string Subject, string Color, int DateSpan, int CourseID, int PageIndex, int PageSize)
        {
            ISiteBLL ocbll = new SiteBLL();
            List<IES.JW.Model.OCTheme> octheme = ocbll.OCTheme_ListBycolor(Subject, Color, DateSpan, CourseID, PageIndex, PageSize);
            return octheme;
        }


        /// <summary>
        /// 更新网站的发布状态
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="IsPublish"></param>
        [WebMethod]
        public static void OCSite_IsPublish_Upd(int OCID, int IsPublish)
        {
            ISiteBLL ocbll = new SiteBLL();
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            ocbll.OCSite_IsPublish_Upd(OCID, user.UserID, IsPublish);
        }
        /// <summary>
        /// 获取附件列表
        /// </summary>
        /// <param name="Source"></param>
        /// <param name="SourceID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<IES.Resource.Model.Attachment> Attachment_List(string Source, int SourceID)
        {
            ISiteBLL ocbll = new SiteBLL();
            return ocbll.Attachment_List(Source, SourceID);
            //List<IES.Resource.Model.Attachment> attachment = ocbll.Attachment_List(Source, SourceID);
            //if (attachment.Count == 1) {
            //    if (System.IO.Path.GetExtension(attachment[0].FileName).ToLower() == ".mp4") {
            //        attachment.Insert(0, new IES.Resource.Model.Attachment());    
            //    }
            //}
            //return attachment.GroupBy(x => x.FileExtType).Select(x => x.OrderBy(y => y.Updatetime).Last()).ToList();
        }
        /// <summary>
        /// 在线课程添加/编辑通知
        /// </summary>
        /// <param name="NoticeID"></param>
        /// <param name="OCID"></param>
        /// <param name="Title"></param>
        /// <param name="Conten"></param>
        /// <param name="IsTop"></param>
        /// <param name="IsSms"></param>
        /// <param name="IsEMail"></param>
        /// <param name="IsAll"></param>
        /// <returns></returns>
        [WebMethod]
        public static int OCNotice_ADD(int NoticeID, int OCID, string Title, string Conten, bool IsTop, bool IsSms, bool IsEMail, bool IsAll)
        {
            ISiteBLL ocbll = new SiteBLL();
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            return ocbll.OCNotice_ADD(NoticeID, OCID, user.UserID, user.UserName, Title, Conten, IsTop, IsSms, IsEMail, IsAll);

        }
        /// <summary>
        /// 在线课程通知删除
        /// </summary>
        /// <param name="NoticeID"></param>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        [WebMethod]
        public static void OCNotice_Del(int NoticeID, int OCID)
        {
            string userid = IESCookie.GetCookieValue("ies");
            IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
            user = UserService.User_Get(user);
            ISiteBLL ocbll = new SiteBLL();
            ocbll.OCNotice_Del(NoticeID, OCID, user.UserID);
        }

        [WebMethod]
        public static int IsCanCourseInteraction(int OCID)
        {
            ISiteBLL ocbll = new SiteBLL();
            string userid = IESCookie.GetCookieValue("ies");

            if (userid != "-1")
            {
                IES.JW.Model.User user = new IES.JW.Model.User { UserID = Int32.Parse(userid) };
                user = UserService.User_Get(user);
                return ocbll.IsCanCourseInteraction(user.UserID, OCID, 0);
            }
            else
            {
                return 0;
            }

        }
        #region Mooc报名
        [WebMethod]
        public static int Mooc_Is_SignUp(int OCID)
        {
            string userid = IESCookie.GetCookieValue("ies");
            return new OCClassBLL().Mooc_Is_SignUp(OCID, Int32.Parse(userid));
        }
        [WebMethod]
        public static int OC_Register(int OCID, string RegNum)
        {
            OCClass model = new OCClass
            {
                RegNum = RegNum,
                OCID = OCID,
                UserID = IES.Service.UserService.CurrentUser.UserID
            };
            OCClass occls = new OCClassBLL().OC_Register(model);
            if (occls != null)
            {
                return occls.output;
            }
            else
            {
                return 0;
            }
        }
        #endregion



        [WebMethod]
        public static List<IES.CC.OC.Model.OCMoocRecruit> MoocRecruit_List(int OCID)
        {
            int UserID = -1;
            try
            {
                UserID = UserService.CurrentUser.UserID;

            }
            catch (Exception e)
            {
                UserID = -1;
            }

            ISiteBLL ocbll = new SiteBLL();
            List<IES.CC.OC.Model.OCMoocRecruit> ocMoocList = ocbll.OCMoocRecruitClassDesc_List(OCID, UserID);
            return ocMoocList;
            // return new List<OCMoocRecruit>();
        }
        [WebMethod]
        public static int OCMoocRecruitClass_Join(int RecruitID)
        {
            int UserID = -1;
            try
            {
                UserID = UserService.CurrentUser.UserID;
            }
            catch (Exception e)
            {
                UserID = -1;
            }
            if (UserID <=0)
            {
                return -1;
            }

            ISiteBLL ocbll = new SiteBLL();
            if (ocbll.OCMoocRecruitClassJoin(RecruitID, UserID))
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        private static void ForeachPropertyNode(List<OCSiteColumn> ocsitecloumn, OCSiteColumn node, int pid, OCSite ocsite)
        {
            List<OCSiteColumn> dvDict = ocsitecloumn.FindAll(delegate(OCSiteColumn item) { return item.ParentID == pid; });
            if (dvDict.Count > 0)
            {
                foreach (OCSiteColumn view in dvDict)
                {
                    OCSiteColumn childNodeItem = new OCSiteColumn()
                    {
                        ColumnID = view.ColumnID,
                        OCID = view.OCID,
                        UserID = view.UserID,
                        ParentID = view.ParentID,
                        Title = view.Title,
                        Orde = view.Orde,
                        CreateTime = view.CreateTime,
                        Updatetime = view.Updatetime,
                        ContentType = view.ContentType,
                        HasChild = view.HasChild,
                        Conten = view.Conten,
                        IsShow = true

                    };
                    if (pid == 0)
                    {
                        if (childNodeItem.ContentType == 11)
                        {
                            if (ocsite.UseIndexPage)
                            {
                                childNodeItem.IsShow = true;
                            }
                            else
                            {
                                childNodeItem.IsShow = false;
                            }
                        }
                        else if (childNodeItem.ContentType == 13 )
                        {
                            if (ocsite.UseResource)
                            {
                                childNodeItem.IsShow = true;
                            }
                            else
                            {
                                childNodeItem.IsShow = false;
                            }
                        }
                        else if (childNodeItem.ContentType == 14)
                        {
                            if (ocsite.UseLive)
                            {
                                childNodeItem.IsShow = true;
                            }
                            else
                            {
                                childNodeItem.IsShow = false;
                            }
                        }
                        else if (childNodeItem.ContentType == 12 || childNodeItem.ContentType == 15)
                        {

                            if (ocsite.UseMoocPlan)
                            {
                                childNodeItem.IsShow = true;
                            }
                            else
                            {
                                childNodeItem.IsShow = false;
                            }
                        }

                        childNodeItem.UseIndexPage = ocsite.UseIndexPage;
                        childNodeItem.UseResource = ocsite.UseResource;
                        childNodeItem.UseLive = ocsite.UseLive;
                        childNodeItem.UseMoocPlan = ocsite.UseMoocPlan;


                    }
                    ForeachPropertyNode(ocsitecloumn, childNodeItem, childNodeItem.ColumnID, ocsite);
                    node.Children.Add(childNodeItem);
                }
            }
        }

    }
}