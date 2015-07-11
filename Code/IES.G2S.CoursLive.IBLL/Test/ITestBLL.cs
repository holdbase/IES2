using IES.CC.Test.Model;
using IES.Resource.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IES.G2S.CoursLive.IBLL.Test
{
   public interface ITestBLL
    {
       System.Collections.Generic.List<TestUser> TestUser_NotCheck_List(int OCID, int UserID);

       TestInfo TestInfo_List(string Name,int UserID, int OCID, int Type, int IsSend, string UpdateTime, int PageSize, int PageIndex);

       List<IES.CC.OC.Model.OCClassStudent> TeachingClassStudent_List(int TeachingClassID, int PageIndex, int PageSize);

       CC.Test.Model.Test Test_Get(int TestID);

       int Test_Add_Update(CC.Test.Model.Test Test);

       void TestObject_Add(int TestID, int OCID, string IDS);

       int Paper_OfflineTest_Edit(int TestID, string PaperName, int OCID, int UserID, string content, string answer,int PaperID);

       PaperInfo PaperInfo_Get(int PaperID, int TestID, int UserID);

       PaperInfo PaperInfo_Get(int PaperID, string ExerciseIDs);

       ExerciseAnswerInfo TestAnswer_Get(int TestID, int UserID, int CheckUserID);

       void TestPaper_Edit(int TestID, int PaperID);
       /// <summary>
       /// 定时保存学生的答案信息
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="UserID"></param>
       /// <param name="Answer"></param>
       void TestTempSave_Upd(int TestID, int UserID, string Answer);

       List<TestObject> TestObject_List(int TestID);

       /// <summary>
        /// 获取作业的学生考试的状态  
        /// 作业的学生成绩分布情况
        /// xw
        /// </summary>
        /// <param name="TestID"></param>
        /// <returns></returns>
       TestInfo _TestStatus_List(int TestID);
       /// <summary>
       /// 测试提交,更新提交状态
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="UserID"></param>
       void Test_Submit(int TestID, int UserID);
       /// <summary>
       /// 获取作业的学生提交名单列表
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="CheckUserID"></param>
       /// <returns></returns>
       List<IES.Resource.Model.ResourceTestUser> TestUser_SubmitStudent_List(int TestID, int CheckUserID);
       /// <summary>
       /// 添加总评价及评语
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="UserID"></param>
       /// <param name="CheckUserID"></param>
       /// <param name="Evaluate"></param>
       /// <param name="Comment"></param>
       void TestUser_Comment_Upd(int TestID, int UserID, int CheckUserID, int Evaluate, string Comment);
       /// <summary>
       /// 习题打分
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="UserID"></param>
       /// <param name="ExerciseID"></param>
       /// <param name="Score"></param>
       void TestAnswer_Score_Upd(int TestID, int UserID, int ExerciseID, string Score, int LoginUserID);
       /// <summary>
       /// 习题添加评语
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="UserID"></param>
       /// <param name="ExerciseID"></param>
       /// <param name="Comment"></param>
       void TestAnswer_Comment_Upd(int TestID, int UserID, int ExerciseID, string Comment, int LoginUserID);
       /// <summary>
       /// 更新学生批阅状态
       /// </summary>
       /// <param name="UserID"></param>
       /// <param name="TestID"></param>
       /// <param name="Status"></param>
       void TestUser_Status_Upd(int UserID, int TestID, int Status, int LoginUserID);
       /// <summary>
       /// 更新学生的作业设置为示范作业
       /// </summary>
       /// <param name="UserID"></param>
       /// <param name="TestID"></param>
       void TestUser_IsSample_Upd(int UserID, int TestID);
       /// <summary>
       /// 获取答题卡试卷的结构信息
       /// </summary>
       /// <param name="PaperID"></param>
       /// <returns></returns>
       PaperCardInfo PaperCardInfo_Get(int PaperID);
       /// <summary>
       /// 用户是否有权限查看测试的内容
       /// </summary>
       /// <param name="UserID"></param>
       /// <param name="TestID"></param>
       /// <param name="CheckUserID"></param>
       /// <param name="ret"></param>
       /// <returns></returns>
       int Test_CanSeeTest(int UserID, int TestID, int CheckUserID, int ret);

       //作业设为历史
       void Test_IsHistroy_Upd(int TestID);
       /// <summary>
       /// 获取作业的学生答案信息
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="UserID"></param>
       /// <param name="CheckUserID"></param>
       /// <returns></returns>
       ExerciseAnswerInfo TestAnswerInfo_Student_Get(int TestID, int UserID, int CheckUserID);
       /// <summary>
       /// 获取评语列表
       /// </summary>
       /// <param name="TestID"></param>
       /// <param name="LoginUserID"></param>
       /// <param name="StudentUserID"></param>
       /// <param name="ExerciseID"></param>
       /// <returns></returns>
       List<IES.CC.Model.Test.TestComment> Test_Comment_list(int TestID, int LoginUserID, int StudentUserID, int ExerciseID);
    }
}
