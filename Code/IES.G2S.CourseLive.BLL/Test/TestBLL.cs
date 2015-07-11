using IES.CC.Test.Model;
using IES.G2S.CourseLive.DAL.Test;
using IES.G2S.CoursLive.IBLL.Test;
using IES.Resource.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.Model.Test;
using IES.G2S.Resource.DAL;

namespace IES.G2S.CourseLive.BLL.Test
{
    public class TestBLL : ITestBLL
    {

        #region 教师端批阅相关列表

        /// <summary>
        /// 获取待批阅的作业列表（未评阅作业） 
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public List<TestUser> TestUser_NotCheck_List(int OCID, int UserID)
        {
            return TestDAL.TestUser_NotCheck_List(OCID, UserID);
        }

        /// <summary>
        /// 作业列表
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="UserID"></param>
        /// <param name="OCID"></param>
        /// <param name="Type"></param>
        /// <param name="IsSend"></param>
        /// <param name="UpdateTime"></param>
        /// <param name="PageSize"></param>
        /// <param name="PageIndex"></param>
        /// <returns></returns>
        public TestInfo TestInfo_List(string Name, int UserID, int OCID, int Type, int IsSend, string UpdateTime, int PageSize, int PageIndex)
        {
            return TestDAL.TestInfo_List(Name, UserID, OCID, Type, IsSend, UpdateTime, PageSize, PageIndex);
        }




        #endregion

        /// <summary>
        /// 教学班学生列表
        /// </summary>
        /// <param name="TeachingClassID"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public List<IES.CC.OC.Model.OCClassStudent> TeachingClassStudent_List(int TeachingClassID, int PageIndex, int PageSize)
        {
            return TestDAL.TeachingClassStudent_List(TeachingClassID, PageIndex, PageSize);
        }

        #region 详细信息

        /// <summary>
        /// 单个测试详细信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public CC.Test.Model.Test Test_Get(int TestID)
        {
            if (TestID == 0)
            {
                return new CC.Test.Model.Test();
            }
            else
            {
                return TestDAL.Test_Get(TestID);
            }
        }


        /// <summary>
        ///  获取试卷的详细信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <returns></returns>
        public PaperInfo PaperInfo_Get(int PaperID, int TestID, int UserID)
        {
            return TestDAL.PaperInfo_Get(PaperID, TestID, UserID);
        }
        /// <summary>
        /// 获取答题卡试卷的结构信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <returns></returns>
        public PaperCardInfo PaperCardInfo_Get(int PaperID)
        {
            return TestDAL.PaperCardInfo_Get(PaperID);
        }
        /// <summary>
        /// 获取预览试卷的结构信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <param name="ExerciseIDs"></param>
        /// <returns></returns>
        public PaperInfo PaperInfo_Get(int PaperID, string ExerciseIDs)
        {
            return TestDAL.PaperInfo_Get(PaperID, ExerciseIDs);
        }

        /// <summary>
        /// 获取作业的学生答案信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="CheckUserID"></param>
        /// <returns></returns>
        public ExerciseAnswerInfo TestAnswer_Get(int TestID, int UserID, int CheckUserID)
        {
            return TestDAL.TestAnswer_Get(TestID, UserID, CheckUserID);
        }

        #endregion

        #region 新增_编辑

        /// <summary>
        /// 添加或更新测试
        /// </summary>
        /// <param name="Test"></param>
        /// <returns></returns>
        public int Test_Add_Update(CC.Test.Model.Test Test)
        {
            if (Test.TestID == 0)
            {
                return TestDAL.Test_Add(Test);
            }
            else
            {
                return TestDAL.Test_Update(Test);
            }
        }

        /// <summary>
        /// 复制一份作业
        /// </summary>
        /// <param name="test"></param>
        /// <returns></returns>
        public int Test_Copy(IES.CC.Test.Model.Test test)
        {
            return TestDAL.Test_Copy(test);
        }

        /// <summary>
        /// 添加测试对象
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="OCID"></param>
        /// <param name="IDS"></param>
        public void TestObject_Add(int TestID, int OCID, string IDS)
        {
            TestDAL.TestObject_Add(TestID, OCID, IDS);
        }

