using IES.CC.Test.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IES.DataBase;
using System.Data;

namespace IES.G2S.CourseLive.DAL.Test
{
    /// <summary>
    /// 学生作业
    /// </summary>
    public class TestUserDAL
    {
        #region 列表

        /// <summary>
        /// 学生作业详细列表
        /// </summary>
        /// <param name="model"></param>
        /// <param name="SearchKey"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public static List<TestUser> TestUser_List(TestUser model, string SearchKey, int PageIndex, int PageSize)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@SearchKey", SearchKey);
                    p.Add("@UserID", model.UserID);
                    p.Add("@TestID", model.TestID);
                    p.Add("@TeachingClassID", model.TeachingClassID);
                    p.Add("@PageIndex", PageIndex);
                    p.Add("@PageSize", PageSize);
                    return conn.Query<TestUser>("TestUser_List", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #endregion

        #region 属性更新
        #region 设置/取消范本作业
        /// <summary>
        /// 设置/取消范本作业
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <returns></returns>
        public static bool TestUser_IsSample_Upd(int UserID, int TestID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@UserID", UserID);
                    conn.Execute("TestUser_IsSample_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion

        /// <summary>
        /// 重做
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        public static bool TestUser_Status_Upd(int UserID, int TestID, int Status, int LoginUserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@UserID", UserID);
                    p.Add("@Status", Status);
                    p.Add("@LoginUserID", LoginUserID);
                    conn.Execute("TestUser_Status_Upd", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// 发放成绩
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="TestID"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        public static bool Test_ScoreSend(int UserID, int TestID, int LoginUserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@UserID", UserID);
                    p.Add("@LoginUserID", LoginUserID);
                    conn.Execute("Test_ScoreSend", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion

        /// <summary>
        /// 学生测试智能选题(针对某测试)    
        /// </summary>
        /// <param name="TestID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public static bool TestTacticExercise_Add(int TestID, int UserID)
        {
            try
            {
                using (var conn = DbHelper.CCService())
                {
                    var p = new DynamicParameters();
                    p.Add("@TestID", TestID);
                    p.Add("@UserID", UserID);
                    conn.Execute("TestTacticExercise_Add", p, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
