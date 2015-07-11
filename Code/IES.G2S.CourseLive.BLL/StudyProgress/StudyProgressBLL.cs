using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.G2S.CoursLive.IBLL.StudyProgress;
using IES.G2S.CourseLive.DAL.StudyProgress;
using IES.CC.OC.Model;
using IES.CC.Model.OC;
using IES.JW.Model;
using IES.Resource.Model;

namespace IES.G2S.CourseLive.BLL.StudyProgress
{
    public class StudyProgressBLL : IStudyProgressBLL
    {
        #region 详细信息

        public OCMooc OCMoocStudyStatusStudents_Get(int OCID)
        {
            return StudyProgressDAL.OCMoocStudyStatusStudents_Get(OCID);
        }


        /// <summary>
        ///  详细信息
        /// </summary>
        public TeachingClassStudent OCMoocStudent_StudyDesc_Get(int OCID, int UserID)
        {
            return StudyProgressDAL.OCMoocStudent_StudyDesc_Get(OCID, UserID);
        } 



        #endregion


        #region 列表

        /// <summary>
        /// 学习进度列表
        /// </summary>
        public List<OCClass> OCMoocClass_List(int OCID, string Key, int IsHistroy, int PageIndex = 1, int PageSize = 20)
        {
            return StudyProgressDAL.OCMoocClass_List(OCID, Key, IsHistroy, PageIndex, PageSize);
        }

        /// <summary>
        /// 获取Mooc中在一段时间范围内学习的人数 
        /// </summary>
        public List<OCMoocStudyStudent> OCMoocStudyStudent_List(int OCID, int Type, string Year, string Month)
        {
            return StudyProgressDAL.OCMoocStudyStudent_List(OCID, Type, Year, Month);
        }

        /// <summary>
        /// 获取Mooc班级下的学生学习进度列表 
        /// </summary>
        public List<TeachingClassStudent> OCMoocClassStudent_List(string key, int OCClassID, int Type, int LowThanRate, int PageIndex, int PageSize)
        {
            return StudyProgressDAL.OCMoocClassStudent_List(key, OCClassID, Type, LowThanRate, PageIndex, PageSize);
        }

        /// <summary>
        /// 教学进度督促
        /// </summary>
        public List<OCMoocStudyStudent> OCMoocStudents_SendMsg(int OCID, int OCClassID, int Rate, string StudentUserIDs,string Title, string Conten, int SendUserID, bool IsForMail, bool IsForSMS)
        {
            return StudyProgressDAL.OCMoocStudents_SendMsg(OCID,OCClassID,Rate,StudentUserIDs,Title,Conten, SendUserID,IsForMail,IsForSMS);

        }

        /// <summary>
        /// 获取Mooc中的学生个人各章测试结果
        /// </summary>
        public List<Chapter> OCMoocStudentChapterTest_List(int OCID, int UserID)
        {
            return StudyProgressDAL.OCMoocStudentChapterTest_List(OCID, UserID);
        }

        /// <summary>
        /// 获取Mooc中的学生个人资料学习情况
        /// </summary>
        /// <returns></returns>
        public List<OCMoocFile> OCMoocFile_StudyDesc_List(int OCID, int UserID, int ChapterID)
        {
            return StudyProgressDAL.OCMoocFile_StudyDesc_List(OCID, UserID, ChapterID);
        }
        #endregion


        #region 删除
        public void OCMoocStudent_Drop(int OCID, string UserIDs)
        {
             StudyProgressDAL.OCMoocStudent_Drop(OCID, UserIDs);
        }

        #endregion
    }
}
