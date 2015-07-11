using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.CC.OC.Model;
using IES.G2S.OC.BLL.OC;
using IES.Service;
using IES.Service.Common;

namespace App.G2S.DataProvider
{
    public partial class NoticesProvider : System.Web.UI.Page
    {
        //获取通知列表
        [WebMethod]
        public static List<OCNotice> GetNoticeList(OCNotice notice, int PageSize, int PageIndex)
        {
            OCNoticeBLL noticeBLL = new OCNoticeBLL();
            //IES.JW.Model.Notice notice = new IES.JW.Model.Notice();
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            notice.UserID = user.UserID;

            List<OCNotice> noticeList = new List<OCNotice>();
            noticeList = noticeBLL.NoticeInfo_List(notice, PageIndex, PageSize);
            //for (int i = 0; i < noticeList.Count; i++)
            //{
            //    for (int j = 0; j < noticeList[i].NoticeResponse.Count; j++)
            //    {
            //        noticeList[i].NoticeResponse[j].ImgFileUrl = FileService.UserIMGURL(noticeList[i].NoticeResponse[j].UserID);
            //    }
            //}

            return noticeList;
        }
        //获取通知回复列表
        [WebMethod]
        public static List<OCNoticeResponse> GetCommentList(int NoticeID, int PageSize, int PageIndex)
        {
            OCNoticeBLL noticeBLL = new OCNoticeBLL();
            OCNoticeResponse notice = new OCNoticeResponse();
            notice.NoticeID = NoticeID;
            List<OCNoticeResponse> responseList = new List<OCNoticeResponse>();
            responseList = noticeBLL.NoticeResponse_List(notice, PageIndex, PageSize);
            //for (int i = 0; i < responseList.Count; i++)
            //{
            //    responseList[i].ImgFileUrl = FileService.UserIMGURL(responseList[i].UserID);
            //}
            return responseList;
        }
        //获取教学班列表
        [WebMethod]
        public static List<OCClassTree> OCClass_Tree()
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            OCClassTree occlasstree = new OCClassTree();
            occlasstree.UserID = user.UserID;
            OCNoticeBLL noticeBLL = new OCNoticeBLL();
            return noticeBLL.OCClass_Tree(occlasstree);
        }
        [WebMethod]
        public static OCNoticeResponse NoticeResponse_ADD(int NoticeID, string RConten)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            OCNoticeBLL noticeBLL = new OCNoticeBLL();
            OCNoticeResponse noticeResponse = new OCNoticeResponse();
            noticeResponse.ResponseID = -1;
            noticeResponse.NoticeID = NoticeID;
            noticeResponse.Conten = RConten;
            noticeResponse.UserID = user.UserID;
            noticeResponse.UserName = user.UserName;
            noticeResponse = noticeBLL.NoticeResponse_ADD(noticeResponse);
            noticeResponse.ResponseTimeStr = "刚刚发表";
            //noticeResponse.ImgFileUrl = FileService.UserIMGURL(user.UserID);
            return noticeResponse;

        }

        //发通知
        [WebMethod]
        public static OCNotice Notice_ADD(OCNotice model)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            OCNoticeBLL noticeBLL = new OCNoticeBLL();
            model.UserID = user.UserID;
            model.EndDate = DateTime.Now.AddDays(30);
            return noticeBLL.Notice_ADD(model);


        }

        [WebMethod]
        public static int GetUserSpace()
        {
            return Convert.ToInt32(Browse.UserSpace);
        }

        //删除通知
        [WebMethod]
        public static bool Notice_Del(int NoticeID)
        {
            IES.JW.Model.User user = IES.Service.UserService.CurrentUser;
            OCNotice model = new OCNotice();
            model.NoticeID = NoticeID;
            model.UserID = user.UserID;
            OCNoticeBLL noticeBLL = new OCNoticeBLL();
            return noticeBLL.Notice_Del(model);
        }

    }
}