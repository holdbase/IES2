using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.Model.OC;
using IES.CC.OC.Model;
using IES.Resource.Model;

namespace IES.G2S.CoursLive.IBLL.StudyProgress
{
    public interface IStudyProgressBLL
    {

        #region 详细信息

        /// <summary>
        /// 学生进度占比
        /// </summary>
        /// <param name="OCID"></param>
        /// <returns></returns>
        OCMooc OCMoocStudyStatusStudents_Get(int OCID);

        JW.Model.TeachingClassStudent OCMoocStudent_StudyDesc_Get(int OCID, int UserID);
        #endregion

        #region 列表
        /// <summary>
        /// 学习进度班级状况列表列表
        /// </summary>
        /// <returns></returns>
        List<OCClass> OCMoocClass_List(int OCID, string Key, int IsHistroy, int PageIndex, int PageSize);


        /// <summary>
        /// 获取Mooc中在一段时间范围内学习的人数 
        /// </summary>
        /// <param name="OCID">课程ID</param>
        /// <param name="Type">1本周 2上周 3本月 4最近30天 5任意月</param>
        /// <param name="Year">年</param>
        /// <param name="Month">月</param>
        /// <returns></returns>
        List<OCMoocStudyStudent> OCMoocStudyStudent_List(int OCID, int Type, string Year, string Month);


        /// <summary>
        /// 获取Mooc班级下的学生学习进度列表
        /// </summary>
        /// <param name="key">关键词</param>
        /// <param name="Type">0:没有学习, 1:低于计划, 2:高于计划, 3:进度低于百分之多少, -1:全部  </param>
        /// <param name="LowThanRate">进度低于百分之多少 (适用于@Type=3)   </param>
        /// <returns></returns>
        List<JW.Model.TeachingClassStudent> OCMoocClassStudent_List(string key, int OCClassID, int Type, int LowThanRate, int PageIndex, int PageSize);



        /// <summary>
        /// 教学进度督促
        /// </summary>
        /// <param name="Rate">进度百分比</param>
        /// <param name="StudentUserIDs"></param>
        /// <param name="JoinType">教学班招生类型</param>
        /// <param name="Title">督促主题</param>
        /// <param name="Conten">督促内容</param>
        /// <param name="SendUserID">发送者ID</param>
        /// <param name="IsForMail">同时发送邮件</param>
        /// <param name="IsForSMS">同时发送消息</param>
        /// <returns></returns>
        List<OCMoocStudyStudent> OCMoocStudents_SendMsg(int OCID, int OCClassID, int Rate, string StudentUserIDs, string Title, string Conten, int SendUserID, bool IsForMail, bool IsForSMS);
        #endregion


        /// <summary>
        /// 获取Mooc中的学生个人各章测试结果
        /// </summary>
        /// <param name="OCID"></param>        
        /// <param name="UserID"></param>
        /// <returns></returns>
        List<Chapter> OCMoocStudentChapterTest_List(int OCID, int UserID);

        /// <summary>
        /// 获取Mooc中的学生个人资料学习情况
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="ChapterID"></param>
        /// <returns></returns>
        List<OCMoocFile> OCMoocFile_StudyDesc_List(int OCID, int UserID, int ChapterID);

        #region 

        /// <summary>
        /// 学生退课
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserIDs"></param>
        void OCMoocStudent_Drop(int OCID, string UserIDs); 
        #endregion

     
    }
}