        /// <summary>
        /// 线下作业
        /// </summary>
        /// <param name="TestID">测试id</param>
        /// <param name="PaperName">试卷名称</param>
        /// <param name="OCID"></param>
        /// <param name="UserID">创建人id</param>
        /// <param name="content">内容</param>
        /// <param name="answer">答案</param>
        /// <returns></returns>
        public int Paper_OfflineTest_Edit(int TestID, string PaperName, int OCID, int UserID, string content, string answer, int PaperID)
        {
            ExerciseInfo model = new ExerciseInfo();
            ExerciseCommon exerciseCommon = new ExerciseCommon();
            Exercise exercise = new Exercise();
            PaperGroup pg = new PaperGroup();

            exercise.ExerciseID = 0;
            exercise.OCID = OCID;
            exercise.CourseID = 0;
            exercise.OwnerUserID = UserID;
            exercise.CreateUserID = UserID;
            exercise.ExerciseType = 10;
            exercise.ExerciseTypeName = "问答题";
            exercise.Scope = 0;
            exercise.Diffcult = 0;
            exercise.ShareRange = 0;
            exercise.Keys = "";
            exercise.Kens = "";
            exercise.Conten = content;
            exercise.Analysis = "";
            exercise.Answer = answer;
            exercise.ScorePoint = "";
            exercise.ParentID = 0;

            exerciseCommon.ExerciseType = 10;
            exerciseCommon.ExerciseID = 0;
            exerciseCommon.exercise = exercise;

            model.exercisecommon = exerciseCommon;

            pg.GroupID = 0;
            pg.PaperID = PaperID;
            pg.GroupName = "第1部分";
            pg.Orde = 1;
            pg.Brief = "";
            pg.Timelimit = 0;


            int ExerciseID = Exercise_Writing_M_Edit(model);  //线下作业，添加一个简答题。
            int PaperGroupID = PaperDAL.PaperGroup_ADD(pg);   //试卷添加分组。
            PaperDAL.PaperExercise_ADD(PaperID, PaperGroupID, ExerciseID, 100, 1,0);   //习题添加到试卷
            return TestDAL.Paper_OfflineTest_Edit(TestID, PaperName, OCID, UserID, content, answer, PaperID);
        }

        /// <summary>
        /// 问答题、写作题信息维护(线下作业添加为简答题)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int Exercise_Writing_M_Edit(ExerciseInfo model)
        {
            return TestDAL.Exercise_Writing_M_Edit(model);
        }

        /// <summary>
        /// 测试与试卷绑定
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="PaperID"></param>
        public void TestPaper_Edit(int TestID, int PaperID)
        {
            TestDAL.TestPaper_Edit(TestID, PaperID);
        }


        #endregion

        public List<TestObject> TestObject_List(int TestID)
        {
            List<TestObject> list = TestDAL.TestObject_List(TestID);
            return list;
        }


        public TestInfo _TestStatus_List(int TestID)
        {
            return TestDAL._TestStatus_List(TestID);
        }
        /// <summary>
        /// 用户是否有权限查看测试的内容
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="CheckUserID"></param>
        /// <param name="ret"></param>
        /// <returns></returns>
        public int Test_CanSeeTest(int UserID, int TestID, int CheckUserID, int ret)
        {
            return TestDAL.Test_CanSeeTest(UserID, TestID, CheckUserID, ret);
        }

        #region  删除

        /// <summary>
        /// 删除一次作业
        /// </summary>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public bool Test_Del(int TestID, int UserID)
        {
            return TestDAL.Test_Del(TestID, UserID);
        }





        #endregion

        #region 状态 更新


        /// <summary>
        /// 定时保存学生的答案信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="Answer"></param>
        public void TestTempSave_Upd(int TestID, int UserID, string Answer)
        {
            TestDAL.TestTempSave_Upd(TestID, UserID, Answer);
        }

        /// <summary>
        /// 测试提交,更新提交状态 
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        public void Test_Submit(int TestID, int UserID)
        {
            TestDAL.Test_Submit(TestID, UserID);
        }

        //作业设为历史
        public void Test_IsHistroy_Upd(int TestID)
        {
            TestDAL.Test_IsHistroy_Upd(TestID);
        }

        #endregion

        #region  学生端相关列表

        /// <summary>
        /// 学生端已经提交的作业列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public _TestSubmitInfo TestInfo_Sumbit_List(int OCID, int UserID, int PageIndex = 1, int PageSize = 20)
        {
            return TestDAL.TestInfo_Sumbit_List(OCID, UserID, PageIndex, PageSize);
        }
        /// <summary>
        /// 学生端未提交的作业列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public List<IES.CC.Test.Model.Test> Test_NotSumbit_List(int OCID, int UserID)
        {
            return TestDAL.Test_NotSumbit_List(OCID, UserID);
        }

