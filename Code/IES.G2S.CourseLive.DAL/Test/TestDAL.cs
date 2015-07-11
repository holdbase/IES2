using Dapper;
using IES.CC.OC.Model;
using IES.CC.Test.Model;
using IES.DataBase;
using IES.Resource.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.CC.Model.Test;

namespace IES.G2S.CourseLive.DAL.Test
{
    public class TestDAL
    {
        #region  列表
        /// <summary>
        /// 获取待批阅的作业列表（未评阅作业）
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static List<TestUser> TestUser_NotCheck_List(int OCID, int UserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@OCID", OCID);
                p.Add("@UserID", UserID);
                return conn.Query<TestUser>("TestUser_NotCheck_List", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        /// <summary>
        /// 获取作业列表
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="OCID"></param>
        /// <param name="Type"></param>
        /// <param name="IsSend"></param>
        /// <param name="UpdateTime"></param>
        /// <param name="PageSize"></param>
        /// <param name="PageIndex"></param>
        /// <returns></returns>
        public static IES.CC.Test.Model.TestInfo TestInfo_List(string Name, int UserID, int OCID, int Type, int IsSend, string UpdateTime, int PageSize, int PageIndex)
        {
            using (var conn = DbHelper.CCService())
            {
                TestInfo ti = new TestInfo();
                var p = new DynamicParameters();
                p.Add("@Name", Name);
                p.Add("@UserID", UserID);
                p.Add("@OCID", OCID);
                p.Add("@Type", Type);
                p.Add("@IsSend", IsSend);
                p.Add("@UpdateTime", UpdateTime);
                p.Add("@PageSize", PageSize);
                p.Add("@PageIndex", PageIndex);
                //return conn.Query<IES.CC.Test.Model.TestInfo>("TestInfo_List", p, commandType: CommandType.StoredProcedure).ToList();
                var testinfo = conn.QueryMultiple("TestInfo_List", p, commandType: CommandType.StoredProcedure);
                ti.test = testinfo.Read<IES.CC.Test.Model.Test>().ToList();
                ti._teststatuslist = testinfo.Read<_TestStatus>().ToList();
                ti._testScoreStatisticslist = testinfo.Read<_TestScoreStatistics>().ToList();
                return ti;

            }
        }

        /// <summary>
        /// 获取教学班学生
        /// </summary>
        /// <param name="TeachingClassID">教学班id</param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<OCClassStudent> TeachingClassStudent_List(int TeachingClassID, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.JWService())
                {
                    List<OCClassStudent> ul = new List<OCClassStudent>();
                    var p = new DynamicParameters();
                    p.Add("@TeachingClassID", TeachingClassID);
                    p.Add("@PageSize", PageSize);
                    p.Add("@PageIndex", PageIndex);
                    ul = conn.Query<OCClassStudent>("TeachingClassStudent_List", p, commandType: CommandType.StoredProcedure).ToList();
                    return ul;

                }
            }
            catch (Exception ee)
            {
                return null;
            }
        }

