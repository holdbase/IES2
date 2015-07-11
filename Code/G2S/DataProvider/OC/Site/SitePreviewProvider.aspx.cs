using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.CC.Model.OC;
using IES.CC.OC.Model;
using IES.G2S.CourseLive.IBLL.Forum;
using IES.G2S.CourseRun.BLL;
using IES.G2S.OC.BLL.Mooc;
using IES.G2S.OC.BLL.Site;
using IES.G2S.OC.IBLL.OC;
using IES.G2S.OC.IBLL.Site;
using IES.G2S.Resource.BLL;
using IES.G2S.Resource.IBLL;
using IES.Resource.Model;
using IES.Service;

namespace App.G2S.DataProvider.OC.Site
{
    public partial class SitePreviewProvider : System.Web.UI.Page
    {
        #region 详细信息

        /// <summary>
        /// 获取教学资料预览
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="FileType"></param>
        /// <param name="FolderID"></param>
        /// <param name="DateSpan"></param>
        /// <param name="SearchKey"></param>
        /// <returns></returns>
        [WebMethod]
        public static ResourceInfo ResourceInfo_Get(int OCID, int FileType, int FolderID, int DateSpan, string SearchKey)
        {
            int UserID = UserService.CurrentUser.UserID;
            ISitePreview sitebll = new SitePreviewBLL();
            return sitebll.ResourceInfo_Get(OCID, UserID, FileType, FolderID, DateSpan, SearchKey);
        }

        #endregion

        #region 列表
        /// <summary>
        /// 章节列表
        /// </summary>
        /// <param name="OCID"></param>
        [WebMethod]
        public static List<Chapter> Chapter_OCMooc_List(int OCID)
        {
            IMOOCBLL moocbll = new MOOCBLL();
            return moocbll.Chapter_OCMooc_List(OCID);
        }


        /// <summary>
        /// 获取资料列表
        /// </summary>
        /// <param name="file"></param>
        /// <param name="PageSize"></param>
        /// <param name="PageIndex"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<File> File_Search(File file, int PageSize, int PageIndex)
        {
            IFileBLL filebll = new FileBLL();
            List<File> File_List = filebll.File_Search(file, PageSize, PageIndex);
            return File_List;
        }

        /// <summary>
        /// 获取见面课列表
        /// </summary>
        /// <param name="OCID">课程ID</param>
        [WebMethod]
        public static List<OCMoocOffline> OCMoocOffline_List(int OCID)
        {
            IMOOCBLL moocbll = new MOOCBLL();
            List<OCMoocOffline> ocMoocOfflineList = moocbll.OCMoocOffline_List(OCID);
            return ocMoocOfflineList;
        }

        /// <summary>
        /// 获取课程资料列表
        /// </summary>
        ///  <param name="OCID">课程ID</param>
        [WebMethod]
        public static List<OCMoocFile> OCMoocFile_List(int OCID, int ChapterID)
        {
            IMOOCBLL moocbll = new MOOCBLL();
            List<OCMoocFile> ocMoocFileList = moocbll.OCMoocFile_List(OCID, ChapterID);
            return ocMoocFileList;
        }

      
        #endregion
    }
}