        /// <summary>
        /// 获取学生互评列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public List<IES.CC.Test.Model.TestUser> TestUser_StudentCheck_List(int OCID, int UserID, int IsFinish, int PageIndex, int PageSize)
        {
            return TestDAL.TestUser_StudentCheck_List(OCID, UserID, IsFinish, PageIndex, PageSize);
        }

        /// <summary>
        /// 获取范本作业列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="SearchKey"></param>
        /// <returns></returns>
        public List<IES.CC.Test.Model.TestUser> TestUser_SampleTest_List(int TestID, int UserID, string SearchKey)
        {
            return TestDAL.TestUser_SampleTest_List(TestID, UserID, SearchKey);
        }

        /// <summary>
        /// 获取作业的学生提交名单列表
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="CheckUserID"></param>
        /// <returns></returns>
        public List<IES.Resource.Model.ResourceTestUser> TestUser_SubmitStudent_List(int TestID, int CheckUserID)
        {
            return TestDAL.TestUser_SubmitStudent_List(TestID, CheckUserID);
        }
        /// <summary>
        /// 获取作业的学生答案信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="CheckUserID"></param>
        /// <returns></returns>
        public ExerciseAnswerInfo TestAnswerInfo_Student_Get(int TestID, int UserID, int CheckUserID)
        {
            return TestDAL.TestAnswerInfo_Student_Get(TestID, UserID, CheckUserID);
        }
        /// <summary>
        /// 获取评语列表
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="LoginUserID"></param>
        /// <param name="StudentUserID"></param>
        /// <param name="ExerciseID"></param>
        /// <returns></returns>
        public List<TestComment> Test_Comment_list(int TestID, int LoginUserID, int StudentUserID, int ExerciseID)
        {
            return TestDAL.Test_Comment_list(TestID, LoginUserID, StudentUserID, ExerciseID);
        }

        /// <summary>
        /// 添加总评价及评语
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="CheckUserID"></param>
        /// <param name="Evaluate"></param>
        /// <param name="Comment"></param>
        public void TestUser_Comment_Upd(int TestID, int UserID, int CheckUserID, int Evaluate, string Comment)
        {
            TestDAL.TestUser_Comment_Upd(TestID, UserID, CheckUserID, Evaluate, Comment);
        }
        /// <summary>
        /// 习题打分
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="ExerciseID"></param>
        /// <param name="Score"></param>
        public void TestAnswer_Score_Upd(int TestID, int UserID, int ExerciseID, string Score, int LoginUserID)
        {
            TestDAL.TestAnswer_Score_Upd(TestID, UserID, ExerciseID, Score, LoginUserID);
        }
        /// <summary>
        /// 习题添加评语
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="ExerciseID"></param>
        /// <param name="Comment"></param>
        public void TestAnswer_Comment_Upd(int TestID, int UserID, int ExerciseID, string Comment, int LoginUserID)
        {
            TestDAL.TestAnswer_Comment_Upd(TestID, UserID, ExerciseID, Comment, LoginUserID);
        }
        /// <summary>
        /// 更新学生批阅状态
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="Status"></param>
        public void TestUser_Status_Upd(int UserID, int TestID, int Status, int LoginUserID)
        {
            TestDAL.TestUser_Status_Upd(UserID, TestID, Status, LoginUserID);
        }
        /// <summary>
        /// 更新学生的作业设置为示范作业
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        public void TestUser_IsSample_Upd(int UserID, int TestID)
        {
            TestDAL.TestUser_IsSample_Upd(UserID, TestID);
        }

        #endregion

        #region 提醒数字

        /// <summary>
        /// 获取学生需要互评的作业数量
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public int TestUser_StudentCheckCount_Get(int OCID, int UserID)
        {
            return TestDAL.TestUser_StudentCheckCount_Get(OCID, UserID);
        }

        #endregion


        #region 移动端
        public List<IES.CC.Test.Model.Test> App_Test_NotSumbit_List(int UserID, int OCID)
        {
            return TestDAL.App_Test_NotSumbit_List(UserID, OCID);
        }
        public List<IES.CC.Test.Model.Test> App_TestInfo_Sumbit_List(int UserID, int OCID)
        {
            return TestDAL.App_TestInfo_Sumbit_List(UserID, OCID);
        }
        public bool App_OCAffairs_Add(IES.CC.Test.Model.Test model, string Reson)
        {
            return TestDAL.App_OCAffairs_Add(model, Reson);
        }
        #endregion

    }
}