        /// <summary>
        /// 获取测试详细信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public static IES.CC.Test.Model.Test Test_Get(int TestID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    return conn.Query<IES.CC.Test.Model.Test>("Test_Get", p, commandType: CommandType.StoredProcedure).Single();
                }
            }
            catch (Exception ee)
            {
                return new CC.Test.Model.Test();
            }
        }


        //获取试卷的详细信息
        /// <summary>
        /// 获取试卷的详细信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <returns></returns>
        public static PaperInfo PaperInfo_Get(int PaperID)
        {
            using (var conn = DbHelper.CommonService())
            {
                PaperInfo pi = new PaperInfo();
                var p = new DynamicParameters();
                p.Add("@PaperID", PaperID);
                var paperinfo = conn.QueryMultiple("PaperInfo_Get", p, commandType: CommandType.StoredProcedure);
                List<Paper> paper = paperinfo.Read<Paper>().ToList();
                if (paper != null && paper.Count > 0)
                {
                    pi.paper = paper[0];
                }
                pi.papergrouplist = paperinfo.Read<PaperGroup>().ToList();
                pi.attachmentlist = paperinfo.Read<Attachment>().ToList();
                pi.exerciselist = paperinfo.Read<PaperExercise>().ToList();
                pi.ExerciseChoices = paperinfo.Read<ExerciseChoice>().ToList();
                pi.ExerciseAttachmentlist = paperinfo.Read<Attachment>().ToList();
                return pi;
            }
        }

        /// <summary>
        /// 获取学生的考试用的试卷详细信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static PaperInfo PaperInfo_Get(int PaperID, int TestID, int UserID)
        {
            using (var conn = DbHelper.CommonService())
            {
                PaperInfo pi = PaperInfo_Get(PaperID);
                PaperInfo pi_rand = new PaperInfo();

                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@PaperID", PaperID);
                p.Add("@UserID", UserID);
                var paperinfo = conn.QueryMultiple("TestTacticExercise_Get", p, commandType: CommandType.StoredProcedure);

                pi_rand.exerciselist = paperinfo.Read<PaperExercise>().ToList();
                pi_rand.ExerciseChoices = paperinfo.Read<ExerciseChoice>().ToList();
                pi_rand.ExerciseAttachmentlist = paperinfo.Read<Attachment>().ToList();


                if (pi.exerciselist.Count > 0)
                {
                    // pi.exerciselist.Concat(pi_rand.exerciselist);
                    if (pi_rand.exerciselist.Count > 0)
                    {
                        if (pi.paper != null)
                        {
                            pi.paper.IsTactic = 1;
                        }


                        for (int i = 0; i < pi_rand.exerciselist.Count; i++)
                        {
                            pi.exerciselist.Add(pi_rand.exerciselist[i]);
                        }

                        //for (int i = 0; i < pi.exerciselist.Count; i++)
                        //{
                        //    pi_rand.exerciselist.Add(pi.exerciselist[i]);
                        //}
                        //pi.exerciselist = pi_rand.exerciselist;
                    }
                }
                else
                {
                    if (pi_rand.exerciselist.Count > 0)
                    {
                        if (pi.paper != null)
                        {
                            pi.paper.IsTactic = 1;
                        }
                    }

                    pi.exerciselist = pi_rand.exerciselist;
                }
                if (pi.ExerciseChoices.Count > 0)
                {
                    // pi.ExerciseChoices.Concat(pi_rand.ExerciseChoices);
                    if (pi_rand.ExerciseChoices.Count > 0)
                    {
                        for (int i = 0; i < pi_rand.ExerciseChoices.Count; i++)
                        {
                            pi.ExerciseChoices.Add(pi_rand.ExerciseChoices[i]);
                        }
                    }

                }
                else
                {
                    pi.ExerciseChoices = pi_rand.ExerciseChoices;
                }
                if (pi.ExerciseAttachmentlist.Count > 0)
                {
                    //pi.ExerciseAttachmentlist.Concat(pi_rand.ExerciseAttachmentlist);
                    if (pi_rand.ExerciseAttachmentlist.Count > 0)
                    {
                        for (int i = 0; i < pi_rand.ExerciseAttachmentlist.Count; i++)
                        {
                            pi.ExerciseAttachmentlist.Add(pi_rand.ExerciseAttachmentlist[i]);
                        }
                    }
                }
                else
                {
                    pi.ExerciseAttachmentlist = pi_rand.ExerciseAttachmentlist;
                }

                if (pi.exerciselist.Count > 0)
                {  
                    int flag=0;
                    for (int i = 0; i < pi.exerciselist.Count; i++)
                    {
                        if (pi.exerciselist[i].ParentExerciseID == 0) {
                            flag++;
                            pi.exerciselist[i].Orde = flag;
                            pi.exerciselist[i].OrdeIsShow =true;
                        }
                        else if (pi.exerciselist[i].ParentExerciseID ==-1)
                        {
                            int fcount =0;
                            List<PaperExercise> pkkk = pi.exerciselist.Where(x => x.ParentExerciseID == pi.exerciselist[i].ExerciseID).ToList();
                            for (int k = 0; k < pkkk.Count; k++)
                            {
                                if (pkkk[k].ParentExerciseID == pi.exerciselist[i].ExerciseID)
                                {
                                    fcount = k + 1;

                                    pkkk[k].Orde = flag + fcount;
                                    pkkk[k].OrdeIsShow = true;
                                }
                            }

                            flag = flag + pkkk.Count;



                            
                           
                        }
                           
                    }
                }





                return pi;
            }
        }
        /// <summary>
        /// 获取当前id所在的分组
        /// </summary>
        /// <param name="pi"></param>
        /// <param name="ParentExerciseID"></param>
        /// <returns></returns>
        private  static int ExerciselistByOrde(List<PaperExercise> pi, int ParentExerciseID) {
            int fcount = pi.Where(x => x.ParentExerciseID == ParentExerciseID).Count();
            if (fcount > 1) {
                List<PaperExercise> pkkk = pi.Where(x => x.ParentExerciseID == ParentExerciseID).ToList();
                for (int i = 0; i < pkkk.Count; i++)
                {
                    if (pkkk[i].ParentExerciseID == ParentExerciseID) {
                        fcount = i + 1;
                    } 
                }
            }
            return fcount;
        }

        /// <summary>
        /// 获取预览用的试卷详细信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static PaperInfo PaperInfo_Get(int PaperID, string ExerciseIDs)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    PaperInfo pi = new PaperInfo();
                    var p = new DynamicParameters();
                    p.Add("@PaperID", PaperID);
                    p.Add("@ExerciseIDS", ExerciseIDs);
                    var paperinfo = conn.QueryMultiple("PaperInfo_Get", p, commandType: CommandType.StoredProcedure);

                    List<Paper> paper = paperinfo.Read<Paper>().ToList();
                    if (paper != null && paper.Count > 0)
                    {
                        pi.paper = paper[0];
                    }
                    pi.papergrouplist = paperinfo.Read<PaperGroup>().ToList();
                    pi.attachmentlist = paperinfo.Read<Attachment>().ToList();
                    pi.exerciselist = paperinfo.Read<PaperExercise>().ToList();
                    pi.ExerciseChoices = paperinfo.Read<ExerciseChoice>().ToList();
                    pi.ExerciseAttachmentlist = paperinfo.Read<Attachment>().ToList();
                    return pi;
                }

            }
            catch (Exception e)
            {
                PaperInfo pi = new PaperInfo();
                Paper paper = new Paper();
                paper.Papername = e.Message;
                pi.paper = paper;
                return pi;
                throw;
            }
        }




        /// <summary>
        /// 获取作业的学生答案信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="CheckUserID"></param>
        /// <returns></returns>
        public static ExerciseAnswerInfo TestAnswer_Get(int TestID, int UserID, int CheckUserID)
        {
            using (var conn = DbHelper.CCService())
            {
                ExerciseAnswerInfo ExerciseAnswerInfos = new ExerciseAnswerInfo();
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@CheckUserID", CheckUserID);
                var testAnswer = conn.QueryMultiple("TestAnswerInfo_Get", p, commandType: CommandType.StoredProcedure);
                List<ExerciseAnswerUser> UseTime = testAnswer.Read<ExerciseAnswerUser>().ToList();
                ExerciseAnswerInfos.ExerciseAnswers = testAnswer.Read<ExerciseAnswer>().ToList();
                List<IES.Resource.Model.ResourceTestUser> TestUsers = testAnswer.Read<IES.Resource.Model.ResourceTestUser>().ToList();


                if (UseTime != null && UseTime.Count > 0)
                {
                    ExerciseAnswerInfos.ExerciseAnswerUsers = UseTime[0];
                }
                if (TestUsers != null && TestUsers.Count > 0)
                {
                    ExerciseAnswerInfos.TestUsers = TestUsers[0];
                }
                else
                {
                    ExerciseAnswerInfos.TestUsers = new IES.Resource.Model.ResourceTestUser();
                }
                return ExerciseAnswerInfos;
                //return conn.Query<ExerciseAnswer>("TestAnswer_Get", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        /// <summary>
        /// 获取作业的学生提交名单列表
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="CheckUserID"></param>
        /// <returns></returns>
        public static List<IES.Resource.Model.ResourceTestUser> TestUser_SubmitStudent_List(int TestID, int CheckUserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@CheckUserID", CheckUserID);
                return conn.Query<IES.Resource.Model.ResourceTestUser>("TestUser_SubmitStudent_List", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        /// <summary>
        /// 获取答题卡试卷的结构信息
        /// </summary>
        /// <param name="PaperID"></param>
        /// <returns></returns>
        public static PaperCardInfo PaperCardInfo_Get(int PaperID)
        {
            using (var conn = DbHelper.ResourceService())
            {
                PaperCardInfo papercards = new PaperCardInfo();

                var p = new DynamicParameters();
                p.Add("@PaperID", PaperID);
                var card = conn.QueryMultiple("PaperCardInfo_Get", p, commandType: CommandType.StoredProcedure);
                List<Paper> paper = card.Read<Paper>().ToList();
                papercards.papercardexerciselist = card.Read<PaperCardexercise>().ToList();
                if (paper != null && paper.Count > 0)
                {
                    papercards.paper = paper[0];
                }
                else
                {
                    papercards.paper = new Paper();
                }
                return papercards;
            }
        }

        /// <summary>
        /// 定时保存学生的答案信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="Answer"></param>
        /// <returns></returns>
        public static void TestTempSave_Upd(int TestID, int UserID, string Answer)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@Answer", Answer);
                conn.Execute("TestTempSave_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }
        /// <summary>
        /// 添加总评价及评语
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="CheckUserID"></param>
        /// <param name="Evaluate"></param>
        /// <param name="Comment"></param>
        public static void TestUser_Comment_Upd(int TestID, int UserID, int CheckUserID, int Evaluate, string Comment)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@CheckUserID", CheckUserID);
                p.Add("@Evaluate", Evaluate);
                p.Add("@Comment", Comment);
                conn.Execute("TestUser_Comment_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }
        /// <summary>
        ///  习题打分
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="ExerciseID"></param>
        /// <param name="Score"></param>
        public static void TestAnswer_Score_Upd(int TestID, int UserID, int ExerciseID, string Score, int LoginUserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@ExerciseID", ExerciseID);
                p.Add("@Score", Score);
                p.Add("@LoginUserID", LoginUserID);
                conn.Execute("TestAnswer_Score_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }
        /// <summary>
        /// 习题添加评语
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="ExerciseID"></param>
        /// <param name="Comment"></param>
        public static void TestAnswer_Comment_Upd(int TestID, int UserID, int ExerciseID, string Comment, int LoginUserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@ExerciseID", ExerciseID);
                p.Add("@Comment", Comment);
                p.Add("@LoginUserID", LoginUserID);
                conn.Execute("TestAnswer_Comment_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }
        /// <summary>
        /// 更新学生批阅状态
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="Status"></param>
        public static void TestUser_Status_Upd(int UserID, int TestID, int Status, int LoginUserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@UserID", UserID);
                p.Add("@TestID", TestID);
                p.Add("@Status", Status);
                p.Add("@LoginUserID", LoginUserID);
                conn.Execute("TestUser_Status_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }
        /// <summary>
        /// 更新学生的作业设置为示范作业
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        public static void TestUser_IsSample_Upd(int UserID, int TestID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@UserID", UserID);
                p.Add("@TestID", TestID);
                conn.Execute("TestUser_IsSample_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }

        /// <summary>
        /// 获取作业发放对象
        /// </summary>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public static List<TestObject> TestObject_List(int TestID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    return conn.Query<TestObject>("TestObject_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {
                return new List<TestObject>();
            }
        }

        /// <summary>
        /// 获取作业的学生考试的状态  
        /// 作业的学生成绩分布情况
        /// xw
        /// </summary>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public static TestInfo _TestStatus_List(int TestID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                var testinfo = conn.QueryMultiple("_TestStatus_List", p, commandType: CommandType.StoredProcedure);
                return new TestInfo()
                {
                    _teststatuslist = testinfo.Read<_TestStatus>().ToList(),
                    _testScoreStatisticslist = testinfo.Read<_TestScoreStatistics>().ToList()
                };

            }
        }

        /// <summary>
        /// 用户是否有权限查看测试的内容
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="CheckUserID"></param>
        /// <param name="ret"></param>
        /// <returns></returns>
        public static int Test_CanSeeTest(int UserID, int TestID, int CheckUserID, int ret)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@UserID", UserID);
                p.Add("@TestID", TestID);
                p.Add("@CheckUserID", CheckUserID);
                p.Add("@ret", ret, DbType.Int32, ParameterDirection.InputOutput);
                conn.Execute("Test_CanSeeTest", p, commandType: CommandType.StoredProcedure);
                return p.Get<int>("ret");
            }
        }
        /// <summary>
        /// 获取作业的学生答案信息
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <param name="CheckUserID"></param>
        /// <returns></returns>
        public static ExerciseAnswerInfo TestAnswerInfo_Student_Get(int TestID, int UserID, int CheckUserID)
        {
            using (var conn = DbHelper.CCService())
            {
                ExerciseAnswerInfo ExerciseAnswerInfos = new ExerciseAnswerInfo();
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@CheckUserID", CheckUserID);
                var testAnswer = conn.QueryMultiple("TestAnswerInfo_Student_Get", p, commandType: CommandType.StoredProcedure);
                List<ExerciseAnswerUser> UseTime = testAnswer.Read<ExerciseAnswerUser>().ToList();
                ExerciseAnswerInfos.ExerciseAnswers = testAnswer.Read<ExerciseAnswer>().ToList();
                List<IES.Resource.Model.ResourceTestUser> TestUsers = testAnswer.Read<IES.Resource.Model.ResourceTestUser>().ToList();


                if (UseTime != null && UseTime.Count > 0)
                {
                    ExerciseAnswerInfos.ExerciseAnswerUsers = UseTime[0];
                }
                if (TestUsers != null && TestUsers.Count > 0)
                {
                    ExerciseAnswerInfos.TestUsers = TestUsers[0];
                }
                else
                {
                    ExerciseAnswerInfos.TestUsers = new IES.Resource.Model.ResourceTestUser();
                }
                return ExerciseAnswerInfos;
                //return conn.Query<ExerciseAnswer>("TestAnswer_Get", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        /// <summary>
        /// 获取评语列表
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="LoginUserID"></param>
        /// <param name="StudentUserID"></param>
        /// <param name="ExerciseID"></param>
        /// <returns></returns>
        public static List<TestComment> Test_Comment_list(int TestID, int LoginUserID, int StudentUserID, int ExerciseID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@LoginUserID", LoginUserID);
                p.Add("@StudentUserID", StudentUserID);
                p.Add("@ExerciseID", ExerciseID);

                return conn.Query<TestComment>("Test_Comment_list", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        #endregion

        #region 学生端相关列表

        /// <summary>
        /// 学生端已经提交的作业列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static _TestSubmitInfo TestInfo_Sumbit_List(int OCID, int UserID, int PageIndex = 1, int PageSize = 20)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@OCID", OCID);
                p.Add("@UserID", UserID);
                p.Add("@PageIndex", PageIndex);
                p.Add("@PageSize", PageSize);
                var mult = conn.QueryMultiple("TestInfo_Sumbit_List", p, commandType: CommandType.StoredProcedure);
                return new _TestSubmitInfo()
                {
                    _testsubmitlist = mult.Read<_TestSubmit>().ToList(),
                    _testscorestatisticslist = mult.Read<_TestScoreStatistics>().ToList()
                };

            }
        }

        /// <summary>
        /// 学生未提交的测试列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static List<IES.CC.Test.Model.Test> Test_NotSumbit_List(int OCID, int UserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@OCID", OCID);
                p.Add("@UserID", UserID);
                return conn.Query<IES.CC.Test.Model.Test>("Test_NotSumbit_List", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        /// <summary>
        /// 获取需要互评的学生作业列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static List<IES.CC.Test.Model.TestUser> TestUser_StudentCheck_List(int OCID, int UserID, int IsFinish, int PageIndex, int PageSize)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@OCID", OCID);
                p.Add("@UserID", UserID);
                p.Add("@IsFinish", IsFinish);
                p.Add("@PageIndex", PageIndex);
                p.Add("@PageSize", PageSize);
                return conn.Query<IES.CC.Test.Model.TestUser>("TestUser_StudentCheck_List", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        /// <summary>
        /// 获取指定测试作业样本列表
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <param name="SearchKey"></param>
        /// <returns></returns>
        public static List<IES.CC.Test.Model.TestUser> TestUser_SampleTest_List(int TestID, int UserID, string SearchKey)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                p.Add("@SearchKey", SearchKey);
                return conn.Query<IES.CC.Test.Model.TestUser>("TestUser_SampleTest_List", p, commandType: CommandType.StoredProcedure).ToList();
            }
        }


        #endregion

        #region 新增
        public static int Test_Add(CC.Test.Model.Test Test)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", Test.TestID, DbType.Int32, ParameterDirection.InputOutput);
                    p.Add("@UserID", Test.UserID);
                    p.Add("@UserName", Test.UserName);
                    p.Add("@OCID", Test.OCID);
                    p.Add("@CourseID", Test.CourseID);
                    p.Add("@Name", Test.Name);
                    p.Add("@StartDate", Test.StartDate);
                    p.Add("@EndDate", Test.EndDate);
                    p.Add("@ChapterID", Test.ChapterID);
                    p.Add("@ChapterName", Test.ChapterName);
                    p.Add("@Type", Test.Type);
                    p.Add("@ScaleType", Test.ScaleType);
                    p.Add("@BuildMode", Test.BuildMode);
                    p.Add("@LessTimes", Test.LessTimes);
                    p.Add("@MoreTimes", Test.MoreTimes);
                    p.Add("@PassScore", Test.PassScore);
                    p.Add("@ScoreMode", Test.ScoreMode);
                    p.Add("@ScoreSource", Test.ScoreSource);
                    p.Add("@ShowResult", Test.ShowResult);
                    p.Add("@ShowExercise", Test.ShowExercise);
                    p.Add("@ExerciseShowMode", Test.ExerciseShowMode);
                    p.Add("@Delay", Test.Delay);
                    p.Add("@DelayScoreDiscount", Test.DelayScoreDiscount);
                    p.Add("@StudentCheckNum", Test.StudentCheckNum);
                    p.Add("@LostScoreDiscount", Test.LostScoreDiscount);
                    p.Add("@EndCheckTime", Test.EndCheckTime);
                    p.Add("@Brief", Test.Brief);
                    p.Add("@TimeOption", Test.TimeOption);

                    conn.Execute("Test_ADD", p, commandType: CommandType.StoredProcedure);
                    return p.Get<int>("TestID");
                }
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// 测试对象新增
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="OCID"></param>
        /// <param name="IDS"></param>
        public static void TestObject_Add(int TestID, int OCID, string IDS)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@OCID", OCID);
                    p.Add("@IDS", IDS);

                    conn.Execute("TestObject_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch
            {

            }
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
        public static int Paper_OfflineTest_Edit(int TestID, string PaperName, int OCID, int UserID, string content, string answer, int PaperID)
        {
            try
            {
                using (var conn = DbHelper.CommonService())
                {
                    var p = new DynamicParameters();
                    //p.Add("@PaperID");
                    p.Add("@PaperID", PaperID, DbType.Int32, ParameterDirection.InputOutput);
                    p.Add("@TestID", TestID);
                    p.Add("@Papername", PaperName);
                    p.Add("@OCID", OCID);
                    p.Add("@CreateUserID", UserID);
                    p.Add("@Conten", content);
                    p.Add("@Answer", answer);

                    conn.Execute("Paper_OfflineTest_Edit", p, commandType: CommandType.StoredProcedure);
                    return p.Get<int>("PaperID");
                }
            }
            catch
            {

                throw;
            }
        }


        /// <summary>
        /// 问答题、写作题信息维护(线下作业添加为简答题)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static int Exercise_Writing_M_Edit(ExerciseInfo model)
        {
            try
            {
                using (var conn = DbHelper.ResourceService())
                {
                    var p = new DynamicParameters();

                    p.Add("@ExerciseID", dbType: DbType.Int32, direction: ParameterDirection.InputOutput, value: model.exercisecommon.exercise.ExerciseID);
                    p.Add("@OCID", model.exercisecommon.exercise.OCID);
                    p.Add("@CourseID", model.exercisecommon.exercise.CourseID);
                    p.Add("@OwnerUserID", model.exercisecommon.exercise.OwnerUserID);
                    p.Add("@CreateUserID", model.exercisecommon.exercise.CreateUserID);
                    p.Add("@CreateUserName", model.exercisecommon.exercise.CreateUserName);
                    p.Add("@ExerciseType", model.exercisecommon.exercise.ExerciseType);
                    p.Add("@ExerciseTypeName", model.exercisecommon.exercise.ExerciseTypeName);
                    p.Add("@Diffcult", model.exercisecommon.exercise.Diffcult);
                    p.Add("@Scope", model.exercisecommon.exercise.Scope);
                    p.Add("@ShareRange", model.exercisecommon.exercise.ShareRange);
                    p.Add("@Keys", model.exercisecommon.exercise.Keys);
                    p.Add("@Kens", model.exercisecommon.exercise.Kens);
                    p.Add("@Conten", model.exercisecommon.exercise.Conten);
                    p.Add("@Analysis", model.exercisecommon.exercise.Analysis);
                    p.Add("@Answer", model.exercisecommon.exercise.Answer);
                    p.Add("@ScorePoint", model.exercisecommon.exercise.ScorePoint);
                    p.Add("@ParentID", model.exercisecommon.exercise.ParentID);
                    conn.Execute("Exercise_Writing_M_Edit", p, commandType: CommandType.StoredProcedure);
                    model.exercisecommon.exercise.ExerciseID = p.Get<int>("ExerciseID");
                    return model.exercisecommon.exercise.ExerciseID;
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        /// <summary>
        /// 测试与试卷信息绑定
        /// </summary>
        /// <param name="Test"></param>
        /// <returns></returns>
        public static void TestPaper_Edit(int TestID, int PaperID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@PaperID", PaperID);

                    conn.Execute("TestPaper_Edit", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch
            {

            }
        }
        #endregion

        #region 更新
        public static int Test_Update(CC.Test.Model.Test Test)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", Test.TestID);
                    p.Add("@Name", Test.Name);
                    p.Add("@StartDate", Test.StartDate);
                    p.Add("@EndDate", Test.EndDate);
                    p.Add("@ChapterID", Test.ChapterID);
                    p.Add("@ChapterName", Test.ChapterName);
                    p.Add("@ScaleType", Test.ScaleType);
                    p.Add("@BuildMode", Test.BuildMode);
                    p.Add("@LessTimes", Test.LessTimes);
                    p.Add("@MoreTimes", Test.MoreTimes);
                    p.Add("@PassScore", Test.PassScore);
                    p.Add("@ScoreMode", Test.ScoreMode);
                    p.Add("@ScoreSource", Test.ScoreSource);
                    p.Add("@ShowResult", Test.ShowResult);
                    p.Add("@ShowExercise", Test.ShowExercise);
                    p.Add("@ExerciseShowMode", Test.ExerciseShowMode);
                    p.Add("@Delay", Test.Delay);
                    p.Add("@DelayScoreDiscount", Test.DelayScoreDiscount);
                    p.Add("@StudentCheckNum", Test.StudentCheckNum);
                    p.Add("@LostScoreDiscount", Test.LostScoreDiscount);
                    p.Add("@EndCheckTime", Test.EndCheckTime);
                    p.Add("@Brief", Test.Brief);
                    p.Add("@TimeOption", Test.TimeOption);

                    conn.Execute("Test_Upd", p, commandType: CommandType.StoredProcedure);
                    return p.Get<int>("TestID");
                }
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// 测试提交,更新提交状态 
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        public static void Test_Submit(int TestID, int UserID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                p.Add("@UserID", UserID);
                conn.Execute("Test_Submit", p, commandType: CommandType.StoredProcedure);
            }
        }

        //作业设为历史
        public static void Test_IsHistroy_Upd(int TestID)
        {
            using (var conn = DbHelper.CCService())
            {
                var p = new DynamicParameters();
                p.Add("@TestID", TestID);
                conn.Execute("Test_IsHistroy_Upd", p, commandType: CommandType.StoredProcedure);
            }
        }


        #endregion

        #region 提醒数字

        /// <summary>
        /// 获取学生需要互评的作业数量
        /// </summary>
        /// <param name="OCID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static int TestUser_StudentCheckCount_Get(int OCID, int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@CheckCount", 0, DbType.Int32, ParameterDirection.InputOutput);
                    p.Add("@UserID", UserID);
                    p.Add("@OCID", OCID);
                    conn.Execute("TestUser_StudentCheckCount_Get", p, commandType: CommandType.StoredProcedure);
                    return p.Get<int>("CheckCount");
                }
            }
            catch
            {
                return 0;
            }
        }

        #endregion

        #region 删除

        public static bool Test_Del(int TestID, int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@UserID", UserID);
                    conn.Execute("Test_Del", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }


        /// <summary>
        /// 复制一次测试
        /// </summary>
        /// <param name="Test"></param>
        /// <returns>返回新的测试编号，利用该编号进入编辑页面</returns>
        public static int Test_Copy(CC.Test.Model.Test Test)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();

                    p.Add("@TestID", Test.TestID, DbType.Int32);
                    p.Add("@UserID", Test.UserID);
                    p.Add("@UserName", Test.UserName);
                    p.Add("@NewTestID", 0, DbType.Int32, ParameterDirection.InputOutput);
                    conn.Execute("Test_Copy", p, commandType: CommandType.StoredProcedure);
                    return p.Get<int>("NewTestID");
                }
            }
            catch
            {
                return 0;
            }
        }


        #endregion


        #region 移动端
        public static List<IES.CC.Test.Model.Test> App_Test_NotSumbit_List(int UserID, int OCID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", UserID);
                    p.Add("@OCID", OCID);
                    return conn.Query<IES.CC.Test.Model.Test>("App_Test_NotSumbit_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static List<IES.CC.Test.Model.Test> App_TestInfo_Sumbit_List(int UserID, int OCID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", UserID);
                    p.Add("@OCID", OCID);
                    return conn.Query<IES.CC.Test.Model.Test>("App_TestInfo_Sumbit_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static bool App_OCAffairs_Add(IES.CC.Test.Model.Test model,string Reson)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@UserID", model.UserID);
                    p.Add("@OCID", model.OCID);
                    p.Add("@TestID", model.TestID);
                    p.Add("@Type", model.Type);
                    p.Add("@Reson", Reson);
                    conn.Execute("App_TestInfo_Sumbit_List", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion




    }
}
