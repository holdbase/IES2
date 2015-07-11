using IES.CC.Model.Score;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IES.DataBase;
using Dapper;
using System.Data;
using IES.CC.OC.Model;

namespace IES.G2S.CourseLive.DAL.Score
{
    /// <summary>
    /// 成绩管理
    /// 徐卫
    /// 2014年12月31日11:12:57
    /// </summary>
    public class ScoreManageInfoDAL
    {
        #region 列表
        /// <summary>
        /// 成绩管理列表
        /// </summary>
        /// <param name="smi"></param>
        /// <returns></returns>
        public static List<ScoreManageInfo> ScoreManageInfo_List(ScoreManageInfo smi, int DateID, int PageIndex = 1, int PageSize = 20)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@OCID", smi.OCID);
                    p.Add("@UserID", smi.UserID);
                    p.Add("@Name", smi.Name);
                    p.Add("@DateSpan", DateID);
                    p.Add("@ScoreTypeID", smi.ScoreTypeID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    var multi = conn.QueryMultiple("Score_Test_List", p, commandType: CommandType.StoredProcedure);
                    var items = multi.Read<ScoreManageInfo>().ToList();
                    var testStudents = multi.Read<TestStudent>().ToList();
                    foreach (var test in items)
                    {
                        var flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == "未参与");
                        if (flag != null)
                        {
                            test.NoPartUserNum = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                        flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == "<50");
                        if (flag != null)
                        {
                            test.Scoreless50 = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                        flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == "50~59");
                        if (flag != null)
                        {
                            test.Score50to59 = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                        flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == "60~69");
                        if (flag != null)
                        {
                            test.Score60to69 = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                        flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == "70~79");
                        if (flag != null)
                        {
                            test.Score70to79 = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                        flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == "80~89");
                        if (flag != null)
                        {
                            test.Score80to89 = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                        flag = testStudents.Find(t => t.TestID == test.TestID && t.SocreSection == ">=90");
                        if (flag != null)
                        {
                            test.Scoremore90 = flag.UserNum;
                            testStudents.Remove(flag);
                        }
                    }
                    return items;

                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region 操作
        public static bool ScoreManageInfo_Del(int testID, int userID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", testID);
                    p.Add("@UserID", userID);
                    conn.Execute("Score_Test_Del", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static ScoreManageInfo ScoreManageInfo_Add(ScoreManageInfo model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@output", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    p.Add("@OCID", model.OCID);
                    p.Add("@UserID", model.UserID);
                    p.Add("@UserName", model.UserName);
                    p.Add("@CourseID", model.CourseID);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    p.Add("@Name", model.Name);
                    p.Add("@ScoreTypeID", model.ScoreTypeID);
                    conn.Execute("Score_Test_ADD", p, commandType: CommandType.StoredProcedure);
                    model.TestID = p.Get<int>("output");
                    return model;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static bool ScoreManageInfo_Score_Upd(int testID, string studentScores)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", testID);
                    p.Add("@StudentScores", studentScores);
                    conn.Execute("Score_TestUser_Score_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public static bool ScoreManageInfo_Score_Send(int testID, int userID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", testID);
                    p.Add("@UserID", userID);
                    conn.Execute("Score_Test_Send", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public static ScoreManageInfo ScoreManageInfo_Get(int testID, int userID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", testID);
                    p.Add("@UserID", userID);
                    var multi = conn.QueryMultiple("Score_Test_Get", p, commandType: CommandType.StoredProcedure);
                    var item = multi.Read<ScoreManageInfo>().Single();
                    var users = multi.Read<ScoreStudent>().ToList();
                    item.Students = users;
                    return item;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static bool ScoreManageInfo_Upd(ScoreManageInfo model)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", model.TestID);
                    p.Add("@Name", model.Name);
                    p.Add("@StartDate", model.StartDate);
                    p.Add("@EndDate", model.EndDate);
                    p.Add("@ScoreTypeID", model.ScoreTypeID);
                    conn.Execute("Score_Test_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        #endregion
    }
}
