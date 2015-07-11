using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using IES.CC.Model.OC;
using IES.CC.OC.Model;
using IES.G2S.CourseLive.BLL.StudyProgress;
using IES.G2S.CoursLive.IBLL.StudyProgress;
using IES.G2S.OC.BLL.Mooc;
using IES.G2S.OC.IBLL.OC;
using IES.G2S.Resource.BLL;
using IES.G2S.Resource.IBLL;
using IES.JW.Model;
using IES.Resource.Model;
using IES.Service;

namespace App.G2S.DataProvider.CourseLive.StudyProgress
{
    public partial class StudyProgressProvider : System.Web.UI.Page
    {


        #region 详细信息

        /// <summary>
        /// 获取各学习状态的学生数
        /// </summary>
        /// <param name="ChapterID"></param>
        /// <returns></returns>
        [WebMethod]
        public static OCMooc OCMoocStudyStatusStudents_Get(int OCID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            return studyprogressbll.OCMoocStudyStatusStudents_Get(OCID);
         
            //return OCMoocClassList;
        }

        /// <summary>
        /// 获取Mooc中的学生个人学习详细 
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        [WebMethod]
        public static TeachingClassStudent OCMoocStudent_StudyDesc_Get(int OCID, int UserID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            TeachingClassStudent TeachingClassStudent = studyprogressbll.OCMoocStudent_StudyDesc_Get(OCID, UserID);
            return TeachingClassStudent;
        }
        #endregion

        #region 列表信息


        /// <summary>
        /// 获取班级列表
        /// </summary>
        /// <param name="ChapterID"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<OCClass> OCMoocClass_List(int OCID, string Key, int IsHistroy, int PageIndex, int PageSize)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<OCClass> OCMoocClassList = studyprogressbll.OCMoocClass_List(OCID, Key, IsHistroy, PageIndex, PageSize);
            return OCMoocClassList;
        }


        /// <summary>
        /// 获取Mooc中在一段时间范围内学习的人数  
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<OCMoocStudyStudent> OCMoocStudyStudent_List(int OCID, int Type, string Year, string Month)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<OCMoocStudyStudent> OCMoocStudyStudentList = studyprogressbll.OCMoocStudyStudent_List(OCID, Type, Year, Month);
            return OCMoocStudyStudentList;
        }

        /// <summary>
        /// 获取Mooc班级下的学生学习进度列表    
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static List<TeachingClassStudent> OCMoocClassStudent_List(string key, int OCClassID, int Type, int LowThanRate, int PageIndex, int PageSize)
        {
            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<TeachingClassStudent> OCMoocClassStudentList = studyprogressbll.OCMoocClassStudent_List(key, OCClassID, Type, LowThanRate, PageIndex, PageSize);
            return OCMoocClassStudentList;
        }


        /// <summary>
        /// 获取Mooc中的学生个人章节学习进度 
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="Type"></param>
        /// <returns></returns>
        [WebMethod]
        public static List<Chapter> OCMoocChapter_StudyRate_List(int OCID, int UserID, int Type)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IMOOCBLL moocbll = new MOOCBLL();
            List<Chapter> ChapterList = moocbll.OCMoocChapter_StudyRate_List(OCID, UserID, Type);
            return ChapterList;
        }

        /// <summary>
        /// 获取Mooc中的学生个人各章测试结果
        /// </summary>
        [WebMethod]
        public static List<Chapter> OCMoocStudentChapterTest_List(int OCID, int UserID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<Chapter> OCMoocStudentChapterTestList = studyprogressbll.OCMoocStudentChapterTest_List(OCID, UserID);
            return OCMoocStudentChapterTestList;
        }

        /// <summary>
        /// 获取Mooc中的学生个人资料学习情况
        /// </summary>
        [WebMethod]
        public static List<OCMoocFile> OCMoocFile_StudyDesc_List(int OCID, int UserID, int ChapterID)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<OCMoocFile> OCMoocFileStudyDescList = studyprogressbll.OCMoocFile_StudyDesc_List(OCID, UserID, ChapterID);
            return OCMoocFileStudyDescList;
        }

        /// <summary>
        /// 章节列表
        /// </summary>
        /// <param name="OCID"></param>
        [WebMethod]
        public static List<Chapter> Chapter_List(int OCID)
        {
            IMOOCBLL moocbll = new MOOCBLL();
            return moocbll.Chapter_List(OCID);
        } 
        #endregion


        /// <summary>
        /// 教学进度督促
        /// </summary>
        [WebMethod]
        public static List<OCMoocStudyStudent> OCMoocStudents_SendMsg(int OCID, int OCClassID, string StudentUserIDs)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            int SendUserID = UserService.CurrentUser.UserID;
            string Title = "MOOC学习";
            string Conten = "你的MOOC学习进度较慢，请加紧学习！";
            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<OCMoocStudyStudent> OCMoocStudents_SendMsg = studyprogressbll.OCMoocStudents_SendMsg(OCID, OCClassID, -1, StudentUserIDs, Title, Conten, SendUserID, false, false);
            return OCMoocStudents_SendMsg;
        }

        /// <summary>
        /// 批量教学进度督促
        /// </summary>
        [WebMethod]
        public static List<OCMoocStudyStudent> OCMoocStudents_SendMsg_Batch(int OCID, int OCClassID, int Rate, string StudentUserIDs, string Title, string Conten, bool IsForMail, bool IsForSMS)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return null;
            }

            int SendUserID = UserService.CurrentUser.UserID;

            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            List<OCMoocStudyStudent> OCMoocStudents_SendMsg = studyprogressbll.OCMoocStudents_SendMsg(OCID, OCClassID, Rate, StudentUserIDs, Title, Conten, SendUserID, IsForMail, IsForSMS);
            return OCMoocStudents_SendMsg;
        }

        /// <summary>
        /// 发送Email
        /// </summary>
        [WebMethod]
        public static void OCMoocStudents_SendEmail(List<OCMoocStudyStudent> OCMoocStudyStudentList, string Title, string Conten)
        {

        }


        #region 删除

        /// <summary>
        /// 学生退课
        /// </summary>
        [WebMethod]
        public static void OCMoocStudent_Drop(int OCID, string UserIDs)
        {
            if (!UserService.OC_IsRole(OCID))
            {
                return;
            }


            IStudyProgressBLL studyprogressbll = new StudyProgressBLL();
            studyprogressbll.OCMoocStudent_Drop(OCID, UserIDs);
        }
        #endregion
    }
}