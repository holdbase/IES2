using IES.CC.Forum.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.G2S.CourseLive.BLL.Forum;
using IES.G2S.CourseRun.BLL;
using IES.CC.OC.Model;
using IES.G2S.CourseLive.BLL.OC;
using IES.Security;
using IES.G2S.OC.BLL.Team;
using IES.JW.Model;
using IES.Resource.Model;
using IES.G2S.Resource.BLL;
using IES.Service;

namespace App.G2S.DataProvider.CourseLive.Forum
{
    public partial class ForumProvider : System.Web.UI.Page
    {
        #region 列表

        /// <summary>
        /// 回复列表
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static ForumResponseInfo ForumResponseInfo_List(ForumResponse model, int PageIndex = 1, int PageSize = 10)
        {
            //ResponseFile
            ForumResponseInfo fr = new ForumResponseInfo();
            fr = new ResponseBLL().ForumResponseInfo_List(model, PageIndex, PageSize);
            for (int i = 0; i < fr.forumresponselist.Count; i++)
            {
                if (fr.forumresponselist[i].ParentID == 0)
                {
                    fr.forumresponselist[i].ResponseFile = IES.Service.FileService.Attachment_NoCache_List(new Attachment { Source = "ForumResponse", SourceID = fr.forumresponselist[i].ResponseID });
                }
            }
            return fr;
        }

        /// <summary>
        /// 牛人榜
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="Top"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<ForumTopic> Forum_HotUser_List(int OCID, int Top)
        {
            return new ForumTopicBLL().Forum_HotUser_List(OCID, Top);
        }

        /// <summary>
        /// 论坛版块列表
        /// xuwei
        /// 2015年1月7日18:43:59
        /// </summary>
        /// <param name="ft"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<ForumType> ForumType_List(ForumType ft)
        {
            return new ForumTypeBLL().ForumType_List(ft);
        }

        /// <summary>
        /// 论题搜索
        /// </summary>
        /// <param name="model"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<ForumTopic> ForumTopic_Search(ForumTopic model, int PageIndex = 1, int PageSize = 20)
        {
            return new ForumTopicBLL().ForumTopic_Search(model, PageIndex, PageSize);
        }

        /// <summary>
        /// 网络教学班下拉列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClass> OCClass_Dropdown_List(int OCID)
        {
            return new OCClassBLL().OCClass_Dropdown_List(OCID);
        }

        /// <summary>
        /// 活跃论题列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="Top"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<ForumTopic> ForumTopic_Active_List(int OCID, int UserID, int Top = 5)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            return new ForumTopicBLL().ForumTopic_Active_List(OCID, user.UserID, Top);
        }
        #endregion

        #region 新增
        /// <summary>
        /// 新增论坛版块
        /// xuwei
        /// 2015年1月8日13:18:20
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static ForumType ForumType_ADD(ForumType model)
        {

            if (!UserService.OC_IsRole(model.OCID ))
            {
                return null;
            }

            return new ForumTypeBLL().ForumType_ADD(model);
        }


        /// <summary>
        /// 发帖
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static ForumTopic ForumTopic_Add(ForumTopic model)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            model.UserID = user.UserID;
            model.UserName = user.UserName;
            return new ForumTopicBLL().ForumTopic_Add(model);
        }

        /// <summary>
        /// 添加论题回复
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static ForumResponse ForumResponse_ADD(ForumResponse model)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            model.UserID = user.UserID;
            model.UserName = user.UserName;
            var fr = new ResponseBLL().ForumResponse_ADD(model);
            fr.ResponseFile = IES.Service.FileService.Attachment_NoCache_List(new Attachment { Source = "ForumResponse", SourceID = fr.ResponseID });
            return fr;
        }
        #endregion

        #region 删除
        /// <summary>
        /// 删除版块
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumType_Del(ForumType model)
        {
            if (!UserService.OC_IsRole(model.OCID))
            {
                return true ;
            }
            return new ForumTypeBLL().ForumType_Del(model);
        }

        /// <summary>
        /// 删除帖子
        /// </summary>
        /// <param name="TopicID"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumTopic_Del(int TopicID)
        {
            return new ForumTopicBLL().ForumTopic_Del(TopicID);
        }

        /// <summary>
        /// 删除回复
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumResponse_Del(int ResponseID)
        {
            return new ResponseBLL().ForumResponse_Del(ResponseID);
        }
        #endregion

        #region 对象更新
        /// <summary>
        /// 编辑论坛版块
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumType_Upd(ForumType model)
        {
            return new ForumTypeBLL().ForumType_Upd(model);
        }

        /// <summary>
        /// 编辑贴子
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumTopic_Upd(ForumTopic model)
        {
            return new ForumTopicBLL().ForumTopic_Upd(model);
        }
        #endregion

        #region 详细信息
        /// <summary>
        /// 获取论题的所有详细信息
        /// </summary>
        /// <param name="id">论题编号</param>
        /// <returns></returns>
        [WebMethod]
        public static ForumTopic ForumTopic_Get(int TopicID, int UserID)
        {
            return new ForumTopicBLL().ForumTopic_Get(TopicID, UserID);
        }
        #endregion

        #region 单个属性更新
        /// <summary>
        /// 设置或取消精华
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumTopic_IsEssence_Upd(int TopicID)
        {
            return new ForumTopicBLL().ForumTopic_IsEssence_Upd(TopicID);
        }

        /// <summary>
        /// 设置或取消置顶
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumTopic_IsTop_Upd(int TopicID)
        {
            return new ForumTopicBLL().ForumTopic_IsTop_Upd(TopicID);
        }

        /// <summary>
        /// 为论坛主题或回复点赞  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumMy_IsGood_Upd(ForumMy model)
        {
            string userid = IESCookie.GetCookieValue("ies");
            model.UserID = Convert.ToInt32(userid);
            return new ForumMyBLL().ForumMy_IsGood_Upd(model);
        }

        /// <summary>
        /// 移动  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumTopic_ForumTypeID_Upd(int TopicID, int ForumTypeID)
        {
            return new ForumTopicBLL().ForumTopic_ForumTypeID_Upd(TopicID, ForumTypeID);
        }
        #endregion

        #region 详细信息

        /// <summary>
        /// 获取论坛版块详细信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static ForumTypeInfo ForumTypeInfo_Get(ForumType model)
        {
            return new ForumTypeBLL().ForumTypeInfo_Get(model);
        }
        #endregion

        /// <summary>
        /// 分享帖子
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool ForumTopicType_Edit(ForumTopicType model)
        {
            return new ForumTopicTypeBLL().ForumTopicType_Edit(model);
        }

        /// <summary>
        /// 用户信息
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static IES.JW.Model.User User_Info()
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            user.Pwd = "";
            return user;
        }

        /// <summary>
        /// 相关讨论
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="TopicID"></param>
        /// <param name="SourceID"></param>
        /// <param name="Source"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<ForumTopic> ForumTopic_Other(int OCID, int UserID, int TopicID, int SourceID, string Source)
        {
            return new ForumTopicBLL().ForumTopic_Other(OCID, UserID, TopicID, SourceID, Source);
        }

        /// <summary>
        /// 获取用户的在线课程的角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static OCTeamRole OCTeam_Role_Get(OCTeamRole model)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            model.UserID = user.UserID;
            return new OCTeamRoleBLL().OCTeam_Role_Get(model);
        }

        /// <summary>
        /// 获取当前登录用户的指定在线课程模块列表
        /// </summary>
        /// <param name="ocid"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<AuUserModule> AuUserModule_UserID_List(string OCID)
        {
            return IES.Service.UserService.AuUserModule_UserID_List(OCID);
        }

        /// <summary>
        /// 获取附件列表NoCache
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<Attachment> Attachment_NoCache_List(Attachment model)
        {
            return IES.Service.FileService.Attachment_NoCache_List(model);
        }

        /// <summary>
        /// 删除附件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [WebMethod]
        public static bool Attachment_Del(Attachment model)
        {
            return IES.Service.FileService.Attachment_Del(model);
        }

        /// <summary>
        /// 张接下啦列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<Chapter> ChapterName_List(int OCID)
        {
            return new ChapterBLL().ChapterName_List(OCID);
        }
    }
}